import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import TitleHeader from '../../components/header/TitleHeader';
import logo from '../../Assets/logo512.png';
import Button from '../../components/Button/Button';
import heartIcon from '@iconify-icons/mdi/heart';
import cartIcon from '@iconify-icons/mdi/cart';
import mapMarkerPlus from '@iconify-icons/mdi/map-marker-plus';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

const BuyerViewProduct = (props) => {
    let location = useLocation();
    const alert = useAlert();
    let history = useHistory();
    const passvar = location.state;
    const [Seller, setData] = useState('');
    useEffect(() => {
        const fetch = () => {
            console.log(location.state);
            axios
                .get(
                    'https://rentbuddy.onrender.com/lender/getname/'+location.state.lender
                ,{
                    headers:{
                        "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa",
                        'auth-token':localStorage.getItem('auth-token')
                    }
                  })
                .then((response) => {
                    console.log(response.data);
                    const data=response.data;
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
    }, [location, alert]);

    const Removefromwishlist = () => {
        axios.get('https://rentbuddy.onrender.com/borrower/detail', {
                headers: {
                    "auth_token": localStorage.getItem('auth_token'),
                    "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"

                },
            })
            .then((response) => {
                console.log(response.data);
                axios.post(
                    'https://rentbuddy.onrender.com/borrower/updateWishlist',
                    {
                        borrower: response.data._id,
                        product: location.state._id,
                    }
                ,{
                    headers:{
                        "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                    }
                  });
                const data = response.data;
                if (data.error) {
                    alert.error('Error');
                } else {    
                    alert.success('Added to wishlist');
                    history.push('./wishlist');
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // Press Request Page for Get SELLER ADDRESS
    const AddRequest = () => {
        axios
            .get('https://rentbuddy.onrender.com/borrower/detail', {
                headers: {
                    auth_token: localStorage.getItem('auth_token'),
                    "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                },
            })
            .then((response) => {
                console.log((response.data));
                axios
                    .post('https://rentbuddy.onrender.com/borrower/request', {
                        borrower: response.data._id,
                        lender: location.state.lender,
                    },{
                        headers:{
                            "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                        }
                      })
                    .then((response) => {
                        const data = response.data;
                        if (data.error) {
                            alert.error(data.msg);
                        } else {
                            alert.success(data.msg);
                        }
                    });
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const name=Seller.length===0?'Loading...':Seller.firstname+' '+Seller.lastname;
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
                                <Button
                                    icon={heartIcon}
                                    name={'Remove'}
                                    handleClick={Removefromwishlist}
                                />
                            </div>
                            <div className='BuyerViewProduct-button'>
                                <Link
                                    to={{
                                        pathname: './checkout',
                                        state: passvar,
                                    }}
                                >
                                    <Button icon={cartIcon} name={'Rent Now'} />
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
                    <div className='BuyerViewProduct-seller-details'>
                        <div className='BuyerViewProduct-seller'>
                            {'Seller'}
                        </div>
                        <div className='BuyerViewProduct-sellername'>
                            {name}
                        </div>
                        <div className='BuyerViewProduct-seller-button'>
                            <Button
                                icon={mapMarkerPlus}
                                name={'Request'}
                                handleClick={AddRequest}
                            />
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

export default BuyerViewProduct;
