import './style.css';
import { Icon } from '@iconify/react';
import baselineSearch from '@iconify-icons/ic/baseline-search';
import React, { useState } from 'react';

const Header = () => {
    const [value, setValue] = useState('');

    const handleInputChanges = (event) => {
        setValue(event.target.value);
    };

    const handleOnClick = () => {
        console.log(value);
        setValue('');
    };

    return (
        <div className='DashboardHeader'>
            <div className='DashboardHeader-body'>
                <input
                    type='text'
                    value={value}
                    onChange={handleInputChanges}
                    placeholder='Search'
                    className='DashboardHeader-search'
                />
                <Icon
                    icon={baselineSearch}
                    onClick={handleOnClick}
                    className='DashboardHeader-search-icon'
                />
            </div>
        </div>
    );
};

export default Header;
