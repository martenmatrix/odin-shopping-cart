import fullscreenImage from './img/homepage/index.webp';
import './styles/Homepage.css'
import { Link } from 'react-router-dom';

function Background(props) {
    const imgUrl = props.url;

    return (
        <div className="background">
            <img src={imgUrl} alt="Multiple graphic cards"></img>
        </div>
    )
}

function MiddleCenter(props) {
    const shopPath = props.shopPath;

    return (
        <div className="middle-center">
            <h1>Fast. Affordable. Quality.</h1>
            <h2>We provide the newest graphics cards for the best price. All our cards will be taken under a quality test before they are shipped out. Additionally we have a support-team, which is 24 hours every day online. We provide the newest graphics cards for the best price. All our cards will be taken under a quality test before they are shipped out. Additionally we have a support-team, which is 24 hours every day online. We provide the newest graphics cards for the best price. All our cards will be taken under a quality test before they are shipped out. Additionally we have a support-team, which is 24 hours every day online.</h2>
            <Link className="button black buy" to={shopPath}>
                Buy now
            </Link>
        </div>
    )
}

function Homepage(props) {
    const shopPath = props.shopPath;

    return (
        <div className="homepage">
            <MiddleCenter shopPath={shopPath} />
            <Background url={fullscreenImage} />
        </div>
    )
}

export default Homepage;