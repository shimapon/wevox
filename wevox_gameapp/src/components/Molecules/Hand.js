import React from 'react';
import '../../index.css';
import Card from '../Atoms/Card';

// 手札のコンポーネント
class M_Hand extends React.Component {
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
      <div className="m_hand">
        {this.props.cards.map((data, index) => {
          return this.renderSquare(index)
        })}
      </div>
    );
  }
}

export default M_Hand;
