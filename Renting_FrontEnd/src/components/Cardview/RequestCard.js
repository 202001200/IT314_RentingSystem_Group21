import React from 'react';
import axios from 'axios';
import './style.css';
import Button from '../../components/Button/Button';
import closeCircleOutline from '@iconify-icons/mdi/close-circle-outline';
import checkboxMarkedCircle from '@iconify-icons/mdi/checkbox-marked-circle';
import { useAlert } from 'react-alert';

const RequestCard = (props) => {
  const alert = useAlert();
  const handleAccept = () => {
    axios
        .post('https://rentingsystem.herokuapp.com/seller/accept', {
            buyer: props.buyer._id,
            seller: props.seller,
        })
        .then((response) => {
            const data = response.data;
            if (data.error) {
                alert.error(data.msg);
            } else {
                alert.success(data.msg);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            console.log(response);
        })
        .catch((e) => {
            console.log(e);
        });
};

const handleDecline = () => {
    axios
        .post('https://rentingsystem.herokuapp.com/seller/decline', {
            buyer: props.buyer._id,
            seller: props.seller,
        })
        .then((response) => {
            const data = response.data;
            if (data.error) {
                alert.error(data.msg);
            } else {
                alert.success(data.msg);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            console.log(response);
        })
        .catch((e) => {
            console.log(e);
        });
};
return (
    <div className='RequestCard-main'>
        <div className='RequestCard-namebody'>
            {props.buyer.firstname + ' ' + props.buyer.lastname}
        </div>
        <div className='RequestCard-mailbody'>{props.buyer.email}</div>
        <div className='RequestCard-Buttondiv'>
            <div className='RequestCard-Buttons'>
                <Button
                    icon={checkboxMarkedCircle}
                    name={'Accept'}
                    handleClick={handleAccept}
                />
            </div>
            <div className='RequestCard-Buttons'>
                <Button
                    icon={closeCircleOutline}
                    name={'Decline'}
                    handleClick={handleDecline}
                />
            </div>
        </div>
    </div>
);
};




export default RequestCard;