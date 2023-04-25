import SellerActiveProductCard from '../../components/Cardview/SellerActiveProductCard';
import TitleHeader from '../../components/header/TitleHeader';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const SellerActiveProduct = () => {
     const [orders, setOrders] = useState([]);
    const [check, setCheck] = useState(false);

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
                        .get(
                            'https://rentingsystem.herokuapp.com/order/seller/' +
                                response.data.seller[0]._id
                        )
                        .then((response) => {
                            setOrders(response.data.orders);
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

    const handleCheck = () => {
        setCheck(!check);
    };

    return (
        <div>
            <TitleHeader name={'Sold Products'} />
            <div className='BuyerCheckout-confirmdiv'>
                <input
                    type='checkbox'
                    className='BuyerCheckout-check'
                    defaultChecked={check}
                    onChange={handleCheck}
                />
                <span className='BuyerCheckout-confirm'>
                    Active Sold Products
                </span>
            </div>
            <div className='BuyerMyOrder-card'>
                {!check
                    ? orders.map((order) => {
                          return (
                              <SellerActiveProductCard
                                  key={order._id}
                                  order={order}
                              />
                          );
                      })
                    : orders.map((order) => {
                          var dt1 = new Date(order.returndate);
                          var dt2 = new Date();
                          return (
                              dt1 - dt2 > 0 && (
                                  <SellerActiveProductCard
                                      key={order._id}
                                      order={order}
                                      flag={false}
                                  />
                              )
                          );
                      })}
            </div>
        </div>
    );
};

export default SellerActiveProduct;
