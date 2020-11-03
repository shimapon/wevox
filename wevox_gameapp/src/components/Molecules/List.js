import React from 'react';
import '../../index.css';
import Text from '../Atoms/Text';

// Deck molecules
function List(props){
  return(
    <div className="list">
        <li>
            <Text
                value={props.value}
            />
        </li>
    </div>
  );
}

export default List;
