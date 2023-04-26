import React, { useState } from 'react';
import './style.css';
import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify-icons/mdi/magnify';

const SearchHeader = () => {
    const [value, setValue] = useState('');

    const handleInputChanges = (event) => {
        setValue(event.target.value);
    };

    const handleOnClick = () => {
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
              icon={magnifyIcon}
              onClick={handleOnClick}
              className='SearchHeader-search-icon'
            />
          </div>
        </div>
      );
    };

export default SearchHeader;
