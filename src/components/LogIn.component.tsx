import React, { useState } from 'react';
/* import { LogIn } from '../helpers/auth.helpers'; */
/* import axios from 'axios'; */

export default function SignIn(): React.ReactElement {
    // Set the state and use properties in the state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [jwtToken, setjwtToken] = useState(localStorage.getItem('jwtToken') || null);

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        /* console.log(`handleSubmit count ${counter}`); */

        /* setjwtToken(LogIn(email, password, evt)); */
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}` },
            body: JSON.stringify({ email, password }),
        };

        fetch('http://localhost:5000/api/login', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setjwtToken(data.token);
            })
            .catch((error) => {
                alert(error);
            });
        // ------------------------------------------------
        // ------------------------------------------------
    };

    React.useEffect(() => {
        if (jwtToken != null) {
            localStorage.setItem('jwtToken', jwtToken);
            window.location.href = '/api/list';
            /* alert(jwtToken); */
        }
    }, [jwtToken]);

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email"
                                    className="form-control"
                                    autoFocus
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="password"
                                    className="form-control"
                                />
                            </div>
                            <button className="btn btn-success btn-block" disabled={!password || !email} type="submit">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
