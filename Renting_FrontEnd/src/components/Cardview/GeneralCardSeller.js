import React from 'react';
import './style.css';
import logo from '../../Assets/logo512.png';
import { Link } from 'react-router-dom';
import deleteIcon from '@iconify-icons/mdi/delete';
import layersMinus from '@iconify-icons/mdi/layers-minus';
import { Icon } from '@iconify/react';

const Cardview = (props) => {
  return (
    <div className='GeneralCardviewSeller'>
    <div className='GeneralCardviewSeller-mainsub'>
      <Link to='/seller/product'>
        <div className='GeneralCardviewSeller-main'>
          <div className='GeneralCardviewSeller-imagediv'>
            <img
              src={logo}
              className='GeneralCardviewSeller-image'
              alt={'logo'}
            />
          </div>
          <div className='GeneralCardviewSeller-info'>
            <div className='GeneralCardviewSeller-title'>{props.title}</div>
            <div className='GeneralCardviewSeller-sub'>
              <div className='GeneralCardviewSeller-namediv'>
                <div className='GeneralCardviewSeller-name'>Price</div>
                <div className='GeneralCardviewSeller-value'>
                  {props.price} {props.format}
                </div>
              </div>
              <div className='GeneralCardviewSeller-namediv'>
                <div className='GeneralCardviewSeller-name'>Category</div>
                <div className='GeneralCardviewSeller-value'>
                  {props.category}
                </div>
                </div>
              
              </div>
            </div>
          </div>
          </Link>
      </div>
      <hr />
      <div className='GeneralCardviewSeller-buttons'>
        <div className='GeneralCardviewSeller-button'>
          <Link to='./manage'>
            <div className='GeneralCardviewSeller-Buttonbody'>
              <Icon icon={layersMinus} className='GeneralCardviewSeller-icon' />
              <p className='GeneralCardviewSeller-iconbuttonname'>
                {'Edit Details'}
              </p>
            </div>
          </Link>
        </div>
        <div className='GeneralCardviewSeller-button'>
          <Link to='./myproducts'>
            <div className='GeneralCardviewSeller-Buttonbody'>
              <Icon icon={deleteIcon} className='GeneralCardviewSeller-icon' />
              <p className='GeneralCardviewSeller-iconbuttonname'>
                {'Remove Item'}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

Cardview.defaultProps = {
  title: 'Sony Camera',
  price: '25$',
  format: '/month',
  category: 'Camera',
};

export default Cardview;