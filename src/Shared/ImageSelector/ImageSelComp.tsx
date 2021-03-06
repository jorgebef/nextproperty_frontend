import React from 'react';
import { PropType, APIURL } from '../Helpers';

import uploadIcon from '../Images/cloud-upload-icon.svg';

import compStyle from './style.module.css';
import generalStyle from '../Styles/general.module.css';
const style = { ...compStyle, ...generalStyle };

type SelectorProps = {
    property: PropType;
    setProperty?: React.Dispatch<React.SetStateAction<PropType>>;
    imgAdd: Array<string> | undefined;
    setImgAdd: React.Dispatch<React.SetStateAction<Array<string> | undefined>>;
    imgDel?: Array<string> | undefined;
    setImgDel?: React.Dispatch<React.SetStateAction<Array<string> | undefined>> | undefined;
    setImgData: React.Dispatch<React.SetStateAction<FileList | undefined>>;
};

export function ImageSelector({
    property,
    setProperty,
    imgAdd,
    setImgAdd,
    imgDel,
    setImgDel,
    setImgData,
}: SelectorProps): React.ReactElement {
    // This is a comment that is very useful
    const updateImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        // This is only for the array that goes in the database
        const imgAddArray: Array<string> = [];
        Array.prototype.forEach.call(e.target.files, (file) => {
            imgAddArray.push(file.name);
            console.log(imgAddArray);
        });
        setImgAdd(imgAddArray);
        if (e.target.files) setImgData(e.target.files);
    };

    const updateDelImages = (e: React.MouseEvent<HTMLInputElement>) => {
        const delArray: Array<string> = imgDel ? imgDel : [];
        if (e.currentTarget.checked) {
            delArray.push(e.currentTarget.name);
        } else {
            for (let x = 0; x < delArray.length; x++) {
                if (delArray[x] === e.currentTarget.name) {
                    delArray.splice(x, 1);
                    x--;
                }
            }
        }
        console.log(delArray);
        if (setImgDel) setImgDel(delArray);
    };

    return (
        <div className={style.imgSelector}>
            <input type="file" name="images" id="customFile" multiple onChange={updateImageAdd} />
            <label htmlFor="customFile" className={imgAdd && imgAdd.length > 0 ? style.withImgs : undefined}>
                <img src={uploadIcon} />
                <div>
                    {imgAdd && imgAdd.length !== 0
                        ? imgAdd.length === 1
                            ? '1 Image selected'
                            : imgAdd.length + ' Images selected'
                        : 'Choose images to upload'}
                </div>
            </label>

            {/* Check if SetImgDel is set, if so, it means we are in the edit page
            and therefore we must display the images from the DB (if any) and allow
                for the user to remove them */}
            {setImgDel ? (
                <div className={style.imgPreview}>
                    {property.images?.concat(imgAdd ? imgAdd : []).map((i, key) => (
                        <label key={key} htmlFor={i}>
                            <img alt={i} src={`${APIURL}/${property.ref}/${i}`} />
                            <input type="checkbox" name={i} id={i} onClick={updateDelImages} />
                            {i}
                        </label>
                    ))}
                </div>
            ) : undefined}
        </div>
    );
}
