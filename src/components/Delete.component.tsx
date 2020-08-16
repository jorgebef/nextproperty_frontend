//     _       ______  ____  __ __    _____   __
//    | |     / / __ \/ __ \/ //_/   /  _/ | / /
//    | | /| / / / / / /_/ / ,<      / //  |/ /
//    | |/ |/ / /_/ / _, _/ /| |   _/ // /|  /
//    |__/|__/\____/_/ |_/_/ |_|  /___/_/ |_/
//
//        ____  ____  ____  __________  ________________
//       / __ \/ __ \/ __ \/ ____/ __ \/ ____/ ___/ ___/
//      / /_/ / /_/ / / / / / __/ /_/ / __/  \__ \\__ \
//     / ____/ _, _/ /_/ / /_/ / _, _/ /___ ___/ /__/ /
//    /_/   /_/ |_|\____/\____/_/ |_/_____//____/____/
//

import React, { useState } from 'react';
import { AppContext } from '../App';
import { useParams } from 'react-router-dom';
import { PropType } from '../helpers/types';
import { isLogged } from '../helpers/auth.helpers';
import { getPropSingle } from '../helpers/crud.helpers';

export default function Edit(): React.ReactElement {
    // Set the state and use properties in the state
    const { id } = useParams();
    const ctx = React.useContext(AppContext);

    /* if (ctx.jwtToken.get == '') window.location.href = '/api/login'; */
    isLogged(ctx.jwtToken.get);

    const [property, setProperty] = useState<PropType>({
        _id: '',
        ref: '',
        title: '',
        description: '',
    });

    const handleEdit = (evt: React.FormEvent) => {
        evt.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.jwtToken.get}` },
            body: JSON.stringify({ ...property }),
        };
        fetch(`http://localhost:5000/api/property/${id}`, requestOptions)
            .then((res) => {
                res.json();
                window.location.href = '/api/list';
            })
            .catch((error) => console.log(error));
    };

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
