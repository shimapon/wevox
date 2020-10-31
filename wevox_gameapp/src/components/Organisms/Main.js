import React from 'react';
import '../../index.css';
import MMain from '../Molecules/Main';
import Button from '../Atoms/Button';


// 手札のコンポーネント
class Main extends React.Component {
    renderUserbox(username) {    
        return (
            <MMain
                username={username}
                key={username}
            />
        );
    }
    
  render() {
    return (
        <div className="o_main">
            <div className="wrapper">
                {this.props.roomusers.map((user) => {
                    return this.renderUserbox(user)
                })}
            </div>

            <Button
                onClick={this.props.onClick}
                text={this.props.text}
            />
        </div>
    );
  }
}

export default Main;
