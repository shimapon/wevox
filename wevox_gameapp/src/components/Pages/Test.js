import React from 'react';
import '../../index.css';
import Main from '../Organisms/Main';
import MHeader from '../Molecules/Header';

// 親コンポーネント，Game
class Test extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        roomname:"test部屋",
        roomuser1:"Aさん",
        roomuser2:"Bさん",
        roomuser3:"Cさん",
        roomuser4:"Dさん",
      }
    }

    onClick() {
      console.log("aa");
    }

    render() {  
      return (
        <div className="waitroom">
          <MHeader
              headertext={this.state.roomname}
          />
          <Main
              roomusers={[
                  this.state.roomuser1, 
                  this.state.roomuser2, 
                  this.state.roomuser3, 
                  this.state.roomuser4,
              ]}
              onClick={this.onClick}
              text={"ゲーム開始"}
          />
        </div>
      );
    }
  }

export default Test
