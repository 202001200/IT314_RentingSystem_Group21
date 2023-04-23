import React from 'react';
import FAQCard from '../../components/Cardview/FAQCard';
import './style.css';

import Icon from '@iconify/react';
import messagePlusOutline from '@iconify-icons/mdi/message-plus-outline';

const HelpFAQ = (props) => {
    const cards = [];
    for (var i = 0; i < 5; i++) {
      cards.push(<FAQCard key={i} />);
    }
    return (
        <div className='HelpFAQ-main'>
          <div className='HelpFAQ-image'>
            <h1 className='HelpFAQ-title'>HIII! HOW CAN I HELP YOU?</h1>
          </div>
          <div className='HelpFAQ-body'>
            <div className='HelpFAQ-que'> {cards} </div>
            <div className='HelpFAQ-ans'>
              <p className='HelpFAQ-question'> {props.question}</p>
              <p className='HelpFAQ-answer'> {props.answer}</p>
              <hr />
              <p className='HelpFAQ-question'> {props.question}</p>
              <p className='HelpFAQ-answer'> {props.answer}</p>
              <hr />
              <p className='HelpFAQ-question'> {props.question}</p>
              <p className='HelpFAQ-answer'> {props.answer}</p>
              <hr />
            </div>
          </div>
          <hr />
          <div className='ContactUs-div'>
            <div className='ContactUs-imagediv'>
              <a
                href='https://github.com/202001200/IT314_RentingSystem_Group21'
                target='blank'
              >
                <Icon icon={messagePlusOutline} className='ContactUs-image' />
              </a>
                    
            </div>
            
                        <div className='ContactUs-namediv'>Post Your Query Here!</div>
      </div>

            </div>

        
        

    );
};
HelpFAQ.defaultProps = {
      question: 'How can I contact a Seller?',
      answer:
        'Firstly, you will not be able to reach a seller unless you are logged into the system. Everyone must have a profile for security.',
    };
export default HelpFAQ;