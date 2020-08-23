import { PropType } from './types';

export const crudCreate = (property: PropType): void => {
    fetch('http://localhost:5000/api/properties/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...property }),
    })
        .then((res) => {
            res.json();
            window.location.href = '/api/list';
        })
        .catch((error) => {
            console.log(error);
        });
    /* alert(JSON.stringify(property)); */
};

export const crudEdit = (property: PropType, id: string): void => {
    fetch(`http://localhost:5000/api/property/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...property }),
        credentials: 'include',
    })
        .then((res) => {
            res.json();
            window.location.href = '/api/list';
        })
        .catch((error) => console.log(error));
};

export const crudDelete = (id: string): void => {
    fetch(`http://localhost:5000/api/property/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
        .then((res) => {
            res.json();
            window.location.href = '/api/list';
        })
        .catch((error) => console.log(error));
};

export const getPropList = (ctx: React.ComponentState): void => {
    fetch('http://localhost:5000/api/properties/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((data) => {
            ctx.propList.set(data.props);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getPropSingle = async (id: string): Promise<PropType> => {
    return await fetch(`http://localhost:5000/api/property/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
        .then((res) => res.json())
        .then((data) => {
            return data.props;
        })
        .catch((error) => console.log(error));
};
