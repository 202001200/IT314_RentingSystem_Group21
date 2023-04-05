import React from 'react';
import TitleHeader from '../../components/header/TitleHeader';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../Assets/logo512.png';
import Button from '../../components/Button/Button';
import heartIcon from '@iconify-icons/mdi/heart';
import cartIcon from '@iconify-icons/mdi/cart';
import mapMarkerPlus from '@iconify-icons/mdi/map-marker-plus';

const BuyerViewProduct = (props) => {
    return (
        <div className='BuyerViewProduct-main'>
          <TitleHeader name={'View Product'} />
          <div className='BuyerViewProduct-body'>
            <div className='BuyerViewProduct-imagediv'>
              <div className='BuyerViewProduct-imagesub'>
                <img src={logo} className='BuyerViewProduct-image' alt={'logo'} />
                <div className='BuyerViewProduct-buttons'>
                  <div className='BuyerViewProduct-button'>
                    <Link to='./wishlist'>
                      <Button icon={heartIcon} name={'Wishlist'} />
                    </Link>
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
          <div className='BuyerViewProduct-title'>{props.title}</div>
          <div className='BuyerViewProduct-pricediv'>
            <div className='BuyerViewProduct-price'>{props.price}</div>
            <div className='BuyerViewProduct-formatprice'>
              {props.formatofPrice}
            </div>
          </div>
          <hr />
          <div className='BuyerViewProduct-category'>
            <div className='BuyerViewProduct-category-text'>{'Category'}</div>
            <div className='BuyerViewProduct-category-type'>
              {props.category}
            </div>
          </div>
          <hr />
          <div className='BuyerViewProduct-seller-details'>
            <div className='BuyerViewProduct-seller'>{'Seller'}</div>
            <div className='BuyerViewProduct-sellername'>{props.seller}</div>
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
              {props.description}
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
