import classes from './AvailableProducts.module.css';
import Card from '../UI/Card';
import ProductItem from './ProductItem/ProductItem';
import { useEffect, useState } from 'react';
import request from '../../services/queryBuilder';

// const dummyProducts = [{
//     "productName": "Product1",
//     "productId": 1,
//     "price": 25
// }, {
//     "productName": "Product2",
//     "productId": 2,
//     "price": 50
// }, {
//     "productName": "Product3",
//     "productId": 3,
//     "price": 75
// }]


const AvailableProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function dataFetch() {
            let result = await request({
                url: 'http://localhost:4000/products',
                verb: 'GET'
            })

            setProducts(result.data.data.products);
        }
        dataFetch();

    }, []);

    const productsList = products?.map(item => {
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