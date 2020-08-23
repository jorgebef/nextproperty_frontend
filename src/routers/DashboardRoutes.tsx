import React from 'react';
import { AppContext } from '../App';
import Unauthorized from './Unauthorized';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../helpers/auth.helpers';

export function LoginRoute({ component: Component, ...rest }: any): any {
    const ctx = React.useContext(AppContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                isAuth(ctx);
                if (ctx.auth.get) {
                    return <Redirect to="/api/list" />;
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
                    return <Unauthorized />;
                    /* return <Redirect to="/unauthorized" />; */
                }
            }}
        />
    );
}
