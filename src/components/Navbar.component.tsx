import React from 'react';
/* import axios from 'axios'; */

export default class PropertyList extends React.Component {
    render(): React.ReactNode {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-xl-2">
                <a className="navbar-brand mr-5" href="#">
                    NextProperty Panel
                </a>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="active">
                            <a className="nav-link" href="/api/properties/create">
                                Create
                            </a>
                        </li>
                        <li className="active">
                            <a className="nav-link" href="/api/properties/list">
                                List
                            </a>
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

                    <form className="form-inline" action="/api/logout" method="post">
                        <a className="navbar-brand"> Welcome </a>
                        <button className="btn btn-danger" type="submit">
                            Log Out
                        </button>
                    </form>
                </div>
            </nav>
        );
    }
}
