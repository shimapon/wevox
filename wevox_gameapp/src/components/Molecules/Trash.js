import React from 'react';
import '../../index.css';
import Card from '../Atoms/Card';

//トラッシュのコンポーネント
class Trash extends React.Component {
  renderSquare(i) {
    var trashcardstyle = {
      left: i*20,
      position: 'absolute',
    };

    return (
      <div style={trashcardstyle} key={'trashLists' + i}>
        <Card
          value={this.props.trash[i]}
          key={'trashList' + i}
          onClick={()=>this.props.onClick(i)}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="m_trash">
        {this.props.trash.map((data, index) => {
          return this.renderSquare(index)
        })}
      </div>
    );
  }
}


export default Trash;
