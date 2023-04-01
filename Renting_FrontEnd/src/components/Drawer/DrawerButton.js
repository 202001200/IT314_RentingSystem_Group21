import './style.css';
import { Icon } from '@iconify/react';

const DrawerButton = (props) => {
    return (
        <div className='Drawer-button-body'>
            <Icon icon={props.icon} className='Drawer-button-icon' />
            <p className='Drawer-button-text'>{props.text}</p>
        </div>
    );
};

export default DrawerButton;
