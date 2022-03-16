import './styles/CartPage.css';
import products from './data/products';
import { QuantitySelector } from './misc';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="cart-product">
            {
                product ?
                <>
                    <img alt={product.name} src={product.img[0]} />
                    <div className="name-description">
                        <div className="name">{product.name}</div>
                        <div className="description">A fitting description is always neat.</div>
                    </div>
                    <QuantitySelector quantityState={[quantity, ]}/>
                    <div className="delete">+</div>

                </>
                : 'Loading...' 
            }
        </div>
    )
}

function CartPage(props) {
    const productsIds = ['1', '2']; //ids
    const navigate = useNavigate();

    function onClose() {
        navigate(-1, { replace: true });
    }

    return (
        <div className="cart-page">
            <div className="wrapper">
                <div className="close" onClick={onClose}>+</div>
                <div className="products">
                    {productsIds.map(id => <InBasket id={id}/>)}
                </div>
    
                <div className="total">
                <hr />
                    <div className="amount">
                        TOTAL 500 EUR
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;