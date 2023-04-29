import React, { useState, useEffect } from 'react';
import LiveProductCard from '../../components/Cardview/LiveProductCard';
import TitleHeader from '../../components/header/TitleHeader';
import axios from 'axios';
import { useAlert } from 'react-alert';
import DNA from 'react-loader-spinner/dist/loader/Dna';
const BuyerMyOrder = () => {
    const alert = useAlert();
   const [orders, setOrders] = useState([]);
   const [s,setS] = useState(true);
    useEffect(() => {
        const fetch = () => {
            axios
                .get('https://rentbuddy.onrender.com/borrower/detail', {
                    headers: {
                        auth_token: localStorage.getItem('auth_token'),
                        "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                    },
                })
                .then((response) => {
                    const data = response.data;
                    if (data.msg) {
                        alert.error(data.msg);
                        return;
                    }
                    axios
                        .get(
                            'https://rentbuddy.onrender.com/order/borrower/' +data._id
                        ,{
                            headers:{
                                auth_token:localStorage.getItem('auth_token'),
                                "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                            }
                        })
                        .then((response) => {
                            const data = response.data;
                            setS(false);
                            console.log(data);
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
            <div style={{'margin-top':'20%'}}><DNA visible={s}/></div>
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
