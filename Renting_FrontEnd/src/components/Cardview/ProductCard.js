import './style.css';
import { Link } from 'react-router-dom';
import logo from '../../Assets/signinposter2.png';

const Cardview = (props) => {
  return (
    <div className='ProductCardview'>
      <Link to='/buyer/product'>
        <div className='ProductCardview-sub'>
          <div className='ProductCardview-imagediv'>
            <img src={logo} className='ProductCardview-image' alt={'logo'} />
          </div>
          <div className='ProductCardview-details'>
            <div className='ProductCardview-title'>{props.title}</div>
            <div className='ProductCardview-price-body'>
              {props.price + ' ' + props.format}
            </div>
          </div>
        </div>

      </Link>
    </div>
  );
};

Cardview.defaultProps = {
  title: 'Sony Camera',
  price: '25$',
  format: '/month',
};


export default Cardview;
