import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GeneralCard from '../../components/Cardview/GeneralCard';
import TitleHeader from '../../components/header/TitleHeader';
import { useAlert } from 'react-alert';
const BuyerWishlist = () => {
  const alert = useAlert();
  const [Products, setData] = useState([]);
  useEffect(() => {
    const fetch = () => {
        axios
            .get('https://rentbuddy.onrender.com/borrower/detail', {
                headers: {
                    auth_token: localStorage.getItem('auth_token'),
                },
            })
            .then((response) => {
                const data = response.data;
                if (data.error) {
                    alert.error(data.msg);
                    return;
                }
                axios
                    .post(
                        'https://rentbuddy.onrender.com/borrower/getwishlist',
                        {
                            buyer: response.data.buyer[0]._id,
                        }
                    )
                    .then((response) => {
                        if (response.data.error) {
                            alert.error(response.data.msg);
                            setData([]);
                        } else {
                            setData(response.data.data);
                        }
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
}, [alert]);

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