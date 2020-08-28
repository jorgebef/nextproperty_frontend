import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import List from './components/dashboard/ListDash';
import NavBarDashboard from './components/dashboard/NavbarDash';
import LogIn from './components/dashboard/LogIn';
import Create from './components/dashboard/Create';
import Edit from './components/dashboard/Edit';
import Delete from './components/dashboard/Delete';

import { ProtectedRoute, LoginRoute } from './routers/DashboardRoutes';
import NotFound from './components/dashboard/NotFoundDash';
import NavBarPublic from './components/public/NavbarPublic';

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
        <BrowserRouter>
            <AppContext.Provider value={ctx}>
                {ctx.auth.get ? <NavBarDashboard /> : <NavBarPublic />}
                <Route path="/dashboard">
                    <Switch>
                        <LoginRoute path="/dashboard/login" exact component={LogIn} />
                        <ProtectedRoute path="/dashboard/create" exact component={Create} />
                        <ProtectedRoute path="/dashboard/list" exact component={List} />
                        <ProtectedRoute path="/dashboard/edit/:id" component={Edit} />
                        <ProtectedRoute path="/dashboard/delete/:id" component={Delete} />
                        <Route component={NotFound} /> {/* THIS IS SET TO REDIRECT TO LOGIN]*/}
                    </Switch>
                </Route>
            </AppContext.Provider>
        </BrowserRouter>
    );
}

export default App;
