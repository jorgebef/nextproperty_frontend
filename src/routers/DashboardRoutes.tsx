import React from 'react';
import { AppContext } from '../App';
import { Unauthorized } from '../SharedGlobal/Unauthorized';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../SharedGlobal/helperFuncs';

export function LoginRoute({ component: Component, ...rest }: any): any {
    const ctx = React.useContext(AppContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                isAuth(ctx);
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

    return (
        <Route
            {...rest}
            render={(props) => {
                isAuth(ctx);
                if (ctx.auth.get) {
                    return <Component {...rest} {...props} />;
                } else {
                    /* return <Unauthorized />; */
                    return <Redirect to="/dashboard/login" />;
                    /* window.location.href = '/dashboard/login'; */
                }
            }}
        />
    );
}
