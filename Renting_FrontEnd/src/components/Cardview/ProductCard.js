import './style.css';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo512.png';

const Cardview = (props) => {
    return (
        <Link to='/buyer/product'>
          <div className='ProductCardview'>
            <img src={logo} className='ProductCardview-image' alt={'logo'} />
            <p className='ProductCardview-title'>{props.title}</p>
            <div className='ProductCardview-price-body'>
              <p className='ProductCardview-price'>{props.price}</p>
              <p className='ProductCardview-formatprice'>{props.format}</p>
            </div>
        
          </div>
        </Link>
      );
    };

Cardview.defaultProps = {
    title: 'Sony Camera',
    price: '25$',
    format: '/month',
  };
  

export default Cardview;
