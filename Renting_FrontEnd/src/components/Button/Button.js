import React from 'react';
import './style.css';
import { Icon } from '@iconify/react';
const Button = (props) => {
  return (
    <div className='Button-main'>
      <Icon icon={props.icon} className='Button-main-icon' />
      <p className='Button-name'> {props.name}</p>
    </div>
  );
};

Button.defaultProps = {
  name: 'Add to cart',
};
export default Button;