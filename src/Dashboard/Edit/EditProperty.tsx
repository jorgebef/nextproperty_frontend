import React, { useState, useEffect } from 'react';
/* import { AppContext } from '../App'; */
import { useParams } from 'react-router-dom';
import { PropType, propertyDefault } from '../../SharedGlobal';
import { getPropSingle, crudEdit } from '../../SharedGlobal/helperFuncs';
import { ImageSelector } from '../Shared/ImageSelector';
import { MapSelector } from '../Shared/MapSelector';
import { Loading } from '../Shared/Loading';

import style from '../Shared/styleDash.module.css';

export function EditProperty(): React.ReactElement {
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
    }, [EditProperty]);

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const propImgArray: Array<string> = property.images ? property.images : [];
        // substract imgDel array from property.images
        if (imgDel) {
            for (let x = 0; x < propImgArray.length; x++) {
                imgDel.forEach((imgD) => {
                    if (propImgArray[x] === imgD) {
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

    // Only run this Effect once the property.timestamp has been changed to a new
    // value since the loading of the data
    useEffect(() => {
        if (oldTimestamp) {
            console.log('current db edit tmpstamp: ' + property.edited_timestamp);
            console.log('oldTimestamp: ' + oldTimestamp);
        }
        if (property.edited_timestamp && oldTimestamp && property.edited_timestamp > oldTimestamp) {
            crudEdit(property, id, imgData, imgDel).then((ret) => {
                if (ret === true) {
                    window.location.href = '/dashboard/list';
                } else {
                    setLoading(false);
                }
            });
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

    return (
        <div className={style.container}>
            <div className={style.flex}>
                {loading ? <Loading /> : undefined}
                <div className={style.propCard}>
                    <form onSubmit={handleEdit}>
                        <div className={style.formInline}>
                            <label>Reference:</label>
                            <input
                                type="text"
                                name="ref"
                                value={property.ref}
                                onChange={updateField}
                                placeholder="Reference"
                                className="form-control"
                                autoFocus
                            />
                        </div>
                        <div className={style.formInline}>
                            <label>Price:</label>
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
                        </div>
                        <div className={style.formInline}>
                            <input
                                type="text"
                                name="type"
                                value={property.type}
                                onChange={updateField}
                                placeholder="Type of property"
                                className="form-control"
                            />
                        </div>
                        <div className={style.formInline}>
                            <input
                                type="text"
                                name="town"
                                value={property.town}
                                onChange={updateField}
                                placeholder="Town"
                                className="form-control"
                            />
                        </div>
                        <div className={style.formInline}>
                            <input
                                type="text"
                                name="province"
                                value={property.province}
                                onChange={updateField}
                                placeholder="Province"
                                className="form-control"
                            />
                        </div>
                        <div className={style.formInline}>
                            <input
                                type="text"
                                name="title"
                                value={property.title}
                                onChange={updateField}
                                placeholder="Title goes here"
                                className="form-control"
                            />
                        </div>
                        <div className={style.formInline}>
                            <label>Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={property.description}
                                onChange={updateField}
                                placeholder="Description..."
                                className="form-control"
                            />
                        </div>
                        <MapSelector property={property} setProperty={setProperty} updateField={updateField} />
                        <ImageSelector
                            property={property}
                            imgAdd={imgAdd}
                            setImgAdd={setImgAdd}
                            setImgData={setImgData}
                            imgDel={imgDel}
                            setImgDel={setImgDel}
                        />
                        <div className="card-footer text-muted align-self-stretch">
                            {new Date(property.created_timestamp).toLocaleString('es-ES')}
                        </div>
                        <button className={style.btnBlue} type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Edit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
