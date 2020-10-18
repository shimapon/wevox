import React from 'react'
import { ActionCableProvider } from 'react-actioncable-provider';
import WaitRoom from './WaitRoom';

class Room extends React.Component {
  render(){
    return(
      <div>
        <ActionCableProvider url="http://localhost:4000/cable">
          <WaitRoom
            history={this.props.history}
            id={this.props.match.params.id}
          />
        </ActionCableProvider>
      </div>
    )
  }
}

export default Room;