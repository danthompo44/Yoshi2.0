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
                name={props.name}
                required={props.required}
                value={props.value}
                onChange={props.setValue}
            />
        </div>
    );
}

function CommentInput(props) {
    return (
        <>
            <i className="fas fa-comment input-icon"></i>
            <input
                type="type"
                className="form-input light with-icon"
                placeholder="Add a comment"
                name="comment"
                required={true}
            />
        </>
    );
}

export { InputField, CommentInput };
