import React from 'react';
import './style.css';

const AddressCard = (props) => {
    return (
        <div className='AddressCard-main'>
            <div className='AddressCard-name-body'>
            <p className='AddressCard-name'>
          {props.address.firstname + ' ' + props.address.lastname}
        </p>
            </div>
            <div className='AddressCard-email-body'>
            <p className='AddressCard-emal'>{props.address.email}</p>
            </div>
            <div className='AddressCard-address-body'>
            <p className='AddressCard-address'>{props.address.address}</p>
            </div>
        </div>
    );
};



export default AddressCard;