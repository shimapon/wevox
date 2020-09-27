import React from 'react';
import '../../index.css';

// カード一枚のコンポーネント Atoms
function Card(props){
  return(
    <button className="card" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Card;
