import React from 'react';
import '../../index.css';


let roomname="A部屋"
let user1="Eさん"
let user2="Fさん"
let user3="Gさん"
let user4="Hさん"


class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ready: false,
        }
        this.onClick = this.onClick.bind(this);

      }

      onClick() {
        this.setState({
            ready: !this.state.ready
        });
      }



  render(){
    return(
      <div>
          <header className="waitroomheader">
              部屋:{roomname}
          </header>
          <div className="wrapper">              
              <div className="userbox">
                  <div className="usertextbox">
                    <div>
                        <p>{user1}</p>
                    </div>
                  </div>

              </div>
              <div className="userbox">
                  <div className="usertextbox">
                    <div>
                        <p>{user2}</p>
                    </div>
                  </div>
              </div>
              <div className="userbox">
                  <div className="usertextbox">
                    <div>
                        <p>{user3}</p>
                    </div>
                  </div>
              </div>
              <div className="userbox">
                  <div className="usertextbox">
                    <div>
                        <p>{user4}</p>
                    </div>
                  </div>
              </div>
          </div>
        <div className="p-startbutton">
            <div className="startbutton">
                <button onClick={this.onClick}>ゲーム開始</button>
            </div>
        </div>
      </div>
    )
  }
}


export default Test
