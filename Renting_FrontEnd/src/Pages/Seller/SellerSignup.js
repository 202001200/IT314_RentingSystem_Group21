import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import emailOutline from '@iconify-icons/mdi/email-outline';
import lockOutline from '@iconify-icons/mdi/lock-outline';
import signupposter2 from '../../Assets/signupposter2.png';
import accountOutline from '@iconify-icons/mdi/account-outline';
import mapIcon from '@iconify-icons/mdi/map';
import shieldAccountVariantOutline from '@iconify-icons/mdi/shield-account-variant-outline';
import LoginInput from '../../components/Input/LoginInput';
import axios from 'axios';
import { useAlert } from 'react-alert';
import DNA from 'react-loader-spinner/dist/loader/Dna';

const SellerSignup = () => {
  const alert = useAlert();
  let history = useHistory();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [idproof, setIdproof] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [s,setS] = useState(false);
  const handleInputFname = (event) => {
      setFirstname(event.target.value);
  };
  const handleInputLname = (event) => {
      setLastname(event.target.value);
  };
  const handleInputAddress = (event) => {
      setAddress(event.target.value);
  };
  const handleInputIdproof = (event) => {
      setIdproof(event.target.value);
  };
  const handleInputEmail = (event) => {
      setEmail(event.target.value);
  };
  const handleInputPassword = (event) => {
      setPassword(event.target.value);
  };

  const handleOnClick = () => {
    setS(true);
    axios.post('https://rentbuddy.onrender.com/lender/signup', {
              firstname: firstname,
              lastname: lastname,
              address: address,
              idproof: idproof,
              email: email,
              password: password,
          },{
            headers:{
                "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
            }
          })
          .then(function (response) {
              const data = response.data;
              setS(false);
              if (data.error) {
                  alert.error(data.msg);
              } else {
                  alert.success('Signup Succsesfully As Seller');
                  return history.push('./login');
              }
          })
          .catch(function (error) {
              console.log(error);
          });
  };
  const add=()=>{
    document.getElementsByClassName('SellerLogin-body')[0].addEventListener('keypress',(event)=>{
        if(event.key === 'Enter'){
            event.preventDefault();
            document.getElementsByClassName('SellerLogin-login')[0].click();
        }
    });
}
  return (
      <div className='SellerLogin-body' onLoad={add}>
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
              <div style={{'margin-left':'40%'}}><DNA visible={s} height={70}/></div>
                  <LoginInput
                      icon={accountOutline}
                      placeholder={'Firstname'}
                      type={'text'}
                      handleInput={handleInputFname}
                  />
                  <LoginInput
                      icon={accountOutline}
                      placeholder={'Lastname'}
                      type={'text'}
                      handleInput={handleInputLname}
                  />
                  <LoginInput
                      icon={mapIcon}
                      placeholder={'Address'}
                      type={'text'}
                      handleInput={handleInputAddress}
                  />
                  <LoginInput
                      icon={shieldAccountVariantOutline}
                      placeholder={'ID Proof'}
                      type={'text'}
                      handleInput={handleInputIdproof}
                  />
                  <LoginInput
                      icon={emailOutline}
                      placeholder={'E-mail'}
                      type={'text'}
                      handleInput={handleInputEmail}
                  />
                  <LoginInput
                      icon={lockOutline}
                      placeholder={'Password (min length 8)'}
                      type={'password'}
                      handleInput={handleInputPassword}
                  />
                  <div className='SellerLogin-login' onClick={handleOnClick}>
                    Seller Sign up
                  </div>
              </div>
          </div>
        </div>
     
  );
};

export default SellerSignup;
