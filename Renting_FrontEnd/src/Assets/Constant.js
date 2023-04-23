const NOT_LOGIN = 0;
const BUYER_LOGIN = 1;
const SELLER_LOGIN = 2;

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

export {
    NOT_LOGIN,
    BUYER_LOGIN,
    SELLER_LOGIN,
    optionsCategory,
    optionsFormatofPrice,
};
