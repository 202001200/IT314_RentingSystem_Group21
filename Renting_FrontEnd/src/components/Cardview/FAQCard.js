import React from 'react';

const FAQCard = (props) => {
    return (
        <div className='FAQCardview'>
             <h2 className='FAQCardview-title'>{props.title}</h2>
        </div>
    );
};
FAQCard.defaultProps = {
    title: 'Buyer FAQs',
};

export default FAQCard;