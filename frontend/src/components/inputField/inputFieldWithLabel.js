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
            />
        </>
    );
}

function CommentInputWithLabel() {
    return (
        <>
            <InputLabel for="comment" content="Add comment:" />
            <CommentInput />
        </>
    );
}

export { InputWithLabel, CommentInputWithLabel };
