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
        num_deck: -1,
        trash: [],
        playstate: 0,
        now_player:0,
      }
    }
  
    // Component が Mount された後に実行されるメソッド
    componentDidMount() {
      roomuser = this.props.history.location.state.roomuser
      myname=this.props.history.location.state.myname
      console.log("mynameは: "+myname);
      console.log("部屋に入っているユーザは")
      console.log(roomuser);

      
      // 1.5秒後，サーバにメッセージを送り，手札を取得する
      setTimeout(() => {
        this.first_regis()
      }, 1500)
    }

    // 手札クリック時
    handleHandClick(i) {
      if (myname!==roomuser[this.state.now_player] || this.state.cards.length!==6 || this.state.num_deck===-1){
        return;
      }

      this.setState({
        playstate:2,
      })

      let message = [this.state.now_player, myname,this.state.cards[i]]
      this.refs.gameChannel.perform('pushtrash_fromhand', {message}) 
    }
  
    // 捨て札クリック時
    handleTrashClick(i) {
      if (myname!==roomuser[this.state.now_player] || this.state.cards.length!==5 || this.state.num_deck===-1){
        return;
      }
      this.setState({
        playstate:1,
      })
      let message = [this.state.now_player, myname, this.state.trash[i]]
      this.refs.gameChannel.perform('pushhand_fromtrash', {message}) 
    }
  
    // 山札クリック時
    handleDeckClick(){
      if (myname!==roomuser[this.state.now_player] || this.state.cards.length!==5 || this.state.num_deck===-1){
        return;
      }
      
      this.setState({
        playstate:1,
      })

      let message = [this.state.now_player, myname]
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
    // [プレイヤーのindex,[参加者の手札],トラッシュの配列, deckの枚数]
    //
    // 参加者の手札: ["プレイヤー名前",[手札の配列]]...
    handleReceived(message) {
      console.log("Game:message来た: ");
      console.log(message);

      var now_player=message[0]
      if (now_player>=roomuser.length) now_player=0

      for (var i=0;i<message[1].length;i++){
        if(message[1][i][0]===myname){
          this.setState({
            now_player:now_player,
            cards:message[1][i][1],
            trash:message[2],
            num_deck:message[3]
          });
        }
      }

      if(finishflag){
        this.props.history.push({
          pathname: '/Result',
          state: { owncards: message[1] }
       })
      }
      if(this.state.num_deck===0) finishflag=true
    }
  
    render() {
      roomuser = this.props.history.location.state.roomuser
      myname=this.props.history.location.state.myname
      let text ="";

      
      if(this.state.num_deck===-1){
        text = "山札情報を取得中です..."
      }
      else if(myname!==roomuser[this.state.now_player]){
        text = roomuser[this.state.now_player]+"さんのターンです";
      }
      else if (this.state.playstate === 0){
        text = "山札から引きましょう";
      }
      else if (this.state.playstate === 1) {
        text = "手札から自分の価値観に1番遠いカードを捨てましょう";
      }
      else if (this.state.playstate === 2) {
        text = "「山札」または「場にあるカード」から１枚引きましょう";
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
  
  export default Game
