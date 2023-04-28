import SellerActiveProductCard from '../../components/Cardview/SellerActiveProductCard';
import TitleHeader from '../../components/header/TitleHeader';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';
import DNA from 'react-loader-spinner/dist/loader/Dna';


const SellerActiveProduct = () => {
    const alert = useAlert();
    const [orders, setOrders] = useState([]);
    const [check, setCheck] = useState(false);
    const [s,setS] = useState(true);
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
                    const data = response.data;
                    if (data.error) {
                        alert.error(data.msg);
                        return;
                    }
                    axios
                        .get(
                            'https://rentbuddy.onrender.com/order/lender/' +
                                response.data.lenderData._id
                        ,{
                            headers:{
                                "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                            }
                        })
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
            <DNA visible={s} />
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
