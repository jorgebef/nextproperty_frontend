import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import { getPropList } from '../../SharedGlobal/helperFuncs';
import { PropType, APIURL } from '../../SharedGlobal';

export function List(): React.ReactElement {
    // Set the state and use properties in the state
    const ctx = React.useContext(AppContext);

    React.useEffect(() => {
        getPropList(ctx);
    }, [List]);

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
                {ctx.propList.get.map((property: PropType, key: number | string) => {
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
                                src={
                                    property.images && property.images[0]
                                        ? `${APIURL}/${property.ref}/${property.images[0]}`
                                        : 'https://i.imgur.com/2idW9C3.jpg'
                                }
                                alt={
                                    property.images && property.images[0]
                                        ? `${APIURL}/${property.ref}/${property.images[0]}`
                                        : 'https://i.imgur.com/2idW9C3.jpg'
                                }
                            />
                            {Number(property.images?.length)} photos
                            <div className="card-body">
                                <p className="overflow-hidden card-text">{property.description}</p>
                            </div>
                            <ul className="list-group list-group-flush align-self-stretch align-items-center">
                                <li className="list-group-item">Cras alskdjflakjdslfk adofj aoskjusto</li>
                                <li className="list-group-item">Dapibus ac facilisis in</li>
                                <li className="list-group-item">Vestibulum at eros</li>
                            </ul>
                            <div className="card-footer align-items-center align-self-stretch">
                                <Link to={`/dashboard/delete/${property._id}`} className="btn btn-danger">
                                    Delete
                                </Link>
                                <Link to={`/dashboard/edit/${property._id}`} className="btn btn-secondary">
                                    Edit
                                </Link>
                            </div>
                            <div className="card-footer text-muted align-self-stretch">
                                <b>Created: {new Date(property.created_timestamp).toLocaleString('es-ES')}</b>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
