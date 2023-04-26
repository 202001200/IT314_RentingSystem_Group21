import './style.css';
import logo from '../../Assets/logo512.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//card for wishlist and myorders
const SellerActiveProductCard = (props) => {
    const [product, setProduct] = useState({});
    const [buyer, setBuyer] = useState({});
    useEffect(() => {
        const fetch = () => {
            axios
                .get(
                    'https://rentingsystem.herokuapp.com/product/' +
                        props.order.productid
                )
                .then((response) => {
                    const data = response.data;
                    if (data.error) {
                        alert.error(data.msg);
                        return;
                    }
                    setProduct(data.product);
                    axios
                        .get(
                            'https://rentingsystem.herokuapp.com/buyer/getname/' +
                                props.order.buyerid
                        )
                        .then((response) => {
                            const data = response.data;
                            if (data.error) {
                                alert.error(data.msg);
                            } else {
                                setBuyer(data.data[0]);
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
    }, [props.order]);
    return (
        <div className='SellerLiveProduct'>
            <Link to={{ pathname: '/seller/product', state: product }}>
                <div className='SellerLiveProduct-main'>
                    <div className='SellerLiveProduct-imagediv'>
                        <img
                            src={product.imagepath || logo}
                            className='SellerLiveProduct-image'
                            alt={'logo'}
                        />
                    </div>
                    <div className='SellerLiveProduct-info'>
                        <div className='SellerLiveProduct-title'>
                            {product.title}
                        </div>
                        <div className='SellerLiveProduct-sub'>
                            <div className='SellerLiveProduct-namediv'>
                                <div className='SellerLiveProduct-name'>
                                    Category
                                </div>
                                <div className='SellerLiveProduct-value'>
                                    {product.category}
                                </div>
                            </div>
                            <div className='SellerLiveProduct-namediv'>
                                <div className='SellerLiveProduct-name'>
                                    Earning
                                </div>
                                <div className='SellerLiveProduct-value'>
                                    {product.price} {product.formatofprice}
                                </div>
                            </div>
                            <div className='SellerLiveProduct-namediv'>
                                <div className='SellerLiveProduct-name'>
                                    Buyer
                                </div>
                                <div className='SellerLiveProduct-value'>
                                    {buyer.firstname + ' ' + buyer.lastname}
                                </div>
                            </div>
                            <div className='SellerLiveProduct-namediv'>
                                <div className='SellerLiveProduct-name'>
                                    Purchase Date
                                </div>
                                <div className='SellerLiveProduct-value'>
                                    {props.order.purchasedate.split('T')[0]}
                                </div>
                            </div>
                            <div className='SellerLiveProduct-namediv'>
                                <div className='SellerLiveProduct-name'>
                                    End Date
                                </div>
                                <div className='SellerLiveProduct-value'>
                                    {props.order.returndate.split('T')[0]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </Link>
        </div>
  );
};


export default SellerActiveProductCard;