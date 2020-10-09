import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import '../../index.css';


class SelectRoom extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);

    this.state = {
      rooms: ["first"],
      roomname: '',
      username: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeusername = this.handleChangeusername.bind(this);
  }

  // Component が Mount された後に実行されるメソッド
  componentDidMount() {
    console.log("componentDidMount:chatRoom");
  }

  handleReceived(message) {
    console.log("message来た: ");
    console.log(message);
    //console.log(typeof message); //Object
    const served_roomlist = [];
    for (let i = 0; i < message.length; i++) {
      served_roomlist.push(message[i].name)
    }

    this.setState({
      rooms:served_roomlist
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


  // ここで部屋名を送信
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.roomname);

    event.preventDefault();
    this.sendMessage(event);
  }

  sendMessage = (event) => {
    event.preventDefault()
    const message = this.state.roomname;
    this.setState({roomname: "", username:""})
    this.refs.shareChannel.perform('send_message', {message})
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

        <p>部屋一覧</p>
        <div className="roomlist">
          
          <div>
          {this.state.rooms.map((room) => (
            <div key={room}>
              <button>
                {room}
              </button>
            </div>
          ))}
          </div>
        </div>

        <div>
          <form onSubmit={this.handleSubmit}>
          <label>
            部屋名:
            <input type="text" value={this.state.roomname} onChange={this.handleChange} />
          </label>
          <label>
            ニックネーム:
            <input type="text" value={this.state.username} onChange={this.handleChangeusername} />
          </label>
          <input type="submit" value="Submit" />
          </form>
        </div>
    </div>
    );
  }
}

export default SelectRoom
