import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

SearchForm.propTypes = {
    onSubmit : PropTypes.func,
};

SearchForm.defaulfProps = {
    onSubmit:null,
}

function SearchForm(props) {
    const {onSubmit} = props
    const [searchTerm,setSearchTerm] = useState('')
    const typeTimeOutRef = useRef(null);

    function handleOnchange(e){
        const value = e.target.value;   
        setSearchTerm(value)


        if(typeTimeOutRef.current){
            clearTimeout(typeTimeOutRef.current)
        }

        typeTimeOutRef.current = setTimeout(() => {            
            if (!onSubmit) return;    
            const formSearch = {
                searchTerm: value
            }
            onSubmit(formSearch)
        }, 300);   
    }
    return (
        <form >
            <input type="text"
            value={searchTerm}
            onChange={handleOnchange}
            />
        </form>
    );
}

export default SearchForm;