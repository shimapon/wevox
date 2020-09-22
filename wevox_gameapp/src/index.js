import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

//const server = 'http://localhost:4000/api/v1/posts';

// カード一枚のコンポーネント
function Card(props){
  return(
    <button className="card" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// トラッシュにあるカード一枚のコンポーネント
function TrashCard(props){
  var btnstyle = {
    left: props.num*20,
  };

  if(props.num===0){
    btnstyle = {
      position: "relative",
    };
  }

  return(
    <button className="trashcard" style={btnstyle} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// 手札のコンポーネント
class HandList extends React.Component {
  renderSquare(i) {
    return (
      <Card
        value={this.props.cards[i]}
        onClick={()=>this.props.onClick(i)}
        key={'cardList' + i}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.props.cards.map((data, index) => {
            return this.renderSquare(index)
          })}
        </div>
      </div>
    );
  }
}

// 山札のコンポーネント
function Deck(props){
  return(
    <div className="decklist">
      <button className="deckcard" onClick={props.onClick}>
      </button>
      <button className="deckcard2" onClick={props.onClick}>
      </button>
      <button className="deckcard3" onClick={props.onClick}>
      </button>
      <button className="deckcard4" onClick={props.onClick}>
      </button>
      <span className="balloon">残り{props.value}枚</span>
    </div>
  );
}

// トラッシュのコンポーネント
class Trash extends React.Component {
  renderSquare(i) {
    return (
      <TrashCard
        num={i}
        value={this.props.trash[i]}
        key={'trashList' + i}
        onClick={()=>this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="trash-row">
          {this.props.trash.map((data, index) => {
            return this.renderSquare(index)
          })}
        </div>
      </div>
    );
  }
}


//　親コンポーネント，Game
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
  handleClick(i) {
    console.log(i);
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
    //this.handleClick3();
  }

  // 捨て札クリック時
  handleClick2(i) {
    console.log(i);
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
    //this.handleClick3();
  }

  //　山札クリック時
  handleClick3(){
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
    var text ="a"
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
      <div className="game">
        <div>
          <header>
            <h1 className="headline">
              <p>wevox values card</p>
            </h1>
            <div className="boxin">
              <div className="box">
                <p>{text}</p>
              </div>
            </div>
          </header>
        </div>
        <div className="game-board">
          <div className="decktrash">
            <Deck
              value={this.state.deck.length}
              onClick={()=>this.handleClick3()}
            />
            <Trash
              trash={this.state.trash}
              onClick={(i)=>this.handleClick2(i)}
            />
          </div>
          <HandList
            cards={this.state.cards}
            onClick={(i)=>this.handleClick(i)}
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




ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
