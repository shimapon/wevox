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
let my_index=-1

// 親コンポーネント，Game
class Game extends React.Component {
    constructor(props){
      super(props)
      this.handleReceived = this.handleReceived.bind(this);
      this.state = {
        cards: Array(5).fill(null),
        owncards:[],
        deck:[],
        trash: [],
        playstate: 0,
        now_player:-1,
      }
    }
  
    // Component が Mount された後に実行されるメソッド
    componentDidMount() {
      roomuser = this.props.history.location.state.roomuser
      myname=this.props.history.location.state.myname
      my_index=roomuser.indexOf(myname)
      console.log("mynameは: "+myname);
      console.log("部屋に入っているユーザは")
      console.log(roomuser);

      if (myname === roomuser[0]){
        // 1.5秒後，サーバにメッセージを送り，手札を取得する
        setTimeout(() => {
          let message = ["hoge"]
          this.refs.gameChannel.perform('first_regis', {message}) 
        }, 1500)
      }

    }

    // 手札クリック時
    handleHandClick(i) {

      if (this.state.now_player !== my_index || this.state.cards.length !== 6){

        return;
      }

      this.setState({
        playstate:2,
      })

      let message = [2, my_index, this.state.cards[i]]
      this.refs.gameChannel.perform('handle_game', {message}) 
    }
  
    // 捨て札クリック時
    handleTrashClick(i) {
      if (this.state.now_player !== my_index || this.state.cards.length !== 5){
      return;
    }
    

      this.setState({
        playstate:1,
      })

      let message = [3, my_index, this.state.trash[i]]
      this.refs.gameChannel.perform('handle_game', {message}) 
    }
  
    // 山札クリック時
    handleDeckClick(){

      if (this.state.now_player !== my_index || this.state.cards.length !== 5){

        return;
      }


      let deck = this.state.deck
      let top_card = deck.pop()
      
      this.setState({
        playstate:1,
      })

      let message = [1, my_index, top_card]
      this.refs.gameChannel.perform('handle_game', {message}) 
    }

    handleConnected() {
      console.log('successfully connected to cable! woohoo!');
    }

    // GameChannelからのメッセージを処理する．
    // メッセージの形式:[命令の値, 操作を行うユーザのindex, 引くor捨てるカード一枚]
    // ただし初めの手札取得のみ メッセージの形式:[0, デッキの配列，プレイヤーの手札の2重配列]
    // 命令 0:初めの全プレイヤーの手札取得(5枚づつ) 1: 山札から1枚引く 2:手札から1枚捨てる 3:トラッシュから1枚引く
    handleReceived(message) {
      console.log("Game:message来た: ");
      console.log(message);

      let deck=this.state.deck
      let trash=this.state.trash
      let owncards = this.state.owncards
      let card;
      let index;

      if (message[0]===0){
        this.setState({
          now_player:0,
          deck:message[1],
          cards:message[2][my_index],
          owncards:message[2],
        })
      }
      // 山札
      else if (message[0]===1){
        card = message[2]

        // 該当のカードを山札から削除
        index = deck.indexOf(card);
        if (index > -1) {
          deck.splice(index, 1);
        }

        owncards[message[1]].push(card)
        this.setState({
          deck:deck,
          cards:owncards[my_index],
          owncards:owncards,
        })
      }
      // 手札
      else if (message[0]===2) {
        card = message[2]

        // 該当のカードを手札から削除
        index = owncards[message[1]].indexOf(card);
        if (index > -1) {
          owncards[message[1]].splice(index, 1);
        }
        
        let now_player=this.state.now_player
        now_player++;
        if (now_player>=roomuser.length) now_player=0

        trash.push(card)
        this.setState({
          cards:owncards[my_index],
          owncards:owncards,     
          trash:trash,
          now_player:now_player,
        })

        if(this.state.deck.length===0){
          let owncard=[]
          let i =0
          for (let cards of this.state.owncards){
            owncard.push([roomuser[i],cards])
            i++;
          }
          this.props.history.push({
            pathname: '/Result',
            state: { owncards:  owncard}
         })
        }

      }

      // トラッシュ
      else {
        card = message[2]

        // 該当のカードをトラッシュから削除
        var index = trash.indexOf(card);
        if (index > -1) {
          trash.splice(index, 1);
        }

        owncards[message[1]].push(card)
        this.setState({
          cards:owncards[my_index],
          owncards:owncards,
          trash:trash,
        })
      }

    }
  
    render() {
      let text ="";

      if(this.state.deck.length===0){
        text = "山札情報を取得中です..."
      }
      else if(my_index!==this.state.now_player){

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
              value={this.state.deck.length}
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
