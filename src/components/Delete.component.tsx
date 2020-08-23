import React, { useState } from 'react';
import { AppContext } from '../App';
import { useParams } from 'react-router-dom';
import { PropType } from '../helpers/types';
import { getPropSingle, crudDelete } from '../helpers/crud.helpers';

export default function Delete(): React.ReactElement {
    // Set the state and use properties in the state
    const { id } = useParams();
    const ctx = React.useContext(AppContext);

    const [property, setProperty] = useState<PropType>({
        _id: '',
        ref: '',
        title: '',
        description: '',
    });

    React.useEffect(() => {
        getPropSingle(id).then((p: PropType) => {
            setProperty({
                ...property,
                ...p,
            });
        });
    }, [Delete]);

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProperty({
            ...property,
            [e.target.name]: e.target.value,
        });
    };

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
                                <input
                                    type="text"
                                    name="ref"
                                    value={property.ref}
                                    onChange={updateField}
                                    className="form-control"
                                    disabled
                                />
                                <input
                                    type="text"
                                    name="title"
                                    value={property.title}
                                    onChange={updateField}
                                    className="form-control"
                                    disabled
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={property.description}
                                    onChange={updateField}
                                    className="form-control"
                                    disabled
                                />
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
