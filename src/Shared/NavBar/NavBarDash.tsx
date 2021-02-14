import * as React from "react";
import {AppContext} from "../../App";
import {Redirect, Link} from "react-router-dom";
import {signOut} from "../../Shared/Helpers";

import compStyle from "./style.module.css";
import generalStyle from "../Styles/general.module.css";
const style = {...compStyle, ...generalStyle};

export const NavBarDash = (): React.ReactElement => {
    const ctx = React.useContext(AppContext);
    const [scrolling, setScrolling] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);

    let button: React.ReactElement;

    const logOutEventHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.preventDefault();
        signOut(ctx);
        setRedirect(true);
    };

    if (!ctx.auth.get) {
        button = (
            <Link
                id="signInBtn"
                to="/dashboard/login"
                className={style.btnGreen}
            >
                Sign In
            </Link>
        );
    } else {
        button = (
            <button
                id="signOutBtn"
                onClick={logOutEventHandler}
                className={style.btnRed}
            >
                Sign Out
            </button>
        );
    }

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 100) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        });
    }, []);

    if (redirect) return <Redirect to="/dashboard/login" />;

    return (
        <nav
            className={`${style.navbar} ${
                scrolling ? style.scrolling : style.top
                }`}
        >
            <ul className={style.navbar_nav}>
                <Link to='/dashboard/list'
                    className={style.logo_link}
                >
                </Link>

                    NextProperty Control Panel

                <li className={style.links_item}>
                    <Link to="/" className={style.nav_link}>
                        <span>Home</span>
                    </Link>
                    <Link
                        to="/dashboard/create"
                        className={`${style.nav_link} ${
                            window.location.href === "/dashboard/create"
                                ? style.active
                                : ""
                            }`}
                    >
                        <span>Create</span>
                    </Link>
                    <Link to="/dashboard/list" className={style.nav_link}>
                        <span>List</span>
                    </Link>
                    <Link to="/dashboard/export" className={style.nav_link}>
                        <span>Export</span>
                    </Link>
                </li>
                <li className={style.log_item}>{button}</li>
            </ul>
        </nav >
    );
};
