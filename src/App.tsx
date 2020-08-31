import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { List } from './Dashboard/List';
import { NavBarDash } from './Dashboard/NavBar';
import { LogIn } from './Dashboard/LogIn';
import { Create } from './Dashboard/Create';
import { Edit } from './Dashboard/Edit';
import { Delete } from './Dashboard/Delete';

import { ProtectedRoute, LoginRoute } from './routers/DashboardRoutes';
import { NotFound } from './Dashboard/NotFound';
import { NavBarFront } from './Frontend/NavBar';

export const AppContext: React.Context<any> = React.createContext({});

function App() {
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
                {ctx.auth.get ? <NavBarDash /> : <NavBarFront />}
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
