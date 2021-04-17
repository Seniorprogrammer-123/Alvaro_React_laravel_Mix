import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import logoimg from '/images/logo.jpg';
import aboutimg from '/images/about.jpg';
class Header extends Component {
    // 1.1
    constructor(props) {
        super(props);
        this.state = {
            user: props.userData,
            isLoggedIn: props.userIsLoggedIn
        };
        this.logOut = this.logOut.bind(this);
    }
    // 1.2
    logOut() {
        let appState = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        this.props.history.push('/login');
    }
    // 1.3
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 text-left">
                        <h1 id="logoname">FORUMULARIO SIMPLIFICADO MUESTARS PCR<br />WWW.PCRCHILE.CL - V.1.0</h1>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                        <img src={logoimg} />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                        <img src={aboutimg} />
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
