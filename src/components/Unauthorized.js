import React, { Component } from 'react';
import  { Redirect, Link } from 'react-router-dom';
import { checkUser, localStore, postData } from '../Actions/Actions';
import TopNav from './TopNav.js';


class Unauthorized extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render(props) {         
        return ( 
            <div>
                <TopNav />
                <div className="container-fluid container-wrap">
                    <div className="row">
                        <div className="col-lg-2 col-md-1">&nbsp;</div>
                        <div className="col-lg-8 col-md-10 col-sm-12" id="work-area2">
                            <div className="inner-wrapper2">
                                Not Authorized to View Page
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-1">&nbsp;</div>
                    </div>
                </div>
            </div>
            
        );
    }
}
 
export default Unauthorized;