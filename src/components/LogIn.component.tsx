import React, { useState } from 'react';
import { AppContext } from '../App';
/* import { LogIn } from '../helpers/auth.helpers'; */

export default function SignIn(): React.ReactElement {
    // use the context from App parent component
    const ctx = React.useContext(AppContext);

    // Declare the local state we will need only for this component
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // HAVE TO MOVE THIS TO auth.helpers ==============================================
    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.jwtToken.get}` },
            body: JSON.stringify({ email, password }),
        };

        fetch('http://localhost:5000/api/login', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                ctx.jwtToken.set(data.token);
                localStorage.setItem('jwtToken', data.token);
                ctx.auth.set(true);
            })
            .catch((error) => {
                alert(error);
            });
    };
    // ================================================================================

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
