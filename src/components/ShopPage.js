'use strict';
import './styles/ShopPage.css';
import { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, Outlet, Route, Routes } from 'react-router-dom';
import ProductOverview from './ProductOverview';
import products from './data/products';

function useCustomSearchParams() {
    const customURLSearchParams = URLSearchParams;
    customURLSearchParams.prototype.remove = function(key, value) {
        const entries = this.getAll(key);
        const newEntries = entries.filter(entry => entry !== value);
        this.delete(key);
        newEntries.forEach(newEntry => this.append(key, newEntry));
    }

    const navigate = useNavigate();
    const location = useLocation(); // couldn't i just use window.location.pathname ?

    const setSearchParams = (newParams) => {
        const newObject = new URLSearchParams(newParams);
        localStorage.setItem('filter', newObject);
        const to = { pathname: location.pathname, search: newParams.toString() };
        navigate(to, { replace: true });
    }

    const addSearchParam = (key, value) => {
        const newURLParams = new URLSearchParams(location.search);
        newURLParams.append(key, value);
        setSearchParams(newURLParams);
    }
    
    const removeSearchParam = (key, value) => {
        const newURLParams = new customURLSearchParams(location.search);
        newURLParams.remove(key, value);
        setSearchParams(newURLParams);
    }

    const getSearchParams = () => {
        return new URLSearchParams(location.search);
    }

    useEffect(() => {
        const filters = localStorage.getItem('filter');
        if (filters) {
            setSearchParams(filters);
        }
    }, [location.pathname]) // does not trigger when user clicks home nav button twice because path stays the same => filter will be reset

    return [addSearchParam, removeSearchParam, getSearchParams()];
}

function FilterInput(props) {
    const [addSearchParam, removeSearchParam, searchParams] = useContext(searchParamsContext);

    const key = props.objectKey;
    const value = props.value;
    const name =  props.name ? props.name : value;
    const [checked, setChecked] = useState(props)

    function isApplied(filter, value) {
        const hasFilter = searchParams.has(filter);
        if (hasFilter) {
            const allAppliedFiltersForCategory = searchParams.getAll(filter);
            const isSpecific = allAppliedFiltersForCategory.includes(value);
            return isSpecific;
        } else {
            return false;
        }
    }

    useEffect(() => {
        const shouldCheck = isApplied(key, value);
        if (shouldCheck) {
            setChecked(true);
        } else {
            setChecked(false)
        }
    }, [searchParams]);

    return (
        <div className="filter-input">
            <input id={value} type="checkbox" readOnly checked={checked} data-key={key} name={name} />
            <div className="new-checkbox-design">
                <div className="activated"></div>
            </div>
            <label htmlFor={value}>{name}</label>
        </div>
    )
}

function Sidebar() {
    const [addSearchParam, removeSearchParam] = useContext(searchParamsContext);

    function getUnique(key) {
        const allValues = products.map(product => product[key]);
        const uniqueValues = [...new Set(allValues)];
        return uniqueValues;
    }

    const uniqueChipsets = getUnique('chipset');
    const uniqueSeries = getUnique('series');

    function handleSelection(e) {
        const input = e.target.closest('input');
        if (input === null) return;

        const key = input.dataset.key;
        const value = input.id;
        const active = input.checked;

        if (active) {
            addSearchParam(key, value);
        } else if (!active) {
            removeSearchParam(key, value);
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

function ProductPreview(props) {
    const productObject = props.productObject;
    const id = productObject.id;
    const name = productObject.name;
    const img = productObject.img;
    const price = productObject.price;
    const currency = productObject.currency;

    const textRef = useRef(null);

    const [scrollWidth, setScrollWidth] = useState(null);
    const [clientWidth, setClientWidth] = useState(null);

    function isXOverflown() {
        return scrollWidth > clientWidth;
    }

    useEffect(() => {
        const currentTextRef = textRef.current;
        setScrollWidth(currentTextRef.scrollWidth);
        setClientWidth(currentTextRef.clientWidth);
    }, [])


    return (
        <Link to={`product/${id}`} className="product">
            <img src={img} alt={name}></img>
            <div className="information">
                <div className="scroll-wrapper">
                    <div ref={textRef} className="name">
                        <span className={isXOverflown() ? 'animate' : ''}>
                            {name.toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="price-wrapper">
                    <div className="price">{price}</div>
                    <div className="currency">{currency}</div>
                </div>
            </div>
        </Link>
    )
}

function AllProductPreviews() {
    const [addSearchParam, removeSearchParam, searchParams] = useContext(searchParamsContext);
    const [filteredProducts, setFilteredProducts] = useState(products);

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

        const filteredProducts = products.filter(product => {
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

    if (filteredProducts.length === 0) {
        return (
            <div className="empty">
                Emptiness :(
            </div>
        )
    }

    return (
        <>
            {filteredProducts.map(product => <ProductPreview key={product.id} productObject={product}/>)}
        </>
    )
}

function Layout() {
    return (
        <div className="products">
            <Outlet />
        </div>
    )
}

const searchParamsContext = createContext();

function ShopPage() {
    const [addSearchParam, removeSearchParam, searchParams] = useCustomSearchParams();

    return (
        <searchParamsContext.Provider value={[addSearchParam, removeSearchParam, searchParams]}>
        <div className="main-shop">
            <Sidebar />
            <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<AllProductPreviews />} />
                <Route path="/product/:id" element={<ProductOverview />}/>
            </Route>
            </Routes>
        </div>
        </searchParamsContext.Provider>
    )
}

export default ShopPage;