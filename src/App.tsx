import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import List from './components/List.component';
import Navbar from './components/Navbar.component';
import SignIn from './components/LogIn.component';
import Create from './components/Create.component';
import Edit from './components/Edit.component';
import Delete from './components/Delete.component';

import { ProtectedRoute, LoginRoute } from './routers/DashboardRoutes';
import Unauthorized from './routers/Unauthorized';

export const AppContext: React.Context<any> = React.createContext({});

function App(): React.ReactElement {
    // Array<string | React.Dispatch<SetStateAction<string>>> is the type for the state hooks
    /* const [jwtToken, setjwtToken] = useState(localStorage.getItem('jwtToken') || ''); */
    /* const [tokenExpiry, setTokenExpiry] = useState(localStorage.getItem('tokenExpiry') || 0); */
    const [propList, setPropList] = useState([]);
    const [auth, setAuth] = useState(false);

    const ctx = {
        /* jwtToken: { get: jwtToken, set: setjwtToken }, */
        /* tokenExpiry: { get: tokenExpiry, set: setTokenExpiry }, */
        propList: { get: propList, set: setPropList },
        auth: { get: auth, set: setAuth },
    };

    /* useEffect(() => { */
    /*     isAuth(ctx); */
    /* }, [auth]); */

    return (
        <Router>
            <AppContext.Provider value={ctx}>
                <Navbar />
                <LoginRoute path="/api/login" exact component={SignIn} />

                <ProtectedRoute path="/api/create" exact component={Create} />
                <ProtectedRoute path="/api/list" exact component={List} />
                <ProtectedRoute path="/api/edit/:id" component={Edit} />
                <ProtectedRoute path="/api/delete/:id" component={Delete} />

                <Route exact path="/unauthorized" component={Unauthorized} />
            </AppContext.Provider>
        </Router>
    );
}

export default App;
