import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddressCard from '../../components/Cardview/AddressCard';
import TitleHeader from '../../components/header/TitleHeader';
import { useAlert } from 'react-alert';
import './style.css';

const BuyerAddresses = () => {
    const cards = [];
    const alert = useAlert();
  
    const [Addresses, setData] = useState([]);
  
    useEffect(() => {
      const fetch = () => {
          axios
              .get('https://rentbuddy.onrender.com/borrower/detail', {
                  headers: {
                      'auth_token': localStorage.getItem('auth_token'),
                      "api-key":'$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa'
                  },
              })
              .then((response) => {
                  const data = response.data;
                  if (data.error) {
                      alert.error(data.msg);
                      return;
                  }
                  console.log(data);
                  axios
                      .post(
                          'https://rentbuddy.onrender.com/borrower/address',
                          {
                              borrower: data._id
                          }
                      ,{
                        headers:{
                            "api-key":'$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa'
                        }
                      })
                      .then((response) => {
                        console.log(response);
                          const data = response.data;
                          if (data.error) {
                              alert.error(data.msg);
                              setData([]);
                          } else {
                              setData(data.data);
                          }
                      })
                      .catch((e) => {
                          console.log(e);
                      });
              })
              .catch((e) => {
                  console.log(e);
              });
      };

      fetch();
  }, [alert]);

  return (
      <div className='BuyerAddresses-main'>
          <TitleHeader name={'Seller Address'} />
          <div className='BuyerAddresses-main-card'>
              {Addresses.map((product, index) => {
                  return <AddressCard key={index} address={product} />;
              })}
          </div>
      </div>
  );
};

export default BuyerAddresses;
