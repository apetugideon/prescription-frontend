import React, { useState } from "react";
import './App.css';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Home from './components/Home.js';
import Prescriptions from './components/Prescriptions.js';
import Ailments from './components/Ailments.js';
import Formulas from './components/Formulas.js';
import Placements from './components/Placements.js';
import Unauthorized from './components/Unauthorized.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { localStore } from './Actions/Actions';


function App() {
  const isAuthenticated = localStore('','isAuthenticated','get') ;
  const isAdmin = localStore('','isAdmin','get');

  return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            {((isAdmin) && (isAuthenticated)) ? 
              <div>
                <Route path="/prescriptions" exact component={Prescriptions} />
                <Route path="/ailments" exact component={Ailments} />
                <Route path="/formulas" exact component={Formulas} />
                <Route path="/placements" exact component={Placements} />
              </div>
            : <Route path="/unauthorized" exact component={Unauthorized} />}
          </Switch>
        </div>
      </Router>
    
  );
}

export default App;
