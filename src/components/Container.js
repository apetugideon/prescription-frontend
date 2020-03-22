import React from 'react';

const Container = (props) => {
    return (
        <div className="container-fluid container-wrap">
            <div className="row">
                <div className="col-lg-2 col-md-1">&nbsp;</div>
                <div className="col-lg-8 col-md-10 col-sm-12" id="work-area">
                    <div className="inner-wrapper">
                        {props.children}
                        {/* <div className="game-menu-wrapper">
                            <nav className="navbar navbar-expand-sm bd-white paddn1">
                                <a className="navbar-nav" href="index.html">Default</a>
                                <ul className="navbar-nav pad-left-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#"><i className="mdi mdi-view-compact"></i> </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="index.html">Games</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link pad-right1" href="log-in.html">Settings</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div id="slice-display"></div>
                        <div className="footer-menu">
                            <nav className="navbar navbar-expand-sm bd-white paddn1">
                                <a className="navbar-nav" href="index.html"><i className="fas fa-user"></i>&nbsp;&nbsp;Apetu Gideon</a>
                                <ul className="navbar-nav pad-left-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="sign-up.html">&nbsp;</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="index.html">Games</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link pad-right1" href="log-in.html">&copy;&nbsp;Pixcipher</a>
                                    </li>
                                </ul>
                            </nav>
                        </div> */}
                    </div>
                </div>
                <div className="col-lg-2 col-md-1">&nbsp;</div>
            </div>
        </div>
    );
}

export default Container;