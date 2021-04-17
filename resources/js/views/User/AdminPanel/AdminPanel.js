import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { removeUserSession } from '../../../components/Common';
const AdminPanel = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    // check if user is authenticated and storing authentication data as states if true
    useEffect(() => {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            setIsLoggedIn(AppState.isLoggedIn);
            setUser(AppState.user);
        }
    }, [isLoggedIn]);
    // 4.1
    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }

    const handleUsers = () => {
        props.history.push('/users');
    }

    const handleLabs = () => {
        props.history.push('/labs');
    }

    const handleAdmins = () => {
        props.history.push('/admins');
    }

    const handleAdminPanel = () => {
        props.history.push('/dashboard');
    }

    return (
        <div className="container">
            <Header userData={user} userIsLoggedIn={isLoggedIn} />
            <div className="justify-contect-center">
                <div className="text-center">
                    <div className="text-center">
                        <center><h1 className="theme">ADMINISTRACIÓN</h1></center>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-lg-6">
                        <button onClick={handleUsers} className="btn-agree">USUARIAS</button>
                    </div>
                    <div className="col-lg-6">
                        <button onClick={handleLabs} className="btn-agree">LABORATORIOS</button>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4 text-center">
                        <button onClick={handleAdmins} className="btn-agree">ADMINISTRADOR</button>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
                <div className="row text-center">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6 text-center">
                        <button onClick={handleAdminPanel} className="btn-agree">PANEL DE ADMINISTRADOR</button>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
                <div className="row text-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <button onClick={handleLogout} className="btn-unagree">Cerrar Sesion</button>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
            <Footer />
        </div>
    )

}
export default AdminPanel
