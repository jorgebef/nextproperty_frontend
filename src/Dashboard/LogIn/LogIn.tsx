import React, { useState } from 'react';
import { AppContext } from '../../App';
import { signIn } from '../../SharedGlobal/helperFuncs';
import { Redirect } from 'react-router-dom';
import './style.css';

export function LogIn(): React.ReactElement {
    // use the context from App parent component
    const ctx = React.useContext(AppContext);

    // Declare the local state we will need only for this component
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logInfo, setLogInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        setLoading(true);
        await signIn(ctx, email, password);
        setLoading(false);
        return <Redirect to="/dashboard/list" />;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.name == 'email') setEmail(e.target.value);
        if (e.target.name == 'password') setPassword(e.target.value);
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <div className="avatar">
                    <img src="/examples/images/avatar.png" alt="Avatar" />
                </div>
                <h2 className="text-center">Admin Login</h2>
                <div className="form-group">
                    <input
                        type="text"
                        className={'form-control ' + (!email ? 'error' : '')}
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Username"
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className={'form-control ' + (!password ? 'error' : '')}
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="form-group">
                    <button
                        type="submit"
                        name="submitButton"
                        className={'btn-primary btn-lg btn-block btn'}
                        disabled={!password || !email}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </div>
                <div className="bottom-action clearfix">
                    <label className="float-left form-check-label">
                        <input type="checkbox" /> Remember me
                    </label>
                </div>
            </form>
        </div>
    );
}
