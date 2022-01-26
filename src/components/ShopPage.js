'use strict';
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

    URLSearchParams.prototype.remove = function(key, value) {
        const entries = this.getAll(key);
        const newEntries = entries.filter(entry => entry !== value);
        this.delete(key);
        newEntries.forEach(newEntry => this.append(key, newEntry));
    }

    function handleSelection(e) {
        const input = e.target.closest('input');
        if (input === null) return;

        const key = input.dataset.key;
        const value = input.id;
        const active = input.checked;
        
        const url = document.location;
        if (active) {
            const newURLParams = new URLSearchParams(url.search);
            newURLParams.append(key, value);
            setSearchParams(newURLParams);
        } else if (!active) {
            const newURLParams = new URLSearchParams(url.search);
            newURLParams.remove(key, value);
            setSearchParams(newURLParams);
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

    function getAllFiltered() {
        const getAppliedFilters = () =>  {
            const filters = {};
            const possibleFilters = [...searchParams.keys()];

            possibleFilters.forEach(filter => {
                const isActive = searchParams.has(filter);
                if (isActive) {
                    filters[filter] = searchParams.getAll(filter);
                }
            });

            return filters;
        }

        const appliedFilters = getAppliedFilters();
        const filterLength = Object.keys(appliedFilters).length;
        if (filterLength === 0) {
            return products;
        }

        const filteredProducts= products.filter(product => {
            for (const [key, valueArray] of Object.entries(appliedFilters)) {
                const isValid = valueArray.some(value => {
                    return product[key] === value;
                });

                if (!isValid) {
                    return false;
                }
            }
            return true;
        });

        return filteredProducts;
    }
    
    useEffect(() => {
        const filteredProducts = getAllFiltered();
        setFilteredProducts(filteredProducts);
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