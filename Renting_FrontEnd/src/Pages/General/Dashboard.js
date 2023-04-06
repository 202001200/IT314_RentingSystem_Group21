import React from 'react';
import SearchHeader from '../../components/header/SearchHeader';
import ProductCard from '../../components/Cardview/ProductCard';
import './style.css';
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const cards=[];
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:3001/products").then((res)=>res.json()).then((d)=>setProducts(d.product));
    },[])
    if(products){
    for (var i = 0; i < products.length; i++) {
        cards.push(<ProductCard title={products[i].title} imagepath={products[i].imagepath} price={products[i].price} format={products[i].format}/>);
    }
}   
    return (
        <div className='Dashboard'>
            <SearchHeader />
            <div className='Main-card'>{cards}</div>
        </div>
    );
};

export default Dashboard;
