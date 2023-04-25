import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GeneralCard from '../../components/Cardview/GeneralCard';
import TitleHeader from '../../components/header/TitleHeader';



const BuyerWishlist = () => {
  const [Products, setData] = useState([]);
  useEffect(() => {
    const fetch = () => {
      axios
        .get('https://rentingsystem.herokuapp.com/buyer/detail', {
          headers: {
            auth_token: localStorage.getItem('auth_token'),
          },
        })
        .then((response) => {
          axios
            .post('https://rentingsystem.herokuapp.com/buyer/getwishlist', {
              buyer: response.data.buyer[0]._id,
            })
            .then((response) => {
              setData(response.data.product);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetch();
  }, []);
return (
  <div className='BuyerWishlist-page'>
    <TitleHeader name={'My Wishlist'} />
    <div className='BuyerWishlist-card'>
        {Products.map((product) => {
          return <GeneralCard key={product._id} product={product} />;
        })}
      </div>
  </div>
);
};

export default BuyerWishlist;
