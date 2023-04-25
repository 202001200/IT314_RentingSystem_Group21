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
              .get('https://rentingsystem.herokuapp.com/buyer/detail', {
                  headers: {
                      auth_token: localStorage.getItem('auth_token'),
                  },
              })
              .then((response) => {
                  const data = response.data;
                  if (data.error) {
                      alert.error(data.msg);
                      return;
                  }
                  axios
                      .post(
                          'https://rentingsystem.herokuapp.com/buyer/address',
                          {
                              buyer: response.data.buyer[0]._id,
                          }
                      )
                      .then((response) => {
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
