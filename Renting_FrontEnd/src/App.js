import './App.css';
import { NOT_LOGIN, BUYER_LOGIN, SELLER_LOGIN } from './Assets/Constant';
import Drawer from './components/Drawer/Drawer';
import Dashboard from './Pages/General/Dashboard';
import BuyerViewProduct from './Pages/Buyer/BuyerViewProduct';


function App() {
    return (
        <div className='App'>
          <div className='Drawer'>
            <Drawer />
          </div>
          <div className='Main-body'>
            <BuyerViewProduct />
          </div>
        </div>
      );
}

export default App;
