
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import request from '../../services/queryBuilder'

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `Rs ${cartCtx.totalAmount}`;
    const discountedAmount = `Rs ${cartCtx.discountAmount}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const cartItems = <ul className={classes['cart-items']}> {
        cartCtx.items.map(item => <CartItem key={item.productId}
            productName={item.productName}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.productId)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />)
    }
    </ul >

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        const response = await request({
            url: 'http://localhost:4000/orders/checkout',
            verb: "POST",
            payload: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();

    }

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && (<>
            <div className={classes.total}>
                <span>Discount Amount</span>
                <span>{discountedAmount}</span>
            </div>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{`Rs ${totalAmount.split("Rs").pop() - discountedAmount.split("Rs").pop()}`}</span>
            </div>
        </>
        )}
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckout && <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}

        </div>}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>

        </div>
    </React.Fragment>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )

}

export default Cart;