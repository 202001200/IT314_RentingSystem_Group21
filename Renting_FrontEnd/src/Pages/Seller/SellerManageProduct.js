
import React, { useState } from 'react';
import { storage } from '../Firebase/index';
import TitleHeader from '../../components/header/TitleHeader';
import AddProductInput from '../../components/Input/AddProductInput';
import layersOutline from '@iconify-icons/mdi/layers-outline';
import fileDocumentOutline from '@iconify-icons/mdi/file-document-outline';
import cashMultiple from '@iconify-icons/mdi/cash-multiple';
import Select from 'react-select';

const optionsFormatofPrice = [
  { value: '/day', label: 'Per day' },
  { value: '/3-days', label: 'Per 3-days' },
  { value: '/week', label: 'Per week' },
  { value: '/15-days', label: 'Per 15-days' },
  { value: '/month', label: 'Per month' },
  { value: '/6-months', label: 'Per 6-months' },
  { value: '/year', label: 'Per year' },
];

const optionsCategory = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Essential', label: 'Essential' },
  { value: 'Gadget', label: 'Gadget' },
  { value: 'Decor', label: 'Decor' },
  { value: '2-wheel', label: '2-wheel' },
  { value: '4-wheel', label: '4-wheel' },
  { value: 'House', label: 'House' },
];


const SellerManageProduct = () => {
    const [selectedFile, setFile] = useState(null);
  const [image, setImageURL] = useState(null);
  const [imagepath, setImagepath] = useState(null);
  const [progress, setProgress] = useState(0);
  const [term, setTerm] = useState(false);
  const [fop, setFOP] = useState('');
  const [category, setCategory] = useState('');

  const handleInputChanges = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
      setImageURL(URL.createObjectURL(event.target.files[0]));
    }
  };

  const changeFOPoption = (event) => {
    setFOP(event.label);
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

  return (
    <div>
      <TitleHeader name={'Manage Product'} />
      <div className='SellerAddproduct-main'>
        <div className='SellerAddProduct-body'>
          <div className='SellerAddProduct-left'>
            <div className='SellerAddproduct-image'>
              <img
                src={
                  image || 'http://via.placeholder.com/200?text=Upload+image'
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
              <div className='SellerAddProduct-upload' onClick={handleClick}>
                Select new image
              </div>
              <div className='SellerAddProduct-upload' onClick={handleOnClick}>
                Upload new image
              </div>
            </div>
          </div>
          <div className='SellerAddProduct-right'>
            <AddProductInput
              icon={layersOutline}
              placeholder={'Product Name, Title'}
              type={'text'}
            />
            <AddProductInput
              icon={fileDocumentOutline}
              placeholder={'Product Description'}
              type={'text'}
            />
            <hr />
            <AddProductInput
              icon={cashMultiple}
              placeholder={'Product Price'}
              type={'text'}
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
            {false && <div className='SellerAddProduct-error'>error</div>}
            <div className='SellerAddProduct-upload-body'>
              <div className='SellerAddProduct-upload'>Update Information</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SellerManageProduct.defaultProps = {
    title: 'Sony Camera',
    price: '25$',
    format: '/month',
    category: 'Camera',
  };

export default SellerManageProduct;
