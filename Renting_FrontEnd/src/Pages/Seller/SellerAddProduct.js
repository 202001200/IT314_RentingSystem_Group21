import React, { useState, useEffect } from 'react';
import { storage } from '../Firebase/index';
import { optionsFormatofPrice, optionsCategory } from '../../Assets/Constant';
import TitleHeader from '../../components/header/TitleHeader';
import AddProductInput from '../../components/Input/AddProductInput';
import layersOutline from '@iconify-icons/mdi/layers-outline';
import fileDocumentOutline from '@iconify-icons/mdi/file-document-outline';
import cashMultiple from '@iconify-icons/mdi/cash-multiple';
import Select from 'react-select';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';


const SellerAddProduct = () => {
    const alert = useAlert();
    let history = useHistory();

    const [selectedFile, setFile] = useState(null); // for selected file
    const [image, setImageURL] = useState(null); // for load image
    const [progress, setProgress] = useState(0);

    const [imagepath, setImagepath] = useState(null); //for save in db
    const [fop, setFOP] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [seller, setSeller] = useState('');

    useEffect(() => {
        const fetch = () => {
            axios
                .get('https://rentingsystem.herokuapp.com/seller/detail', {
                    headers: {
                        'auth-token': localStorage.getItem('auth_token'),
                    },
                })
                .then((response) => {
                    const data = response.data;
                    if (data.error) {
                        alert.error(data.msg);
                    } else {
                        setSeller(response.data.seller[0]._id);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        fetch();
    }, [alert]);

    const handleInputChanges = (event) => {
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
            setImageURL(URL.createObjectURL(event.target.files[0]));
        }
    };

    const changeFOPoption = (event) => {
        setFOP(event.value);
        };

        const changeCategoryoption = (event) => {
        setCategory(event.label);
    };

    const handleOnClick = () => {
        if (!selectedFile) return;
        const uploadTask = storage
            .ref(`Products/${selectedFile.name}`)
            .put(selectedFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref('Products')
                    .child(selectedFile.name)
                    .getDownloadURL()
                    .then((url) => {
                        setImagepath(url);
                    });
            }
                );
                };

    const hiddenFileInput = React.useRef(null);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleInputTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleInputDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleInputPrice = (event) => {
        setPrice(event.target.value);
    };

    const handleOnSubmit = () => {
        axios
            .post('https://rentingsystem.herokuapp.com/product/seller', {
                title: title,
                description: description,
                imagepath: imagepath,
                price: price,
                formatofprice: fop,
                category: category,
                seller: seller,
            })
            .then(function (response) {
                const data = response.data;
                if (data.error) {
                    alert.error(data.msg);
                } else {
                    alert.success(data.msg);
                    return history.push('./../');
                                }
                                })
            .catch(function (error) {
                console.log(error);
            });
    };

                         return (
        <div>
            <TitleHeader name={'Add Product'} />
            <div className='SellerAddproduct-main'>
                <div className='SellerAddProduct-body'>
                    <div className='SellerAddProduct-left'>
                        <div className='SellerAddproduct-image'>
                            <img
                                src={
                                    image ||
                                    'http://via.placeholder.com/200?text=Upload+image'
                                }
                                alt={'Product'}
                                className='SellerAddproduct-image-content'
                            />
                        </div>

                        <div className='SellerAddproduct-image-selecter'>
                            {progress !== 0 && (
                                <progress
                                    value={progress}
                                    max='100'
                                    className='SellerAddProduct-progress'
                                />
                            )}
                            <input
                                type='file'
                                onChange={handleInputChanges}
                                accept='image/*'
                                name='Product'
                                className='file'
                                ref={hiddenFileInput}
                                style={{ display: 'none' }}
                            />
                            <div
                                className='SellerAddProduct-upload'
                                onClick={handleClick}
                            >
                                Select image
                            </div>
                            <div
                                className='SellerAddProduct-upload'
                                onClick={handleOnClick}
                            >
                                Upload image
                            </div>
                        </div>
                    </div>
                    <div className='SellerAddProduct-right'>
                        <AddProductInput
                            icon={layersOutline}
                            placeholder={'Product Name, Title'}
                            type={'text'}
                            handleInput={handleInputTitle}
                        />
                        <AddProductInput
                            icon={fileDocumentOutline}
                            placeholder={'Product Description'}
                            type={'text'}
                            handleInput={handleInputDescription}
                        />
                        <hr />
                        <AddProductInput
                            icon={cashMultiple}
                            placeholder={'Product Price'}
                            type={'number'}
                            handleInput={handleInputPrice}
                        />
                        <Select
                            className='SellerAddProduct-option'
                            options={optionsFormatofPrice}
                            placeholder={'Product Format of Price'}
                            onChange={changeFOPoption}
                            theme={(theme) => ({
                                ...theme,
                                border: '0',
                                colors: {
                                    ...theme.colors,
                                    neutral0: '#121212',
                                    primary25: 'black',
                                    primary: '#cfabfb',
                                    neutral20: '#121212',
                                    neutral80: 'white',
                                    primary50: 'black',
                                },
                            })}
                        />
                        <hr />
                        <Select
                            className='SellerAddProduct-option'
                            options={optionsCategory}
                            placeholder={'Product Category'}
                            onChange={changeCategoryoption}
                            theme={(theme) => ({
                                ...theme,
                                border: '0',
                                colors: {
                                    ...theme.colors,
                                    neutral0: '#121212',
                                    primary25: 'black',
                                    primary: '#cfabfb',
                                    neutral20: '#121212',
                                    neutral80: 'white',
                                    primary50: 'black',
                                },
                            })}
                        />
                        <hr />
                        <div className='SellerLogin-remember'>
                            <input
                                type='checkbox'
                                className='SellerLogin-checkbox'
                            />
                            <span className='SellerLogin-remember-text'>
                                Accept Terms & Conditions
                            </span>
                        </div>
                        <div className='SellerAddProduct-upload-body'>
                            <div
                                className='SellerAddProduct-upload'
                                onClick={handleOnSubmit}
                            >
                                Upload Product
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerAddProduct;
