import * as React from 'react';
import {useParams} from 'react-router-dom';
import {PropType, propertyDefault} from '../../Shared/Helpers';
import {getPropSingle, crudDelete} from '../../Shared/Helpers';
import {AppContext} from '../../App';

import compStyle from './style.module.css';
import generalStyle from '../../Shared/Styles/general.module.css';
const style = {...compStyle, ...generalStyle};

export const DeleteProperty = (): React.ReactElement => {
    // Set the state and use properties in the state
    const ctx = React.useContext(AppContext);

    // Grabbing the id specified in the url
    const {id}: any = useParams();

    const [property, setProperty] = React.useState<PropType>(propertyDefault);

    React.useEffect(() => {
        getPropSingle(ctx, id).then((p: PropType) => {
            setProperty({
                ...property,
                ...p,
            });
        });
    }, []);

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        crudDelete(ctx, id).then(() => {
            window.location.href = '/dashboard/list';
        });
    };

    return (
        <div className={style.flexContainer}>
            <div className="card card-body my-3 mx-5">
                <form onSubmit={handleDelete}>
                    <div className="form-group">
                        <input type="text" name="ref" value={property.ref} className="form-control" disabled />
                        <input type="text" name="title" value={property.title} className="form-control" disabled />
                        <input
                            type="text"
                            name="description"
                            value={property.description}
                            className="form-control"
                            disabled
                        />
                        <div className="card-footer text-muted align-self-stretch">
                            {new Date(property.created_timestamp).toLocaleString('es-ES')}
                        </div>
                    </div>
                    <button className="btn btn-danger btn-block" type="submit">
                        DELETE
                    </button>
                </form>
            </div>
        </div>
    );
};
