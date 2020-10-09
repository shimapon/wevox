import React from 'react';
import '../../index.css';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom'
import Hand from '../Organisms/Hand';
import Field from '../Organisms/Field';

//const server = 'http://localhost:4000/api/v1/posts';

// Pagesコンポーネント
const App = ()=>(
  <BrowserRouter>
    <Game />
  </BrowserRouter>
)

// 親コンポーネント，Game
class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cards: Array(5).fill(null),
      deck: [],
      trash: [],
      playstate: 0,
    }
  }

  // Component が Mount された後に実行されるメソッド
  componentDidMount() {
    console.log("start");
    this.getDeck();
  }

  // 手札クリック時
  handleHandClick(i) {
    var tmp = this.state.cards
    var a;
    if (checkFinish(this.state.deck.length, this.state.cards.length) || this.state.cards.length===5){
      return;
    }

    a=this.state.trash
    a.push(tmp[i])
    tmp.splice(i, 1); // i番目から１つ削除
    this.setState({
      cards:tmp,
      trash:a,
      playstate:2,
    })
    if (this.state.deck.length===0){
      this.setState({playstate:3})
    }
  }

  // 捨て札クリック時
  handleTrashClick(i) {
    var tmp = this.state.trash
    var a;
    if (checkFinish(this.state.deck.length, this.state.cards.length) || this.state.cards.length!==5){
      return;
    }
    a=this.state.cards
    a.push(tmp[i])
    tmp.splice(i, 1); // i番目から１つ削除
    this.setState({
      cards:a,
      trash:tmp,
      playstate:1,
    })
  }

  // 山札クリック時
  handleDeckClick(){
    var h = this.state.cards
    var a;
    var b
    if (this.state.cards.length!==5 || this.state.deck.length===0){
      return;
    }

    a=random(this.state.deck,1);
    b=h.concat(a)
    this.setState({
      cards:b,
      playstate:1,
    })
  }

  // 山札の情報を取得する
  getDeck(){
    var deck=[]
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/posts`)
      .then((res) => {
        console.log(res);
        for (var i=0;i<res.data.data.length;i++){
          deck.push(res.data.data[i].title);
        }
        this.setState({deck: deck});
        this.setState({cards:random(deck,5)})
      })
      .catch(console.error);
  }

  render() {
    var text ="";
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
        <div className="p_field">
          <Field
            value={this.state.deck.length}
            trash={this.state.trash}
            handleClickDeck={()=>this.handleDeckClick()}
            handleClickTrash={(i)=>this.handleTrashClick(i)}
          />
        </div>
        <div className="p_message">
          <p>{text}</p>
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

// 配列から要素をcount個ランダムに取得する．
function random(arr, count) {
    if (!count) count = 1;
 
    var data = [];
 
    for (var i = 0; i < count; i++) {
        var num = Math.floor(Math.random() * arr.length);
        data.push(arr.splice(num, 1)[0]);
    }
 
    return data;
};

function checkFinish(decklength, handlength) {
  if (decklength===0 && handlength===5) {
    console.log("finish");
    return 1;
  }
  return null;
}

export default App
