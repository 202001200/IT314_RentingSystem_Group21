import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import TitleHeader from '../../components/header/TitleHeader';
import logo from '../../Assets/logo512.png';
import Button from '../../components/Button/Button';
import { Icon, InlineIcon } from '@iconify/react';
import applicationImport from '@iconify-icons/mdi/application-import';

const SellerSignup = () => {
  return (
    <body>
      <div className='mainSeller'>
          <p class="signSeller" align="center">Sign Up</p>
          <form class="form1Seller"></form>     
          <input class="UserNameSeller" type="text" align="center" placeholder="Firstname"></input>
          <input class="UserNameSeller" type="text" align="center" placeholder="Lastname"></input>
          <input class="UserNameSeller" type="text" align="center" placeholder="Address"></input>
          <input class="UserNameSeller" type="text" align="center" placeholder="Aadhar number"></input>
          <input class="UserNameSeller" type="text" align="center" placeholder="E-mail"></input>
          <input class="PasswordSeller" type="Password" align="center" placeholder="Password"></input>
          <div className='submit-buttonsSeller'>
            <div className='submit-buttonSeller'>
              <Link to=''>
                <Button icon={applicationImport} name={'Sign Up as Seller'} />
              </Link>
            </div>

          </div>
      </div>
      </body>
      );
};

export default SellerSignup;