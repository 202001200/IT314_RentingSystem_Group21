import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GeneralCardSeller from '../../components/Cardview/GeneralCardSeller';
import TitleHeader from '../../components/header/TitleHeader';

const SellerAllproducts = () => {
    const [Products, setData] = useState([]);

    useEffect(() => {
        const fetch = () => {
            axios
                .get('https://rentbuddy.onrender.com/lender/detail', {
                    headers: {
                        'auth-token': localStorage.getItem('auth_token'),
                        "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                    },
                })
                .then((response) => {
                    console.log(response);
                    axios
                        .post(
                            'https://rentbuddy.onrender.com/lender/myproducts',
                            {
                                "lender_id": response.data.lenderData._id,
                            }
                        ,{
                            headers:{
                                "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                            }
                          })
                        .then((response) => {
                            console.log(response);
                            setData(response.data.data);
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
