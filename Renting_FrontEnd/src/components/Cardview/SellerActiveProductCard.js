import React from 'react';
import './style.css';
import logo from '../../Assets/logo512.png';
import { Link } from 'react-router-dom';

//card for wishlist and myorders
const SellerCardView = (props) => {
  return (
    <div className='SellerLiveProduct'>
      <Link to='/seller/product'>
        <div className='SellerLiveProduct-main'>
          <div className='SellerLiveProduct-imagediv'>
            <img src={logo} className='SellerLiveProduct-image' alt={'logo'} />
          </div>
          <div className='SellerLiveProduct-info'>
            <div className='SellerLiveProduct-title'>{props.title}</div>
            <div className='SellerLiveProduct-sub'>
              <div className='SellerLiveProduct-namediv'>
                <div className='SellerLiveProduct-name'>Price</div>
                <div className='SellerLiveProduct-value'>
                  {props.price} {props.format}
                </div>
              </div>
              <div className='SellerLiveProduct-namediv'>
                <div className='SellerLiveProduct-name'>Category</div>
                <div className='SellerLiveProduct-value'>{props.category}</div>
              </div>
              <div className='SellerLiveProduct-namediv'>
                <div className='SellerLiveProduct-name'>Buyer</div>
                <div className='SellerLiveProduct-value'>{props.seller}</div>
              </div>
              <div className='SellerLiveProduct-namediv'>
                <div className='SellerLiveProduct-name'>End-Data</div>
                <div className='SellerLiveProduct-value'>
                  {props.returnData}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

SellerCardView.defaultProps = {
  title: 'Sony Camera',
  price: '25$',
  format: '/month',
  category: 'Camera',
  seller: 'john doe',
  returnData: '21/04/2021',
};

export default SellerCardView;