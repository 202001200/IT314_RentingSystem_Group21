import React from 'react';
import './style.css';
import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify-icons/mdi/magnify';

const SearchHeader = (props) => {
    return (
        <div className='SearchHeader'>
          <div className='SearchHeader-body'>
            
          <Icon icon={magnifyIcon} className='SearchHeader-search-icon' />
            <input
              type='text'
              onChange={(event) => props.handleChange(event)}
              placeholder='Search'
              className='SearchHeader-search'
            />
           
          </div>
        </div>
      );
    };

export default SearchHeader;
