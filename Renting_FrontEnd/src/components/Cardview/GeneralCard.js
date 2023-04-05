import React from 'react';
import './style.css';
import logo from '../../Assets/logo512.png';

//card for wishlist and myorders
const GeneralCard = (props) => {
    return (
        <div className='GeneralCardview'>

            <img src={logo} className='GeneralCardview-image' alt={'logo'} />
            <div className='ProductInfo'>
                <p className='GeneralCardview-title'>{props.title}</p>
                <div>
                    <ul>
                    <li><b>Price: </b>            {props.price} {props.format}</li>
                    <li><b>Description: </b>      {props.description}</li>
                    <li><b>Category:   </b>       {props.category}</li>
                    <li><b>Seller: </b>           {props.seller}</li>
                    <li><b>Status:   </b>         {props.status}</li>
                    </ul>
                </div>

            </div>

        </div>
    );
};

GeneralCard.defaultProps = {
    title: 'Sony Camera',
    price: '25$',
    format: '/month',
    description: 'Lorem ipsum dolor sit amet, klndfl mnbjksnd vmnkljnekvgn jwbfndoirbgvwjkbejlng ikhOWIRHNBJKNKLNJ n bkhb7897gndkjfbvdfvdjfconsectetur adipiscing elit. Nam finibus eleifend nuEtiam porttitor arcu ligula, vitae maximus ligula semper vel. Etiam iaculis tempor euismod. Pellentesque ultrices porta erat, ut hendrerit ligula vehicula id. Praesent at dapibus risus. Mauris vestibulum dignissim semper.',
    category: 'Camera',
    seller: 'john doe',
    status: 'rented out',
};

export default GeneralCard;
