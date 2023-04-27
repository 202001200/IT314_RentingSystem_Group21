//import { Link } from 'react-router-dom';
import React from 'react';
import './style.css';
import Button from '../../components/Button/Button';
import closeCircleOutline from '@iconify-icons/mdi/close-circle-outline';
import checkboxMarkedCircle from '@iconify-icons/mdi/checkbox-marked-circle';


  const SignOut = (props) => {
    return (
      <div className='SignOut-main'>
          <div className='SignOut-Title'>Sign Out</div>
          <div className='SignOut-namebody'>Are you sure ?</div>
          <div className='SignOut-Buttondiv'>
              <div className='SignOut-Buttons'>
                  <Button 
                      icon={closeCircleOutline}
                      name={'Cancel'}
                      handleClick={props.handleClick}
                  />
              </div>
              <div className='SignOut-Buttons'>
                  <Button
                      icon={checkboxMarkedCircle}
                      name={'Yes'}
                      handleClick={props.handleClick}
                  />
              </div>
          </div>
            </div>
        
    );
};

export default SignOut;
