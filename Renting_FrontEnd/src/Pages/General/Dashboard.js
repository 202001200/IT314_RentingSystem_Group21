import React from 'react';
import DashboardHeader from '../../components/header/DashboardHeader';
import ProductCard from '../../components/Cardview/ProductCard';
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
