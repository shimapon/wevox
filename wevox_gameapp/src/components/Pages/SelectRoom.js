import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import '../../index.css';

let enterRoomid='1'
let enterRoomid2 = '1'


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
    enterRoomid = messages.slice(-1)[0].id;

    this.setState({
      rooms:served_roomlist,
    })
    console.log("state_roomsは: ")
    console.log(this.state.rooms);
    
  }

  handleConnected() {
    console.log('SelectRoom: successfully connected to cable! woohoo!');
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({roomname: event.target.value});
  }

  handleChangeusername(event) {
    event.preventDefault();
    this.setState({username: event.target.value});
  }

  handleAdd(room) {
    this.setState({roomname: room});
    // 「部屋に参加ボタン」を強調する

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
    
        // 0.5秒後ゲーム画面に遷移する setTimeoutでゴリ押し...
        setTimeout(() => {
          this.handleToAppPage(enterRoomid)
        }, 500)
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
          enterRoomid2 = room[0]
          break;
        }
      }
    }

    if(window.confirm('部屋名:'+ this.state.roomname + ' に参加しますか？')){
      event.preventDefault();
      this.sendMessage(event);
      setTimeout(() => {
        this.handleToAppPage(enterRoomid2)
      }, 500)
    }
    else{
      /* キャンセルの時の処理 */
      return false;
    }

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
              <ListningRoom rooms={this.state.rooms} onClick={(i)=>this.handleAdd(i)}/>
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

function ListningRoom(props) {
  const rooms = props.rooms;
  if (rooms.length===0) {
    return <NotExistRoom />;
  }
  return <ExistRoom rooms={props.rooms} onClick={(i)=>props.onClick(i)}/>;
}


function NotExistRoom(props) {
  return(
    <div className="roomlist">
      <div>
        <li className="roomcard">
          <p>部屋が立てられていません</p>
        </li>
      </div>
    </div>
)}

function ExistRoom(props) {
  return(
    <div className="roomlist">
      <div>
      {props.rooms.map((room) => (
        <div key={room}>
          <li className="roomcard" onClick={(i)=>props.onClick(room[1])}>
            <a><div className="test">{room[2]}人</div>{room[1]}</a>
          </li>
        </div>
      ))}
      </div>
    </div>
  )
}

export default SelectRoom
