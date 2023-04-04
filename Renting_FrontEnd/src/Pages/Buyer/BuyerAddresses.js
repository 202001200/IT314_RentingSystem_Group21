import React from 'react';
import AddressCard from '../../components/Cardview/AddressCard';
import TitleHeader from '../../components/header/TitleHeader';
import './style.css';

const BuyerAddresses = () => {
    const cards = [];
    for (var i = 0; i < 20; i++) {
        cards.push(<AddressCard />);
    }
    return (
        <div className='BuyerAddresses-main'>
            <TitleHeader name={'Seller Address'} />
            <div className='BuyerAddresses-main-card'>{cards}</div>
        </div>
    );
};

export default BuyerAddresses;
