import React, { useState, useEffect } from 'react';
import LiveProductCard from '../../components/Cardview/LiveProductCard';
import TitleHeader from '../../components/header/TitleHeader';
import axios from 'axios';
import { useAlert } from 'react-alert';

const BuyerLiveProduct = () => {
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
        <div>
            <TitleHeader name={'Live Order'} />
            <div className='BuyerMyOrder-card'>
                {orders.map((order) => {
                    var dt1 = new Date(order.returndate);
                    var dt2 = new Date();
                    return (
                        dt1 - dt2 > 0 && (
                            <LiveProductCard
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

export default BuyerLiveProduct;
