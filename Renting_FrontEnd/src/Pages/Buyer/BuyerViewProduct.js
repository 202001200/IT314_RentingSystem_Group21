import React from 'react';
import TitleHeader from '../../components/header/TitleHeader';
import './style.css';
import logo from '../../Assets/logo512.png';
import Button from '../../components/Button/Button';
import heartIcon from '@iconify-icons/mdi/heart';
import cartIcon from '@iconify-icons/mdi/cart';

const BuyerViewProduct = (props) => {
  return (
    <div className='BuyerViewProduct-main'>
        <TitleHeader name={'View Product'} />
        <div className='BuyerViewProduct-body'>
            <div className='BuyerViewProduct-imagediv'>
                <div className='BuyerViewProduct-imagesub'>
                    <img
                        src={logo}
                        className='BuyerViewProduct-image'
                        alt={'logo'}
                    />
                    <div className='BuyerViewProduct-buttons'>
                        <Button icon={heartIcon} name={'Wishlist'} />
                        <Button icon={cartIcon} name={'Buy Now'} />
                    </div>
                </div>
            </div>
            <div className='BuyerViewProduct-sub'>
                <div className='BuyerViewProduct-title'>{props.title}</div>
                <div className='BuyerViewProduct-pricediv'>
                    <div className='BuyerViewProduct-price'>
                        {props.price}
                    </div>
                    <div className='BuyerViewProduct-formatprice'>
                        {props.formatofPrice}
                    </div>
                </div>
                <hr />
                <div className='BuyerViewProduct-category'>
                    {props.category}
                </div>
                <hr />
                <div className='BuyerViewProduct-seller-details'>
                    <div className='BuyerViewProduct-seller'>Seller</div>
                    <div className='BuyerViewProduct-sellername'>
                        {props.seller}
                    </div>
                </div>
                <hr />
                <div className='BuyerViewProduct-description'>
                    {props.description}
                </div>
            </div>
          </div>
        </div>
    );
  };
  
  BuyerViewProduct.defaultProps = {
    title: 'Sony camera',
    price: 50000,
    formatofPrice: '/month',
    category: 'camera',
    seller: 'deep',
    description: 'best camera in segment ',
};

export default BuyerViewProduct;
