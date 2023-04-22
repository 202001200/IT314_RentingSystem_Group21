import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import TitleHeader from '../../components/header/TitleHeader';
import logo from '../../Assets/logo512.png';
import Button from '../../components/Button/Button';
import { Icon, InlineIcon } from '@iconify/react';
import applicationImport from '@iconify-icons/mdi/application-import';


const BuyerLogin = () => {
    return (
    <body>

    <div className='mainSignin'>
        <p className="sign" align="center">Sign In</p>
        <form className="form1"></form>     
        <input className="UserName" type="text" align="center" placeholder="Enter e-mail"></input>
        <input className="Password" type="Password" align="center" placeholder="Password"></input>
        <div className='submit-buttons'>
              <div className='submit-button'>
                <Link to=''>
                  <Button icon={applicationImport} name={'Sign in as Buyer'} />
                </Link>
              </div>
              <div className='submit-button'>
                <Link to=''>
                  <Button icon={applicationImport} name={'Sign in as Seller'} />
                </Link>
              </div>
            </div>
    </div>
   </body>
    );
};

export default BuyerLogin;