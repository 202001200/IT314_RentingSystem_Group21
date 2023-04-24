import './style.css';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo512.png';

const Cardview = (props) => {
   const product = props.product;
    return (
        <div className='ProductCardview'>
            <Link to={{ pathname: '/buyer/product', state: product }}>
                <div className='ProductCardview-sub'>
                    <div className='ProductCardview-imagediv'>
                        <img
                            src={product.imagepath || logo}
                            className='ProductCardview-image'
                            alt={'logo'}
                        />
                    </div>
                    <div className='ProductCardview-details'>
                        <div className='ProductCardview-title'>
                            {props.product.title}
                        </div>
                        <div className='ProductCardview-price-body'>
                            {props.product.price +
                                ' ' +
                                props.product.formatofprice}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};


export default Cardview;
