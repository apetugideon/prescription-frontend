import React, { Component } from 'react';
import './../App.css';
import { Link, withRouter } from 'react-router-dom';
import { localStore, checkUser } from '../Actions/Actions';


class TopNav extends Component {
    constructor(props) {
        super(props);
        this.triggerLogout = this.triggerLogout.bind(this);
        this.state = { 
            isAuthenticated: false,
            isAdmin: false
        }
    }

    componentDidMount() {
        checkUser();
        this.doRefresh();
    }

    nullReset() {
        localStore(false, 'isAuthenticated', 'add');
        localStore(false, 'isAdmin', 'add');
        localStore('', 'tokenUser', 'add');
        this.doRefresh();
    }

    triggerLogout(event) {
        event.preventDefault();
        this.nullReset();
        this.props.history.push("/login");
    }

    doRefresh() {
        this.setState({['isAuthenticated']: localStore('','isAuthenticated','get')});
        this.setState({['isAdmin']: localStore('','isAdmin','get')});
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm bd-white fixed-top nav-style">
                <div className="row nav-wrapper">
                    <div className="col-lg-2 col-md-1"></div>
                    <div className="col-lg-8 col-md-10 col-sm-12 middle-pane-wrapper">
                        <nav className="navbar navbar-expand-md">
                            <Link className="navbar-brand" to="/">
                                <i className="mdi mdi-scatter-plot"></i>Prescriptions
                            </Link>

                            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon">
                                    <i style={{fontSize:'30px'}} class="fas fa-bars"></i>
                                </span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav">

                                    {((this.state.isAdmin) && (this.state.isAuthenticated)) ? 
                                        <Link className="linkstyle" to="/prescriptions">
                                            <span className="nav-link top-menu">Drugs</span>
                                        </Link>
                                    : ""}

                                    {((this.state.isAdmin) && (this.state.isAuthenticated)) ? 
                                        <Link className="linkstyle" to="/ailments">
                                            <span className="nav-link top-menu">Ailments</span>
                                        </Link>
                                    : ""}

                                    {((this.state.isAdmin) && (this.state.isAuthenticated)) ? 
                                        
                                        <Link className="linkstyle" to="/formulas">
                                            <span className="nav-link top-menu">Formulas</span>
                                        </Link>
                                        
                                    : ""}

                                    {((this.state.isAdmin) && (this.state.isAuthenticated)) ? 
                                        <Link className="linkstyle" to="/placements">
                                            <span className="nav-link top-menu">Placements</span>
                                        </Link>
                                    : ""}

                                    {(!this.state.isAuthenticated) ? 
                                        <Link className="linkstyle" to="/register">
                                            <span className="nav-link top-menu">Sign Up</span>
                                        </Link>
                                    : ""}
                                </div>
                                <div className="form-inline ml-auto">
                                    {(!this.state.isAuthenticated) ? 
                                        <Link className="linkstyle" to="/login">
                                            <span className="nav-link top-menu">Login</span>
                                        </Link>
                                    : 
                                        <span style={{cursor:'pointer'}} onClick={this.triggerLogout} className="nav-link top-menu logout-text">Logout</span>
                                    }
                                </div>
                            </div>
                        </nav>

                    </div>
                    <div className="col-lg-2 col-md-1"></div>
                </div>
            </nav>
        );
    }
}

export default withRouter (TopNav);