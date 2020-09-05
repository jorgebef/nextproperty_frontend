import React, { useState, useEffect } from 'react';
import { AppContext } from '../../App';
import { PropType, propertyDefault } from '../../SharedGlobal';
import { crudCreate, getPropList } from '../../SharedGlobal/helperFuncs';
import { ImageSelector } from '../Shared';
import { Loading } from '../Shared/Loading';

export function Create(): React.ReactElement {
    // Set the state and use properties in the state
    const [property, setProperty] = useState<PropType>(propertyDefault);
    const [imgData, setImgData] = useState<FileList>();
    const [imgAdd, setImgAdd] = useState<Array<string>>();
    const [loading, setLoading] = useState(false);

    const ctx = React.useContext(AppContext);

    useEffect(() => {
        getPropList(ctx);
    }, [Create]);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        /* alert(property.created_timestamp.toLocaleString('en-GB')); */
        setProperty({
            ...property,
            images: imgAdd,
            created_timestamp: Date.now(),
        });
        /* crudCreate(property, imgData); */
        /* uploadImages(imgData); // DOESNT CURRENTLY WORK <=============== */
    };

    useEffect(() => {
        if (property.created_timestamp != null) {
            crudCreate(property, imgData);
        }
    }, [property.created_timestamp]);

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
        <div className="row">
            {loading ? <Loading /> : ''}
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleCreate}>
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
                                    /* propertyState={[property, setProperty]} */
                                    /* imgState={[imgData, setImgData]} */
                                    /* imgAddState={[imgAdd, setImgAdd]} */
                                />
                            </div>
                            <button className="btn btn-success btn-block" type="submit">
                                {loading ? 'Loading...' : 'Create'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
