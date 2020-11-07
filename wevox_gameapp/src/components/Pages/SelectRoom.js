import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import '../../index.css';
import Title from '../Atoms/Title'
import Form from '../Organisms/Form'
import RoomList from '../Organisms/RoomList'


// 参加する場合と作成した場合の変数をそれぞれ宣言しておく
let createRoomid ='1'
let enterRoomid = '1'

class SelectRoom extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);

    // rooms:[部屋id, 部屋名, 部屋に入っている人数]
    this.state = {
      rooms: [],
      roomname: '',
      username: '',
    };
    
    this.handleChangeroomname = this.handleChangeroomname.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeusername = this.handleChangeusername.bind(this);
    this.handleAlternate = this.handleAlternate.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  // Component が Mount された後に実行されるメソッド
  componentDidMount() {
    console.log("componentDidMount: SelectRoom");
  }


  // ShareChannelからのメッセージを処理する．
  // 形式:
  // Room.all -> state更新
  handleReceived(messages) {
    console.log("SelectRoom:messages来た: ");
    console.log(messages);


    // 作成されている部屋がない場合
    if(messages.length===0){
      return;
    }

    //console.log(typeof messages); //model.all だとObjectで来るみたい
    const served_roomlist = [];

    for (let message of messages) {
      let num_user=0
      if (message.user1_id) num_user++;
      if (message.user2_id) num_user++;
      if (message.user3_id) num_user++;
      if (message.user4_id) num_user++;
      if(num_user!==0) served_roomlist.push([message.id, message.name, num_user])
    }

    // 部屋作成した際に，受け取るmessages最後のid(作成した部屋のID)を取得する
    createRoomid = messages.slice(-1)[0].id;

    this.setState({
      rooms:served_roomlist,
    })
    console.log("state_roomsは: ")
    console.log(this.state.rooms);
    
  }

  handleConnected() {
    console.log('SelectRoom: successfully connected to cable! woohoo!');
  }

  handleChangeroomname(event) {
    event.preventDefault();
    this.setState({roomname: event.target.value});
  }

  handleChangeusername(event) {
    event.preventDefault();
    this.setState({username: event.target.value});
  }

  handleAdd(room) {
    this.setState({roomname: room});
  }


  // 部屋を作成する
  handleSubmit(event) {
    event.preventDefault();

    if(this.state.roomname===""||this.state.username===""){
      alert("空欄を埋めてください!");
      return;
    }

    for(let room of this.state.rooms){
      if(this.state.roomname===room[1]){
        alert("同名の部屋が存在します，名前を変えるか, 部屋に参加するボタンを押してください");
        return;
      }
    }

    if(window.confirm('部屋名:'+ this.state.roomname + ' で部屋を作成しますか？')){
        this.sendMessage(event);
    
        // 1秒後ゲーム画面に遷移する setTimeoutでゴリ押し...
        setTimeout(() => {
          this.handleToAppPage(createRoomid)
        }, 1000)
    }
    else{
        /* キャンセルの時の処理 */
        return false;
    }
  }

  // 部屋に参加する
  handleAlternate(event) {
    event.preventDefault();

    if(this.state.roomname===""||this.state.username===""){
      alert("空欄を埋めてください!");
      return;
    }

    // 参加時はフォームの部屋名に入っている文字列と同一の部屋からidを取得する
    // 部屋に4人入っていたら警告を出す
    for(let room of this.state.rooms) {
      if(this.state.roomname===room[1]){
        if(room[2] >= 4){
          alert("この部屋は定員に達しています");
          return;
        }
        else{
          enterRoomid = room[0]
          break;
        }
      }
    }

    if(window.confirm('部屋名:'+ this.state.roomname + ' に参加しますか？')){
      event.preventDefault();
      this.sendMessage(event);
      setTimeout(() => {
        this.handleToAppPage(enterRoomid)
      }, 500)
    }
    else{
      /* キャンセルの時の処理 */
      return false;
    }

  }

  // サーバに部屋名とユーザ名を送信する
  sendMessage(event) {
    event.preventDefault()
    const message = [this.state.roomname, this.state.username];
    this.refs.shareChannel.perform('send_message', {message}) 
  }

  // ゲーム画面に遷移する
  handleToAppPage(id) {
    this.props.history.push({
      pathname: '/Room/' + id,
      state: { myname: this.state.username }
   })
  }

  render() {
    return (
      <div className="selectroom">
        {
          this.acc || (this.acc = <ActionCableConsumer
            ref='shareChannel'
            channel={{channel: 'ShareChannel'}}
            onConnected={this.handleConnected}
            onReceived={this.handleReceived}
          />)
        }
        <Title
          value="wevox value cards"
        />
        <div className="selectroom-main">
          <RoomList
            rooms={this.state.rooms}
            onClick={this.handleAdd}
          />
          <Form
            roomname={this.state.roomname}
            username={this.state.username}
            handleChangeroomname={this.handleChangeroomname}
            handleChangeusername={this.handleChangeusername}
            handleSubmit={this.handleSubmit}
            handleAlternate={this.handleAlternate}
          />
        </div>
    </div>
    );
  }
}
export default SelectRoom
