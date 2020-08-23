import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { PropType } from '../helpers/types';
import { getPropList } from '../helpers/crud.helpers';

export default function List(): React.ReactElement {
    // Set the state and use properties in the state
    const ctx = React.useContext(AppContext);

    React.useEffect(() => {
        getPropList(ctx);
    }, []);

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
                                src="https://i.imgur.com/wfDHjIS.jpg"
                                alt="Card image"
                            />
                            <div className="card-body">
                                <p className="overflow-hidden card-text">{property.description}</p>
                            </div>
                            <ul className="list-group list-group-flush align-self-stretch align-items-center">
                                <li className="list-group-item">Cras alskdjflakjdslfk adofj aoskjusto</li>
                                <li className="list-group-item">Dapibus ac facilisis in</li>
                                <li className="list-group-item">Vestibulum at eros</li>
                            </ul>
                            <div className="card-footer align-items-center align-self-stretch">
                                <Link to={`/api/delete/${property._id}`} className="btn btn-danger">
                                    Delete
                                </Link>
                                <Link to={`/api/edit/${property._id}`} className="btn btn-secondary">
                                    Edit
                                </Link>
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
