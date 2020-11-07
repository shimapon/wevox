import React from 'react';
import '../../index.css';
import MHand from '../Molecules/Hand';

// 手札のコンポーネント
class Hand extends React.Component {
  render() {
    return (
      <div className="o_hand">
        <MHand
          cards={this.props.cards}
          onClick={(i)=>this.props.onClick(i)}
        />
      </div>
    );
  }
}

export default Hand;
