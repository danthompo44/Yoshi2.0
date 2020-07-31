import React from 'react';

function FormWrapper({children}){
    return(
        <form className="form-wrapper">
            {children}
        </form>
    )
}

export default FormWrapper;