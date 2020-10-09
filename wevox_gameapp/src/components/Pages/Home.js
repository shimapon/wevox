import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


class Home extends React.Component {
  // Component が Mount された後に実行されるメソッド
  componentDidMount() {
    console.log("start");
    //this.getRoom();
    //this.createSubscription();
  }

  getRoom() {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/rooms`)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  }

  createSubscription = () => {
    this.cable.subscriptions.create(
      { channel: 'ShareChannel' },
      { received: message => this.handleReceivedMessage(message) }
    )
  }

  handleReceivedMessage = message => {
    console.log(message);
  }


  render(){
    return(
      <div>
        <h1>
          <Link to="/">Home（ここ）</Link>
        </h1>
        <Link to="/App">ゲーム画面へ</Link>
      </div>
    )
  }
}

export default Home;
