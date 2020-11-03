import React from 'react';
import '../../index.css';
import InputText from '../Atoms/InputText';
import Text from '../Atoms/Text';


// Deck molecules
function FormLabel(props){
  return(
    <div className="formlabel">
        <div>
            <Text
                value="部屋名:"
            />
            <InputText
                value={props.roomname} 
                onChange={props.handleChangeroomname} 
            />
        </div>
        <div>
            <Text
                value="ニックネーム:"
            />
            <InputText
                value={props.username} 
                onChange={props.handleChangeusername} 
            />
        </div>
    </div>
  );
}

export default FormLabel;
