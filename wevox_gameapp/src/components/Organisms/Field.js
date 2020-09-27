import React from 'react';
import '../../index.css';
import Deck from '../Molecules/Deck';
import Trash from '../Molecules/Trash';

// 手札のコンポーネント
class Field extends React.Component {
  render() {
    return (
      <div className="field">
        <Deck
          value={this.props.value}
          onClick={()=>this.props.handleClickDeck()}
        />
        <Trash
          trash={this.props.trash}
          onClick={(i)=>this.props.handleClickTrash(i)}
        />
      </div>
    );
  }
}

export default Field;
