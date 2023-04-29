import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import emailOutline from '@iconify-icons/mdi/email-outline';
import lockOutline from '@iconify-icons/mdi/lock-outline';
import signupposter from '../../Assets/signupposter.png';
import accountOutline from '@iconify-icons/mdi/account-outline';
import mapIcon from '@iconify-icons/mdi/map';
import LoginInput from '../../components/Input/LoginInput';
import axios from 'axios';
import { useAlert } from 'react-alert';
import './style.css';
import DNA from 'react-loader-spinner/dist/loader/Dna';

const BuyerSignup = (props) => {
  const alert = useAlert();
  let history = useHistory();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
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
  const handleInputEmail = (event) => {
      setEmail(event.target.value);
  };
  const handleInputPassword = (event) => {
      setPassword(event.target.value);
  };

  const handleOnClick = () => {
    setS(true);
      axios
          .post('https://rentbuddy.onrender.com/borrower/signup', {
              firstname: firstname,
              lastname: lastname,
              address: address,
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
                  alert.success('Signup Succsesfully');
                  return history.push('./login');
              }
          })
          .catch(function (error) {
              console.log(error);
          });
  };
  const add=()=>{
  document.getElementsByClassName('BuyerLogin-body')[0].body.addEventListener('keypress',(event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        document.getElementsByClassName('BuyerLogin-login')[0].click();
    }
});
  }
  return (
      <div className='BuyerLogin-body' onLoad={add}>
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
                  <div className='BuyerLogin-text'>Buyer Sign up</div>
              </div>
              <div className='BuyerSignup-input-main'>
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
                  <div className='BuyerLogin-login' onClick={handleOnClick}>
                      Sign up
                  </div>
              </div>
          </div>
        </div>
  );
};

export default BuyerSignup;
