import './styles/ShopPage.css';
import products from './data/products';

console.log(products)

function Sidebar() {

    function getUnique(key) {
        const allValues = products.map(product => product[key]);
        const uniqueValues = new Set(allValues);
        return uniqueValues;
    }

    return (
        <div className="shop-sidebar">
            <div className="section">
                <h2 className="title">Chipset</h2> 
            </div>

            <div className="section">
                <h2 className="title">Series</h2> 
            </div>
        </div>    
    )
}

/*
    Example product
    {
        id: '1',
        name: 'AMD Radeon RX 6700XT',
        img: RadeonRX6700xt,
        chipset: 'AMD',
        series: 'RX',
        price: '200',
        currency: 'EUR',
    },
*/

function Product(productObject) {
    const id = productObject.id;
    const name = productObject.name;
    const img = productObject.img;
    const price = productObject.price;
    const currency = productObject.currency;
}

function AllProducts() {
    return (
        <div className="products">
        </div>
    )
}

function ShopPage() {
    return (
        <div className="main-shop">
            <Sidebar />
            <AllProducts />
        </div>
    )
}

export default ShopPage;