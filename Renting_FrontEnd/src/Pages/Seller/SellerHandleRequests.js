import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import RequestCard from '../../components/Cardview/RequestCard';
import TitleHeader from '../../components/header/TitleHeader';
import { useAlert } from 'react-alert';

const SellerHandleRequests = (props) => {
    const alert = useAlert();
    const [requests, setRequests] = useState([]);
    const [seller, setSeller] = useState('');

    useEffect(() => {
        const fetch = () => {
            axios
                .get('https://rentbuddy.onrender.com/lender/detail', {
                    headers: {
                        'auth-token': localStorage.getItem('auth_token'),
                        'api-key':'$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa'
                    },
                })
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    if (data.error) {
                        alert.error(data.msg);
                        return;
                    }
                    setSeller(response.data.lenderData);
                    axios
                        .post(
                            'https://rentbuddy.onrender.com/lender/myrequest',
                            {
                                lender: response.data.lenderData._id,
                            }
                        ,{
                            headers:{
                                'api-key':'$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa'
                            }
                        })
                        .then((response) => {
                            const data = response.data;
                            if (data.error) {
                                alert.error(data.msg);
                            } else {
                                setRequests(data.data);
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
            <TitleHeader name={'Handle Requests'} />
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
