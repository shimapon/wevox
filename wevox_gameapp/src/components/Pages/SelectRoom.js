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
      rooms: ["first",0],
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
    const served_roomlist = [];

    for (let i = 0; i < message.length; i++) {
      let num_user=0
      if (message[i].user1) num_user++;
      if (message[i].user2) num_user++;
      if (message[i].user3) num_user++;
      if (message[i].user4) num_user++;
      served_roomlist.push([message[i].name, num_user])
    }

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
    this.handleToAppPage(enterRoomid2)
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
            channel={{channel: 'ShareChannel', id: '3'}}
            onConnected={this.handleConnected}
            onReceived={this.handleReceived}
          />)
        }
        <div className="title">
          <h1>wevox value card</h1>
        </div>
        <div className="yoko">
          <div className="p-roomlist">
            <p>部屋一覧</p>
              <div className="roomlist">
                <div>
                {this.state.rooms.map((room) => (
                  <div key={room}>
                    <button className="roomcard" onClick={(i)=>this.handleAdd(room[0])}>
                      {room[0]}
                      <p>現在:{room[1]}人</p>
                    </button>
                  </div>
                ))}
                </div>
              </div>
          </div>
          <div className="p-form">
            <form onSubmit={this.handleSubmit} className="form2">
              <div className="form-label">
                <div>
                  <label>
                  部屋名:
                    <input type="text" value={this.state.roomname} onChange={this.handleChange} />
                  </label>

                </div>
                <div className="nick-name">
                  <label>
                    ニックネーム:
                  <input type="text" value={this.state.username} onChange={this.handleChangeusername} />
                  </label>
                </div>
                
              </div>
              <div>
                <input type="submit" value="部屋作成" />
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
