import './styles/CartPage.css';
import products from './data/products';
import { QuantitySelector } from './misc';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomSearchParams } from './customHooks';

function InBasket(props) {
    const id = props.id;
    const quantity = props.quantity;
    const [product, setProduct] = useState();
    const [addSearchParam, removeSearchParam,] = useCustomSearchParams();
    const separator = 'x';


    function setQuantity(cb) {
        const newQuantity = typeof cb === 'function' ? cb(quantity) : cb;

        const valueToRemove = id + separator + quantity.toString();
        removeSearchParam('incart', valueToRemove);
        const valueToAdd = id + separator + newQuantity.toString();
        addSearchParam('incart', valueToAdd);
    }

    function deleteItem() {
        removeSearchParam('incart', id + separator + quantity.toString());
    }

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
                    <QuantitySelector quantityState={[quantity, setQuantity]}/>
                    <div className="delete" onClick={deleteItem}>+</div>

                </>
                : 'Loading...' 
            }
        </div>
    )
}

function CartPage() {
    const navigate = useNavigate();
    const separator = 'x';
    const [ , , searchParams] = useCustomSearchParams();
    const [productsCarted, setProductsCarted] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    function onClose() {
        navigate(-1, { replace: true });
    }

    useEffect(() => {
        const products = [];

        for (const [key, value] of searchParams) {
            if (key === 'incart') {
                const [id, quantity] = value.split(separator);
                products.push([id, parseInt(quantity, 10)]);
            }
        }
        setProductsCarted(products)
    }, [searchParams]);

    useEffect(() => {
        function getPrice(id) {
            const product = products.find(product => product.id === id)
            return parseInt(product.price);
        }

        const totalPrice = productsCarted.reduce((prevValue, [id, quantity]) => {
            const price = getPrice(id);
            const amountToAdd = price * quantity;

            return prevValue + amountToAdd;
        }, 0);
        setTotalPrice(totalPrice);
    }, [productsCarted, searchParams]);

    return (
        <div className="cart-page">
            <div className="wrapper">
                <div className="close" onClick={onClose}>+</div>
                <div className="products">
                    {productsCarted.map((product, index) => {
                        const id = product[0];
                        const currentQuantity = product[1];
                        return <InBasket key={index} id={id} quantity={currentQuantity} />}
                    )}
                </div>
    
                <div className="total">
                <hr />
                    <div className="amount">
                        {`TOTAL ${totalPrice} EUR`}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;