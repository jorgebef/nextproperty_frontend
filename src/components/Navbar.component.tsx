import React, { ReactElement } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { LogOut } from '../helpers/auth.helpers';
/* import axios from 'axios'; */

export default function Navbar(): React.ReactElement {
    const ctx = React.useContext(AppContext);

    let button: ReactElement;

    const signOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        LogOut(ctx);
    };

    if (!ctx.auth.get) {
        button = (
            <Link to="/api/login" className="btn btn-success">
                Sign In
            </Link>
        );
    } else {
        button = (
            <button onClick={signOut} className="btn btn-danger">
                Sign Out
            </button>
        );
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-xl-2">
            <a className="navbar-brand mr-5">NextProperty Panel</a>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="active">
                        <Link className="nav-link" to="/api/create">
                            Create
                        </Link>
                    </li>
                    <li className="active">
                        <Link className="nav-link" to="/api/list">
                            List
                        </Link>
                    </li>
                </ul>
                {button}
            </div>
        </nav>
    );
}
