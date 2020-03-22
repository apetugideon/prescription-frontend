import React, { Component } from 'react';
import { Popover } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
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
        const popover =  (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Action Menu</Popover.Title>
                <Popover.Content>
                    {(localStore('','isAuthenticated','get')) ? 
                        <div>
                            <Link className="linkstyle" to="/prescriptions">
                            <li>Prescriptions</li>
                            </Link>
                            <Link className="linkstyle" to="/ailments">
                                <li>Ailments</li>
                            </Link>
                            <Link className="linkstyle" to="/formulas">
                                <li>Formulas</li>
                            </Link>
                            <Link className="linkstyle" to="/placements">
                                <li>Placements</li>
                            </Link>
                        </div>
                    :""}
                </Popover.Content>
            </Popover>
        );

        return (
            <nav className="navbar navbar-expand-sm bd-white fixed-top nav-style">
                <div className="row nav-wrapper">
                    <div className="col-lg-2 col-md-1">&nbsp;</div>
                    <div className="col-lg-8 col-md-10 col-sm-12 middle-pane-wrapper">
                        
                        <Link className="navbar-brand" to="/">
                            <i className="mdi mdi-scatter-plot"></i>Prescriptions
                        </Link>

                        <ul className="navbar-nav navbar-nav-wrapper">
                            {((this.state.isAdmin) && (this.state.isAuthenticated)) ? 
                                <li className="nav-item pop-over-menu">
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                        <i className="fas fa-cog"></i>
                                    </OverlayTrigger>
                                </li>
                            : ""}
    
                            {(!this.state.isAuthenticated) ? 
                                <li className="nav-item">
                                    <Link className="linkstyle" to="/register">
                                        <span className="nav-link top-menu">Sign Up</span>
                                    </Link>
                                </li>
                            : ""}

                            {(!this.state.isAuthenticated) ? 
                                <li className="nav-item">
                                    <Link className="linkstyle" to="/login">
                                        <span className="nav-link top-menu">Login</span>
                                    </Link>
                                </li>
                            : ""}
    
                            {(this.state.isAuthenticated) ? 
                                <li className="nav-item">
                                    <span style={{cursor:'pointer'}} onClick={this.triggerLogout} className="nav-link top-menu logout-text">Logout</span>
                                </li>
                            : ""}
    
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-1">&nbsp;</div>
                </div>
            </nav>
        );
    }
}

export default withRouter (TopNav);
