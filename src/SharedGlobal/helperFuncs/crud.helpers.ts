import { PropType } from '../types';
import { APIURL } from '../vars';

export const crudCreate = async (property: PropType, imgData?: FileList): Promise<boolean> => {
    const fd = new FormData();
    Object.keys(property).forEach((key) => fd.append(key, property[key]));
    fd.set('images', JSON.stringify(property.images));

    if (imgData) {
        Array.prototype.forEach.call(imgData, (file) => {
            fd.append('files', file);
            console.log(file);
        });
    }
    // fd.append('files', imgData);
    fd.forEach((value, key) => {
        console.log(`key: ${key}, value:${value}`);
    });

    const kekw = await fetch(`${APIURL}/api/property/create`, {
        method: 'POST',
        // headers: {},
        body: fd,
        credentials: 'include',
    })
        .then((res) => {
            return res.ok ? true : false;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
    return kekw;
};

export const crudEdit = async (
    property: PropType,
    id: string,
    imgData?: FileList,
    imgDel?: Array<string>
): Promise<boolean> => {
    const fd = new FormData();
    Object.keys(property).forEach((key) => fd.append(key, property[key]));
    if (property.images) {
        fd.set('images', JSON.stringify(property.images));
    } else {
        fd.delete('images');
    }
    if (imgDel) {
        fd.append('imgDel', JSON.stringify(imgDel));
    }
    if (imgData) {
        Array.prototype.forEach.call(imgData, (file) => {
            fd.append('files', file);
            console.log(file);
        });
    }
    const kekw = await fetch(`${APIURL}/api/property/edit/${id}`, {
        method: 'PUT',
        // headers: { 'Content-Type': 'application/json' },
        body: fd,
        credentials: 'include',
    })
        .then((res) => {
            return res.ok ? true : false;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
    return kekw;
};

export const crudDelete = async (id: string): Promise<boolean> => {
    const kekw = await fetch(`${APIURL}/api/property/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
        .then((res) => {
            return res.ok ? true : false;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
    return kekw;
};

export const getPropList = async (ctx: React.ComponentState): Promise<void> => {
    await fetch(`${APIURL}/api/property/list`, {
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
