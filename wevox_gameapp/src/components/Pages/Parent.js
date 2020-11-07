import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import App from './App';
import Navbar from './Navbar';
import Top from './Top';
import Room from './Room'
import Result from './Result'




class Parent extends React.Component {

    // Component が Mount された後に実行されるメソッド
    componentDidMount() {
      console.log("componentDidMount:Parent");
    }


  render(){
    return (
      <div className="Parent">
        <Router>
          <div>
            <Navbar /><hr/>
            <Route exact path='/' component={Home}/>
            <Route path='/Top' component={Top}/>
            <Route path='/Room/:id' component={Room}/>
            <Route path='/App/:id' component={App}/>
            <Route path='/Result' component={Result}/>
          </div>
        </Router>
    </div>
    );
  }
}

export default Parent;
