import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import RequestCard from '../../components/Cardview/RequestCard';
import TitleHeader from '../../components/header/TitleHeader';

const SellerHandleRequests = (props) => {
  const [requests, setRequests] = useState([]);
  const [seller, setSeller] = useState('');

  useEffect(() => {
      const fetch = () => {
          axios
              .get('https://rentingsystem.herokuapp.com/seller/detail', {
                  headers: {
                      'auth-token': localStorage.getItem('auth_token'),
                  },
              })
              .then((response) => {
                  setSeller(response.data.seller[0]._id);
                  axios
                      .post(
                          'https://rentingsystem.herokuapp.com/seller/myrequest',
                          {
                              seller: response.data.seller[0]._id,
                          }
                      )
                      .then((response) => {
                          setRequests(response.data.data);
                          console.log(response.data.data);
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
  }, []);

  return (
      <div className='BuyerAddresses-main'>
          <TitleHeader name={'Handle Request'} />
          <div className='BuyerAddresses-main-card'>
              {requests.map((request) => {
                  return (
                      <RequestCard
                          key={request._id}
                          buyer={request}
                          seller={seller}
                      />
                  );
              })}
          </div>
      </div>
  );
        };
export default SellerHandleRequests;
