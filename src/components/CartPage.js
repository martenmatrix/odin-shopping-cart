import './styles/CartPage.css';
import products from './data/products';
import { useEffect, useState } from 'react';

function InBasket(props) {
    const id = props.id;
    const quantity = props.quantity;
    const [product, setProduct] = useState();

    useEffect(() => {
        function getProductObject() {
            return products.find(product => product.id === id)
        }
        const product = getProductObject();
        setProduct(product);
    }, [id]);

    return (
        <div className="product">

        </div>
    )
}

function CartPage(props) {
    return (
        <div className="cart-page">
            <div className="wrapper">
                <div className="close">+</div>
            </div>
        </div>
    )
}

export default CartPage;