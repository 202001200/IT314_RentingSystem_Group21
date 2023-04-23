import React from 'react';
import './style.css';
import Button from '../../components/Button/Button';
import checkboxMarkedCircleOutline from '@iconify-icons/mdi/checkbox-marked-circle-outline';
import closeCircleOutline from '@iconify-icons/mdi/close-circle-outline';
// npm install --save-dev @iconify/react @iconify-icons/mdi
import { Icon, InlineIcon } from '@iconify/react';
import checkboxMarkedCircle from '@iconify-icons/mdi/checkbox-marked-circle';

const RequestCard = (props) => {
  return (
    <div className='RequestCard-main'>
      <div className='RequestCard-namebody'>{props.buyer}</div>
      <div className='RequestCard-mailbody'>{props.email}</div>
      <div className='RequestCard-productbody'>{props.productname}</div>
      <div className='RequestCard-Buttondiv'>
        <div className='RequestCard-Buttons'>
          <Button icon={checkboxMarkedCircle} name={'Accept'} />
        </div>
        <div className='RequestCard-Buttons'>
          <Button icon={closeCircleOutline} name={'Decline'} />
        </div>
      </div>
    </div>
  );
};

RequestCard.defaultProps = {
  buyer: 'Harshad Mehta',
  email: 'harshad_mehta@gmail.com',
  productname: 'Sony Camera',
};

export default RequestCard;