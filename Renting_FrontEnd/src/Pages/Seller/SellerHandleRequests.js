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
                .get('https://rentingsystem.herokuapp.com/seller/detail', {
                    headers: {
                        'auth-token': localStorage.getItem('auth_token'),
                    },
                })
                .then((response) => {
                    const data = response.data;
                    if (data.error) {
                        alert.error(data.msg);
                        return;
                    }
                    setSeller(response.data.seller[0]._id);
                    axios
                        .post(
                            'https://rentingsystem.herokuapp.com/seller/myrequest',
                            {
                                seller: response.data.seller[0]._id,
                            }
                        )
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
