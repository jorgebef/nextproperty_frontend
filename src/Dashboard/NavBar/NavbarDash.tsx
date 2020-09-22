import React, { ReactElement } from 'react';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
import { signOut } from '../../SharedGlobal/helperFuncs';
import style from '../Shared/styleDash.module.css';
/* import axios from 'axios'; */

export function NavBarDash(): React.ReactElement {
    const ctx = React.useContext(AppContext);
    const [scrolling, setScrolling] = React.useState(false);

    let button: ReactElement;

    const logOutEventHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        signOut(ctx);
    };

    if (!ctx.auth.get) {
        button = (
            <Link to="/dashboard/login" className={style.btnGreen}>
                Sign In
            </Link>
        );
    } else {
        button = (
            <button onClick={logOutEventHandler} className={style.btnRed}>
                Sign Out
            </button>
        );
    }

    React.useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 100) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        });
    }, []);

    return (
        <nav className={`${style.navbar} ${scrolling ? style.scrolling : style.top}`}>
            <ul className={style.navbar_nav}>
                <li className={style.logo_item}>
                    <a href="http://localhost:3000/dashboard/list" className={style.logo_link}>
                        NextProperty Control Panel
                    </a>
                </li>
                <li className={style.links_item}>
                    <Link
                        to="/"
                        // className={`${style.nav_link} ${window.location.pathname === '/' ? style.active : undefined}`}
                        className={style.nav_link}
                    >
                        <span>Home</span>
                    </Link>
                    <Link
                        to="/dashboard/create"
                        // className={`${style.nav_link} ${window.location.pathname === '/dashboard/create' ? style.active : undefined}`}
                        className={style.nav_link}
                    >
                        <span>Create</span>
                    </Link>
                    <Link
                        to="/dashboard/list"
                        // className={`${style.nav_link} ${window.location.pathname === '/dashboard/list' ? style.active : undefined}`}
                        className={style.nav_link}
                    >
                        <span>List</span>
                    </Link>
                </li>
                <li className={style.nav_item}>{button}</li>
            </ul>
        </nav>
    );

    /* return ( */
    /*     <nav */
    /*         className="navbar navbar-expand-sm navbar-dark bg-dark p-xl-2" */
    /*         style={{ zIndex: 100, position: 'fixed', top: '0px', width: '100%' }} */
    /*     > */
    /*         <div className="container"> */
    /*             <a href="http://localhost:3000/dashboard/list" className="navbar-brand"> */
    /*                 NextProperty Control Panel */
    /*             </a> */
    /*             <div id="navbarColor02" className="collapse navbar-collapse"> */
    /*                 <ul className="nav navbar-nav m-auto"> */
    /*                     <li className="active mx-3"> */
    /*                         <a href="http://localhost:3000/" className="nav-link"> */
    /*                             Home */
    /*                         </a> */
    /*                     </li> */
    /*                     <li className="active mx-3"> */
    /*                         <Link to="/dashboard/create" className="nav-link"> */
    /*                             Create */
    /*                         </Link> */
    /*                     </li> */
    /*                     <li className="active mx-3"> */
    /*                         <Link to="/dashboard/list" className="nav-link"> */
    /*                             List */
    /*                         </Link> */
    /*                     </li> */
    /*                 </ul> */
    /*                 {button} */
    /*             </div> */
    /*         </div> */
    /*     </nav> */
    /* ); */
}
