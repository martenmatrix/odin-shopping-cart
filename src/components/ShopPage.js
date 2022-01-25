import './styles/ShopPage.css';
import { useState, createContext, useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import products from './data/products';

const searchParamsContext = createContext(); 

function FilterInput(props) {
    const key = props.objectKey;
    const value = props.value;
    const name =  props.name ? props.name : value;

    return (
        <>
            <input id={value} type="checkbox" data-key={key} name={name} />
            <label htmlFor={value}>{name}</label>
        </>
    )
}

function Sidebar() {
    const [searchParams, setSearchParams] = useContext(searchParamsContext);

    function getUnique(key) {
        const allValues = products.map(product => product[key]);
        const uniqueValues = [...new Set(allValues)];
        return uniqueValues;
    }

    const uniqueChipsets = getUnique('chipset');
    const uniqueSeries = getUnique('series');

    function getOldArray(key) {
        if (!searchParams.has(key)) return [];

        const searchParamString = searchParams.get(key);
        const filterArray = JSON.parse(searchParamString);
        return filterArray;
    }

    function addSearchParamToArray(key, valueToAdd) {
        const oldArray = getOldArray(key);
        const newArray = oldArray.concat(valueToAdd);
        const newArrayString = JSON.stringify(newArray);

        const newParams = Object.fromEntries([...searchParams])
        newParams[key] = newArrayString;
        setSearchParams(newParams);
    }

    function removeSearchParamFromArray(key, valueToRemove) {
        const oldArray = getOldArray(key);
        const newArray = oldArray.filter(value => value !== valueToRemove);
        const newArrayString = JSON.stringify(newArray);
        
        const newParams = Object.fromEntries([...searchParams])
        newParams[key] = newArrayString;
        setSearchParams(newParams);
    }


    function handleSelection(e) {
        const input = e.target.closest('input');
        if (input === null) return;

        const key = input.dataset.key;
        const value = input.id;
        const active = input.checked;
        
        if (active) {
            addSearchParamToArray(key, value);
        } else if (!active) {
            removeSearchParamFromArray(key, value);
        }
    }

    return (
        <div className="shop-sidebar" onClick={handleSelection}>
            <div className="section">
                <h2 className="title">Chipset</h2>
                {uniqueChipsets.map(chipset => <FilterInput key={chipset} objectKey="chipset" value={chipset} />)}
            </div>

            <div className="section">
                <h2 className="title">Series</h2>
                {uniqueSeries.map(series => <FilterInput key={series} objectKey="series" value={series} />)}
            </div>
        </div>    
    )
}   

/*
    Example product
    {
        id: '1',
        name: 'AMD Radeon RX 6700XT',
        img: RadeonRX6700xt,
        chipset: 'AMD',
        series: 'RX',
        price: '200',
        currency: 'EUR',
    },
*/

function ProductPreview(props) {
    const productObject = props.productObject;
    const id = productObject.id;
    const name = productObject.name;
    const img = productObject.img;
    const price = productObject.price;
    const currency = productObject.currency;

    return (
        <Link to={`/product/${id}`} className="product-preview">
            <img src={img} alt={name}></img>
            <div className="information">
                <div className="name">{name.toUpperCase()}</div>
                <div className="price">{price}</div>
                <div className="currency">{currency}</div>
            </div>
        </Link>
    )
}

function AllProductPreviews() {
    const [searchParams] = useContext(searchParamsContext);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const possibleFilters = ['chipset', 'series'];

    function getFiltered(category, selection) {

        if (selection.length === 0) {
            return products;
        }

        return products.filter(product => {
            const value = product[category];
            const isInSelection = selection.includes(value);
            return isInSelection;
        });
    }

    useEffect(() => {
        const newFilteredProducts = [];

        const getDifferentEntries = () => {
            
        }

        possibleFilters.forEach(filter => {
            if(!searchParams.has(filter)) return;
            const searchParamString = searchParams.get(filter);
            const filterArray = JSON.parse(searchParamString);
    
            const filtered = getFiltered(filter, filterArray);
            
            getDifferentEntries()
        });
    }, [searchParams])

    return (
        <div className="products">
            {filteredProducts.map(product => <ProductPreview key={product.id} productObject={product}/>)}
        </div>
    )
}

function ShopPage() {
    const searchParams = useSearchParams();

    return (
        <searchParamsContext.Provider value={searchParams}>
        <div className="main-shop">
            <Sidebar />
            <AllProductPreviews />
        </div>
        </searchParamsContext.Provider>
    )
}

export default ShopPage;