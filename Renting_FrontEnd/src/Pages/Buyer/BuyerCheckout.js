import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Link, useLocation } from 'react-router-dom';
import TitleHeader from '../../components/header/TitleHeader';
import Button from '../../components/Button/Button';
import checkboxMarkedCircleOutline from '@iconify-icons/mdi/checkbox-marked-circle-outline';
import backspaceOutline from '@iconify-icons/mdi/backspace-outline';
import { useAlert } from 'react-alert';
import DNA from 'react-loader-spinner/dist/loader/Dna';

const BuyerCheckout = (props) => {
  let location = useLocation();
  const alert = useAlert();
  const [s,setS] = useState(true);
  const [check, setCheck] = useState(false);
  const [Buyer, setData] = useState({});
  const [ava, setAva] = useState();
  useEffect(() => {
    const fetch = () => {
        axios.get('https://rentbuddy.onrender.com/products/'+location.state._id,{
            headers:{
                "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
            }
        }).then((response)=>{
            setAva(response.data.available);
        })
      axios
        .get('https://rentbuddy.onrender.com/borrower/detail', {
          headers: {
            auth_token: localStorage.getItem('auth_token'),
            "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
          },
        })
        .then((response) => {
          setData(response.data);
          setS(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };

  fetch();
    }, [alert]);

    const confirmpayment = () => {
      let returndate = new Date();
      let k = 0;
      if (location.state.formatofprice === '/day') {
          k = 1;
      } else if (location.state.formatofprice === '/3-days') {
          k = 3;
      } else if (location.state.formatofprice === '/week') {
          k = 7;
      } else if (location.state.formatofprice === '/15-days') {
          k = 15;
      } else if (location.state.formatofprice === '/month') {
          k = 30;
      } else if (location.state.formatofprice === '/6-months') {
          k = 182;
      } else if (location.state.formatofprice === '/year') {
          k = 365;
        }

        returndate.setDate(returndate.getDate() + k);
        axios
            .post('https://rentbuddy.onrender.com/order', {
                borrowerid: Buyer._id,
                lenderid: location.state.lender,
                productid: location.state._id,
                address: Buyer.address,
                totalprice: location.state.price,
                returndate: returndate,
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
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handlechange = () => {
        setCheck(!check);
    };
    const Details=ava===undefined?"":ava===true?"AVAILABLE":"UNAVAILABLE";
    return (
        <div>
            <TitleHeader name={'Checkout Product'} />
            <div className='BuyerCheckout-main'>
            <DNA visible={s} height={100} width={100} wrapperStyle={{'margin-top':'20'}}/>
                <div style={{'display':'flex'}}><div className='BuyerCheckout-title'>
                    {location.state.title}
                </div>
                <div style={{'margin-left':'75%','margin-top':'40px'}}>{Details}</div>
                </div>
                <hr />
                <div className='BuyerChekout-description'>
                    <div className='BuyerCheckout-description-title'>
                        {'Description'}
                    </div>
                    <div className='BuyerCheckout-description-content'>
                        {location.state.description}
                    </div>
                </div>
                <hr />
                <div className='BuyerCheckout-address'>
                    <div className='BuyerCheckout-add'>Address</div>
                    <div className='BuyerCheckout-Buyeraddress'>
                        {Buyer.address}
                    </div>
                </div>
                <hr />
                <div className='BuyerCheckout-confirmdiv'>
                    <input
                        onChange={handlechange}
                        type='checkbox'
                        className='BuyerCheckout-check'
                        defaultChecked={false}
                    />
                    <span className='BuyerCheckout-confirm'>
                        Confirm Payment
                    </span>
                    <span className='BuyerCheckout-total'>{'Total'}</span>
                    <div className='BuyerCheckoutPrice'>
                        <div>{location.state.price}</div>
                        <div className='BuyerCheckoutPrice-priceformat'>
                            {location.state.formatofprice}
                        </div>
                    </div>
                </div>
                <div className='BuyerCheckout-buttons'>
                    <div className='BuyerCheckout-button'>
                        <Link to='/'>
                            <Button icon={backspaceOutline} name={'Cancel'} />
                        </Link>
                    </div>

                    <div className='BuyerCheckout-button BuyerCheckout-placeorder'>
                        {check && ava && (
                            <Button
                                icon={checkboxMarkedCircleOutline}
                                name={'Place Order'}
                                handleClick={confirmpayment}
                            />
                        )}
                    </div>
                </div>
            </div>
          
        </div>
    );
                          };



export default BuyerCheckout;
