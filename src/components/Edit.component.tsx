import React, { useState } from 'react';
import { AppContext } from '../App';
import { useParams } from 'react-router-dom';
import { PropType } from '../helpers/types';
import { getPropSingle, crudEdit } from '../helpers/crud.helpers';

export default function Edit(): React.ReactElement {
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
        getPropSingle(ctx, id).then((p: PropType) => {
            setProperty({
                ...property,
                ...p,
            });
        });
    }, [Edit]);

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProperty({
            ...property,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        crudEdit(ctx, property, id);
    };

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleEdit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="ref"
                                    value={property.ref}
                                    onChange={updateField}
                                    placeholder="Reference"
                                    className="form-control"
                                    autoFocus
                                />
                                <input
                                    type="text"
                                    name="title"
                                    value={property.title}
                                    onChange={updateField}
                                    placeholder="Title goes here"
                                    className="form-control"
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={property.description}
                                    onChange={updateField}
                                    placeholder="Description..."
                                    className="form-control"
                                />
                            </div>
                            <button className="btn btn-success btn-block" type="submit">
                                Edit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
