import React from 'react';

export const isLogged = (ctx: Record<string, any>): void => {
    if (ctx.jwtToken?.get == '') window.location.href = '/api/login';
};
