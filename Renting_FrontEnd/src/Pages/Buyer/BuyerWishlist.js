import React from 'react'
import GeneralCard from '../../components/Cardview/GeneralCard'

const BuyerWishlist = () => {
    const cards = [];
    for (var i = 0; i < 5; i++) {
        cards.push(<GeneralCard key={i} />);
    }
    return (
        <div className='main-body' >
            <div className='Main-card'>{cards}</div>
        </div>
    )
}

export default BuyerWishlist
