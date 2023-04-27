
import React, { useState, useEffect } from 'react';
import { storage } from '../Firebase/index';
import TitleHeader from '../../components/header/TitleHeader';
import AddProductInput from '../../components/Input/AddProductInput';
import layersOutline from '@iconify-icons/mdi/layers-outline';
import fileDocumentOutline from '@iconify-icons/mdi/file-document-outline';
import cashMultiple from '@iconify-icons/mdi/cash-multiple';
import Select from 'react-select';

import { useLocation } from 'react-router-dom';
import { optionsFormatofPrice, optionsCategory } from '../../Assets/Constant';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

const SellerManageProduct = () => {
    let product = useLocation().state;
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
        setImagepath(product.imagepath);
        setFOP(product.formatofprice);
        setCategory(product.category);
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setSeller(product.seller);
    }, [product]);

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

    const handleUpdate = () => {
        axios
            .put(
                'https://rentbuddy.onrender.com/products/lender/' +
                    product._id,
                {
                    title: title,
                    description: description,
                    imagepath: imagepath,
                    price: price,
                    formatofprice: fop,
                    category: category,
                    lender: seller,
                },{
                    headers:{
                        'api-key':'$2b$10$LTVtuByThv1ese85aE1D..pDz0VHzR4VZ59IIAG292b13TgaQhZaa'
                    }
                }
                )
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
            <TitleHeader name={'Manage Product'} />
            <div className='SellerAddproduct-main'>
                <div className='SellerAddProduct-body'>
                    <div className='SellerAddProduct-left'>
                        <div className='SellerAddproduct-image'>
                            <img
                                src={
                                    image ||
                                    imagepath ||
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
                                Select new image
                            </div>
                            <div
                                className='SellerAddProduct-upload'
                                onClick={handleOnClick}
                            >
                                Upload new image
                            </div>
                        </div>
                    </div>
                    <div className='SellerAddProduct-right'>
                        <AddProductInput
                            icon={layersOutline}
                            placeholder={'Product Name, Title'}
                            type={'text'}
                            handleInput={handleInputTitle}
                            value={title}
                        />
                        <AddProductInput
                            icon={fileDocumentOutline}
                            placeholder={'Product Description'}
                            type={'text'}
                            handleInput={handleInputDescription}
                            value={description}
                        />
                        <hr />
                        <AddProductInput
                            icon={cashMultiple}
                            placeholder={'Product Price'}
                            type={'number'}
                            handleInput={handleInputPrice}
                            value={price}
                        />
                        <Select
                            className='SellerAddProduct-option'
                            options={optionsFormatofPrice}
                            placeholder={'Product Format of Price'}
                            onChange={changeFOPoption}
                            defaultValue={optionsFormatofPrice.filter(
                                (option) =>
                                    option.value === product.formatofprice
                            )}
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
                            defaultValue={optionsCategory.filter(
                                (option) => option.value === product.category
                            )}
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
                        {false && (
                            <div className='SellerAddProduct-error'>error</div>
                        )}
                        <div className='SellerAddProduct-upload-body'>
                            <div
                                className='SellerAddProduct-upload'
                                onClick={handleUpdate}
                            >
                                Update Information
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};



export default SellerManageProduct;
