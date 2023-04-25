import React, { useState, useEffect } from 'react';
import LiveProductCard from '../../components/Cardview/LiveProductCard';
import TitleHeader from '../../components/header/TitleHeader';
import axios from 'axios';

const BuyerMyOrder = () => {
   const [orders, setOrders] = useState([]);

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
                        .get(
                            'https://rentingsystem.herokuapp.com/order/buyer/' +
                                response.data.buyer[0]._id
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

    return (
        <div className='BuyerMyOrder-page'>
            <TitleHeader name={'My Order'} />
            <div className='BuyerMyOrder-card'>
                {orders.map((order) => {
                    return (
                        <LiveProductCard
                            key={order._id}
                            order={order}
                            flag={true}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default BuyerMyOrder;
