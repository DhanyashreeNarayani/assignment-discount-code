import CartContext from "./cart-context"
import { useReduce, useReducer } from 'react';

const defaultCartState = {
    items: [],
    totalAmount: 0,
    discountAmount: 0,
}

const cartReducer = (state, action) => {
    if (action.type == "ADD") {
        const newTotalAmount = state.totalAmount + action.item.price * action.item.amount

        const existingCartItemIndex = state.items.findIndex(item => item.productId == action.item.productId);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {

            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmount,
            discountAmount: state.discountAmount ? newTotalAmount * (10 / 100) : state.discountAmount
        }
    }
    if (action.type == "REMOVE") {

        const existingCartItemIndex = state.items.findIndex((item) => {
            return item.productId == action.productId
        })
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount == 1) {
            updatedItems = state.items.filter(item => item.productId != action.productId)
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            discountAmount: state.discountAmount ? updatedTotalAmount * (10 / 100) : state.discountAmount
        }

    }

    if (action.type == "CLEAR") {
        return defaultCartState;
    }

    if (action.type == "APPLY_DISCOUNT") {

        const discountedAmount = state.totalAmount * (10 / 100);
        return {
            items: state.items,
            totalAmount: state.totalAmount,
            discountAmount: discountedAmount
        }
    }
    return defaultCartState
}

const CartProvider = props => {

    const [cartState, dipatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dipatchCartAction({
            type: 'ADD', item: item
        })
    }

    const removeItemFromCartHandler = (id) => {
        dipatchCartAction({ type: 'REMOVE', productId: id })
    }

    const clearCartHandler = () => {
        dipatchCartAction({ type: 'CLEAR' })
    }

    const applyDiscountHandler = () => {
        dipatchCartAction({ type: 'APPLY_DISCOUNT' })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        discountAmount: cartState.discountAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
        applyDiscount: applyDiscountHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;