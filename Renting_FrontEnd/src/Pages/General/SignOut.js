import React from 'react';
import './style.css';
import Button from '../../components/Button/Button';
import closeCircleOutline from '@iconify-icons/mdi/close-circle-outline';
import checkboxMarkedCircle from '@iconify-icons/mdi/checkbox-marked-circle';

const SignOut = () => {
    return (
        <div className='SignOut-main'>
          <div className='SignOut-Title'>Sign Out</div>
          <div className='SignOut-namebody'>Are you sure ?</div>
          <div className='SignOut-Buttondiv'>
            <div className='SignOut-Buttons'>
              <Button icon={closeCircleOutline} name={'Cancel'} />
            </div>
            <div className='SignOut-Buttons'>
              <Button icon={checkboxMarkedCircle} name={'Yes'} />
            </div>
          </div>
        </div>
      );return <div>SignOut</div>;
};

export default SignOut;
