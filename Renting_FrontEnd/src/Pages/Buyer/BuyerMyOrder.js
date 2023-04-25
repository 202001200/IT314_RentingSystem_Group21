import React, { useState, useEffect } from 'react';
import LiveProductCard from '../../components/Cardview/LiveProductCard';
import TitleHeader from '../../components/header/TitleHeader';
import axios from 'axios';
import { useAlert } from 'react-alert';

const BuyerMyOrder = () => {
    const alert = useAlert();
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
                    const data = response.data;
                    if (data.error) {
                        alert.error(data.msg);
                        return;
                    }
                    axios
                        .get(
                            'https://rentingsystem.herokuapp.com/order/buyer/' +
                                response.data.buyer[0]._id
                        )
                        .then((response) => {
                            const data = response.data;
                            if (data.error) {
                                alert.error(data.msg);
                            } else {
                                setOrders(response.data.orders);
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
