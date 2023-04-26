import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchHeader from '../../components/header/SearchHeader';
import ProductCard from '../../components/Cardview/ProductCard';
import './style.css';
import { useAlert } from 'react-alert';

const Dashboard = () => {
    const alert = useAlert();
  
    const [Products, setData] = useState([]);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        const fetch = () => {
            axios

                .get('https://rentbuddy.onrender.com/products',{
                    headers:{
                        "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                    }
                  })
                .then((response) => {
                    const data = response.data;
                    if (data.error) {
                        alert.error(data.msg);
                        setData([]);
                    } else {
                        setData(response.data.product);
                        setFilter(response.data.product);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        };
        const handleInputChanges = (event) => {
            setFilter(
                Products.filter((product) => {
                    return (
                        product.title
                            .toLowerCase()
                            .indexOf(event.target.value.toLowerCase()) !== -1 ||
                        product.category
                            .toLowerCase()
                            .indexOf(event.target.value.toLowerCase()) !== -1
                    );
                })
            );
        };

        fetch();
    }, [alert]);
    const handleInputChanges = (event) => {
        setFilter(
            Products.filter((product) => {
                return (
                    product.title
                        .toLowerCase()
                        .indexOf(event.target.value.toLowerCase()) !== -1 ||
                    product.category
                        .toLowerCase()
                        .indexOf(event.target.value.toLowerCase()) !== -1
                );
            })
        );
    };

    return (
        <div className='Dashboard'>
         <SearchHeader handleChange={handleInputChanges} />
            <div className='Main-card'>
                {Products.map((product) => {
                    return <ProductCard key={product._id} product={product} />;
                })}
            </div>
        </div>
    );
};

export default Dashboard;