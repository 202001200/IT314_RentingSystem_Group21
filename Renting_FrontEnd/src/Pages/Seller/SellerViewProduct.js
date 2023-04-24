import React from 'react';
import './style.css';
// import { Link } from 'react-router-dom';
import TitleHeader from '../../components/header/TitleHeader';
import logo from '../../Assets/logo512.png';

const SellerViewProduct = (props) => {
    return (
      <div className='BuyerViewProduct-main'>
        <TitleHeader name={'View Product'} />
        <div className='BuyerViewProduct-body'>
          <div className='BuyerViewProduct-imagediv'>
            <div className='BuyerViewProduct-imagesub'>
              <img src={logo} className='BuyerViewProduct-image' alt={'logo'} />
              <div className='BuyerViewProduct-buttons'></div>
            </div>
          </div>
          <div className='BuyerViewProduct-sub'>
            <div className='BuyerViewProduct-title'>{props.title}</div>
            <hr />
            <div className='BuyerViewProduct-pricediv'>
              <div className='BuyerViewProduct-pricedivsub'>Price </div>
              <div className='BuyerViewProduct-formatprice'>
                <span className='BuyerViewProduct-price'>{props.price} </span>{' '}
                <span> {props.formatofPrice}</span>
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
            <div className='BuyerViewProduct-category'>
              <div className='BuyerViewProduct-category-text'>{'available'}</div>
              <div className='BuyerViewProduct-category-type'>
                {props.available}
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
  
  SellerViewProduct.defaultProps = {
    title: 'Sony Camera',
    price: 50000,
    formatofPrice: '/month',
    category: 'Camera',
    available: 'True',
    description: 'Best camera in segment.',
};

export default SellerViewProduct;
