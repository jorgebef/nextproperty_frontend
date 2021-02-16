import React, {useEffect, } from 'react';
import {Link} from 'react-router-dom';

import style from './style.module.css';

// import {ReactComponent as HomeIcon} from '../../Shared/Images/home-solid.svg';
// import {ReactComponent as CreateIcon} from '../../Shared/Images/plus-square-regular.svg';
// import {ReactComponent as ListIcon} from '../../Shared/Images/list-solid.svg';
// import {ReactComponent as ExportIcon} from '../../Shared/Images/share-square-solid.svg';

export function NavBarFront(): React.ReactElement {
    const [scrolling, setScrolling] = React.useState(false);

    useEffect(() => {
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
                    <Link to='/dashboard/list' className={style.logo_link} >
                        NextProperty Control Panel
                    </Link>
                </li>
                <li className={style.links_item}>
                    <Link
                        to="/"
                        className={style.nav_link}
                    >
                        <span>Home</span>
                    </Link>
                    <Link
                        to="/properties"
                        className={style.nav_link}
                    >
                        <span>Properties</span>
                    </Link>
                    <Link
                        to="/about"
                        className={style.nav_link}
                    >
                        <span>About</span>
                    </Link>
                    <Link
                        to="/contact"
                        className={style.nav_link}
                    >
                        <span>Contact</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
