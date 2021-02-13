import React, { useEffect, useState } from 'react';
import { AppContext } from '../App';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../Shared/Helpers';
import { Loading } from '../Shared/Loading';

export function LoginRoute({ component: Component, ...rest }: any): any {
    const ctx = React.useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const runAuth = async () => {
            await isAuth(ctx);
            setLoading(false);
        };
        runAuth();
    }, []);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (loading) {
                    return <Loading />;
                }
                if (ctx.auth.get) {
                    return <Redirect to="/dashboard/list" />;
                } else {
                    return <Component {...rest} {...props} />;
                }
            }}
        />
    );
}

export function ProtectedRoute({ component: Component, ...rest }: any): any {
    const ctx = React.useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const runAuth = async () => {
            await isAuth(ctx);
            setLoading(false);
        };
        runAuth();
    }, []);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (loading) {
                    return <Loading />;
                }
                if (ctx.auth.get) {
                    return <Component {...rest} {...props} />;
                } else {
                    /* return <Unauthorized />; */
                    return <Redirect to="/dashboard/login" />;
                    /* window.location.href = '/dashboard/login'; */
                }
                /* }); */
            }}
        />
    );
}
