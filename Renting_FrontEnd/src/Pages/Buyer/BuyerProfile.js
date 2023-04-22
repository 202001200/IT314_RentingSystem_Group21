import React from 'react';
import { Icon } from '@iconify/react';
import TitleHeader from '../../components/header/TitleHeader';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import cardAccountDetails from '@iconify-icons/mdi/card-account-details';
import arrowLeftCircle from '@iconify-icons/mdi/arrow-left-circle';
import shoppingIcon from '@iconify-icons/mdi/shopping';
import heartIcon from '@iconify-icons/mdi/heart';
import textBoxCheck from '@iconify-icons/mdi/text-box-check';


const BuyerProfile = (props) => {
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
                <div className='BuyerProfile-name'> {props.name}</div>
              </div>
              <div className='BuyerProfile-details'>
                <div className='BuyerProfile-addressdiv'>
                  <div className='BuyerProfile-dis'>Address</div>
                  <div>{props.address}</div>
                </div>
                <div className='BuyerProfile-mobilenumberdiv'>
                  <div className='BuyerProfile-sub2'>
                    <div className='BuyerProfile-dis'>Mobile Number</div>
                    <div>{props.mobilenumber}</div>
                  </div>
                  <div className='BuyerProfile-sub2'>
                    <div className='BuyerProfile-dis'>E-mail</div>
                    <div>{props.email}</div>
                  </div>
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
    </div>
  );
         
    
};

BuyerProfile.defaultProps = {
    name: 'vikas',
  address: 'Dhrol , Gujarat',
  mobilenumber: 6353812362,
  email: 'abc@gmail.com',
};

export default BuyerProfile;
