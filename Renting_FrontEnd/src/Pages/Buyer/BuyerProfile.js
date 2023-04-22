import React from 'react';
import { Icon } from '@iconify/react';
import TitleHeader from '../../components/header/TitleHeader';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import cardAccountDetails from '@iconify-icons/mdi/card-account-details';
import arrowLeftCircle from '@iconify-icons/mdi/arrow-left-circle';
import shoppingIcon from '@iconify-icons/mdi/shopping';

const BuyerProfile = (props) => {
    return (
        <div className='BuyerProfile-page'>
            <TitleHeader name={'My Profile'} />
            <div className='BuyerProfile-mainbody'>
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
                                {' '}
                                {props.name}
                            </div>
                        </div>
                        <div className='BuyerProfile-details'>
                            <div className='BuyerProfile-addressdiv'>
                                <div className='BuyerProfile-dis'>Address</div>
                                <div>{props.address}</div>
                            </div>
                            <div className='BuyerProfile-mobilenumberdiv'>
                                <div className='BuyerProfile-sub2'>
                                    <div className='BuyerProfile-dis'>
                                        Mobile Number
                                    </div>
                                    <div>{props.mobilenumber}</div>
                                </div>
                                <div className='BuyerProfile-sub2'>
                                    <div className='BuyerProfile-dis'>
                                        E-mail
                                    </div>
                                    <div>{props.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='BuyerProfile-buttons'>
                    <div className='BuyerProfile-button'>
                        <Link to='./order'>
                            <Button icon={shoppingIcon} name={'My Orders'} />
                        </Link>
                    </div>

                    <div className='BuyerProfile-button'>
                        <Link to='./signout'>
                            <Button icon={arrowLeftCircle} name={'SignOut'} />
                        </Link>
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
