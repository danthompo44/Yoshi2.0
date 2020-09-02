import React from 'react';

import { InputField, CommentInput } from './inputField';
import InputLabel from './inputLabel';

function InputWithLabel(props) {
    return (
        <>
            <InputLabel for={props.name} content={props.labelContent} />
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

function CommentInputWithLabel({ value, onChange, id }) {
    return (
        <>
            <InputLabel for={id} content="Add comment:" />
            <CommentInput value={value} onChange={onChange} id={id} />
        </>
    );
}

export { InputWithLabel, CommentInputWithLabel };
