import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './components/List.component';
import Navbar from './components/Navbar.component';
import SignIn from './components/LogIn.component';
import Create from './components/Create.component';
/* import Edit from './components/Edit.component'; */
/* import Private from './routers/Private.router'; */

function App(): React.ReactElement {
    return (
        <Router>
            <Navbar />
            {/* <PropertyList /> */}
            {/* <Private exact path="/api/property-list" component={PropertyList} /> */}
            <Route path="/api/list" exact component={List} />
            <Route path="/api/login" exact component={SignIn} />
            {/* <Route path="/api/edit/:id" exact component={Edit} /> */}
            <Route path="/api/create" component={Create} />
            {/*         <Route path="/user" component={CreateUser} /> */}
        </Router>
    );
}

export default App;
