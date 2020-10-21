import React from 'react';
import '../../index.css';
import Hand from '../Organisms/Hand';
import Field from '../Organisms/Field';
import Text from '../Atoms/Text';
import { ActionCableConsumer } from 'react-actioncable-provider';


// 参加者の順番
let roomuser;
// 自分の名前
let myname;
let finishflag=false

// 親コンポーネント，Game
class Game extends React.Component {
    constructor(props){
      super(props)
      this.handleReceived = this.handleReceived.bind(this);
      this.state = {
        cards: Array(5).fill(null),
        num_deck: 0,
        trash: [],
        playstate: 0,
      }
    }
  
    // Component が Mount された後に実行されるメソッド
    componentDidMount() {
      roomuser = this.props.history.location.state.roomuser
      myname=this.props.history.location.state.myname
      console.log("mynameは: "+myname);
      console.log("部屋に入っているユーザは")
      console.log(roomuser);
      //console.log(this.props.history);
      
      // 0.5秒後，サーバにメッセージを送り，手札を取得する
      setTimeout(() => {
        this.first_regis()
      }, 500)
    }

    // 手札クリック時
    handleHandClick(i) {
      if (this.state.cards.length!==6){
        return;
      }

      this.setState({
        playstate:2,
      })

      let message = [myname,this.state.cards[i]]
      this.refs.gameChannel.perform('pushtrash_fromhand', {message}) 
    }
  
    // 捨て札クリック時
    handleTrashClick(i) {
      if (this.state.cards.length!==5){
        return;
      }
      this.setState({
        playstate:1,
      })
      let message = [myname,this.state.trash[i]]
      this.refs.gameChannel.perform('pushhand_fromtrash', {message}) 
    }
  
    // 山札クリック時
    handleDeckClick(){
      if (this.state.cards.length!==5){
        return;
      }
      
      this.setState({
        playstate:1,
      })

      let message = [myname]
      this.refs.gameChannel.perform('pushhand_fromdeck', {message}) 
    }

    handleConnected() {
      console.log('successfully connected to cable! woohoo!');
    }


    // GameChannelに自分の名前を送り，5枚の手札をもらう
    first_regis(){
      let message = [myname]
      this.refs.gameChannel.perform('first_regis', {message}) 
    }

    // GameChannelからのメッセージを処理する．
    // 形式:
    // [[参加者の手札],トラッシュの配列]
    //
    // 参加者の手札: ["プレイヤー名前",[手札の配列]]...
    handleReceived(message) {
      console.log("Game:message来た: ");
      console.log(message);
      for (var i=0;i<message[0].length;i++){
        if(message[0][i][0]===myname){
          this.setState({
            cards:message[0][i][1],
            trash:message[1],
            num_deck:message[2]
          });
        }
      }

      if(finishflag){
        this.props.history.push({
          pathname: '/Result',
          state: { owncards: message[0] }
       })
      }
      if(this.state.num_deck==0) finishflag=true
    }
  
    render() {
      let text ="";
      if (this.state.playstate === 0){
        text = "山札から引きましょう";
      }
      else if (this.state.playstate === 1) {
        text = "手札から自分の価値観に1番遠いカードを捨てましょう";
      }
      else if (this.state.playstate === 2) {
        text = "「山札」または「場にあるカード」から１枚引きましょう";
      }
      else if (this.state.playstate === 3) {
        text = "終了";
      }
  
      return (
        <div className="game-board">
            {
            this.acc || (this.acc = <ActionCableConsumer
                ref='gameChannel'
                channel={{channel: 'GameChannel', id: this.props.id}}
                onConnected={this.handleConnected}
                onReceived={this.handleReceived}
            />)
            }
          <div className="p_field">
            <Field
              value={this.state.num_deck}
              trash={this.state.trash}
              handleClickDeck={()=>this.handleDeckClick()}
              handleClickTrash={(i)=>this.handleTrashClick(i)}
            />
          </div>
          <div className="p_message">
            <Text
              value={text}
            />
          </div>
          <div className="p_hand">
            <Hand
              cards={this.state.cards}
              onClick={(i)=>this.handleHandClick(i)}
            />
          </div>
        </div>
      );
    }
  }
  
  
  
  // ========================================
  function checkFinish(decklength, handlength) {
    if (decklength===0 && handlength===5) {
      console.log("finish");
      return 1;
    }
    return null;
  }

  export default Game
