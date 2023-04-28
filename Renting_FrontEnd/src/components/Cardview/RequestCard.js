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
        .post('https://rentbuddy.onrender.com/lender/accept',
        {
            borrower: props.buyer._id,
            lender: props.seller,
        },
        {
            headers:{
                "api-key":'$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa'
            }
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
        .post('https://rentbuddy.onrender.com/lender/decline', {
            borrower: props.buyer._id,
            lender: props.seller,
        },{
            headers:{
                "api-key":'$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa'
            }
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