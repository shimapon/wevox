import React from 'react';
import '../../index.css';

// カード一枚のコンポーネント Atoms
function InputText(props){
  return(
    <input type="text" value={props.value} onChange={props.onChange}/>
  );
}
export default InputText;
