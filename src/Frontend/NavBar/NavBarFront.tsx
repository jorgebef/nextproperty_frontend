import React from 'react';
import { Link } from 'react-router-dom';

export function NavBarFront(): React.ReactElement {
    return (
        <nav
            className="navbar navbar-expand-sm navbar-dark bg-dark"
            style={{ zIndex: 100, position: 'fixed', top: '0px', width: '100%' }}
        >
            <div className="container">
                <a href="http://localhost:3000/" className="navbar-brand">
                    NextProperty
                </a>
                <ul className="nav navbar-nav m-auto">
                    <li className="active mx-3">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="active mx-3">
                        <Link className="nav-link" to="/properties">
                            Properties
                        </Link>
                    </li>
                    <li className="active mx-3">
                        <Link className="nav-link" to="/about">
                            About
                        </Link>
                    </li>
                    <li className="active mx-3">
                        <Link className="nav-link" to="/contact">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
