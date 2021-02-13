import * as React from "react";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppContext } from "../../App";
import { PropType, propertyDefault } from "../../Shared/Helpers";
import { crudCreate, getPropList } from "../../Shared/Helpers";
import { ImageSelector } from "../../Shared/ImageSelector";
import { MapSelector } from "../../Shared/MapSelector";
import { Loading } from "../../Shared/Loading";

import compStyle from "./style.module.css";
import generalStyle from "../../Shared/Styles/general.module.css";
const style = { ...compStyle, ...generalStyle };

export const CreateProperty = (): React.ReactElement => {
    // Set the state and use properties in the state
    const [property, setProperty] = React.useState<PropType>(propertyDefault);
    const [imgData, setImgData] = React.useState<FileList>();
    const [imgAdd, setImgAdd] = React.useState<Array<string>>();
    const [loading, setLoading] = React.useState(true);
    const [submitted, setSubmitted] = React.useState(false);
    const [redirect, setRedirect] = useState(false);

    const ctx = React.useContext(AppContext);

    useEffect(() => {
        getPropList(ctx).then(() => {
            setLoading(false);
        });
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
            crudCreate(ctx, property, imgData).then(() => {
                setRedirect(true);
            });
        }
    }, [property.created_timestamp]);

    const updateField = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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

    if (redirect) return <Redirect to="/dashboard/list" />;

    return loading ? (
        <Loading />
    ) : (
        <div className={style.flexContainer}>
            <div className={style.propertyCard}>
                <form className={style.createForm} onSubmit={handleCreate}>
                    <div className={style.formInline}>
                        <label htmlFor="ref">Reference:</label>
                        <input
                            type="text"
                            name="ref"
                            id="ref"
                            value={property.ref?.toUpperCase()}
                            onChange={updateField}
                            placeholder="Reference"
                            className={
                                submitted && !property.ref
                                    ? style.inputError
                                    : undefined
                            }
                            autoFocus
                        />
                    </div>
                    <div className={style.formInline}>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={property.price}
                            onChange={updateField}
                            placeholder="Price in €"
                            className={
                                submitted && !property.price
                                    ? style.inputError
                                    : undefined
                            }
                        />
                    </div>
                    <div className={style.formInline}>
                        <label htmlFor="type">Type:</label>
                        <input
                            type="text"
                            name="type"
                            id="type"
                            value={property.type}
                            onChange={updateField}
                            placeholder="Type of property"
                            className={
                                submitted && !property.type
                                    ? style.inputError
                                    : undefined
                            }
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
                        <label htmlFor="town">Town:</label>
                        <input
                            type="text"
                            name="town"
                            id="town"
                            value={property.town}
                            onChange={updateField}
                            placeholder="Town"
                        />
                    </div>
                    <div className={style.formInline}>
                        <label htmlFor="province">Province:</label>
                        <input
                            type="text"
                            name="province"
                            id="province"
                            value={property.province}
                            onChange={updateField}
                            placeholder="Province"
                        />
                    </div>
                    <div className={style.formInline}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={property.title}
                            onChange={updateField}
                            placeholder="Title goes here"
                            className={
                                submitted && !property.title
                                    ? style.inputError
                                    : undefined
                            }
                        />
                    </div>
                    <div className={style.formInline}>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            id="description"
                            value={property.description}
                            onChange={updateField}
                            placeholder="Description..."
                        />
                    </div>
                    <MapSelector
                        property={property}
                        setProperty={setProperty}
                        updateField={updateField}
                    />
                    <ImageSelector
                        property={property}
                        imgAdd={imgAdd}
                        setImgAdd={setImgAdd}
                        setImgData={setImgData}
                    />
                    <button className={style.btnGreen} type="submit">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};
