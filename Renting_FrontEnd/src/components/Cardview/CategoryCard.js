import React from 'react';
import { Icon } from '@iconify/react';
import shapeIcon from '@iconify-icons/mdi/shape';

import './style.css';
const CategoryCard = (props) => {
    return (
         <div className='CategoryCard-main'>
            <Icon
                icon={props.icon}
                //className='Button-main-icon'
                className='CategoryCard-main-icon'
            />
            <p className='txt'>{props.category}</p>
        </div>
    );
};
CategoryCard.defaultProps = {
    category: 'electronics',
    icon: shapeIcon,
  };

export default CategoryCard;
