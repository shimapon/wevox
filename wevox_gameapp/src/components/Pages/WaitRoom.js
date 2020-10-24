import React from 'react';
import '../../index.css';
import { ActionCableConsumer } from 'react-actioncable-provider';


// 親コンポーネント，Game
class WaitRoom extends React.Component {
    constructor(props){
      super(props)
      this.handleReceived = this.handleReceived.bind(this);
      this.state = {
        roomname:"test",
        roomuser1:undefined,
        roomuser2:undefined,
        roomuser3:undefined,
        roomuser4:undefined,
      }
      this.onClick = this.onClick.bind(this);
    }

    // Component が Mount された後に実行されるメソッド
    componentDidMount() {
        console.log("componentDidMount: WaitRoom");
        console.log("mynameは"+this.props.history.location.state.myname);
    }

    // TeamsChannelからのメッセージを処理する．
    // 形式:
    // 文字列で"start" -> 画面遷移する
    // or
    // Room.where(id) -> state更新
    handleReceived(message) {
        console.log("WaitRoom:message来た: ");
        console.log(message); 
        console.log(typeof message); 

        // ゲーム画面に遷移する
        if (message==="start"){
            this.handleToGamePage()
            return;
        }

        this.setState({
            roomname:message.name,
            roomuser1:message.user1,
            roomuser2:message.user2,
            roomuser3:message.user3,
            roomuser4:message.user4,
        })

    }

    // ゲーム画面に遷移する
    handleToGamePage() {
       console.log("ゲーム画面に変わります");
       var roomuser=[this.state.roomuser1]
       if(this.state.roomuser2) roomuser.push(this.state.roomuser2)
       if(this.state.roomuser3) roomuser.push(this.state.roomuser3)
       if(this.state.roomuser4) roomuser.push(this.state.roomuser4)

       this.props.history.push({
        pathname: '/App/' + this.props.id,
        state: { 
            myname: this.props.history.location.state.myname,
            roomuser: roomuser,
        }
     })
    }
  
    // Component が Mount された後に実行されるメソッド
    componentDidMount() {
    }


    onClick() {
        // 渡すのはなんでも良い
        const message = ["hoge"];

        this.refs.teamsChannel.perform('move_gameapp', {message}) 
    }
  
    
    render() {  
        console.log("componentDidMount: WaitRoom");
        console.log("mynameは"+this.props.history.location.state.myname);
      return (
        <div className="waitroom">
            {
                this.acc || (this.acc = <ActionCableConsumer
                    ref='teamsChannel'
                    channel={{channel: 'TeamsChannel', id: this.props.id}}
                    onConnected={this.handleConnected}
                    onReceived={this.handleReceived}
                />)
            }
          <header className="waitroomheader">
              部屋:{this.state.roomname}
          </header>
          <div className="wrapper">              
              <div className="userbox">
                  <div className="usertextbox">
                    <div>
                        <p>{this.state.roomuser1}</p>
                    </div>
                    
                  </div>

              </div>
              <div className="userbox">
                  <div className="usertextbox">
                    <div>
                        <p>{this.state.roomuser2}</p>
                    </div>
                    
                  </div>
              </div>
              <div className="userbox">
                  <div className="usertextbox">
                    <div>
                        <p>{this.state.roomuser3}</p>
                    </div>
                    
                  </div>
              </div>
              <div className="userbox">
                  <div className="usertextbox">
                    <div>
                        <p>{this.state.roomuser4}</p>
                    </div>
                  </div>
              </div>
          </div>
            <div className="p-startbutton">
                <div className="startbutton">
                    <button onClick={this.onClick}>ゲーム開始</button>
                </div>
            </div>
        </div>
      );
    }
  }

  export default WaitRoom
