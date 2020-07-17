import React from 'react';
import './inputField.css';

function InputField(props) {
    let iconClass = props.icon + ' input-icon';
    return (
        <div className="input-container">
            <i className={iconClass}></i>
            <input
                type={props.type}
                className="inputField"
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default InputField;
