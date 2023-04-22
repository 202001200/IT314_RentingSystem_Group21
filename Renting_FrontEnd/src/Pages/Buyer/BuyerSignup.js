import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import TitleHeader from '../../components/header/TitleHeader';
import logo from '../../Assets/logo512.png';
import Button from '../../components/Button/Button';
import { Icon, InlineIcon } from '@iconify/react';
import applicationImport from '@iconify-icons/mdi/application-import';

const BuyerSignup = () => {
    return (
      <body>
        <div className='mainSignup'>
            <p class="sign" align="center">Sign Up</p>
            <form class="form1"></form>     
            <input class="UserName" type="text" align="center" placeholder="Firstname"></input>
            <input class="UserName" type="text" align="center" placeholder="Lastame"></input>
            <input class="UserName" type="text" align="center" placeholder="Address"></input>
            <input class="UserName" type="text" align="center" placeholder="E-mail"></input>
            <input class="Password" type="Password" align="center" placeholder="Password"></input>
            <div className='submit-buttons'>
              <div className='submit-button'>
                <Link to=''>
                  <Button icon={applicationImport} name={'Sign Up as Buyer'} />
                </Link>
              </div>

            </div>
        </div>
        </body>
        );
};

export default BuyerSignup;