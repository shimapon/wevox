import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import App from './App';
//import { ActionCable } from 'actioncable';
import { ActionCableProvider } from 'react-actioncable-provider';
import SelectRoom from "./SelectRoom";

class App2 extends React.Component {

    // Component が Mount された後に実行されるメソッド
    componentDidMount() {
      console.log("componentDidMount:App2");
    }


  render(){
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path='/' component={Home}/>
            <Route path='/App' component={App}/>
          </div>
        </Router>

        <ActionCableProvider url="http://localhost:4000/cable">
          <SelectRoom />
        </ActionCableProvider>
    </div>
    );
  }
}

export default App2;
