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
  const alert = useAlert();
    const [Buyer, setData] = useState([]);
    const [Password, setPassword] = useState('');
    useEffect(() => {
        const fetch = () => {
            axios
                .get('https://rentbuddy.onrender.com/borrower/detail', {
                    headers: {
                        auth_token: localStorage.getItem('auth_token'),
                        "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                    },
                })
                .then((response) => {
                    console.log(response);
                    const data = response.data;
                    if (data.error) {
                        alert.error(data.msg);
                    } else {
                        setData(data);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        };
        fetch();
    }, [alert]);
   const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleUpdate = () => {
        if (Password.length < 8) {
            alert.error('Min length of Password Should be 8');
            return;
        }
        axios
            .post('https://rentbuddy.onrender.com/borrower/forgot', {
                password: Password,
                borrower: Buyer._id,
            },{
                headers:{
                    "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                }
            })
            .then((response) => {
                const data = response.data;
                if (data.error) {
                    alert.error(data.msg);
                } else {
                    alert.success(data.msg);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className='BuyerProfile-page'>
            <TitleHeader name={'My Profile'} />
            <div className='BuyerProfile-main'>
                <div className='BuyerProfile-div'>
                    <Icon
                        icon={cardAccountDetails}
                        className='BuyerProfile-image'
                    />
                    <div className='BuyerProfile-title'>
                        Personal Information
                    </div>
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
                        <Icon
                            icon={shoppingIcon}
                            className='BuyerProfile-image'
                        />
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
                        <Icon
                            icon={textBoxCheck}
                            className='BuyerProfile-image'
                        />
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
                            onChange={handlePassword}
                        />
                    </div>
                    <div
                        className='changepassword-button'
                        onClick={handleUpdate}
                    >
                        <div className='changepassword-btn'>Update</div>
                    </div>
                </div>
            </div>
            </div>
          
  );
};



export default BuyerProfile;
