import React from 'react';
import '../../index.css';

// カード一枚のコンポーネント Atoms
function Title(props){
  return(
    <h1 className="title">
      {props.value}
    </h1>
  );
}

export default Title;
