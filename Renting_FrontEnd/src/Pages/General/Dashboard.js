import React from 'react';
import DashboardHeader from '../../Components/Header/DashboardHeader';
import ProductCard from '../../Components/Cardview/ProductCard';
import './style.css';

const Dashboard = () => {
    const cards = [];
    for (var i = 0; i < 25; i++) {
        cards.push(<ProductCard key={i} />);
    }

    return (
        <div className='Dashboard'>
            <DashboardHeader />
            <div className='Main-card'>{cards}</div>
        </div>
    );
};

export default Dashboard;
