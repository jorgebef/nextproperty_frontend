import React, { useState } from 'react';
/* import axios from 'axios'; */

type PropType = {
    _id: string;
    ref: string;
    title: string;
    description: string;
};

export default function List(): React.ReactElement {
    // Set the state and use properties in the state
    const [apiData, setApiData] = useState({ action: {}, props: [] });
    const [jwtToken, setjwtToken] = useState(localStorage.getItem('jwtToken') || null);

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwtToken}` },
    };

    React.useEffect(() => {
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

    React.useEffect(() => {
        if (jwtToken == null) window.location.href = '/api/login';
    }, [jwtToken]);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center p-4">
                <form className="form-inline align-items-center justify-content-center p-xl-3">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search"></input>
                    <button className="btn btn-secondary" type="submit">
                        Search
                    </button>
                </form>
            </div>

            <div className="row justify-content-center pl-xl-5 pr-xl-5">
                {apiData.props.map((property: PropType, key: number | string) => {
                    return (
                        <div
                            key={key + property._id}
                            className="col-sm-3 card bg-light p-0 m-3 text-center align-items-center"
                        >
                            <h3 className="card-header align-self-stretch">{property.ref}</h3>
                            <div className="card-body">
                                <h5 className="card-title">{property.title}</h5>
                                <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                            </div>
                            <img
                                style={{ objectFit: 'cover', width: '100%', display: 'block' }}
                                src="https://i.imgur.com/wfDHjIS.jpg"
                                alt="Card image"
                            />
                            <div className="card-body">
                                <p className="overflow-hidden card-text">{property.description}</p>
                            </div>
                            <ul className="list-group list-group-flush align-self-stretch align-items-center">
                                <li className="list-group-item">
                                    Cras alskdjflakjdslfk alsdlkajdfi ao sdij foadj foaikj dfokajsdofi adofj aoskjusto
                                    odio
                                </li>
                                <li className="list-group-item">Dapibus ac facilisis in</li>
                                <li className="list-group-item">Vestibulum at eros</li>
                            </ul>
                            <div className="card-footer align-items-center align-self-stretch">
                                <a href={'/api/properties/delete/' + property._id} className="btn btn-danger">
                                    Delete
                                </a>
                                <a href={'/api/properties/edit/' + property._id} className="btn btn-secondary">
                                    Edit
                                </a>
                            </div>
                            <div className="card-footer text-muted align-self-stretch">
                                <b>2 days ago</b>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
