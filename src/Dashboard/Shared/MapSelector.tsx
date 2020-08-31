import React from 'react';
import { PropType } from '../../SharedGlobal';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

interface MapProps {
    property: PropType;
    setProperty: React.Dispatch<React.SetStateAction<PropType>>;
    imgAdd: Array<string> | undefined;
    setImgAdd: React.Dispatch<React.SetStateAction<Array<string> | undefined>>;
    setImgData: React.Dispatch<React.SetStateAction<FileList | undefined>>;
}

export function MapSelector({ property, setProperty, imgAdd, setImgAdd, setImgData }: MapProps): React.ReactElement {
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
        <div>
            <div></div>
            {/* <Map></Map> */}
        </div>
    );
}
