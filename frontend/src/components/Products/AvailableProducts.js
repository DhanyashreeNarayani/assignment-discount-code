import classes from './AvailableProducts.module.css';
import Card from '../UI/Card';
import ProductItem from './ProductItem/ProductItem';
const dummyProducts = [{
    "productName": "Product1",
    "productId": 1,
    "price": 25
}, {
    "productName": "Product2",
    "productId": 2,
    "price": 50
}, {
    "productName": "Product3",
    "productId": 3,
    "price": 75
}]


const AvailableProducts = () => {

    const productsList = dummyProducts.map(item => {
        return (<ProductItem
            key={item.productId}
            productId={item.productId}
            productName={item.productName}
            price={item.price} />)
    })

    return <section className={classes.products}>
        <Card>
            <ul>
                {productsList}
            </ul>
        </Card>
    </section>
}

export default AvailableProducts;