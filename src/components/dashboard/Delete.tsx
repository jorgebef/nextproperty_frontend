import React, { useState } from 'react';
/* import { AppContext } from '../App'; */
import { useParams } from 'react-router-dom';
import { PropType, propertyDefault } from '../../helpers/types_variables';
import { getPropSingle, crudDelete } from '../../helpers/crud.helpers';

export default function Delete(): React.ReactElement {
    // Set the state and use properties in the state
    const { id } = useParams();
    /* const ctx = React.useContext(AppContext); */

    const [property, setProperty] = useState<PropType>(propertyDefault);

    React.useEffect(() => {
        getPropSingle(id).then((p: PropType) => {
            setProperty({
                ...property,
                ...p,
            });
        });
    }, []);

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        crudDelete(id);
    };

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleDelete}>
                            <div className="form-group">
                                <input type="text" name="ref" value={property.ref} className="form-control" disabled />
                                <input
                                    type="text"
                                    name="title"
                                    value={property.title}
                                    className="form-control"
                                    disabled
                                />
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
            </div>
        </div>
    );
}
