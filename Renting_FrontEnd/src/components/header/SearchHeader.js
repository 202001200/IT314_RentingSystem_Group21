import React from 'react';
import './style.css';
import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify-icons/mdi/magnify';

const SearchHeader = (props) => {
  const role = localStorage.getItem('seller')?"Seller":localStorage.getItem('buyer')?'Buyer':'User';
    return (
        <div className='SearchHeader' style={{'display':'flex'}}>
          <div className='SearchHeader-body'>
          <Icon icon={magnifyIcon} className='SearchHeader-search-icon' />
            <input
              type='text'
              onChange={(event) => props.handleChange(event)}
              placeholder='Search'
              className='SearchHeader-search'
            />

          </div>
          <div style={{'margin-left':'40%','fontSize':'20px'}}>{role}</div>
        </div>
      );
    };

export default SearchHeader;
