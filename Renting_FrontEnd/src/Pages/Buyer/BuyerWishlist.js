import React from 'react'
import GeneralCard from '../../components/Cardview/GeneralCard';
import TitleHeader from '../../components/header/TitleHeader';



const BuyerWishlist = () => {
const cards = [];
for (var i = 0; i < 5; i++) {
  cards.push(<GeneralCard key={i} />);
}
return (
  <div className='BuyerWishlist-page'>
    <TitleHeader name={'My Wishlist'} />
    <div className='BuyerWishlist-card'>{cards}</div>
  </div>
);
};

export default BuyerWishlist;
