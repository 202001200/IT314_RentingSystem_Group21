import React from 'react'
import GeneralCard from '../../components/Cardview/GeneralCard';


const BuyerMyOrder = () => {
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

export default BuyerMyOrder;