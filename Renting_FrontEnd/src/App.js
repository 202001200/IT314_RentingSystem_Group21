import './App.css';
import { NOT_LOGIN, BUYER_LOGIN, SELLER_LOGIN } from './Assets/Constant';
import Drawer from './components/Drawer/Drawer';
import BuyerAddresses from './Pages/Buyer/BuyerAddresses';
import Dashboard from './Pages/General/Dashboard';
import BuyerViewProduct from './Pages/Buyer/BuyerViewProduct';
import BuyerCheckout from './Pages/Buyer/BuyerCheckout';

function App() {
    return (
        <div className='App'>
            <div className='Drawer'>
                <Drawer page={NOT_LOGIN} />
            </div>
            <div className='Main-body'>
            
                <BuyerAddresses />
            </div>
        </div>
    );
}
export default App;