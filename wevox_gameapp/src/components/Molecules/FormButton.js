
import React from 'react';
import '../../index.css';
import InputSubmit from '../Atoms/InputSubmit';

// Deck molecules
function FormButton(props){
  return(
    <div className="formbutton">
        <InputSubmit
            value="部屋作成" 
            onClick={props.handleSubmit}
        />
        <InputSubmit
            value="部屋に参加" 
            onClick={props.handleAlternate} 
        />
    </div>
  );
}

export default FormButton;
