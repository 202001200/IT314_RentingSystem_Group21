import React from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import TitleHeader from '../../components/header/TitleHeader';
import logo from '../../Assets/logo512.png';

const SellerViewProduct = (props) => {
    let location = useLocation();
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
                        <div className='BuyerViewProduct-buttons'></div>
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
                            <span> {location.state.formatofprice}</span>
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
                    <div className='BuyerViewProduct-category'>
                        <div className='BuyerViewProduct-category-text'>
                            {'available'}
                        </div>
                        <div className='BuyerViewProduct-category-type'>
                            {location.state.available ? 'Yes' : 'No'}
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

export default SellerViewProduct;
