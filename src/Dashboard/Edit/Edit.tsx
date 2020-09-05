import React, { useState, useEffect } from 'react';
/* import { AppContext } from '../App'; */
import { useParams } from 'react-router-dom';
import { PropType, propertyDefault, APIURL } from '../../SharedGlobal';
import { getPropSingle, crudEdit } from '../../SharedGlobal/helperFuncs';
import { ImageSelector } from '../Shared';
import { Loading } from '../Shared/Loading';

export function Edit(): React.ReactElement {
    // Set the state and use properties in the state
    /* const ctx = React.useContext(AppContext); */
    const { id } = useParams();

    const [property, setProperty] = useState<PropType>(propertyDefault);
    const [imgData, setImgData] = useState<FileList>();
    const [imgDel, setImgDel] = useState<Array<string>>();
    const [imgAdd, setImgAdd] = useState<Array<string>>();
    const [oldTimestamp, setOldTimestamp] = useState<number>();
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        getPropSingle(id).then((p: PropType) => {
            setProperty({
                ...property,
                ...p,
            });
        });
    }, [Edit]);

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const propImgArray: Array<string> = property.images ? property.images : [];
        // substract imgDel array from property.images
        if (imgDel) {
            for (let x = 0; x < propImgArray.length; x++) {
                imgDel.forEach((imgD) => {
                    if (propImgArray[x] == imgD) {
                        propImgArray.splice(x, 1);
                        x--;
                    }
                });
            }
        }
        if (imgAdd) {
            imgAdd.forEach((i) => {
                propImgArray.push(i);
            });
        }
        setProperty({
            ...property,
            images: propImgArray,
            edited_timestamp: Date.now(),
        });
        // I have no idea why but 0 is NOT liked as a number value, better use 1
        setOldTimestamp(property.edited_timestamp ? property.edited_timestamp : 1);
    };

    useEffect(() => {
        if (oldTimestamp) {
            console.log('current db edit tmpstamp: ' + property.edited_timestamp);
            console.log('oldTimestamp: ' + oldTimestamp);
        }
        if (property.edited_timestamp && oldTimestamp && property.edited_timestamp > oldTimestamp) {
            crudEdit(property, id, imgData, imgDel);
        }
    }, [property.edited_timestamp]);

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProperty({
            ...property,
            [e.target.name]: e.target.value,
        });
    };

    const updateCheckBox = (e: React.MouseEvent<HTMLInputElement>) => {
        let bool: boolean;
        e.currentTarget.checked ? (bool = true) : (bool = false);
        setProperty({
            ...property,
            [e.currentTarget.name]: bool,
        });
    };

    const updateDelete = (e: React.MouseEvent<HTMLInputElement>) => {
        const delArray: Array<string> = imgDel ? imgDel : [];
        if (e.currentTarget.checked) {
            delArray.push(e.currentTarget.name);
        } else {
            for (let x = 0; x < delArray.length; x++) {
                if (delArray[x] == e.currentTarget.name) {
                    delArray.splice(x, 1);
                    x--;
                }
            }
        }
        console.log(delArray);
        setImgDel(delArray);
    };

    return (
        <div className="row">
            {loading ? <Loading /> : ''}
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleEdit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="ref"
                                    value={property.ref}
                                    onChange={updateField}
                                    placeholder="Reference"
                                    className="form-control"
                                    autoFocus
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={property.price}
                                    onChange={updateField}
                                    placeholder="Price in €"
                                    className="form-control"
                                />
                                <label className="form-control">
                                    <input
                                        type="checkbox"
                                        name="new_build"
                                        defaultChecked={property.new_build}
                                        onClick={updateCheckBox}
                                        autoFocus
                                    />
                                    New Build
                                </label>
                                <input
                                    type="text"
                                    name="type"
                                    value={property.type}
                                    onChange={updateField}
                                    placeholder="Type of property"
                                    className="form-control"
                                />
                                <input
                                    type="text"
                                    name="town"
                                    value={property.town}
                                    onChange={updateField}
                                    placeholder="Town"
                                    className="form-control"
                                />
                                <input
                                    type="text"
                                    name="province"
                                    value={property.province}
                                    onChange={updateField}
                                    placeholder="Province"
                                    className="form-control"
                                />
                                <input
                                    type="text"
                                    name="title"
                                    value={property.title}
                                    onChange={updateField}
                                    placeholder="Title goes here"
                                    className="form-control"
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={property.description}
                                    onChange={updateField}
                                    placeholder="Description..."
                                    className="form-control"
                                />
                                <ImageSelector
                                    property={property}
                                    setProperty={setProperty}
                                    imgAdd={imgAdd}
                                    setImgAdd={setImgAdd}
                                    setImgData={setImgData}
                                />
                                <div className="text-center">
                                    {property.images?.concat(imgAdd ? imgAdd : []).map((i, key) => (
                                        <div key={key}>
                                            <label>
                                                <img
                                                    style={{ width: '90px' }}
                                                    alt={i}
                                                    src={`${APIURL}/${property.ref}/${i}`}
                                                />
                                                <input type="checkbox" name={i} onClick={updateDelete} />
                                                {i}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="card-footer text-muted align-self-stretch">
                                    {new Date(property.created_timestamp).toLocaleString('es-ES')}
                                </div>
                            </div>
                            <button className="btn btn-success btn-block" type="submit" disabled={loading}>
                                {loading ? 'Loading...' : 'Edit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
