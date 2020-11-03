
import React from 'react';
import '../../index.css';
import Text from '../Atoms/Text';

// Deck molecules
function RoomLabel(props){
  return(
    <div className="m-roomlabel">
        <Text
            value="部屋名"
        />
        <Text
            value="人数"
        />
    </div>
  );
}

export default RoomLabel;
