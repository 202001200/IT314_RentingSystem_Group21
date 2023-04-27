import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import TitleHeader from '../../components/header/TitleHeader';
import { Link } from 'react-router-dom';
import cardAccountDetails from '@iconify-icons/mdi/card-account-details';
import shoppingIcon from '@iconify-icons/mdi/shopping';
import layersPlus from '@iconify-icons/mdi/layers-plus';
import walletIcon from '@iconify-icons/mdi/wallet';
import lockOutline from '@iconify-icons/mdi/lock-outline';
import { useAlert } from 'react-alert';

const SellerProfile = () => {
    const alert = useAlert();
  const [Seller, setData] = useState([]);
  const [Password, setPassword] = useState('');
    useEffect(() => {
        const fetch = () => {
            axios
                .get('https://rentbuddy.onrender.com/lender/detail', {
                    headers: {
                        'auth-token': localStorage.getItem('auth_token'),
                        "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                    },
                })
                .then((response) => {
                    const data = response.data;
                    if (data.error) {
                        alert.error(data.msg);
                    } else {
                        setData(data.lenderData);
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
        .post('https://rentbuddy.onrender.com/lender/forgot', {
            password: Password,
            lender: Seller._id,
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
        <div className='SellerProfile-page'>
            <TitleHeader name={'My Profile'} />
            <div className='SellerProfile-main'>
                <div className='SellerProfile-div'>
                    <Icon
                        icon={cardAccountDetails}
                        className='SellerProfile-image'
                    />
                    <div className='SellerProfile-title'>
                        Personal Information
                    </div>
                </div>
                <div className='SellerProfile-sub'>
                    <div className='SellerProfile-namediv'>
                        <div className='SellerProfile-hello'> Hello, </div>
                        <div className='SellerProfile-name'>
                            {' '}
                            {Seller.firstname + ' ' + Seller.lastname}
                        </div>
                    </div>
                    <div className='SellerProfile-details'>
                        <div className='SellerProfile-addressdiv1'>
                            <div className='SellerProfile-dis'>Address</div>
                            <div>{Seller.address}</div>
                        </div>
                        <div className='SellerProfile-addressdiv2'>
                            <div className='SellerProfile-dis'>E-mail</div>
                            <div>{Seller.email}</div>
                        </div>
                    </div>
                </div>
                        </div>
                    <div className='SellerProfile-othermain'>
                <Link to='./myproducts'>
                    <div className='SellerProfile-otherdiv'>
                        <Icon
                            icon={walletIcon}
                            className='SellerProfile-image'
                        />
                        <div className='SellerProfile-title'>My Product</div>
                    </div>
                </Link>
                        </div>
                        <div className='SellerProfile-othermain'>
                <Link to='./active'>
                    <div className='SellerProfile-otherdiv'>
                        <Icon
                            icon={shoppingIcon}
                            className='SellerProfile-image'
                        />
                        <div className='SellerProfile-title'>
                            Active Product
                        </div>
                    </div>
                </Link>
            </div>
            <div className='SellerProfile-othermain'>
                <Link to='./addproduct'>
                    <div className='SellerProfile-otherdiv'>
                        <Icon
                            icon={layersPlus}
                            className='SellerProfile-image'
                        />
                        <div className='SellerProfile-title'>
                            Add New Product
                        </div>
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

export default SellerProfile;
