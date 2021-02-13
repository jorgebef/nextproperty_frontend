import React from 'react';
// import {useCookies, Cookies} from "react-cookie";
import {APIURL} from './vars';
import Cookies from "js-cookie";

// FIRST RENDER OF LIST COMPONENT REDIRECTS TO UNAUTHORIZED
// ctx.auth.get is not updated immediately
export const isAuth = async (ctx: React.ComponentState): Promise<boolean> => {
    const fetchRes = fetch(`${APIURL}/api/auth`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Authorization: 'Bearer ' + ctx.jwtToken.get,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            res.json();
            if (res.status === 200) {
                ctx.auth.set(true);
                console.log('successful verification');
                return true;
            } else {
                ctx.auth.set(false);
                console.log('Token not verified');
                return false;
            }
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
    return fetchRes;
};

export const signIn = async (ctx: React.ComponentState, email: string, password: string): Promise<void> => {
    return await fetch(`${APIURL}/api/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
        credentials: 'include',
    })
        .then((response) => {
            response.json().then((res) => {
                if (response.status === 200) {
                    console.log('response was OK');
                    // console.log(res.token);
                    localStorage.setItem('jwtToken', res.token);
                    console.log('this is the reponse cookie ' + res.token)
                    Cookies.set('token', res.token, {expires: 2, domain: '185.110.79.20'})
                    // ctx.cookies.set('token', res.token)
                    ctx.jwtToken.set(res.token);
                    ctx.auth.set(true);
                } else {
                    console.log('resonse was not OK');
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const signOut = (ctx: React.ComponentState): boolean => {
    Cookies.remove('token')
    localStorage.removeItem('jwtToken');
    ctx.jwtToken.set('');
    return true;
};
