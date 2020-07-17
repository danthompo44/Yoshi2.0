import React from 'react';

import InputField from './inputField';
import InputLabel from './inputLabel';

function InputWithLabel(props){
    return (
        <>
        <InputLabel for={props.name} content={props.labelContent}/>
        <InputField icon={props.icon} type={props.inputType} placeholder={props.placeholder} name={props.name}/>
        </>
    )
}

export default InputWithLabel;