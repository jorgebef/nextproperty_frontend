import React, { useState } from 'react';
/* import axios from 'axios'; */

export default function Create(): React.ReactElement {
    // Set the state and use properties in the state
    const [property, setProperty] = useState({ ref: '', title: '', description: '' });
    const [apiData, setApiData] = useState({ action: {}, props: [] });
    const [jwtToken, setjwtToken] = useState(localStorage.getItem('jwtToken') || null);

    const handleCreate = (evt: React.FormEvent) => {
        /* const requestOptions = { */
        /*     method: 'POST', */
        /*     headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}` }, */
        /*     body: JSON.stringify({}), */
        /* }; */
        /* fetch('http://localhost:5000/api/properties/create', requestOptions) */
        /*     .then((res) => res.json()) */
        /*     .then((data) => { */
        /*         setApiData(data); */
        /*     }) */
        /*     .catch((error) => { */
        /*         console.log(error); */
        /*     }); */
        alert(JSON.stringify(property));
    };

    React.useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}` },
        };
        fetch('http://localhost:5000/api/properties/list', requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setApiData(data);
            })
            .catch((error) => {
                console.log(error);
            });
        /* alert(jwtToken); */
    }, [apiData]);

    const updateField = (e: any) => {
        setProperty({
            ...property,
            [e.target.name]: e.target.value,
        });
    };

    React.useEffect(() => {
        if (jwtToken == null) window.location.href = '/api/login';
    }, [jwtToken]);

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleCreate}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={property.ref}
                                    onChange={updateField}
                                    placeholder="Reference"
                                    className="form-control"
                                    autoFocus
                                />
                                <input
                                    type="text"
                                    value={property.title}
                                    onChange={updateField}
                                    placeholder="Title goes here"
                                    className="form-control"
                                />
                                <input
                                    type="text"
                                    value={property.description}
                                    onChange={updateField}
                                    className="form-control"
                                    placeholder="Description..."
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
