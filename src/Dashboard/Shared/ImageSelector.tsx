import React from 'react';
import { PropType } from '../../SharedGlobal';

interface SelectorProps {
    property: PropType;
    setProperty: React.Dispatch<React.SetStateAction<PropType>>;
    imgAdd: Array<string> | undefined;
    setImgAdd: React.Dispatch<React.SetStateAction<Array<string> | undefined>>;
    setImgData: React.Dispatch<React.SetStateAction<FileList | undefined>>;
}

export function ImageSelector({
    property,
    setProperty,
    imgAdd,
    setImgAdd,
    setImgData,
}: SelectorProps): React.ReactElement {
    const updateImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        // This is only for the array that goes in the database
        const imgAddArray: Array<string> = [];
        Array.prototype.forEach.call(e.target.files, (file) => {
            imgAddArray.push(file.name);
            console.log(imgAddArray);
        });
        setImgAdd(imgAddArray);
        if (e.target.files) setImgData(e.target.files);
    };

    return (
        <input type="file" name="images" id="customFile" multiple onChange={updateImages} className="form-control" />
    );
}
