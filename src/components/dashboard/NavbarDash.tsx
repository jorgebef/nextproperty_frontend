import React, { ReactElement } from 'react';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';
import { signOut } from '../../helpers/auth.helpers';
/* import axios from 'axios'; */

export default function NavBarDashboard(): React.ReactElement {
    const ctx = React.useContext(AppContext);

    let button: ReactElement;

    const logOutEventHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        signOut(ctx);
    };

    if (!ctx.auth.get) {
        button = (
            <Link to="/dashboard/login" className="btn btn-success">
                Sign In
            </Link>
        );
    } else {
        button = (
            <button onClick={logOutEventHandler} className="btn btn-danger">
                Sign Out
            </button>
        );
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-xl-2">
            <a href={window.location.href} className="navbar-brand mr-5">
                NextProperty Panel
            </a>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="active">
                        <Link className="nav-link" to="/dashboard/create">
                            Create
                        </Link>
                    </li>
                    <li className="active">
                        <Link className="nav-link" to="/dashboard/list">
                            List
                        </Link>
                    </li>
                </ul>
                {button}
            </div>
        </nav>
    );
}
