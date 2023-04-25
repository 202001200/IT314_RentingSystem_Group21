import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchHeader from '../../components/header/SearchHeader';
import ProductCard from '../../components/Cardview/ProductCard';
import './style.css';

const Dashboard = () => {
      const [Products, setData] = useState([]);
  
useEffect(() => {
        const fetch = () => {
            axios
            .get('http://localhost:3001/products')
                .then((response) => {
                    setData(response.data.product);
                })
                .catch((e) => {
                    console.log(e);
                });
        };

    fetch();
    }, []);

    return (
        <div className='Dashboard'>
            <SearchHeader />
            <div className='Main-card'>
                {Products.map((product) => {
                    return <ProductCard key={product._id} product={product} />;
                })}
            </div>
        </div>
    );
};

export default Dashboard;
