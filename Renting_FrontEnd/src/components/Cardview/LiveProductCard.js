import React from 'react';
import './style.css';
import logo from '../../Assets/logo512.png';
import { Link } from 'react-router-dom';

//card for wishlist and myorders
const Cardview = (props) => {
  return (
    <div className='LiveProductCard'>
      <Link to='/buyer/product'>
        <div className='LiveProductCard-main'>
          <div className='LiveProductCard-imagediv'>
            <img src={logo} className='LiveProductCard-image' alt={'logo'} />
          </div>
          <div className='LiveProductCard-info'>
            <div className='LiveProductCard-title'>{props.title}</div>
            <div className='LiveProductCard-sub'>
              <div className='LiveProductCard-namediv'>
                <div className='LiveProductCard-name'>Price</div>
                <div className='LiveProductCard-value'>
                  {props.price} {props.format}
                </div>
              </div>
              <div className='LiveProductCard-namediv'>
                <div className='LiveProductCard-name'>Category</div>
                <div className='LiveProductCard-value'>{props.category}</div>
              </div>
              <div className='LiveProductCard-namediv'>
                <div className='LiveProductCard-name'>Seller</div>
                <div className='LiveProductCard-value'>{props.seller}</div>
              </div>
              <div className='LiveProductCard-namediv'>
                <div className='LiveProductCard-name'>Return Data</div>
                <div className='LiveProductCard-value'>{props.returnData}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

Cardview.defaultProps = {
  title: 'Sony Camera',
  price: '25$',
  format: '/month',
  category: 'Camera',
  seller: 'john doe',
  returnData: '21/04/2021',
};

export default Cardview;