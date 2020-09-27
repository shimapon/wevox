import React from 'react';
import '../../index.css';
import Card from '../Atoms/Card';

// Deck molecules
function Deck(props){
  return(
    <div className="deck">
      <Card
        value=""
        onClick={()=>props.onClick()}
        />
      <span className="balloon">残り{props.value}枚</span>
    </div>
  );
}

export default Deck;
