import { useContext } from 'react';
import classes from './ProductItem.module.css';
import ProductItemForm from './ProductItemForm';
import CartContext from '../../../store/cart-context';

const ProductItem = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `Rs ${props.price}`;
    const addItemToCartHandler = amount => {
        cartCtx.addItem({
            productId: props.productId,
            productName: props.productName,
            amount,
            price: props.price
        })
    };

    return (
        <li className={classes.product}>
            <div>
                <h3>{props.productName}</h3>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <ProductItemForm onAddToCart={addItemToCartHandler} />
            </div>
        </li>
    )
}

export default ProductItem;