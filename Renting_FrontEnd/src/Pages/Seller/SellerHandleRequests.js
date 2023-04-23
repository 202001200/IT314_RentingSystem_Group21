import React from 'react';
import './style.css';
import RequestCard from '../../components/Cardview/RequestCard';
import TitleHeader from '../../components/header/TitleHeader';

const SellerHandleRequests = (props) => {
        const cards = [];
        for (var i = 0; i < 5; i++) {
          cards.push(<RequestCard />);
        }
        return (
          <div className='BuyerAddresses-main'>
            <TitleHeader name={'Seller Address'} />
            <div className='BuyerAddresses-main-card'>{cards}</div>
          </div>
        );
        };
export default SellerHandleRequests;
