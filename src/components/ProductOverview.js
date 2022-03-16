import './styles/ProductOverview.css';
import products from './data/products';
import LeftArrow from './img/misc/left-arrow.svg';
import ShoppingCart from './img/misc/shopping-cart.svg';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useCustomSearchParams } from './customHooks';
import { useState, useEffect } from 'react';
import { ScrollingText, QuantitySelector } from './misc';

function NavigateBackToShop() {
    return (
        <Link to="/shop" className="navigate-back" draggable="false">
            <img src={LeftArrow} alt="Arrow which points to the left" draggable="false"></img>
        </Link>  
    )
}

function ImageSmallPreviewLink(props) {
    const image = props.src;
    const alt = props.alt;
    const href = props.href;

    function handleClick(e) {
        e.preventDefault();
        const hash = e.currentTarget.href;
        window.location.replace(hash);
    }

    return (
        <a onClick={handleClick} href={href} className="image-preview" draggable="false">
            <img src={image} alt={alt} draggable="false"/>
        </a>
    )
}

function ImagesPreview(props) {
    const images = props.images;
    const slideAmount = images.length;

    const location = useLocation();

    function getCurrentSlide() {
        const hash = location.hash;
        const slide = hash.replace('#', '') || 1;
        return parseInt(slide);
    }

    function slideBack() {
        const newSlideNumber = getCurrentSlide() - 1;
        if (newSlideNumber < 1 || !newSlideNumber) return;
        window.location.replace(`#${newSlideNumber}`)
    }

    function slideForward() {
        const newSlideNumber = getCurrentSlide() + 1;
        if (newSlideNumber > slideAmount || !newSlideNumber) return;
        window.location.replace(`#${newSlideNumber}`)
    }

    return (
        <div className="images-preview">
            <div className="image-slider">
                <div className="main">
                    <div className="slider left" onClick={slideBack}>
                        <img src={LeftArrow} alt="Arrow which points to the left"></img>
                    </div>
                    <div className="images">
                        {images.map((img, index) => <img key={index} id={`${index + 1}`} src={img} alt="Preview of Product" draggable="false"/>)}
                    </div>
                    <div className="slider right" onClick={slideForward}>
                        <img src={LeftArrow} alt="Arrow which points to the right"></img>
                    </div>
                </div>
            </div>

            <div className="all-images">
                {images.map((img, index) => <ImageSmallPreviewLink key={index} href={`#${index + 1}`} src={img} />)}
            </div>
        </div>
    )
}

function NameAndPrice(props) {
    const name = props.name;
    const price = props.price;

    return (
        <div className="title-price">
            <div className="name">
                <ScrollingText text={name} />
            </div>
            <div className="price">{price}</div>
        </div>
    )
}

function AddToCartButton(props) {
    const onClick = props.onClick;

    return (
        <div className="add">
            <button onClick={onClick}></button>
            <div className="fake-button">
                <img src={ShoppingCart} alt="minimalistic shopping cart"></img>
                <div className="text">Add to cart</div>
            </div>
        </div>
    )
}

function ProductSection(props) {
    const product = props.product;
    
    const images = product.img;
    const name = product.name;
    const price = product.price;
    const currency = product.currency;
    const id = product.id;

    const [quantity, setQuantity] = useState(1);
    const [addSearchParam, removeSearchParam, searchParams] = useCustomSearchParams();

    function addToCart() {
        const separator = 'x';
        const getCart = () => {
            const products = [];
            for (const [key, value] of searchParams) {
                if (key === 'incart') {
                    const productArray = value.split(separator);
                    products.push(productArray);
                }
            }
            return products;
        }

        const cart = getCart();
        const alreadyInCart = cart.find((product) => {
            const [currentId, ] = product;

            return currentId === id;
        });

        if (alreadyInCart) {
            const [currentId, currentQuantity] = alreadyInCart;
            const newQuantity = parseInt(currentQuantity) + quantity;
            if (newQuantity > 999) return;

            removeSearchParam('incart', currentId + separator + currentQuantity);
            addSearchParam('incart', currentId + separator + newQuantity.toString());
        } else {
            addSearchParam('incart', id + separator + quantity.toString());
        }
    }

    return (
        <div className="main-content">
            <ImagesPreview images={images}/>
            <div className="text-section">
                <NameAndPrice name={name} price={`${price} ${currency}`}/>
                <div className="quantity-add-to-cart">
                    <QuantitySelector quantityState={[quantity, setQuantity]}/>
                    <AddToCartButton onClick={addToCart} />
                </div>
            </div>
        </div>
    )
}

function NotFound() {
    // big question mark which is rotating
    return (
        <div className="not-found">
            <div className="wrapper">
                <div>?</div>
                <p>Not found.</p>
            </div>
        </div>
    )
}

function ProductOverview(props) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    function getProductObject() {
        return products.find(product => product.id === id)
    }

    const productObject = getProductObject();

    useEffect(() => {
        setProduct(productObject);
    }, [productObject])

    return (
        <div className="product-overview">
            <NavigateBackToShop />
            {product ? <ProductSection product={product} /> : <NotFound />}
        </div>
    )
}

export default ProductOverview;