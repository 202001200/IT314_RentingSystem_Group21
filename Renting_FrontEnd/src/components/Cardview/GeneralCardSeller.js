import React from 'react';
import './style.css';
import logo from '../../Assets/logo512.png';
import { Link } from 'react-router-dom';
import deleteIcon from '@iconify-icons/mdi/delete';
import layersMinus from '@iconify-icons/mdi/layers-minus';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Cardview = (props) => {
  const product = props.product;

  const alert = useAlert();
    let history = useHistory();

    const handleDelete = () => {
      axios
          .delete(
              'https://rentbuddy.onrender.com/products/lender/' +
                  product._id
          ,{
            headers:{
                "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
            }
          })
          .then(function (response) {
              const data = response.data;
              if (data.error) {
                  alert.error(data.msg);
              } else {
                  alert.success(data.msg);
                  return history.push('./../');
              }
          })
          .catch(function (error) {
              console.log(error);
          });
  };

  return (
      <div className='GeneralCardviewSeller'>
          <div className='GeneralCardviewSeller-mainsub'>
              <Link to={{ pathname: '/seller/product', state: product }}>
                  <div className='GeneralCardviewSeller-main'>
                      <div className='GeneralCardviewSeller-imagediv'>
                          <img
                              src={props.product.imagepath || logo}
                              className='GeneralCardviewSeller-image'
                              alt={'logo'}
                          />
                      </div>
                      <div className='GeneralCardviewSeller-info'>
                          <div className='GeneralCardviewSeller-title'>
                              {props.product.title}
                          </div>
                          <div className='GeneralCardviewSeller-sub'>
                              <div className='GeneralCardviewSeller-namediv'>
                                  <div className='GeneralCardviewSeller-name'>
                                      Price
                                  </div>
                                  <div className='GeneralCardviewSeller-value'>
                                      {props.product.price}{' '}
                                      {props.product.formatofprice}
                                  </div>
                              </div>
                              <div className='GeneralCardviewSeller-namediv'>
                                  <div className='GeneralCardviewSeller-name'>
                                      Category
                                  </div>
                                  <div className='GeneralCardviewSeller-value'>
                                      {props.product.category}
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
                    <Link to={{ pathname: './manage', state: product }}>
                        <div className='GeneralCardviewSeller-Buttonbody'>
                            <Icon
                                icon={layersMinus}
                                className='GeneralCardviewSeller-icon'
                            />
                            <p className='GeneralCardviewSeller-iconbuttonname'>
                                {'Edit Details'}
                            </p>
                        </div>
                    </Link>
                </div>
                <div
                    className='GeneralCardviewSeller-button'
                    onClick={handleDelete}
                >
                    <div className='GeneralCardviewSeller-Buttonbody'>
                        <Icon
                            icon={deleteIcon}
                            className='GeneralCardviewSeller-icon'
                        />
                        <p className='GeneralCardviewSeller-iconbuttonname'>
                            {'Remove Item'}
                        </p>
                    </div>
                </div>
                
            </div>
    </div>
    );
};

export default Cardview;

