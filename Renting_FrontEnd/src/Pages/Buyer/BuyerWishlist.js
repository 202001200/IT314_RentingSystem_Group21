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
                    "auth_token": localStorage.getItem('auth_token'),
                    "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                },
            })
            .then((response) => {
                const data = response.data;
                if (data.error) {
                    alert.error(data.msg);
                    return;
                }
                console.log(response);
                axios
                    .post(
                        'https://rentbuddy.onrender.com/borrower/getwishlist',
                        {
                            borrower: response.data._id
                        }
                    ,{
                        headers:{
                            "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                        }
                })
                    .then((response) => {
                        console.log(response);
                        if (response.data.error) {
                            alert.error(response.data.msg);
                            setData();
                        } else {
                            setData(response.data.data);
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }).catch((e) => {
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