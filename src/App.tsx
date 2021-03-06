import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import './main.css';

import { NavBarFront, NavBarDash } from './Shared/NavBar';

import { ListDash } from './Dashboard/List';
import { LogInDash } from './Dashboard/LogIn';
import { CreateProperty } from './Dashboard/Create';
import { EditProperty } from './Dashboard/Edit';
import { DeleteProperty } from './Dashboard/Delete';

import { ProtectedRoute, LoginRoute } from './routers/DashboardRoutes';
import { NotFound } from './Dashboard/NotFound';
import { HomePage } from './Frontend/Home/HomePage';
import { ResultsPage as ResultsPage } from './Frontend/Results/ResultsPage';
import { useCookies } from 'react-cookie';

export const AppContext: React.Context<any> = React.createContext({});

function App(): React.ReactElement {
    // Array<string | React.Dispatch<SetStateAction<string>>> is the type for the state hooks
    const [jwtToken, setjwtToken] = useState(localStorage.getItem('jwtToken') || '');
    /* const [tokenExpiry, setTokenExpiry] = useState(localStorage.getItem('tokenExpiry') || 0); */
    const [cookies, setCookies] = useCookies(['token']);
    const [propList, setPropList] = useState([]);
    const [auth, setAuth] = useState(false);

    const ctx = {
        jwtToken: { get: jwtToken, set: setjwtToken },
        cookies: { get: cookies, set: setCookies },
        /* tokenExpiry: { get: tokenExpiry, set: setTokenExpiry }, */
        propList: { get: propList, set: setPropList },
        auth: { get: auth, set: setAuth },
    };

    // const isDash = String(window.location).search('/dashboard') === -1 ? false : true;
    return (
        <HashRouter>
            <AppContext.Provider value={ctx}>
                {/* {isDash ? auth ? <NavBarDash /> : undefined : <NavBarFront />} */}
                {auth ? <NavBarDash /> : <NavBarFront />}
                <Route path="/">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/properties" component={ResultsPage} />
                        {/* <Redirect to="/" /> {/1* THIS IS SET TO REDIRECT TO LOGIN]*1/}*/}
                    </Switch>
                </Route>
                <Route path="/dashboard">
                    <Switch>
                        <LoginRoute exact path="/dashboard/login" component={LogInDash} />
                        {/* <Route exact path="/dashboard/login" component={LogInDash} /> */}
                        <ProtectedRoute exact path="/dashboard/create" component={CreateProperty} />
                        <ProtectedRoute exact path="/dashboard/list" component={ListDash} />
                        <ProtectedRoute exact path="/dashboard/edit/:id" component={EditProperty} />
                        <ProtectedRoute exact path="/dashboard/delete/:id" component={DeleteProperty} />
                        <Route component={NotFound} /> {/* THIS IS SET TO REDIRECT TO LOGIN]*/}
                    </Switch>
                </Route>
            </AppContext.Provider>
        </HashRouter>
    );
}

export default App;
