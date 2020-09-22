import React, { useState, useEffect } from 'react';
import { AppContext } from '../../App';
import { PropType, propertyDefault } from '../../SharedGlobal';
import { crudCreate, getPropList } from '../../SharedGlobal/helperFuncs';
import { ImageSelector } from '../Shared/ImageSelector';
import { MapSelector } from '../Shared/MapSelector';
import { Loading } from '../Shared/Loading';

import style from '../Shared/styleDash.module.css';

export function CreateProperty(): React.ReactElement {
    // Set the state and use properties in the state
    const [property, setProperty] = useState<PropType>(propertyDefault);
    const [imgData, setImgData] = useState<FileList>();
    const [imgAdd, setImgAdd] = useState<Array<string>>();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const ctx = React.useContext(AppContext);

    useEffect(() => {
        getPropList(ctx);
    }, [CreateProperty]);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (property.ref && property.price) {
            // GOTTA CHECK ON SUBMIT AND ALERT OF ERRORS
            setSubmitted(true);
            setLoading(true);
            /* alert(property.created_timestamp.toLocaleString('en-GB')); */
            setProperty({
                ...property,
                images: imgAdd,
                created_timestamp: Date.now(),
            });
        } else {
            setSubmitted(true);
        }
    };

    useEffect(() => {
        if (property.created_timestamp != null) {
            crudCreate(property, imgData).then((ret) => {
                if (ret === true) {
                    window.location.href = '/dashboard/list';
                } else {
                    setLoading(false);
                    console.log('Error in the CrudCreate function');
                }
            });
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
        <div className={style.container}>
            <div className={style.flex}>
                {loading ? <Loading /> : ''}
                <div className={style.propCard}>
                    <form onSubmit={handleCreate}>
                        <div className={style.formInline}>
                            <label>Reference:</label>
                            <input
                                type="text"
                                name="ref"
                                value={property.ref}
                                onChange={updateField}
                                placeholder="Reference"
                                className={submitted && property.ref === undefined ? style.inputError : undefined}
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
                                className={submitted && property.price === undefined ? style.inputError : undefined}
                            />
                        </div>
                        <div className={style.formInline}>
                            <label>Type:</label>
                            <input
                                type="text"
                                name="type"
                                value={property.type}
                                onChange={updateField}
                                placeholder="Type of property"
                                className={submitted && property.type === undefined ? style.inputError : undefined}
                            />
                            <label htmlFor="new_build">New Build:</label>
                            <input
                                type="checkbox"
                                name="new_build"
                                id="new_build"
                                defaultChecked={property.new_build}
                                onClick={updateCheckBox}
                            />
                        </div>
                        <div className={style.formInline}>
                            <label>Town:</label>
                            <input
                                type="text"
                                name="town"
                                value={property.town}
                                onChange={updateField}
                                placeholder="Town"
                                className={style.inlineInput}
                            />
                        </div>
                        <div className={style.formInline}>
                            <label>Province:</label>
                            <input
                                type="text"
                                name="province"
                                value={property.province}
                                onChange={updateField}
                                placeholder="Province"
                            />
                        </div>
                        <div className={style.formInline}>
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={property.title}
                                onChange={updateField}
                                placeholder="Title goes here"
                                className={submitted && property.title === undefined ? style.inputError : undefined}
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
                            />
                        </div>
                        <MapSelector property={property} setProperty={setProperty} updateField={updateField} />
                        <ImageSelector
                            property={property}
                            imgAdd={imgAdd}
                            setImgAdd={setImgAdd}
                            setImgData={setImgData}
                        />
                        <button className={style.btnGreen} type="submit">
                            {loading ? 'Loading...' : 'Create'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
