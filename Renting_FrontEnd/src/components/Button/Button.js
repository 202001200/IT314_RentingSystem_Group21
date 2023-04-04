import React from 'react';
import './style.css';
import { Icon } from '@iconify/react';
const Button = (props) => {
    return (
        <div className='Button-main'>
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
};
export default Button;