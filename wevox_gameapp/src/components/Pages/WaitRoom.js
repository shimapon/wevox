import React from 'react';
import '../../index.css';
import { ActionCableConsumer } from 'react-actioncable-provider';
import Main from '../Organisms/Main';
import Header from '../Organisms/Header';


// 親コンポーネント，Game
class WaitRoom extends React.Component {
    constructor(props){
      super(props)
      this.handleReceived = this.handleReceived.bind(this);
      this.state = {
        roomname:"",
        roomuser1:undefined,
        roomuser2:undefined,
        roomuser3:undefined,
        roomuser4:undefined,
      }
      this.onClick = this.onClick.bind(this);
      this.handleBackPage = this.handleBackPage.bind(this)
    }

    // TeamsChannelからのメッセージを処理する．
    // 形式:
    // 文字列で"start" -> 画面遷移する
    // or
    // Room.where(id) -> state更新
    handleReceived(message) {
        console.log("WaitRoom:message来た: ");
        console.log(message); 

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

    // 退出処理
    handleBackPage(){

        if(window.confirm("この部屋から退出しますか？")){
            const message = [this.props.history.location.state.myname];

            this.refs.teamsChannel.perform('back_toppage', {message})
            this.props.history.push({
                pathname: '/Top',
             })
        }
        else{
            /* キャンセルの時の処理 */
            return false;
        }
    }

    // ゲーム画面に遷移する
    handleToGamePage() {
       console.log("ゲーム画面に変わります");
       var roomuser=[]
       if(this.state.roomuser1) roomuser.push(this.state.roomuser1)
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
  
    onClick() {
        if(window.confirm("このメンバーでゲームを始めますか？(誰かでも押すと全員画面移動します)")){
            // 渡すのはなんでも良い
            const message = ["hoge"];

            this.refs.teamsChannel.perform('move_gameapp', {message})
        }
        else{
            /* キャンセルの時の処理 */
            return false;
        }
    }

    render() {  
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
                <Header
                    headertext={this.state.roomname}
                    onClick={this.handleBackPage}
                    text={"←"}
                />
                <Main
                    roomusers={[
                        this.state.roomuser1, 
                        this.state.roomuser2, 
                        this.state.roomuser3, 
                        this.state.roomuser4,
                    ]}
                    onClick={this.onClick}
                    text={"ゲーム開始"}
                />
            </div>
        );
      }
  }

  export default WaitRoom
