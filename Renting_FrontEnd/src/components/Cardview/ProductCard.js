import './style.css';
import logo from '../../Assets/logo512.png';

const Cardview = (props) => {
    return (
        <div className='ProductCardview'>
            <img src={logo} className='ProductCardview-image' alt={'logo'} />
            <p className='ProductCardview-title'>{props.title}</p>
            <div className='ProductCardview-price-body'>
                <p className='ProductCardview-price'>{props.price}</p>
                <p className='ProductCardview-formatprice'>{props.format}</p>
            </div>
        </div>
    );
};

Cardview.defaultProps = {
    title: 'Bicycle',
    price: '₹1200',
    format: '/month',
};

export default Cardview;
