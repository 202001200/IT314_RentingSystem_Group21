import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import emailOutline from '@iconify-icons/mdi/email-outline';
import lockOutline from '@iconify-icons/mdi/lock-outline';
import signinposter2 from '../../Assets/signinposter2.png';
import LoginInput from '../../components/Input/LoginInput';

import axios from 'axios';
import { useAlert } from 'react-alert';
import DNA from 'react-loader-spinner/dist/loader/Dna';

const SellerLogin = (props) => {
    const alert = useAlert();
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [s,setS] = useState(false);
    const handleInputEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleInputPassword = (event) => {
        setPassword(event.target.value);
    };

    const handleOnClick = () => {
        setS(true);
        axios.post('https://rentbuddy.onrender.com/lender/login', {
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
                    localStorage.removeItem('seller');
                    localStorage.removeItem('auth_token');
                } else {
                    alert.success('Welcome Seller');
                    localStorage.setItem('seller', true);
                    localStorage.setItem('auth_token', data.auth_token);
                    props.handleClick();
                    return history.push('./../');
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
            <div className='SellerLogin-content'>
                <div className='SellerLogin-text-body'>
                    <div className='SellerLogin-text'>Seller sign in</div>
                </div>
                <div className='SellerLogin-input-main'>
                <div style={{'margin-left':'40%'}}><DNA visible={s} height={70}/></div>
                    <LoginInput
                        icon={emailOutline}
                        placeholder={'E-mail'}
                        type={'text'}
                        handleInput={handleInputEmail}
                    />
                    <LoginInput
                        icon={lockOutline}
                        placeholder={'Password'}
                        type={'password'}
                        handleInput={handleInputPassword}
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
                    <div className='SellerLogin-login' onClick={handleOnClick}>
                        Log in
                    </div>
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
