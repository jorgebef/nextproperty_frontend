import React, { useState, useEffect } from "react";
import { AppContext } from "../../App";
import { useParams, Redirect } from "react-router-dom";
import { PropType, propertyDefault } from "../../Shared/Helpers";
import { getPropSingle, crudEdit } from "../../Shared/Helpers";
import { ImageSelector } from "../../Shared/ImageSelector";
import { MapSelector } from "../../Shared/MapSelector";
import { Loading } from "../../Shared/Loading";

import compStyle from "./style.module.css";
import generalStyle from "../../Shared/Styles/general.module.css";
const style = { ...compStyle, ...generalStyle };

export function EditProperty(): React.ReactElement {
    // Set the state and use properties in the state
    const ctx = React.useContext(AppContext);
    const { id }: any = useParams();

    const [property, setProperty] = useState<PropType>(propertyDefault);
    const [imgData, setImgData] = useState<FileList>();
    const [imgDel, setImgDel] = useState<Array<string>>();
    const [imgAdd, setImgAdd] = useState<Array<string>>();
    const [oldTimestamp, setOldTimestamp] = useState<number>();
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    React.useEffect(() => {
        getPropSingle(ctx, id).then((p: PropType) => {
            setProperty({
                ...property,
                ...p,
            });
            setLoading(false);
        });
    }, []);

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const propImgArray: Array<string> = property.images
            ? property.images
            : [];
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
        setOldTimestamp(
            property.edited_timestamp ? property.edited_timestamp : 1
        );
    };

    // Only run this Effect once the property.timestamp has been changed to a new
    // value since the loading of the data
    // const history = useHistory();
    useEffect(() => {
        if (
            property.edited_timestamp &&
            oldTimestamp &&
            property.edited_timestamp > oldTimestamp
        ) {
            crudEdit(ctx, property, id, imgData, imgDel).then(() => {
                setRedirect(true);
            });
        }
    }, [property.edited_timestamp]);

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
            <div className={style.flexPropContainer}>
                <div className={style.propCard}>
                    <form onSubmit={handleEdit}>
                        <div className={style.formInline}>
                            <label htmlFor="ref">Reference:</label>
                            <input
                                type="text"
                                name="ref"
                                id="ref"
                                value={property.ref}
                                onChange={updateField}
                                placeholder="Reference"
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
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    name="new_build"
                                    defaultChecked={property.new_build}
                                    onClick={updateCheckBox}
                                />
                                New Build
                            </label>
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
                            imgDel={imgDel}
                            setImgDel={setImgDel}
                        />
                        {/* <div className={`${style.formInline}  ${style.timestamp}`}> */}
                        <div className={style.formInline}>
                            <div className={style.timestamp}>
                                <label>Created:</label>
                                {new Date(
                                    property.created_timestamp
                                ).toLocaleString("es-ES")}
                            </div>
                            <div className={style.timestamp}>
                                <label>Last edit:</label>
                                {property.edited_timestamp === undefined
                                    ? "Never"
                                    : new Date(
                                          property.edited_timestamp
                                      ).toLocaleString("es-ES")}
                            </div>
                        </div>
                        <button
                            name="editBtn"
                            className={style.btnBlue}
                            type="submit"
                        >
                            Edit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
