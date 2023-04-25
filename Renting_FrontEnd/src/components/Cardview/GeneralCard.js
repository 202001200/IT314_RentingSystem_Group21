import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import logo from '../../Assets/logo512.png';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Cardview = (props) => {
  const alert = useAlert();

  const product = props.product;
  const [Seller, setData] = useState([]);

  useEffect(() => {
    const fetch = () => {
        axios
            .get(
                'https://rentingsystem.herokuapp.com/seller/getname/' +
                    product.seller
            )
            .then((response) => {
                const data = response.data;
                if (data.error) {
                    alert.error(data.msg);
                } else {
                    setData(response.data.data[0]);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };
    fetch();
}, [product, alert]);

return (
    <div className='GeneralCardview'>
        <Link to={{ pathname: '/buyer/product', state: product }}>
            <div className='GeneralCardview-main'>
                <div className='GeneralCardview-imagediv'>
                    <img
                        src={product.imagepath || logo}
                        className='GeneralCardview-image'
                        alt={'logo'}
                    />
                </div>
                <div className='GeneralCardview-info'>
                    <div className='GeneralCardview-title'>
                        {product.title}
                    </div>
                    <div className='GeneralCardview-sub'>
                        <div className='GeneralCardview-namediv'>
                            <div className='GeneralCardview-name'>
                                Price
                            </div>
                            <div className='GeneralCardview-value'>
                                {product.price} {product.format}
                            </div>
                        </div>
                        <div className='GeneralCardview-namediv'>
                            <div className='GeneralCardview-name'>
                                Category
                            </div>
                            <div className='GeneralCardview-value'>
                                {product.category}
                            </div>
                        </div>
                        <div className='GeneralCardview-namediv'>
                            <div className='GeneralCardview-name'>
                                Seller
                            </div>
                            <div className='GeneralCardview-value'>
                                {Seller.firstname + ' ' + Seller.lastname}
                            </div>
                        </div>
                        <div className='GeneralCardview-namediv'>
                            <div className='GeneralCardview-name'>
                                available
                            </div>
                            <div className='GeneralCardview-value'>
                                {product.available ? 'Yes' : 'No'}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </Link>
        </div>
  
  );
};


 export default Cardview;
