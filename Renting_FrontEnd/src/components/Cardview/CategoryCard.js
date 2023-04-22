import React from 'react';

import './style.css';
const CategoryCard = (props) => {
    return (
        <div className='AddressCard-main'>
      <div className='AddressCard-name-body'>
        <p className='AddressCard-name'>{props.category}</p>
      </div>

    </div>
    );
};
CategoryCard.defaultProps = {
    category: 'electronics',

  };

export default CategoryCard;
