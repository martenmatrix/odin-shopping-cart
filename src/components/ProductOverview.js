import './styles/ProductOverview.css';
import products from './data/products';
import LeftArrow from './img/misc/left-arrow.svg';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

    return (
        <a href={href} className="image-preview" draggable="false">
            <img src={image} alt={alt} draggable="false"/>
        </a>
    )
}

function ImagesPreview(props) {
    const images = props.images;
    const slideAmount = images.length;

    const location = useLocation();
    const navigate = useNavigate();

    function getCurrentSlide() {
        const hash = location.hash;
        const slide = hash.replace('#', '');
        return parseInt(slide);
    }

    function slideBack() {
        const newSlideNumber = getCurrentSlide() - 1;
        if (newSlideNumber < 0 || !newSlideNumber) return;
        navigate(`#${newSlideNumber}`, { replace: true })
    }

    function slideForward() {
        const newSlideNumber = getCurrentSlide() + 1;
        if (newSlideNumber > slideAmount || !newSlideNumber) return;
        navigate(`#${newSlideNumber}`, { replace: true });
    }

    return (
        <div className="images-preview">
            <div className="image-slider">
                <div className="main">
                    <div className="slider left" onClick={slideBack}>
                        <img src={LeftArrow} alt="Arrow which points to the left"></img>
                    </div>
                    <div className="images">
                        {images.map((img, index) => <img key={index} id={`${index}`} src={img} alt="Preview of Product" draggable="false"/>)}
                    </div>
                    <div className="slider right" onClick={slideForward}>
                        <img src={LeftArrow} alt="Arrow which points to the right"></img>
                    </div>
                </div>
            </div>

            <div className="all-images">
                {images.map((img, index) => <ImageSmallPreviewLink key={index} href={`#${index}`} src={img} />)}
            </div>
        </div>
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
        <div className="not-found">
            <div>?</div>
            <p>Not found.</p>
        </div>
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
            {product ? <ProductSection product={product} /> : <NotFound />}
        </div>
    )
}

export default ProductOverview;