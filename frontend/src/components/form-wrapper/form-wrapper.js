import React from 'react';

function FormWrapper({ children, onSubmit }) {
    return (
        <form className="form-wrapper" onSubmit={onSubmit}>
            {children}
        </form>
    );
}

export default FormWrapper;
