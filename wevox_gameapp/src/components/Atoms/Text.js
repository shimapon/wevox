import React from 'react';
import '../../index.css';

// カード一枚のコンポーネント Atoms
function Text(props){
  return(
    <p className="text">
        {props.value}
    </p>
  );
}

export default Text;
