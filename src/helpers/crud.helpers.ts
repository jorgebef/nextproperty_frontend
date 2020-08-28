import { PropType } from './types_variables';
import { APIURL } from '../helpers/types_variables';

export const crudCreate = (property: Record<string, any>, imgData: FileList | undefined): void => {
    const fd = new FormData();
    Object.keys(property).forEach((key) => fd.append(key, property[key]));
    fd.set('images', JSON.stringify(property.images));

    Array.prototype.forEach.call(imgData, (file) => {
        fd.append('files', file);
        console.log(file);
    });
    // fd.append('files', imgData);
    fd.forEach((value, key) => {
        console.log(`key: ${key}, value:${value}`);
    });

    fetch(`${APIURL}/api/property/create`, {
        method: 'POST',
        headers: {
            //     /* no need in multipart/form-data */
        },
        body: fd,
        credentials: 'include',
    })
        .then((res) => {
            res.json();
            window.location.href = '/dashboard/list';
        })
        .catch((err) => {
            console.log(err);
        });
};

export const crudEdit = (property: PropType, id: string): void => {
    fetch(`${APIURL}/api/property/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...property }),
        credentials: 'include',
    })
        .then((res) => {
            res.json();
            window.location.href = '/dashboard/list';
        })
        .catch((error) => console.log(error));
};

export const crudDelete = (id: string): void => {
    fetch(`${APIURL}/api/property/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
        .then((res) => {
            res.json();
            window.location.href = '/dashboard/list';
        })
        .catch((error) => console.log(error));
};

export const getPropList = (ctx: React.ComponentState): void => {
    fetch(`${APIURL}/api/property/list`, {
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
    return await fetch(`${APIURL}/api/property/${id}`, {
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
