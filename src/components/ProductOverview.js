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

function ImageSmallPreview(props) {
    const image = props.src;

    return (
        <div className="image-preview">
            <img src={image}/>
        </div>
    )
}

function ImagesPreview(props) {
    const images = props.images;

    return (
        <>
            <div className="image-slider">
                <div className="main">
                    <div className="slider left">
                        <img src={LeftArrow} alt="Arrow which points to the left"></img>
                    </div>
                    <div className="images">
                        <img src={LeftArrow} />
                        {images.map((img, index) => <img key={index} src={img} />)}
                    </div>
                    <div className="slider right">
                        <img src={LeftArrow} alt="Arrow which points to the right"></img>
                    </div>
                </div>
            </div>
            { /*
            <div className="all-images">
                {images.map((img, index) => <ImageSmallPreview key={index} src={img} />)}
            </div>
            */  }
        </>
    )
}

function TitleAndPrice(props) {
    const title = props.title;
    const price = props.price;

    return (
        <div className="title-price">
            <div className="title">{title}</div>
            <div className="price">{price}</div>
        </div>
    )
}

function ProductSection(props) {
    const product = props.product;
    
    const images = product.img;
    const title = product.title;
    const price = product.price;
    const currency = product.currency;

    return (
        <div className="main-content">
            <ImagesPreview images={images}/>
            { /*
            <TitleAndPrice title={title} price={`${price} ${currency}`}/>
            */ }
        </div>
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
            {product ? <ProductSection product={product} /> : null}
        </div>
    )
}

export default ProductOverview;