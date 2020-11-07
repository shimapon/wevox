import React from 'react';
import '../../index.css';

// カード一枚のコンポーネント Atoms
function Button(props){
  return(
    <button className="button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}
export default Button;
