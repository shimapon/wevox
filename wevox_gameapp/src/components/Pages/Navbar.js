import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render(){
    return(
      <div>
        <Link to="/">Home</Link>
        <Link to="/Top">Top</Link>
        <Link to="/Room">Room</Link>
        <Link to="/App">App</Link>
        <Link to="/Test">Test</Link>
        <Link to="/Result">Result</Link>
      </div>
    )
  }
}

export default Navbar;