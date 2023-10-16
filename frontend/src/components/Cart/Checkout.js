import { useRef, useState, useEffect, useContext } from 'react';
import classes from './Checkout.module.css';
import request from '../../services/queryBuilder';
import CartContext from '../../store/cart-context';

const isEmpty = value => value.trim() == "";

const Checkout = props => {
    const [discount, setDiscount] = useState("")
    const cartCtx = useContext(CartContext);


    const nameInputRef = useRef();
    const discountInputRef = useRef();
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true
    })
    useEffect(() => {
        const isDiscountPresent = async () => {
            const result = await request({
                url: 'http://localhost:4000/orders/is-discount-present',
                verb: 'GET'
            })
            if (result.data.data.isDiscountPresent) {
                cartCtx.applyDiscount();
                setDiscount(result.data.data.discountCode)
            } else {
                setDiscount("");
            }
        }

        isDiscountPresent();

    }, [])


    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredDiscount = discountInputRef.current.value;
        const enteredNameIsValid = !isEmpty(enteredName);

        setFormInputsValidity({
            name: enteredNameIsValid
        })
        if (!enteredNameIsValid) {
            return
        }

        props.onConfirm({
            name: enteredName,
            discount: enteredDiscount
        })
    }

    return <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef} />
            {!formInputsValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={classes.control}>
            <label htmlFor="discount">Discount code</label>
            <input type="text" id="discount" value={discount} ref={discountInputRef} disabled />
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>

        </div>
    </form>

}

export default Checkout;