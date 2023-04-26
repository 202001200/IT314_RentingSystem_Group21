import React from 'react';
import CategoryCard from '../../components/Cardview/CategoryCard';
import TitleHeader from '../../components/header/TitleHeader';
import warehouseIcon from '@iconify-icons/mdi/warehouse';
import carHatchback from '@iconify-icons/mdi/car-hatchback';
import motorbikeIcon from '@iconify-icons/mdi/motorbike';
import monitorCellphone from '@iconify-icons/mdi/monitor-cellphone';
import usbFlashDriveOutline from '@iconify-icons/mdi/usb-flash-drive-outline';
import stringLights from '@iconify-icons/mdi/string-lights';
import tableChair from '@iconify-icons/mdi/table-chair';
import bandageIcon from '@iconify-icons/mdi/bandage';

const optionsCategory = [
    { value: 'Electronics', icon: monitorCellphone },
    { value: 'Furniture', icon: tableChair },
    { value: 'Essential', icon: bandageIcon },
    { value: 'Gadget', icon: usbFlashDriveOutline },
    { value: 'Decor', icon: stringLights },
    { value: '2-wheel', icon: motorbikeIcon },
    { value: '4-wheel', icon: carHatchback },
    { value: 'House', icon: warehouseIcon },
];

const Category = () => {
    
  
    const cards = [];
    for (var i = 0; i < 8; i++) {
        cards.push(
            <CategoryCard
                key={i}
                category={optionsCategory[i].value}
                icon={optionsCategory[i].icon}
            />
        );
    }
    return (
        <div className='BuyerWishlist-page'>
            <TitleHeader name={'Category Filter'} />
            <div className='Category-card'>{cards}</div>
        </div>
      );
};

export default Category;
