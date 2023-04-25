import React from 'react';
import GeneralCard from '../../components/Cardview/GeneralCard';
import TitleHeader from '../../components/header/TitleHeader';

const BuyerMyOrder = () => {
  const cards = [];
  for (var i = 0; i < 5; i++) {
    cards.push(<GeneralCard key={i} product />);
  }
  return (
    <div className='BuyerMyOrder-page'>
      <TitleHeader name={'My Order'} />
      <div className='BuyerMyOrder-card'>{cards}</div>
    </div>
  );
};

export default BuyerMyOrder;
