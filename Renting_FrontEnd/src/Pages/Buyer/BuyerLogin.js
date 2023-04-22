import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import emailOutline from '@iconify-icons/mdi/email-outline';
import lockOutline from '@iconify-icons/mdi/lock-outline';
import signinposter from '../../Assets/signinposter.png';
import LoginInput from '../../components/Input/LoginInput';


const BuyerLogin = () => {
    return (
      <div className='BuyerLogin-body'>
            <div className='BuyerLogin-content'>
                <div className='BuyerLogin-text-body'>
                    <div className='BuyerLogin-text'>Sign in</div>
                </div>
                <div className='BuyerLogin-input-main'>
                    <LoginInput
                        icon={emailOutline}
                        placeholder={'E-mail'}
                        type={'text'}
                    />
                    <LoginInput
                        icon={lockOutline}
                        placeholder={'Password'}
                        type={'password'}
                    />
                    <div className='BuyerLogin-remember'>
                        <input
                            type='checkbox'
                            className='BuyerLogin-checkbox'
                        />
                        <span className='BuyerLogin-remember-text'>
                            Remember me
                        </span>
                    </div>
                    <div className='BuyerLogin-login'>Log in</div>
                </div>
                <div className='BuyerLogin-create'>
                    <Link to='./register'>Create an account</Link>
                </div>
            </div>
            <div className='BuyerLogin-logo'>
                <img
                    src={signinposter}
                    alt={'SignInPoster'}
                    className='BuyerLogin-poster'
                />
                <div className='BuyerLogin-create2'>
                    <Link to='../seller/login'>Sign in as a Seller</Link>
                </div>
            </div>

      </div>
    );
};

export default BuyerLogin;