import React, { useState } from 'react';
import { AppContext } from '../App';
import { PropType } from '../helpers/types';
import { crudCreate, getPropList } from '../helpers/crud.helpers';

export default function Create(): React.ReactElement {
    // Set the state and use properties in the state
    const [property, setProperty] = useState<PropType>({
        _id: '',
        ref: '',
        title: '',
        description: '',
    });

    const ctx = React.useContext(AppContext);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        crudCreate(property);
    };

    React.useEffect(() => {
        getPropList(ctx);
    }, [Create]);

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProperty({
            ...property,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleCreate}>
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
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
