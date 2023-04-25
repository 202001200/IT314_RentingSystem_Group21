import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GeneralCardSeller from '../../components/Cardview/GeneralCardSeller';
import TitleHeader from '../../components/header/TitleHeader';

const SellerAllproducts = () => {
    const [Products, setData] = useState([]);

    useEffect(() => {
        const fetch = () => {
            axios
                .get('https://rentingsystem.herokuapp.com/seller/detail', {
                    headers: {
                        'auth-token': localStorage.getItem('auth_token'),
                    },
                })
                .then((response) => {
                    axios
                        .post(
                            'https://rentingsystem.herokuapp.com/seller/myproducts',
                            {
                                seller_id: response.data.seller[0]._id,
                            }
                        )
                        .then((response) => {
                            setData(response.data.data);
                            console.log(response.data.data);
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
        <div>
            <TitleHeader name={'My Products'} />
            <div className='BuyerMyOrder-card'>
                {Products.map((product) => {
                    return (
                        <GeneralCardSeller
                            key={product._id}
                            product={product}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SellerAllproducts;
