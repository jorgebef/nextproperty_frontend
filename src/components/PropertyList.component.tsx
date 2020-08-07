import React from 'react';
/* import axios from 'axios'; */

type PropType = {
    _id: string;
    ref: string;
    title: string;
    description: string;
};

export default class PropertyList extends React.Component {
    state = {
        propertyList: [],
    };

    /* componentDidMount(): void { */
    /*     axios.get('http://localhost:5000/api/properties/list').then((res) => { */
    /*         const properties = res.data; */
    /*         this.setState({ properties }); */
    /*         console.log(properties); */
    /*     }); */
    /* } */

    componentDidMount(): void {
        fetch('http://localhost:5000/api/properties/list')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({ propertyList: data.props });
                this.setState({ navActive: data.navbar });
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(): React.ReactNode {
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
                    {this.state.propertyList.map((property: PropType, key: string | number | undefined) => {
                        return (
                            <div
                                key={key + 'card_div'}
                                className="col-sm-3 card bg-light p-0 m-3 text-center align-items-center"
                            >
                                <h3 className="card-header align-self-stretch">{property.ref}</h3>
                                <div className="card-body">
                                    <h5 className="card-title">{property.title}</h5>
                                    <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                                </div>
                                <img
                                    style={{ objectFit: 'cover', display: 'block' }}
                                    src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                                    alt="Card image"
                                />
                                <div className="card-body">
                                    <p className="overflow-hidden card-text">{property.description}</p>
                                </div>
                                <ul className="list-group list-group-flush align-self-stretch align-items-center">
                                    <li className="list-group-item">
                                        Cras alskdjflakjdslfk alsdlkajdfi ao sdij foadj foaikj dfokajsdofi adofj
                                        aoskjusto odio
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
}
