import React from 'react';

import { InputField, CommentInput } from './inputField';
import InputLabel from './inputLabel';

function InputWithLabel(props) {
    return (
        <>
            <InputLabel htmlFor={props.name} content={props.labelContent} />
            <InputField
                icon={props.icon}
                type={props.inputType}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                setValue={props.setValue}
            />
        </>
    );
}

function CommentInputWithLabel({ onChange }) {
    return (
        <>
            <InputLabel htmlFor="comment" content="Add comment:" />
            <CommentInput onChange={onChange} />
        </>
    );
}

export { InputWithLabel, CommentInputWithLabel };
