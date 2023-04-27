import './style.css';
import logo from '../../Assets/logo512.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LiveProductCard = (props) => {
  const [product, setProduct] = useState({});
    const [seller, setSeller] = useState({});
    useEffect(() => {
        const fetch = () => {
            console.log(props.order);
            Promise.all([
                axios.get('https://rentbuddy.onrender.com/products/' +props.order.productid,{
                    headers:{
                        "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                    }
                }),
                axios.get('https://rentbuddy.onrender.com/lender/getname/' +props.order.lenderid,{
                    headers:{
                        "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                    }
                })
            ]).then(async([response1, response2])=>{
                let data = response1.data;
                    if (!data) {
                        alert.error(data.msg);
                        return;
                    }
                    let data2= response2.data;
                    if (!data2) {
                        alert.error(data2.msg);
                        return;
                    }
                    console.log(data2.data);
                    setProduct(data);
                    setSeller(data2.data[0]);
            })
            // axios
            //     .get(
            //         'https://rentbuddy.onrender.com/products/' +props.order.productid
            //     ,{
            //         headers:{
            //             "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
            //         }
            //     })
            //     .then((response) => {
                    
            //         axios
            //             .get(
            //                 'https://rentbuddy.onrender.com/lender/getname/' +
            //                     response.data.lender
            //             )
            //             .then((response) => {
            //                 const data = response.data;
            //                 if (data.error) {
            //                     alert.error(data.msg);
            //                 } else {
            //                     setSeller(data.data[0]);
            //                 }
            //             })
            //             .catch((e) => {
            //                 console.log(e);
            //             });
            //     })
            //     .catch((e) => {
            //         console.log(e);
            //     });
        };
        fetch();
    }, [props.order]);
    if(seller.firstname===undefined) return null;
    return (
        <div className='LiveProductCard'>
            <Link to={{ pathname: '/buyer/product', state: product }}>
                <div className='LiveProductCard-main'>
                    <div className='LiveProductCard-imagediv'>
                        <img
                            src={product.imagepath || logo}
                            className='LiveProductCard-image'
                            alt={'logo'}
                        />
                    </div>
                    <div className='LiveProductCard-info'>
                        <div className='LiveProductCard-title'>
                            {product.title}
                        </div>
                        <div className='LiveProductCard-sub'>
                            <div className='LiveProductCard-namediv'>
                                <div className='LiveProductCard-name'>
                                    Price
                                </div>
                                <div className='LiveProductCard-value'>
                                    {product.price} {product.formatofprice}
                                </div>
                            </div>
                            <div className='LiveProductCard-namediv'>
                                <div className='LiveProductCard-name'>
                                    Category
                                </div>
                                <div className='LiveProductCard-value'>
                                    {product.category}
                                </div>
                            </div>
                            <div className='LiveProductCard-namediv'>
                                <div className='LiveProductCard-name'>
                                    Seller
                                </div>
                                <div className='LiveProductCard-value'>
                                    {seller.firstname + ' ' + seller.lastname}
                                </div>
                            </div>
                            <div className='LiveProductCard-namediv'>
                                <div className='LiveProductCard-name'>
                                    {props.flag
                                        ? 'Purchase Date'
                                        : 'Return Date'}
                                </div>
                                <div className='LiveProductCard-value'>
                                    {' '}
                                    {props.flag
                                        ? props.order.purchasedate.split('T')[0]
                                        : props.order.returndate.split('T')[0]}
                                    {}
                                </div>
                            </div>
                            {props.flag && (
                                <div className='LiveProductCard-namediv'>
                                    <div className='LiveProductCard-name'>
                                        {props.flag
                                            ? 'Purchase Time'
                                            : 'Return Time'}
                                    </div>
                                    <div className='LiveProductCard-value'>
                                        {' '}
                                        {props.flag
                                            ? props.order.purchasedate
                                                  .split('T')[1]
                                                  .split('.')[0]
                                            : props.order.returndate
                                                  .split('T')[1]
                                                  .split('.')[0]}
                                        {}
                                    </div>
                                </div>
                        )}

                        </div>
                    </div>
                </div>
              </Link>
        </div>
  );
};



export default LiveProductCard;