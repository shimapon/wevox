import React from 'react';
import '../../index.css';

// 手札のコンポーネント
class People extends React.Component {

  render() {
    return (
      <div className="people">
        <div className="box1">{this.props.cards[0]}</div>
        <div className="box2">{this.props.cards[1]}</div>
        <div className="box3">{this.props.cards[2]}</div>
        <div className="box4">{this.props.cards[3]}</div>
        <div className="box5">{this.props.cards[4]}</div>
        <div className="box6">
            <div className="box6in">
                {this.props.username}の<br></br>価値観
            </div>
        </div>
      </div>
    );
  }
  
}

export default People;
