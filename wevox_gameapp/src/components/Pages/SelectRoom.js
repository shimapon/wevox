import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import '../../index.css';

let enterRoomid='1'
let enterRoomid2 = '1'


class SelectRoom extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);

    this.state = {
      rooms: ["A",0],
      roomname: '',
      username: '',
      message:[],
    };
    this.handleChange = this.handleChange.bind(this);
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
  handleReceived(message) {
    console.log("SelectRoom:message来た: ");
    console.log(message);
    //console.log(typeof message); //model.all だとObjectで来るみたい
    const served_roomlist = [];

    for (let i = 0; i < message.length; i++) {
      let num_user=0
      if (message[i].user1_id) num_user++;
      if (message[i].user2_id) num_user++;
      if (message[i].user3_id) num_user++;
      if (message[i].user4_id) num_user++;
      served_roomlist.push([message[i].name, num_user])
    }

    // 部屋作成した際に，message最後のidを取得する
    enterRoomid=message.slice(-1)[0].id;

    this.setState({
      rooms:served_roomlist,
      message:message
    })
    console.log("state_roomsは: ")
    console.log(this.state.rooms);
    
  }

  handleConnected() {
    console.log('successfully connected to cable! woohoo!');
  }

  handleChange(event) {
    this.setState({roomname: event.target.value});
  }

  handleChangeusername(event) {
    this.setState({username: event.target.value});
  }

  handleAdd(room) {
    this.setState({roomname: room});
  }


  // 部屋を作成
  handleSubmit(event) {
    if(this.state.roomname==""||this.state.username==""){
      console.log("作成アラート");

      alert("空欄を埋めてください!");
      return;
    }

    for(var i=0; i<this.state.rooms.length;i++){
      if(this.state.roomname==this.state.rooms[i][0]){
        alert("同名の部屋が存在します，名前を変えるか,部屋に参加するボタンを押してください");
        return;
      }
    }


    alert('submit 部屋名:' + this.state.roomname
    +'  ユーザネーム: '+ this.state.username);
    event.preventDefault();
    this.sendMessage(event);
    // 0.5秒後ゲーム画面に遷移する setTimeoutでゴリ押し...
    setTimeout(() => {
      this.handleToAppPage(enterRoomid)
    }, 500)

  }

  // 部屋に参加する
  handleAlternate(event) {
    if(this.state.roomname==""||this.state.username==""){
      console.log("参加アラート");
      alert("空欄を埋めてください!");
      return;
    }


    // 参加時はフォームの部屋名に入っている文字列と同一の部屋からidを取得する
    for(var i=0;i<this.state.message.length;i++){
      if(this.state.roomname===this.state.message[i].name){
        enterRoomid2=this.state.message[i].id
        break;
      }
    }

    alert('submit 部屋名:' + this.state.roomname
    +'  ユーザネーム: '+ this.state.username);
    event.preventDefault();
    this.sendMessage(event);
    setTimeout(() => {
      this.handleToAppPage(enterRoomid2)
    }, 500)
  }

  // サーバに部屋名とユーザ名を送信する
  sendMessage = (event) => {
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
      <div>
        {
          this.acc || (this.acc = <ActionCableConsumer
            ref='shareChannel'
            channel={{channel: 'ShareChannel'}}
            onConnected={this.handleConnected}
            onReceived={this.handleReceived}
          />)
        }
        <div className="title">
          <h1>wevox value card</h1>
        </div>
        <div className="yoko">
          <div className="p-roomlist">
            <p className="roomlist_title">部屋一覧</p>
            <div className="roomlist_label">
              <p>部屋名</p>
              <p className="roomlist_num">人数</p>
            </div>

              <div className="roomlist">
                <div>
                {this.state.rooms.map((room) => (
                  <div key={room}>
                    <li className="roomcard" onClick={(i)=>this.handleAdd(room[0])}>
                      <a href="#">{room[0]} {room[1]}人</a>
                    </li>
                  </div>
                ))}
                </div>
              </div>
          </div>
          <div className="p-form">
            <form className="form2">
              <div className="form-label">
                <div className="form-roomname">
                    <p>部屋名:</p>
                    <input type="text" value={this.state.roomname} onChange={this.handleChange} />
                </div>
                <div className="nick-name">
                  <p>ニックネーム:</p>
                  <input type="text" value={this.state.username} onChange={this.handleChangeusername} />
                </div>
                
              </div>
              <div className="form-button">
                <input type="submit" value="部屋作成" onClick={this.handleSubmit}/>
                <input type="submit" value="部屋に参加" onClick={this.handleAlternate} className="aaa"/>
              </div>
            </form>
          </div>
        </div>
    </div>
    );
  }
}

export default SelectRoom
