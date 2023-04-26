import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { NOT_LOGIN, BUYER_LOGIN, SELLER_LOGIN } from '../../Assets/Constant';
import DrawerButton from './DrawerButton';
import shoppingIcon from '@iconify-icons/mdi/shopping';
import heartIcon from '@iconify-icons/mdi/heart';
import helpCircle from '@iconify-icons/mdi/help-circle';
import accountCircle from '@iconify-icons/mdi/account-circle';
import accountCog from '@iconify-icons/mdi/account-cog';
import shapeIcon from '@iconify-icons/mdi/shape';
import walletIcon from '@iconify-icons/mdi/wallet';
import logoutVariant from '@iconify-icons/mdi/logout-variant';
import phoneCheck from '@iconify-icons/mdi/phone-check';
import accountArrowRight from '@iconify-icons/mdi/account-arrow-right';
import layersIcon from '@iconify-icons/mdi/layers';
import mapMarkerRadius from '@iconify-icons/mdi/map-marker-radius';
import layersPlus from '@iconify-icons/mdi/layers-plus';
import textBoxCheck from '@iconify-icons/mdi/text-box-check';
//import layersMinus from '@iconify-icons/mdi/layers-minus';

const Drawer = (props) => {
     return (
    <div className='Drawer-body'>
      <div>
        <Link to='/'>
          <div className='Drawer-header'>
            <p className='Drawer-logo'>RentBuddy</p>
            <p className='Drawer-title'>Rent More, Worry Less</p>
          </div>
        </Link>
        <div className='Drawer-menu'>
          <Link to='/'>
            <DrawerButton icon={layersIcon} text={'All Products'} />
          </Link>
          <Link to='/category'>
            <DrawerButton icon={shapeIcon} text={'Category'} />
          </Link>
          {props.page === NOT_LOGIN && (
            <React.Fragment>
              <Link to='/buyer/login'>
                <DrawerButton icon={accountArrowRight} text={'Sign In'} />
              </Link>
              {/* <Link to='/buyer/register'>
                <DrawerButton icon={accountCog} text={'Sign Up'} />
              </Link> */}
            </React.Fragment>
          )}
          {props.page === BUYER_LOGIN && (
            <React.Fragment>
              <Link to='/buyer/wishlist'>
                <DrawerButton icon={heartIcon} text={'Wishlist'} />
              </Link>
              <Link to='/buyer/order'>
                <DrawerButton icon={shoppingIcon} text={'My Orders'} />
              </Link>
              <Link to='/buyer/liveorder'>
                <DrawerButton icon={textBoxCheck} text={'Live Orders'} />
              </Link>
              <Link to='/buyer/address'>
                <DrawerButton icon={mapMarkerRadius} text={'Addresses'} />
              </Link>
              <Link to='/buyer/profile'>
                <DrawerButton icon={accountCircle} text={'Profile'} />
              </Link>
              <Link to='/buyer/signout'>
                <DrawerButton icon={logoutVariant} text={'Sign Out'} />
              </Link>
            </React.Fragment>
          )}
          {props.page === SELLER_LOGIN && (
            <React.Fragment>
              <Link to='/seller/addproduct'>
                <DrawerButton icon={layersPlus} text={'Add Product'} />
              </Link>
              
              <Link to='/seller/active'>
                <DrawerButton icon={shoppingIcon} text={'Sold Products'} />
              </Link>
              <Link to='/seller/myproducts'>
                <DrawerButton icon={walletIcon} text={'My Products'} />
              </Link>
              <Link to='/seller/request'>
                <DrawerButton icon={mapMarkerRadius} text={'Requests'} />
              </Link>
              <Link to='/seller/profile'>
                <DrawerButton icon={accountCircle} text={'Profile'} />
              </Link>
              <Link to='/seller/signout'>
                <DrawerButton icon={logoutVariant} text={'Sign Out'} />
              </Link>
            </React.Fragment>
          )}
          <Link to='/help'>
            <DrawerButton icon={helpCircle} text={'Help & FAQ'} />
          </Link>
          <Link to='/contactus'>
            <DrawerButton icon={phoneCheck} text={'Contact Us'} />
          </Link>
    </div>
     </div>
      <p className='Drawer-footer-text'>
        Renting System <span className='Drawer-big'>&copy;</span> 2023. All rights reserved.
      </p>
    </div>
  );
};

Drawer.defaultProps = {
    page: NOT_LOGIN,
};

export default Drawer;
