import React from 'react';
import { Link } from 'react-router-dom';
/* import axios from 'axios'; */

export default function Navbar(): React.ReactElement {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-xl-2">
            <a className="navbar-brand mr-5" href="#">
                NextProperty Panel
            </a>
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
                    <li className="active">
                        <a className="nav-link" href="#">
                            Edit
                        </a>
                    </li>
                    <li className="active">
                        <a className="nav-link" href="#">
                            Delete
                        </a>
                    </li>
                </ul>

                {/* <a className="navbar-brand"> Welcome </a> */}
                <Link to="/api/login" className="btn btn-success">
                    Sign In
                </Link>
                <button onClick={LogOut} className="btn btn-danger">
                    Sign Out
                </button>
            </div>
        </nav>
    );
}

function LogOut(): void {
    localStorage.setItem('jwtToken', '');
    window.location.href = '/api/login';
}
