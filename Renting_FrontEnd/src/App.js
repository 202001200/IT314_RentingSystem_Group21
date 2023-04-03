import './App.css';
import { NOT_LOGIN, BUYER_LOGIN, SELLER_LOGIN } from './Assets/Constant';
import Drawer from './components/Drawer/Drawer';
import Dashboard from './Pages/General/Dashboard';

function App() {
    return (
        <div className='App'>
            <div className='Drawer'>
                <Drawer page={NOT_LOGIN} />
            </div>
            <div className='Main-body'>
                <Dashboard />
            </div>
        </div>
    );
}

export default App;
