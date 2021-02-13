import * as React from 'react';

import image1 from './work-1.jpg';
import handshakeIcon from './handshake-solid.svg';

import '../../Shared/styleFront.css';

export const HomePage = (): React.ReactElement => {
    return (
        <div id="frontPageContainer">
            <div className="pack">
                <img src={image1} className="image" />
                <div className="overlay">
                    <div className="row no-gutters slider-text justify-content-center align-items-center">
                        <div className="ftco-animate align-items-center text text-center">
                            <h1 className="mb-4">The Simplest Way to Find Property</h1>
                            <p style={{ fontSize: '18px' }}>A small river named Duden flows by their regelialia.</p>
                            <form action="#" className="search-location mt-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-lg-10 align-items-end">
                                        <div className="form-group">
                                            <div className="form-field">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search location"
                                                />
                                                <button>
                                                    <span className="ion-ios-search"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="arrowContainer">
                    <svg className="arrows">
                        <path className="a1" d="M0 0 L30 32 L60 0"></path>
                        <path className="a2" d="M0 20 L30 52 L60 20"></path>
                        <path className="a3" d="M0 40 L30 72 L60 40"></path>
                    </svg>
                </div>
            </div>

            <div id="features" className="text-center">
                <div className="container">
                    <div className="section-title">
                        <h2>Features</h2>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 col-md-3">
                            <i className="fa fa-comments-o"></i>
                            <h3>Lorem ipsum</h3>
                            <p>
                                Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque
                                natoque etiam.
                            </p>
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <i className="fa fa-bullhorn"></i>
                            <h3>Lorem ipsum</h3>
                            <p>
                                Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque
                                natoque etiam.
                            </p>
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <div className="roundIcon">
                                <img src={handshakeIcon} style={{ margin: 'auto' }} />
                            </div>
                            <h3>Lorem ipsum</h3>
                            <p>
                                Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque
                                natoque etiam.
                            </p>
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <i className="fa fa-magic"></i>
                            <h3>Lorem ipsum</h3>
                            <p>
                                Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque
                                natoque etiam.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
