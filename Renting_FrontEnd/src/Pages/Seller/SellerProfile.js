import React from 'react';
import './style.css';
import { Icon } from '@iconify/react';
import TitleHeader from '../../components/header/TitleHeader';
import { Link } from 'react-router-dom';
import cardAccountDetails from '@iconify-icons/mdi/card-account-details';
import shoppingIcon from '@iconify-icons/mdi/shopping';
import layersPlus from '@iconify-icons/mdi/layers-plus';
import walletIcon from '@iconify-icons/mdi/wallet';
import lockOutline from '@iconify-icons/mdi/lock-outline';

const SellerProfile = (props) => {
    return (
      <div className='SellerProfile-page'>
        <TitleHeader name={'My Profile'} />
        <div className='SellerProfile-main'>
          <div className='SellerProfile-div'>
            <Icon icon={cardAccountDetails} className='SellerProfile-image' />
            <div className='SellerProfile-title'>Personal Information</div>
          </div>
          <div className='SellerProfile-sub'>
            <div className='SellerProfile-namediv'>
              <div className='SellerProfile-hello'> Hello, </div>
              <div className='SellerProfile-name'> {props.name}</div>
            </div>
            <div className='SellerProfile-details'>
              <div className='SellerProfile-addressdiv'>
                <div className='SellerProfile-dis'>Address</div>
                <div>{props.address}</div>
              </div>
              <div className='SellerProfile-mobilenumberdiv'>
                <div className='SellerProfile-sub2'>
                  <div className='SellerProfile-dis'>Mobile Number</div>
                  <div>{props.mobilenumber}</div>
                </div>
                <div className='SellerProfile-sub2'>
                  <div className='SellerProfile-dis'>E-mail</div>
                  <div>{props.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='SellerProfile-othermain'>
          <Link to='./myproducts'>
            <div className='SellerProfile-otherdiv'>
              <Icon icon={walletIcon} className='SellerProfile-image' />
              <div className='SellerProfile-title'>My Product</div>
            </div>
          </Link>
        </div>
        <div className='SellerProfile-othermain'>
          <Link to='./active'>
            <div className='SellerProfile-otherdiv'>
              <Icon icon={shoppingIcon} className='SellerProfile-image' />
              <div className='SellerProfile-title'>Active Product</div>
            </div>
          </Link>
        </div>
        <div className='SellerProfile-othermain'>
          <Link to='./addproduct'>
            <div className='SellerProfile-otherdiv'>
              <Icon icon={layersPlus} className='SellerProfile-image' />
              <div className='SellerProfile-title'>Add New Product</div>
            </div>
          </Link>
        </div>
        
        <div className='SellerProfile-changepassword redi'>
          <div className='changepassword-input-body'>
            <Icon icon={lockOutline} className='changepassword-image' />
            <div className='changepassword-title'> Update Password</div>
          </div>
          <div className='changepassword-buttonbody'>
            <div className='change-input'>
              <input
                type={'text'}
                placeholder={'Enter a new Password'}
                className='changepassword-input'
              />
            </div>
            <div className='changepassword-button'>
              <div className='changepassword-btn'>Update</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  SellerProfile.defaultProps = {
    name: 'Naman',
    address: 'Mehsana , Gujarat',
    mobilenumber: 6353812362,
    email: 'abc@gmail.com',
};

export default SellerProfile;
