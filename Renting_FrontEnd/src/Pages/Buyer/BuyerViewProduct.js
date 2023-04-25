import React, { useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import TitleHeader from '../../components/header/TitleHeader';
import logo from '../../Assets/logo512.png';
import Button from '../../components/Button/Button';
import heartIcon from '@iconify-icons/mdi/heart';
import cartIcon from '@iconify-icons/mdi/cart';
import mapMarkerPlus from '@iconify-icons/mdi/map-marker-plus';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

const BuyerViewProduct = (props) => {
  let location = useLocation();
  let history = useHistory();
  const alert = useAlert();
  // console.log(location.state);
  const Addtowishlist = () => {
    axios
      .get('https://rentingsystem.herokuapp.com/buyer/detail', {
        headers: {
          auth_token: localStorage.getItem('auth_token'),
        },
      })
      .then((response) => {
        axios.post('https://rentingsystem.herokuapp.com/buyer/updateWishlist', {
          buyer: response.data.buyer[0]._id,
          product: location.state._id,
        });
        const data = response.data;
        if (data.error) {
          alert.error(data.msg);
        } else {
          alert.success(data.msg);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
    return (
        <div className='BuyerViewProduct-main'>
            <TitleHeader name={'View Product'} />
            <div className='BuyerViewProduct-body'>
                <div className='BuyerViewProduct-imagediv'>
                    <div className='BuyerViewProduct-imagesub'>
                        <img
                            src={location.state.imagepath || logo}
                            className='BuyerViewProduct-image'
                            alt={'logo'}
                        />
                        <div className='BuyerViewProduct-buttons'>
                            <div className='BuyerViewProduct-button'>
                                {/* <Link to='./wishlist'> */}
                                <Button
                                icon={heartIcon}
                                name={'Wishlist'}
                                handleClick={Addtowishlist}
                                />
                                {/* </Link> */}
                            </div>
                            <div className='BuyerViewProduct-button'>
                                <Link to='./checkout'>
                                    <Button icon={cartIcon} name={'Buy Now'} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='BuyerViewProduct-sub'>
                    <div className='BuyerViewProduct-title'>
                        {location.state.title}
                    </div>
                    <hr />
                    <div className='BuyerViewProduct-pricediv'>
                        <div className='BuyerViewProduct-pricedivsub'>
                            Price{' '}
                        </div>
                        <div className='BuyerViewProduct-formatprice'>
                            <span className='BuyerViewProduct-price'>
                                {location.state.price}{' '}
                            </span>{' '}
                            <span> {location.state.formatofPrice}</span>
                        </div>
                    </div>
                    <hr />
                    <div className='BuyerViewProduct-category'>
                        <div className='BuyerViewProduct-category-text'>
                            {'Category'}
                        </div>
                        <div className='BuyerViewProduct-category-type'>
                            {location.state.category}
                        </div>
                    </div>
                    <hr />
                    <div className='BuyerViewProduct-seller-details'>
                        <div className='BuyerViewProduct-seller'>
                            {'Seller'}
                        </div>
                        <div className='BuyerViewProduct-sellername'>
                            {location.state.seller}
                        </div>
                        <div className='BuyerViewProduct-seller-button'>
                            <Button icon={mapMarkerPlus} name={'Request'} />
                        </div>
                    </div>
                    <hr />
                    <div className='BuyerViewProduct-description'>
                        <div className='BuyerViewProduct-description-title'>
                            {'Description'}
                        </div>
                        <div className='BuyerViewProduct-description-content'>
                            {location.state.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
  );
};

BuyerViewProduct.defaultProps = {
  title: 'Sony Camera',
  price: 50000,
  formatofPrice: '/month',
  category: 'Camera',
  seller: 'Deep',
  description: 'Best camera in segment.',
};

export default BuyerViewProduct;
