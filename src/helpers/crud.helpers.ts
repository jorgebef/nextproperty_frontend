import { PropType } from './types';

export const handleCreate = (ctx: any, property: PropType): any => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.jwtToken.get}` },
        body: JSON.stringify({ ...property }),
    };
    fetch('http://localhost:5000/api/properties/create', requestOptions)
        .then((res) => res.json())
        .catch((error) => {
            console.log(error);
        });
    /* alert(JSON.stringify(property)); */
};

export const getPropList = (ctx: any): void => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.jwtToken.get}` },
    };
    fetch('http://localhost:5000/api/properties/list', requestOptions)
        .then((res) => res.json())
        .then((data) => {
            ctx.propList.set(data.props);
            console.log(data.props);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getPropSingle = (ctx: any, id: string): any => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.jwtToken.get}` },
    };
    return fetch(`http://localhost:5000/api/property/${id}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            return data.props;
        })
        .catch((error) => console.log(error));
};

// --------------------------------------------------------
// CREATE A FUNCTION TO CHECK WITH BACKEND TO SEE IF JWT TOKEN IS INDEED VALID
// FOR THE LOGIN OR IS EXPIRED OR SOMETHING
// use the return fetch for that and make sure backend is returning true or false
// --------------------------------------------------------
