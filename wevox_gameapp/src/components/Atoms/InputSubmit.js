import React from 'react';
import '../../index.css';

// カード一枚のコンポーネント Atoms
function InputSubmit(props){
  return(
    <input type="submit" value={props.value} onClick={props.onClick}/>
  );
}
export default InputSubmit;
