import React from 'react';
import { PropType } from '../Helpers';
import GoogleMapReact from 'google-map-react';
import { ReactComponent as SelectorIcon } from './map-marker.svg';

import compStyle from './style.module.css';
import generalStyle from '../Styles/general.module.css';
const style = { ...compStyle, ...generalStyle };

interface MapProps {
    property: PropType;
    setProperty: React.Dispatch<React.SetStateAction<PropType>>;
    updateField: any;
}

export const MapSelector = ({ property, setProperty, updateField }: MapProps): React.ReactElement => {
    const MyMarker = ({ text: string }: any) => {
        if (property.lat && property.long) {
            return <SelectorIcon />;
        } else {
            return null;
        }
    };

    const _onClick = (lat: number, lng: number) => {
        setProperty({
            ...property,
            lat: lat,
            long: lng,
        });
    };

    const mapDefaults = {
        center: {
            lat: 38.001287,
            lng: -0.691061,
        },
        zoom: 12,
    };

    return (
        <div className={style.mapContainer}>
            <div className={style.mapWrapper}>
                <GoogleMapReact
                    // bootstrapURLKeys={{ key: String(process.env.REACT_APP_GOOGLEAPI), language: 'en' }}
                    bootstrapURLKeys={{ key: '', language: 'en' }}
                    defaultCenter={mapDefaults.center}
                    defaultZoom={mapDefaults.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onClick={({ lat, lng }) => _onClick(lat, lng)}
                    // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                    <MyMarker
                        lat={property.lat ? property.lat : mapDefaults.center.lat}
                        lng={property.long ? property.long : mapDefaults.center.lng}
                        text="My Marker"
                        // img="https://image.flaticon.com/icons/svg/2937/2937077.svg"
                    />
                </GoogleMapReact>
            </div>
            <div className={style.formInline}>
                <label>Latitude:</label>
                <input
                    type="text"
                    name="lat"
                    id="lat"
                    value={property.lat}
                    onChange={updateField}
                    placeholder="Latitude coordinate"
                />
                <label>Longitude:</label>
                <input
                    type="text"
                    name="long"
                    id="long"
                    value={property.long}
                    onChange={updateField}
                    placeholder="Longitude coordinate"
                />
            </div>
        </div>
    );
};
