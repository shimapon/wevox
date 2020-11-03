import React from 'react';
import '../../index.css';
import People from '../Molecules/People';

// 手札のコンポーネント
class ResultMain extends React.Component {
    renderSquare(i) {
        return (
            <People
                cards={this.props.owncards[i][1]}
                username={this.props.owncards[i][0]}
                key={'resultlist' + i}

            />
        );
      }
    
    render() {
        return (
            <div className="resultmain">
                {this.props.owncards.map((data, index) => {
                    return this.renderSquare(index)
                })}
            </div>
        );
  }
}

export default ResultMain;
