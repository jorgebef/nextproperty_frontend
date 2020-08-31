import React from 'react';
import { APIURL } from '../vars';

// FIRST RENDER OF LIST COMPONENT REDIRECTS TO UNAUTHORIZED
// ctx.auth.get is not updated immediately
export const isAuth = (ctx: React.ComponentState): void => {
    fetch(`${APIURL}/api/auth`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
        .then((res) => {
            res.json();
            if (res.status === 200) {
                ctx.auth.set(true);
                console.log('successful verification');
            } else {
                ctx.auth.set(false);
                console.log('Token not verified');
            }
        })
        .catch((err) => alert(err));
};

export const signIn = async (ctx: React.ComponentState, email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fetch(`${APIURL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        })
            .then((response) => {
                response.json();
                ctx.auth.set(true);
                resolve();
                // window.location.href = '/api/list';
            })
            // .then((data) => {
            //     console.log('TOKEN SET!!!!!!!!!!!!!!');
            // })
            .catch((error) => {
                alert(error);
                reject();
            });
    });
};

export const signOut = (ctx: React.ComponentState): undefined | void => {
    // deleteCookie('token');

    fetch(`${APIURL}/api/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
        .then((res) => {
            res.json();
            if (res.status === 200) {
                ctx.auth.set(false);
                console.log('successful logout');
                window.location.href = '/dashboard/login';
            } else {
                ctx.auth.set(true);
                console.log('Token not verified');
            }
        })
        .catch((err) => alert(err));
    localStorage.clear();
};
