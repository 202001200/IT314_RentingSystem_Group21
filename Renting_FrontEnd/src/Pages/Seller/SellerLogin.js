import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import emailOutline from '@iconify-icons/mdi/email-outline';
import lockOutline from '@iconify-icons/mdi/lock-outline';
import signinposter2 from '../../Assets/signinposter2.png';
import LoginInput from '../../components/Input/LoginInput';

const SellerLogin = () => {
    return (
        <div className='SellerLogin-body'>
            <div className='SellerLogin-content'>
                <div className='SellerLogin-text-body'>
                    <div className='SellerLogin-text'>Seller sign in</div>
                </div>
                <div className='SellerLogin-input-main'>
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
                    <div className='SellerLogin-remember'>
                        <input
                            type='checkbox'
                            className='SellerLogin-checkbox'
                        />
                        <span className='SellerLogin-remember-text'>
                            Remember me
                        </span>
                    </div>
                    <div className='SellerLogin-login'>Log in</div>
                </div>
                <div className='SellerLogin-create'>
                    <Link to='./register'>Create an account</Link>
                </div>
            </div>
            <div className='SellerLogin-logo'>
                <img
                    src={signinposter2}
                    alt={'SignInPoster'}
                    className='SellerLogin-poster'
                />
                <div className='SellerLogin-create2'>
                    <Link to='../buyer/login'>Sign in as a Buyer</Link>
                </div>
            </div>
        </div>
    );
};

export default SellerLogin;
