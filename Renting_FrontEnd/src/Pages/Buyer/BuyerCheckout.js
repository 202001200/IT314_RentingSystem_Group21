import React from 'react';
import TitleHeader from '../../components/header/TitleHeader';
import Button from '../../components/Button/Button';
import checkboxMarkedCircleOutline from '@iconify-icons/mdi/checkbox-marked-circle-outline';
import backspaceOutline from '@iconify-icons/mdi/backspace-outline';

import './style.css';
const BuyerCheckout = (props) => {
  return (
    <div>
        <TitleHeader name={'Checkout Product'} />
        <div className='BuyerCheckout-main'>
            <div className='BuyerCheckout-title'>{props.title}</div>
            <hr />
                <div className='BuyerChekout-description'>
                    <div className='BuyerCheckout-description-title'>
                        {'Description'}
                    </div>
                    <div className='BuyerCheckout-description-content'>
                        {props.description}
                    </div>
            </div>
            <hr />
            <div className='BuyerCheckout-address'>
                <div className='BuyerCheckout-add'>Address</div>
                <div className='BuyerCheckout-Buyeraddress'>
                    {props.address}
                </div>
            </div>
            <hr />
            <div className='BuyerCheckout-confirmdiv'>
                <input type='checkbox' className='BuyerCheckout-check' />
                <span className='BuyerCheckout-confirm'>
                    Confirm Paymant
                </span>
                <span className='BuyerCheckout-total'>{'Total'}</span>
                <div className='BuyerCheckoutPrice'>{props.price}</div>
            </div>

            <div className='BuyerCheckout-buttons'>
                    <Button icon={backspaceOutline} name={'Cancel'} />
                    <Button
                        icon={checkboxMarkedCircleOutline}
                        name={'Place Order'}
                    />
                </div>
            </div>
        </div>
  );
};

BuyerCheckout.defaultProps = {
  address: 'abc , dhrol',
  title: 'Sony Camera',
  description: 'best in segment',
  price: 50000,
};

export default BuyerCheckout;
