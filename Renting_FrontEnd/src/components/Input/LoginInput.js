import React from 'react';
import './style.css';
import { Icon } from '@iconify/react';
import emailOutline from '@iconify-icons/mdi/email-outline';

const LoginInput = (props) => {
    return (
        <div className='LoginInput-input-body'>
            <Icon icon={props.icon} className='LoginInput-inputicon' />
            <input
                type={props.type}
                placeholder={props.placeholder}
                className='LoginInput-input'
                onChange={props.handleInput}
            />
        </div>
    );
};

LoginInput.defaultProps = {
    placeholder: 'E-mail',
    icon: emailOutline,
    type: 'text',
};

export default LoginInput;