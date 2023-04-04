import React from 'react';
import './style.css';
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
import accountCogOutline from '@iconify-icons/mdi/account-cog-outline';
import accountArrowRight from '@iconify-icons/mdi/account-arrow-right';
import accountArrowRightOutline from '@iconify-icons/mdi/account-arrow-right-outline';
import layersIcon from '@iconify-icons/mdi/layers';
import mapMarkerRadius from '@iconify-icons/mdi/map-marker-radius';
import layersPlus from '@iconify-icons/mdi/layers-plus';

const Drawer = (props) => {
    return (
        <div className='Drawer-body'>
          <div>
            <div className='Drawer-header'>
              <p className='Drawer-logo'>RS</p>
              <p className='Drawer-title'>Renting System</p>
            </div>
            <div className='Drawer-menu'>
              {props.page === NOT_LOGIN && (
                <React.Fragment>
                  <DrawerButton icon={layersIcon} text={'All Products'} />
                  <DrawerButton icon={shapeIcon} text={'Category'} />
                  <DrawerButton
                    icon={accountArrowRightOutline}
                    text={'Buyer SignIn'}
                  />
                  <DrawerButton icon={accountCogOutline} text={'Buyer SignUp'} />
                  <DrawerButton icon={accountArrowRight} text={'Seller SignIn'} />
                  <DrawerButton icon={accountCog} text={'Seller SignUp'} />
                  <DrawerButton icon={helpCircle} text={'Help & FAQ'} />
                  <DrawerButton icon={phoneCheck} text={'Contact'} />
                </React.Fragment>
              )}
              {props.page === BUYER_LOGIN && (
                <React.Fragment>
                  <DrawerButton icon={layersIcon} text={'All Products'} />
                  <DrawerButton icon={shapeIcon} text={'Category'} />
                  <DrawerButton icon={heartIcon} text={'Whislist'} />
                  <DrawerButton icon={shoppingIcon} text={'My Orders'} />
                  <DrawerButton icon={mapMarkerRadius} text={'Addresses'} />
                  <DrawerButton icon={helpCircle} text={'Help & FAQ'} />
                  <DrawerButton icon={phoneCheck} text={'Contact'} />
                  <DrawerButton icon={accountCircle} text={'Profile'} />
                  <DrawerButton icon={logoutVariant} text={'SignOut'} />
                </React.Fragment>
              )}
              {props.page === SELLER_LOGIN && (
                <React.Fragment>
                  <DrawerButton icon={layersIcon} text={'All Products'} />
                  <DrawerButton icon={shapeIcon} text={'Category'} />
                  <DrawerButton icon={layersPlus} text={'Add Product'} />
                  <DrawerButton icon={shoppingIcon} text={'My Products'} />
                  <DrawerButton icon={walletIcon} text={'Transactions'} />
                  <DrawerButton icon={mapMarkerRadius} text={'Requests'} />
                  <DrawerButton icon={helpCircle} text={'Help & FAQ'} />
                  <DrawerButton icon={phoneCheck} text={'Contact'} />

                  <DrawerButton icon={accountCircle} text={'Profile'} />
              <DrawerButton icon={logoutVariant} text={'SignOut'} />
            </React.Fragment>
          )}
        </div>
        </div>
      <p className='Drawer-footer-text'>
        Renting System <span className='Drawer-big'>&copy;</span> 2021
      </p>
    </div>
  );
};

Drawer.defaultProps = {
    page: BUYER_LOGIN,
};

export default Drawer;
