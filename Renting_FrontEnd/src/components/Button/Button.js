import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';

const Button = (props) => {
  let history = useHistory();
  const click = () => {
    if (props.handleClick) {
      if (props.name == 'Cancel') {
        return history.push('./../');
      }
      props.handleClick();
      if (props.name == 'Wishlist') {
        return history.push('./wishlist');
      }
      return history.push('./../');
    }
  };

  return (
    <div className='Button-main' onClick={click}>
      <div className='Button-body'>
        <div className='Button-icon-body'>
          <Icon icon={props.icon} className='Button-main-icon' />
        </div>
        <p className='Button-name'> {props.name}</p>
      </div>
    </div>
  );
};

Button.defaultProps = {
  name: 'Add to cart',
  handleClick: null,
};
export default Button;
