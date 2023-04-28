import React, { useState, useEffect } from 'react';
import LiveProductCard from '../../components/Cardview/LiveProductCard';
import TitleHeader from '../../components/header/TitleHeader';
import axios from 'axios';
import { useAlert } from 'react-alert';
import DNA from 'react-loader-spinner/dist/loader/Dna';

const BuyerLiveProduct = () => {
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
                    if (data.error) {
                        alert.error(data.msg);
                        return;
                    }
                    axios
                        .get(
                            'https://rentbuddy.onrender.com/order/borrower/' + response.data._id,{
                                headers:{
                                    auth_token: localStorage.getItem('auth_token'),
                                    "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                                }
                            }
                        )
                        .then((response) => {
                            setS(false);
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
            <DNA visible={s}/>
                {orders.map((order) => {
                    var dt1 = new Date(order.returndate);
                    var dt2 = new Date();
                    console.log(dt1);
                    return (
                        dt1 >= dt2 && (
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
