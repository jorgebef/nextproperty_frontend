import React, { useState } from 'react';
import { AppContext } from '../App';
/* import { LogIn } from '../helpers/auth.helpers'; */

export default function SignIn(): React.ReactElement {
    // Set the state and use properties in the state

    const ctx = React.useContext(AppContext);

    if (ctx.jwtToken.get != '') {
        localStorage.setItem('jwtToken', ctx.jwtToken.get);
        window.location.href = '/api/list';
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        /* console.log(`handleSubmit count ${counter}`); */

        /* setjwtToken(LogIn(email, password, evt)); */
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.jwtToken.get}` },
            body: JSON.stringify({ email, password }),
        };

        fetch('http://localhost:5000/api/login', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                ctx.jwtToken.set(data.token);
            })
            .catch((error) => {
                alert(error);
            });
        // ------------------------------------------------
        // ------------------------------------------------
    };

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
