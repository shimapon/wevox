import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

const server = 'http://localhost:4000/api/v1/posts';

// 関数コンポーメント
function Card(props){
  return(
    <button className="card" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class HandList extends React.Component {

  renderSquare(i) {
    return (
      <Card
        value={this.props.cards[i]}
        onClick={()=>this.props.onClick(i)}
      />
    );
  }

  render() {
    const num_cards=this.props.cards.length
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


class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cards: Array(5).fill(null),
      deck: this.handleClickGet(),
      trash: [],
    }
  }

  handleClick(i){
    console.log(i);
    var tmp = this.state.cards
    var a;
    a=this.state.trash
    a.push(tmp[i])

    tmp.splice(i, 1); // ２番目から１つ削除
    this.setState({
      cards:tmp,
      trash:a,
    })
  }

  handleClick2(){
    this.setState({cards:random(this.state.deck,5)})
  }

  handleClick3(){
    var h = this.state.cards
    var a;
    var b
    a=random(this.state.deck,1);
    b=h.concat(a)
    this.setState({cards:b})
  }

  handleClickGet(event){
    var deck=[]
    axios.get(server)
      .then((res) => {
        console.log(res);
        for (var i=0;i<res.data.data.length;i++){
          console.log(res.data.data[i].title);
          deck.push(res.data.data[i].title);
        }
      })
      .catch(console.error);

      // "this.setState is not a function"と怒られる
      // setTimeout(function() {
      //   this.setState({cards:random(deck,5)})
      // }, 500);
    return deck
  }


  render() {
    const trash = this.state.trash;

    return (
      <div className="game">
        <div>
        <button onClick={()=>this.handleClick2()}>押すと読み込みます</button>
        </div>
        <div>
        <p>{trash}</p>
        </div>
        <div>
        <button onClick={()=>this.handleClick3()}>山札</button>
        </div>
        <div className="game-board">
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
function random(arr, count) {
    if (!count) count = 1;
 
    var data = [];
 
    for (var i = 0; i < count; i++) {
        var num = Math.floor(Math.random() * arr.length);
        data.push(arr.splice(num, 1)[0]);
    }
 
    return data;
};



ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
