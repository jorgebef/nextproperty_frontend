import React, { useState } from 'react';
import { AppContext } from '../App';
import { logIn } from '../helpers/auth.helpers';

export default function SignIn(): React.ReactElement {
    // use the context from App parent component
    const ctx = React.useContext(AppContext);

    // Declare the local state we will need only for this component
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        setLoading(true);
        await logIn(ctx, email, password);
        setLoading(false);
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
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
