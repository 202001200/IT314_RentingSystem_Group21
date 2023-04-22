import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import emailOutline from '@iconify-icons/mdi/email-outline';
import lockOutline from '@iconify-icons/mdi/lock-outline';
import signupposter2 from '../../Assets/signupposter2.png';
import accountOutline from '@iconify-icons/mdi/account-outline';
import mapIcon from '@iconify-icons/mdi/map';
import shieldAccountVariantOutline from '@iconify-icons/mdi/shield-account-variant-outline';
import LoginInput from '../../components/Input/LoginInput';

const SellerSignup = () => {
    return (
    <div className='SellerLogin-body'>
      <div className='SellerLogin-logo'>
        <img
          src={signupposter2}
          alt={'SigninPoster'}
          className='SellerLogin-poster'
        />
        <div className='SellerLogin-create'>
          <Link to='./login'>Existing user? Log in</Link>
        </div>
    <div className='SellerLogin-create2'>
          <Link to='../buyer/register'>Sign up as a Buyer</Link>
        </div>
      </div>
      <div className='SellerLogin-content'>
        <div className='SellerSignup-text-body'>
          <div className='SellerLogin-text'>Seller sign up</div>
        </div>
        <div className='SellerSignup-input-main'>
          <LoginInput
            icon={accountOutline}
            placeholder={'Firstname'}
            type={'text'}
          />
          <LoginInput
            icon={accountOutline}
            placeholder={'Lastname'}
            type={'text'}
          />
          <LoginInput icon={mapIcon} placeholder={'Address'} type={'text'} />
          <LoginInput
            icon={shieldAccountVariantOutline}
            placeholder={'ID Proof'}
            type={'text'}
          />
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
          <div className='SellerLogin-login'>Sign up</div>
        </div>
      </div>
    </div>
  );
};

export default SellerSignup;
