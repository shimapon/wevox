import React from 'react';
import '../../index.css';
import Text from '../Atoms/Text';

// Deck molecules
function MMain(props){
  return(
    <div className="m_main">
        <Text
            value={props.username}
        />
    </div>
  );
}

export default MMain;
