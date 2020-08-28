import React, { useState } from 'react';
import { AppContext } from '../../App';
import { PropType, propertyDefault } from '../../helpers/types_variables';
import { crudCreate, getPropList } from '../../helpers/crud.helpers';

export default function Create(): React.ReactElement {
    // Set the state and use properties in the state
    const [property, setProperty] = useState<PropType>(propertyDefault);
    const [imgData, setImgData] = useState<FileList>();

    const ctx = React.useContext(AppContext);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        /* alert(property.created_timestamp.toLocaleString('en-GB')); */
        crudCreate(property, imgData);
        /* uploadImages(imgData); // DOESNT CURRENTLY WORK <=============== */
    };

    React.useEffect(() => {
        getPropList(ctx);
    }, [Create]);

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProperty({
            ...property,
            created_timestamp: Date.now(),
            [e.target.name]: e.target.value,
        });
        console.log(imgData);
    };

    const updateImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const iData: any = [];
        if (e.target.files) {
            Array.prototype.forEach.call(e.target.files, (file) => {
                iData.push(file);
            });
            console.log(iData);
        }

        if (e.target.files) setImgData(e.target.files);

        // This is only for the array that goes in the database
        const imgArray: Array<string> = [];
        Array.prototype.forEach.call(e.target.files, (file) => {
            imgArray.push(file.name);
            console.log(imgArray);
        });

        setProperty({
            ...property,
            created_timestamp: Date.now(),
            images: imgArray,
        });
    };

    return (
        <div className="row">
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
                                <input
                                    type="file"
                                    name="images"
                                    id="customFile"
                                    multiple
                                    onChange={updateImages}
                                    className="form-control"
                                />
                            </div>
                            <button className="btn btn-success btn-block" type="submit">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
