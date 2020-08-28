import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBarPublic(): React.ReactElement {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-xl-2">
            <a href={window.location.href} className="navbar-brand mr-5">
                NextProperty Panel
            </a>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="active">
                        <Link className="nav-link" to="/home">
                            Home
                        </Link>
                    </li>
                    <li className="active">
                        <Link className="nav-link" to="/list">
                            Property List
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
