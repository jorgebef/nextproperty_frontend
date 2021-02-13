import React, { useState } from 'react';
import { AppContext } from '../../App';
import { signIn } from '../../Shared/Helpers';
import { Redirect } from 'react-router-dom';
import { Loading } from '../../Shared/Loading';

import compStyle from './style.module.css';
import generalStyle from '../../Shared/Styles/general.module.css';
const style = { ...compStyle, ...generalStyle };

export function LogInDash(): React.ReactElement {
    // use the context from App parent component
    const ctx = React.useContext(AppContext);

    // Declare the local state we will need only for this component
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // console.log(ctx.jwtToken.get);

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        setSubmitted(true);
        setLoading(true);
        if (email && password) {
            signIn(ctx, email, password).then(() => {
                setLoading(false);
                return <Redirect to="/dashboard/list" />;
            });
        } else {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.name === 'email') setEmail(e.target.value);
        if (e.target.name === 'password') setPassword(e.target.value);
    };

    return loading ? (
        <Loading />
    ) : (
        <div className={style.flexContainerLogin}>
            <div className={style.loginFormContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={style.avatar}>
                        <img src="/examples/images/avatar.png" alt="Avatar" />
                    </div>
                    <h2>Admin Login</h2>
                    <div className={style.formElement}>
                        <input
                            type="text"
                            className={submitted && !email ? style.error : undefined}
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Username"
                            autoFocus
                        />
                    </div>
                    <div className={style.formElement}>
                        <input
                            type="password"
                            className={submitted && !password ? style.error : undefined}
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className={style.formElement}>
                        <button
                            type="submit"
                            name="submitButton"
                            className={style.signInButton}
                            // disabled={!password || !email}
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
