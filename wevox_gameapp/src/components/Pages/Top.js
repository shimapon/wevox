import React from 'react'
import { ActionCableProvider } from 'react-actioncable-provider';
import SelectRoom from "./SelectRoom";

class Top extends React.Component {
  render(){
    return(
      <div>
        <ActionCableProvider url="http://localhost:4000/cable">
          <SelectRoom 
            history={this.props.history}
          />
        </ActionCableProvider>
      </div>
    )
  }
}

export default Top;