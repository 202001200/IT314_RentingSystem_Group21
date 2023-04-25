import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Icon } from '@iconify/react';
import TitleHeader from '../../components/header/TitleHeader';
import { Link } from 'react-router-dom';
import cardAccountDetails from '@iconify-icons/mdi/card-account-details';
import shoppingIcon from '@iconify-icons/mdi/shopping';
import heartIcon from '@iconify-icons/mdi/heart';
import textBoxCheck from '@iconify-icons/mdi/text-box-check';
import lockOutline from '@iconify-icons/mdi/lock-outline';
import { useAlert } from 'react-alert';

const BuyerProfile = () => {
  const [Buyer, setData] = useState([]);
  const [password, setPassword] = useState('');
  const handlePassword = (event) => {
    setPassword(event.target.value);
};
  useEffect(() => {
    const fetch = () => {
      axios
        .get('https://rentingsystem.herokuapp.com/buyer/detail', {
          headers: {
            auth_token: localStorage.getItem('auth_token'),
          },
        })
        .then((response) => {
          // console.log(response.data.buyer[0]);
          setData(response.data.buyer[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetch();
  }, []);
  const handleOnClick = () => {
    axios
        .post('https://rentingsystem.herokuapp.com/buyer/forgot', {
          password : password,
        })
        .then(function (response) {
            const data = response.data;
           // console.log(data);
            //console.log(Buyer.auth_token);
            if (data.error) {
                alert.error(data.msg);
            } else {
                alert.success(data.msg);
               // return history.push('./login');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
  };

  return (
    <div className='BuyerProfile-page'>
      <TitleHeader name={'My Profile'} />
      <div className='BuyerProfile-main'>
        <div className='BuyerProfile-div'>
          <Icon icon={cardAccountDetails} className='BuyerProfile-image' />
          <div className='BuyerProfile-title'>Personal Information</div>
        </div>
        <div className='BuyerProfile-sub'>
          <div className='BuyerProfile-namediv'>
            <div className='BuyerProfile-hello'> Hello, </div>
            <div className='BuyerProfile-name'>
              {Buyer.firstname + ' ' + Buyer.lastname}
            </div>
          </div>
          <div className='BuyerProfile-details'>
            <div className='BuyerProfile-addressdiv1'>
              <div className='BuyerProfile-dis'>Address</div>
              <div>{Buyer.address}</div>
            </div>
            <div className='BuyerProfile-addressdiv2'>
              <div className='BuyerProfile-dis'>E-mail</div>
              <div>{Buyer.email}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='BuyerProfile-othermain'>
        <Link to='./order'>
          <div className='BuyerProfile-otherdiv'>
            <Icon icon={shoppingIcon} className='BuyerProfile-image' />
            <div className='BuyerProfile-title'>My Order</div>
          </div>
        </Link>
      </div>
      <div className='BuyerProfile-othermain'>
        <Link to='./wishlist'>
          <div className='BuyerProfile-otherdiv'>
            <Icon icon={heartIcon} className='BuyerProfile-image' />
            <div className='BuyerProfile-title'>Wishlist</div>
          </div>
        </Link>
      </div>
      <div className='BuyerProfile-othermain redi'>
        <Link to='./liveorder'>
          <div className='BuyerProfile-otherdiv'>
            <Icon icon={textBoxCheck} className='BuyerProfile-image' />
            <div className='BuyerProfile-title'>Live Order</div>
          </div>
        </Link>
      </div>
      <div className='BuyerProfile-changepassword redi'>
        <div className='changepassword-input-body'>
          <Icon icon={lockOutline} className='changepassword-image' />
          <div className='changepassword-title'> Update Password</div>
        </div>
        <div className='changepassword-buttonbody'>
          <div className='change-input'>
            <input
              type={'password'}
              placeholder={'Enter a new Password'}
              className='changepassword-input'
            />
          </div>
          <div className='changepassword-button'>
            <div className='changepassword-btn' onClick={handleOnClick}>Update</div>
          </div>
        </div>
      </div>
    </div>
  );
};

BuyerProfile.defaultProps = {
  name: 'Parth',
  address: 'Dhrol , Gujarat',
  mobilenumber: 6353812362,
  email: 'abc@gmail.com',
};

export default BuyerProfile;
