import React from 'react';
import '../../index.css';
import Header from '../Atoms/Header';

// Deck molecules
function MHeader(props){
  return(
    <div className="m_header">
        <Header
            headertext={props.headertext}
        />
    </div>
  );
}

export default MHeader;
