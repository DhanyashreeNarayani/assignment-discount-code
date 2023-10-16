import React from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    discountAmount: 0,
    addItem: (item) => { },
    removeItem: (item) => { },
    clearCart: () => { },
    applyDiscount: () => { },
})

export default CartContext;