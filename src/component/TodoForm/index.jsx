import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onsubmit: PropTypes.func,
};

TodoForm.defaultProps ={
    onsubmit:null,
}

function TodoForm(props) {
    const {onsubmit} = props;
    const [value,setValue] = useState('')
    function handleOnChange(e) {
        setValue(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();

        if(!onsubmit) return;

        const formdata = {
            title:value,
        }
        onsubmit(formdata);

        setValue("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleOnChange}/>
        </form>
    );
}

export default TodoForm;