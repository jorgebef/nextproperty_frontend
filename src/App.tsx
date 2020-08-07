import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropertyList from './components/PropertyList.component';
import Navbar from './components/Navbar.component';

function App() {
    return (
        <div>
            {/* <PropertyListItem property={propertyList[0]} /> */}
            {/* <PropertyList /> */}
            <Router>
                <Navbar />
                <Route path="/property-list" exact component={PropertyList} />
                {/* <Route path="/edit/:id" component={EditExercise} /> */}
                {/* <Route path="/create" component={CreateExercise} /> */}
                {/*         <Route path="/user" component={CreateUser} /> */}
            </Router>
        </div>
    );
}

export default App;
