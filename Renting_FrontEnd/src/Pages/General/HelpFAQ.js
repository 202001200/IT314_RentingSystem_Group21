import React from 'react';
import FAQButton from './FAQButton'
import './style.css';

import Icon from '@iconify/react';
import messagePlusOutline from '@iconify-icons/mdi/message-plus-outline';

const FAQCategory = [
    {value: 'Buyer FAQs'},
    {value: 'Seller FAQs'},
    {value: 'Payment/Refund'},
    {value: 'order'},
    {value: 'Other'},
];
const QueAns = [
    {que: 'How do I search for a product?', ans: 'The Renting System web app provides search bar at the top, you can search item by name, by category, by seller name, by brand, by price or other features.', type: 'Buyer'},
    {que: 'How can I contact a Seller?', ans: 'First of all you have to log into your account and then you can get seller information by Request seller info option(button) if that seller allows then you can get otherwise not.'},
    {que: 'Points to remember while checking a product?', ans: 'you can look at the image of product provided by the seller, check if it is available or not, its working conditions, see the price carefully, look at the period of get the product on rent and if you want to be more secure then request seller details (it is provided in the system)', type: 'Buyer'},
    {que: 'How can I see my list of products which I have bought for rent and the products I have ever bought from the Renting System?', ans: 'The products which you have bought and you are holding currently can be seen in the live product option and the product history of all the products is in the my order section', type: 'Buyer'},

    {que: 'Who can see my personal information?', ans: 'Your personal information is secure in our system, it will be visible to any buyer if he/she requests to see and if you would allow then only it will be shown.', type: 'Seller'},
    {que: 'How can I add new product for renting out?', ans: 'For that you have to signup and/or login as seller and than select add product option and you will see the page where you have to 1: upload image/images of your product 2: fill the form and provide necessary information of product which are asked 3: Accept terms and conditions 4: Finally click on the upload product your product is uploaded for renting out.', type: 'Seller'},
    {que: 'What can I provide in ID proof field?', ans: 'You can provide any identity proof approved by the Authority like Aadhar card number, PAN card number, driving license number etc.', type: 'Seller'},
    {que: 'How can I remove my product from website?', ans: 'The product can be removed by manage order functionality and you can also update the product details from there'},

    {que: 'How can I make payment of product on website?', ans: 'After selecting buy now option, you will get a checkout page and there you have to check confirm payment and when you will place order the payment will be made by the system automatically.', type: 'payment'},
    {que: 'Is my payment refundable?', ans: 'No, the refund functionality of the payment is not available', type: 'payment'},
    {que: 'Is COD option available for payment?', ans: 'No, the COD option for payment is not currently availablein the system.',type: 'payment'},

    {que: 'Can I cancel the order which is placed?', ans: 'No, you can not cancel the order after placing the order and confirm the payment because of the policies.',type: 'order'},
    {que: 'What if my ordered item is not delivered in the time period given?', ans: 'There can be some unfortunate event.In this situation you can contact us by the contacts provided by us.',type: 'order'},
    {que: 'How can I return the product after the renting period gets over?', ans: 'For returning the product you have to contact the seller, the Renting System itself is not responsible for that.',type: 'order'},

    {que: 'How can I sign up as seller?', ans: 'On the signup page, at the bottom the option is provided "Sign up as seller" there you can do so.',type: 'other'},
    {que: 'What is the wishlist feature in the system?', ans: 'In the wishlist option you can see the products which you have added in the wishlist and it is useful because among the plenty of products if you like some product and want to see that again, you can add it in the wishlist so you can access it easily without searching again and again.',type: 'other'},
    {que: 'How can I save the login credentials?', ans: 'When you enter the credentials first time you can just check the box "Remember me" it will save your login information so that you dont have to enter it again and again and dont need to remember ',type: 'other'},

];

const HelpFAQ = () => {
  return (
    <div className="HelpFAQ-main">
        <div className="HelpFAQ-image">
          <h1 className="HelpFAQ-title">HIII! HOW CAN I HELP YOU?</h1>
        </div>
        <div className="HelpFAQ-body">
          <div className="HelpFAQ-que"> 
            <a href='#buyer-FAQ'>
              <FAQButton title={FAQCategory[0].value}/>
            </a>
            <a href='#seller-FAQ'>
              <FAQButton title={FAQCategory[1].value}/>
            </a>
            <a href='#payment-FAQ'>
              <FAQButton title={FAQCategory[2].value}/>
            </a>
            <a href='#order-FAQ'>
              <FAQButton title={FAQCategory[3].value}/>
            </a>
            <a href='#other-FAQ'>
              <FAQButton title={FAQCategory[4].value}/>
            </a>

           </div>
          <div className="HelpFAQ-ans">
            <div id="buyer-FAQ">
              <p className="HelpFAQ-question"> {QueAns[0].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[0].ans}</p>
              <hr />
              <p className="HelpFAQ-question"> {QueAns[1].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[1].ans}</p>
              <hr />
              <p className="HelpFAQ-question"> {QueAns[2].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[2].ans}</p>
              <hr />
              <p className="HelpFAQ-question"> {QueAns[3].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[3].ans}</p>
              <hr />
            </div>
            <div id='seller-FAQ'>
                <p className="HelpFAQ-question"> {QueAns[4].que}</p>
                <p className="HelpFAQ-answer"> {QueAns[4].ans}</p>
                <hr />
                <p className="HelpFAQ-question"> {QueAns[5].que}</p>
                <p className="HelpFAQ-answer"> {QueAns[5].ans}</p>
                <hr />
                <p className="HelpFAQ-question"> {QueAns[6].que}</p>
                <p className="HelpFAQ-answer"> {QueAns[6].ans}</p>
                <hr />
                <p className="HelpFAQ-question"> {QueAns[7].que}</p>
                <p className="HelpFAQ-answer"> {QueAns[7].ans}</p>
                <hr/>
            </div>
            <div id='payment-FAQ'>
              <p className="HelpFAQ-question"> {QueAns[8].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[8].ans}</p>
              <hr />
              <p className="HelpFAQ-question"> {QueAns[9].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[9].ans}</p>
              <hr />
              <p className="HelpFAQ-question"> {QueAns[10].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[10].ans}</p>
              <hr/>
          </div>
          <div id='order-FAQ'>
              <p className="HelpFAQ-question"> {QueAns[11].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[11].ans}</p>
              <hr />
              <p className="HelpFAQ-question"> {QueAns[12].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[12].ans}</p>
              <hr />
              <p className="HelpFAQ-question"> {QueAns[13].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[13].ans}</p>
              <hr/>
          </div>
 <div id='other-FAQ'>
              <p className="HelpFAQ-question"> {QueAns[14].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[14].ans}</p>
              <hr />
              <p className="HelpFAQ-question"> {QueAns[15].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[15].ans}</p>
              <hr />
              <p className="HelpFAQ-question"> {QueAns[16].que}</p>
              <p className="HelpFAQ-answer"> {QueAns[16].ans}</p>
              <hr/>
      </div>
      </div>

            </div>
<hr />
        <div className="ContactUs-div">
          <div className="ContactUs-imagediv">
            <a
              href="https://github.com/RentingSystemSE/6-RentingSystem/discussions"
              target="blank"
            >
              <Icon icon={messagePlusOutline} className="ContactUs-image" />
            </a>
          </div>
          <div className="ContactUs-namediv">Post Your Query Here!</div>
        </div>
      </div>
   );     
};
export default HelpFAQ;