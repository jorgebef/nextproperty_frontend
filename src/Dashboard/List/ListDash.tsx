import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import { getPropList } from '../../Shared/Helpers';
import { PropType, APIURL } from '../../Shared/Helpers';
import { Loading } from '../../Shared/Loading';
import { SearchBar } from '../../Shared/SearchBar/SearchBarComp';

// General CSS module
import generalStyle from '../../Shared/Styles/general.module.css';
// Component specific CSS module
import compStyle from './style.module.css';
/* const style = { ...compStyle, ...generalStyle }; */

export const ListDash = (): React.ReactElement => {
    // Set the state and use properties in the state
    // Also se the context so that we can use it in the component
    const ctx = React.useContext(AppContext);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        getPropList(ctx).then(() => {
            // This is a test comment
            setLoading(false);
        });
    }, [ListDash]);

    return loading ? (
        <Loading />
    ) : (
        <div className={generalStyle.flexContainer}>
            <SearchBar />
            <div className={compStyle.grid}>
                {ctx.propList.get
                    ? ctx.propList.get.map((property: PropType, key: number | string) => {
                          return (
                              <div key={key + property._id} className={compStyle.card}>
                                  <div className={compStyle.propRef}>
                                      <span>{property.ref}</span>
                                  </div>
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
                                  <div className={compStyle.propPrice}>{property.price.toLocaleString()} €</div>
                                  <h1 className={compStyle.propTitle}>{property.title}</h1>
                                  {/* <div>Support card subtitle</div> */}
                                  {Number(property.images?.length)} photos
                                  <div className={compStyle.propDesc}>{property.description}</div>
                                  <ul className={compStyle.propStats}>
                                      <li>Cras alskdjflakjdslfk adofj aoskjusto</li>
                                      <li>Dapibus ac facilisis in</li>
                                      <li>Vestibulum at eros</li>
                                  </ul>
                                  <div className={compStyle.actionButtons}>
                                      <Link
                                          id="deleteBtn"
                                          to={`/dashboard/delete/${property._id}`}
                                          className={generalStyle.btnRed}
                                      >
                                          Delete
                                      </Link>
                                      <Link
                                          id="editBtn"
                                          to={`/dashboard/edit/${property._id}`}
                                          className={generalStyle.btnBlue}
                                      >
                                          Edit
                                      </Link>
                                  </div>
                                  <div className={compStyle.propFooter}>
                                      Created: {new Date(property.created_timestamp).toLocaleString('es-ES')}
                                  </div>
                              </div>
                          );
                      })
                    : undefined}
            </div>
        </div>
    );
};
