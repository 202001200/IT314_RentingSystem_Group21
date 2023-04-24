import React from 'react';
import SellerCardView from '../../components/Cardview/SellerActiveProductCard';
import TitleHeader from '../../components/header/TitleHeader';


const SellerActiveProduct = () => {
    const cards = [];
  for (var i = 0; i < 6; i++) {
    cards.push(<SellerCardView key={i} />);
  }
  return (
    <div>
      <TitleHeader name={'Seller Live Product'} />
      <div className='BuyerMyOrder-card'>{cards}</div>
    </div>
  );
};

export default SellerActiveProduct;
