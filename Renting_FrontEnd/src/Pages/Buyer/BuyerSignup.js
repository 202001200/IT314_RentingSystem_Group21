import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import emailOutline from '@iconify-icons/mdi/email-outline';
import lockOutline from '@iconify-icons/mdi/lock-outline';
import signupposter from '../../Assets/signupposter.png';
import accountOutline from '@iconify-icons/mdi/account-outline';
import mapIcon from '@iconify-icons/mdi/map';
import LoginInput from '../../components/Input/LoginInput';

const BuyerSignup = () => {
     return (
    <div className='BuyerLogin-body'>
      <div className='BuyerLogin-logo'>
        <img
          src={signupposter}
          alt={'SigninPoster'}
          className='BuyerLogin-poster'
        />
        <div className='BuyerLogin-create'>
          <Link to='./login'>Existing user? Log in</Link>
        </div>
     <div className='BuyerLogin-create2'>
          <Link to='../seller/register'>Sign up as a Seller</Link>
        </div>
      </div>
      <div className='BuyerLogin-content'>
        <div className='BuyerSignup-text-body'>
          <div className='BuyerLogin-text'>Sign up</div>
        </div>
        <div className='BuyerSignup-input-main'>
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
            icon={emailOutline}
            placeholder={'E-mail'}
            type={'text'}
          />
          <LoginInput
            icon={lockOutline}
            placeholder={'Password'}
            type={'password'}
          />
          <div className='BuyerLogin-login'>Sign up</div>
        </div>
      </div>
    </div>
  );
};

export default BuyerSignup;
