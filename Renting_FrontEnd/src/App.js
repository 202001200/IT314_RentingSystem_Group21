import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NOT_LOGIN, BUYER_LOGIN, SELLER_LOGIN } from './Assets/Constant';
import Drawer from './components/Drawer/Drawer';
import Dashboard from './Pages/General/Dashboard';
import Category from './Pages/General/Category';
import SignOut from './Pages/General/SignOut';
import HelFAQ from './Pages/General/HelpFAQ';
import ContactUs from './Pages/General/ContactUs';

import BuyerAddresses from './Pages/Buyer/BuyerAddresses';
import BuyerWishlist from './Pages/Buyer/BuyerWishlist';
import BuyerLiveProduct from './Pages/Buyer/BuyerLiveProduct';
import BuyerProfile from './Pages/Buyer/BuyerProfile';
import BuyerMyOrder from './Pages/Buyer/BuyerMyOrder';
import BuyerViewProduct from './Pages/Buyer/BuyerViewProduct';
import BuyerCheckout from './Pages/Buyer/BuyerCheckout';
import BuyerSignup from './Pages/Buyer/BuyerSignup';
import BuyerLogin from './Pages/Buyer/BuyerLogin';

import SellerActiveProduct from './Pages/Seller/SellerActiveProduct';
import SellerAddProduct from './Pages/Seller/SellerAddProduct';
import SellerAllProducts from './Pages/Seller/SellerAllProducts';
import SellerHandleRequests from './Pages/Seller/SellerHandleRequests';
import SellerManageProduct from './Pages/Seller/SellerManageProduct';
import SellerViewProduct from './Pages/Seller/SellerViewProduct';
import SellerProfile from './Pages/Seller/SellerProfile';
import SellerSignup from './Pages/Seller/SellerSignup';
import SellerLogin from './Pages/Seller/SellerLogin';

function App() {
    return (
        <div className='App'>
            <Router>
                <div className='Drawer'>
                    <Drawer page={BUYER_LOGIN} />
                </div>
                <div className='Main-body'>
                    <Switch>
                        {/* general route  */}
                        <Route exact path='/'>
                            <Dashboard />
                        </Route>
                        <Route path='/category'>
                            <Category />
                        </Route>
                        <Route path='/help'>
                            <HelFAQ />
                        </Route>
                        <Route path='/contactus'>
                            <ContactUs />
                        </Route>
                        {/* buyer route  */}
                        <Route path='/buyer/wishlist'>
                            <BuyerWishlist />
                        </Route>
                        <Route path='/buyer/order'>
                            <BuyerMyOrder />
                        </Route>
                        <Route path='/buyer/liveorder'>
                            <BuyerLiveProduct />
                        </Route>
                        <Route path='/buyer/address'>
                            <BuyerAddresses />
                        </Route>
                        <Route path='/buyer/profile'>
                            <BuyerProfile />
                        </Route>
                        <Route path='/buyer/signout'>
                            <SignOut />
                            {/* we will implement function here  */}
                        </Route>
                        <Route path='/buyer/login'>
                            <BuyerLogin />
                        </Route>
                        <Route path='/buyer/register'>
                            <BuyerSignup />
                        </Route>
                        {/* below are not in button  */}
                        <Route path='/buyer/product'>
                            <BuyerViewProduct />
                        </Route>
                        <Route path='/buyer/checkout'>
                            <BuyerCheckout />
                        </Route>
                        {/* SellerRoutes */}
                        <Route path='/seller/addproduct'>
                            <SellerAddProduct />
                        </Route>
                        <Route path='/seller/manage'>
                            <SellerManageProduct />
                        </Route>
                        <Route path='/seller/active'>
                            <SellerActiveProduct />
                        </Route>
                        <Route path='/seller/myproducts'>
                            <SellerAllProducts />
                        </Route>
                        <Route path='/seller/request'>
                            <SellerHandleRequests />
                        </Route>
                        <Route path='/seller/profile'>
                            <SellerProfile />
                        </Route>
                        <Route path='/seller/signout'>
                            <SignOut />
                            {/* we will implement function here  */}
                        </Route>
                        <Route path='/seller/login'>
                            <SellerLogin />
                        </Route>
                        <Route path='/seller/register'>
                            <SellerSignup />
                        </Route>
                        {/* below are not in button  */}
                        <Route path='/seller/product'>
                            <SellerViewProduct />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;