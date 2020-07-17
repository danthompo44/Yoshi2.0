import React from 'react';

import './inputField.css';

function InputLabel(props){
    return(
        <label for={props.for}>{props.content}</label>
    )
}

export default InputLabel;