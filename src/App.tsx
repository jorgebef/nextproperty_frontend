import React, { useState, DispatchWithoutAction, SetStateAction, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './components/List.component';
import Navbar from './components/Navbar.component';
import SignIn from './components/LogIn.component';
import Create from './components/Create.component';
import Edit from './components/Edit.component';
/* import Private from './routers/Private.router'; */

export const AppContext: React.Context<any> = React.createContext({});

function App(): React.ReactElement {
    // Array<string | React.Dispatch<SetStateAction<string>>> is the type for the state hooks
    const [jwtToken, setjwtToken] = useState(localStorage.getItem('jwtToken') || '');
    const [propList, setPropList] = React.useState([]);
    /* const [apiData, setApiData] = useState({ action: {}, props: [] }); */
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        if (jwtToken == '') {
            setAuth(false);
        } else {
            setAuth(true);
        }
    }, [jwtToken]);

    const ctx = {
        jwtToken: { get: jwtToken, set: setjwtToken },
        propList: { get: propList, set: setPropList },
        /* apiData: { get: apiData, set: setApiData }, */
        auth: { get: auth, set: setAuth },
    };

    return (
        <Router>
            <AppContext.Provider value={ctx}>
                <Navbar />
                {/* <PropertyList /> */}
                {/* <Private exact path="/api/property-list" component={PropertyList} /> */}
                <Route path="/api/list" exact component={List} />
                <Route path="/api/login" exact component={SignIn} />
                <Route path="/api/edit/:id" component={Edit} />
                <Route path="/api/create" exact component={Create} />
                {/*         <Route path="/user" component={CreateUser} /> */}
            </AppContext.Provider>
        </Router>
    );
}

export default App;
