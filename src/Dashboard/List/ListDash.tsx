import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import { getPropList } from '../../SharedGlobal/helperFuncs';
import { PropType, APIURL } from '../../SharedGlobal';

import style from '../Shared/styleDash.module.css';

export const ListDash = (): React.ReactElement => {
    // Set the state and use properties in the state
    const ctx = React.useContext(AppContext);

    React.useEffect(() => {
        getPropList(ctx);
    }, [ListDash]);

    return (
        <div className={style.container}>
            <div className="row justify-content-center mb-5">
                <form className="form-inline align-items-center justify-content-center">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search"></input>
                    <button className="btn btn-secondary" type="submit">
                        Search
                    </button>
                </form>
            </div>
            <div className={style.grid}>
                {ctx.propList.get.map((property: PropType, key: number | string) => {
                    return (
                        <div key={key + property._id} className={style.propCell}>
                            <img
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
                            <div className={style.propPrice}>{property.price.toLocaleString()} €</div>
                            <h1 className={style.propTitle}>{property.title}</h1>
                            {/* <div className="card-subtitle text-muted">Support card subtitle</div> */}
                            {Number(property.images?.length)} photos
                            <div className={style.propDesc}>{property.description}</div>
                            <ul className={style.propStats}>
                                <li className="align-self-stretch list-group-item">
                                    Cras alskdjflakjdslfk adofj aoskjusto
                                </li>
                                <li className="align-self-stretch list-group-item">Dapibus ac facilisis in</li>
                                <li className="align-self-stretch list-group-item">Vestibulum at eros</li>
                            </ul>
                            <div className={style.actionButtons}>
                                <Link to={`/dashboard/delete/${property._id}`} className={style.btnRed}>
                                    Delete
                                </Link>
                                <Link to={`/dashboard/edit/${property._id}`} className={style.btnBlue}>
                                    Edit
                                </Link>
                            </div>
                            <div className={style.propFooter}>
                                Created: {new Date(property.created_timestamp).toLocaleString('es-ES')}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
