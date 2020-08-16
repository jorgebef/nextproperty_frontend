import React from 'react';

export const isAuth = (ctx: React.ComponentState): void => {
    if (ctx?.jwtToken?.get == '') {
        ctx.auth.set(false);
        if (window.location.href.toString().split(window.location.host)[1] != '/api/login') {
            window.location.href = '/api/login';
        }
    } else {
        ctx.auth.set(true);
        if (window.location.href.toString().split(window.location.host)[1] == '/api/login') {
            window.location.href = '/api/list';
        }
    }
};

// --------------------------------------------------------
// CREATE A FUNCTION TO CHECK WITH BACKEND TO SEE IF JWT TOKEN IS INDEED VALID
// FOR THE LOGIN OR IS EXPIRED OR SOMETHING
// use the return fetch for that and make sure backend is returning true or false
// --------------------------------------------------------
