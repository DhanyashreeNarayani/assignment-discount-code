
import Products from "../components/Products/Products";
import classes from "./Home.module.css";
import Cart from "../components/Cart/Cart";
import { useState } from "react";
import MainNavigation from "../components/MainNavigation";
import CartProvider from "../store/CartProvider";
const HomePage = () => {
    const [isCartShown, setCartIsShown] = useState(false)
    const showCartHandler = () => {
        setCartIsShown(true);
    }

    const hideCartHandler = () => {
        setCartIsShown(false);
    }
    return (
        <CartProvider>

            {isCartShown && <Cart onClose={hideCartHandler} />}
            <MainNavigation onShowCart={showCartHandler} />
            <main className={classes.content}>
                <Products />
            </main>

        </CartProvider>
    )
}

export default HomePage;