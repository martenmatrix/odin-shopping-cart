import './styles/ProductOverview.css';
import LeftArrow from './img/misc/left-arrow.svg';
import { Link } from 'react-router-dom';

function NavigateBackToShop() {
    return (
        <Link to="/shop" className="navigate-back">
            <img src={LeftArrow}></img>
        </Link>  
    )
}

function ProductOverview(props) {
    const id = 'what';
    return (
        <div className="product-overview">
            <NavigateBackToShop />
        </div>
    )
}

export default ProductOverview;