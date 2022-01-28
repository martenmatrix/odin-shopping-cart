import './styles/ProductOverview.css';
import products from './data/products';
import LeftArrow from './img/misc/left-arrow.svg';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NavigateBackToShop() {
    return (
        <Link to="/shop" className="navigate-back">
            <img src={LeftArrow}></img>
        </Link>  
    )
}

function NotFound() {
    // big question mark which is rotating
    return (
        <p>Not found.</p>
    )
}

function ProductOverview(props) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    function getProductObject() {
        return products.find(product => product.id === id)
    }

    useEffect(() => {
        const productObject = getProductObject();
        setProduct(productObject);
    }, [id])

    return (
        <div className="product-overview">
            <NavigateBackToShop />
        </div>
    )
}

export default ProductOverview;