import { userState } from 'react';
import { Link } from "react-router-dom"

import classes from './MainNavigation.module.css';
import HeaderCartButton from '../components/Layout/HeaderCartButton'

const MainNavigation = (props) => {

    return (<>
        <header className={classes.header}>
            <h1>E-commerce</h1>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <HeaderCartButton onClick={props.onShowCart} />

                    </li>
                    {/* <li>
                        <NavLink to="/admin" className={({ isActive }) => isActive ? classes.active : undefined}>Admin</NavLink>
                    </li> */}
                </ul>
            </nav>


        </header>

    </>
    )
}

export default MainNavigation