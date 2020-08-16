import { PropType } from './types';

export const crudCreate = (ctx: React.ComponentState, property: PropType): void => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.jwtToken.get}` },
        body: JSON.stringify({ ...property }),
    };
    fetch('http://localhost:5000/api/properties/create', requestOptions)
        .then((res) => {
            res.json();
            window.location.href = '/api/list';
        })
        .catch((error) => {
            console.log(error);
        });
    /* alert(JSON.stringify(property)); */
};

export const crudEdit = (ctx: React.ComponentState, property: PropType, id: string): void => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.jwtToken.get}` },
        body: JSON.stringify({ ...property }),
    };
    fetch(`http://localhost:5000/api/property/${id}`, requestOptions)
        .then((res) => {
            res.json();
            window.location.href = '/api/list';
        })
        .catch((error) => console.log(error));
};

export const getPropList = (ctx: React.ComponentState): void => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.jwtToken.get}` },
    };
    fetch('http://localhost:5000/api/properties/list', requestOptions)
        .then((res) => res.json())
        .then((data) => {
            ctx.propList.set(data.props);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getPropSingle = async (ctx: React.ComponentState, id: string): Promise<PropType> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.jwtToken.get}` },
    };
    return await fetch(`http://localhost:5000/api/property/${id}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            return data.props;
        })
        .catch((error) => console.log(error));
};
