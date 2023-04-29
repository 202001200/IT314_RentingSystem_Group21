import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddressCard from '../../components/Cardview/AddressCard';
import TitleHeader from '../../components/header/TitleHeader';
import { useAlert } from 'react-alert';
import './style.css';
import DNA from 'react-loader-spinner/dist/loader/Dna';

const BuyerAddresses = () => {
    const cards = [];
    const alert = useAlert();
  
    const [Addresses, setData] = useState([]);
    const [s,setS] =useState(true);
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
                        setS(false);
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
const loader = s?<div style={{'margin-top':'20%','margin-left':'47%'}}>
<DNA visible={s}/>
</div>:<></>;
  return (
      <div className='BuyerAddresses-main'>
          <TitleHeader name={'Seller Address'} />
          <div className='BuyerAddresses-main-card'>
            {loader}
              {Addresses.map((product, index) => {
                  return <AddressCard key={index} address={product} />;
              })}
          </div>
      </div>
  );
};

export default BuyerAddresses;
