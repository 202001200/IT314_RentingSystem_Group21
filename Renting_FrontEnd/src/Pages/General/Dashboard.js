import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchHeader from '../../components/header/SearchHeader';
import ProductCard from '../../components/Cardview/ProductCard';
import './style.css';
import { useAlert } from 'react-alert';
import DNA from 'react-loader-spinner/dist/loader/Dna';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
    const alert = useAlert();
    const [spinner,setSpinner] =useState(true);
    const [Products, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const location = useLocation();
    useEffect(()=>{
        if(true){
            axios.get("https://rentbuddy.onrender.com/borrower/detail",{
                headers:{
                    "auth_token":localStorage.getItem("auth_token"),
                    "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                }
            }).then((response)=>{
                axios.get("https://rentbuddy.onrender.com/borrower/getmessage/"+response.data._id,
                {
                    headers:{
                        "api-key":"$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa"
                    }
                }).then((response)=>{
                    if(response.error){
                        alert.error("Please check your internet connection!");
                    }
                    else{
                        const messages=response.data.data;
                        let t=0;
                        const tId = setInterval(()=>{
                            if(t<messages[0].message.length){
                                console.log(t);
                                alert.info(messages[0].message[t]);
                                t=t+1;
                            }
                            else clearInterval(tId);
                        },1000);
                    }
                })
            })
        }
    },[])
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
                    console.log(data);
                    if (data.error) {
                        alert.error(data.msg);
                        setData([]);
                    } else {
                        setData(response.data.product);
                        setSpinner(false);
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
<DNA visible={spinner} wrapperStyle={{'margin-top':'20%'}}/>
                {Products.map((product) => {
                    return <ProductCard key={product._id} product={product} />;
                })}
            </div>
        </div>
    );
};

export default Dashboard;