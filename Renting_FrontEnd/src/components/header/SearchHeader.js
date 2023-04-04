import React, { useState } from 'react';
import './style.css';
import { Icon } from '@iconify/react';
import layersSearch from '@iconify-icons/mdi/layers-search';

const SearchHeader = () => {
    const [value, setValue] = useState('');

    const handleInputChanges = (event) => {
        setValue(event.target.value);
    };

    const handleOnClick = () => {
        console.log(value);
        setValue('');
    };

    return (
        <div className='SearchHeader'>
            <div className='SearchHeader-body'>
                <input
                    type='text'
                    value={value}
                    onChange={handleInputChanges}
                    placeholder='Search'
                    className='SearchHeader-search'
                />
                <Icon
                    icon={layersSearch}
                    onClick={handleOnClick}
                    className='SearchHeader-search-icon'
                />
            </div>
        </div>
    );
};

export default SearchHeader;
