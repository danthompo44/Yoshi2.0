import React from 'react';

import './inputField.css';

function InputLabel(props) {
    return <label htmlFor={props.for}>{props.content}</label>;
}

export default InputLabel;
