import React from 'react';
import { Link } from 'react-router-dom';

export function Unauthorized(): React.ReactElement {
    return (
        <div className="container">
            <div className="message">
                <h1>403 - You Shall Not Pass</h1>
                <p>
                    Uh oh, Gandalf is blocking the way!
                    <br />
                    Maybe you have a typo in the url? Or you meant to go to a different location? Like...Hobbiton?
                </p>
            </div>
            <p>
                <Link to="/api/login">Go to LogIn page</Link>
            </p>
        </div>
    );
}
