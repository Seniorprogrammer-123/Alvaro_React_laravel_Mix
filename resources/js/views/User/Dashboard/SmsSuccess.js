import React, { useEffect, useState } from 'react'
import { getUser, removeUserSession } from '../../../components/Common';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
const SmsSuccess = (props) => {
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


    // handle click event of logout button
    const handleLogout = () => {
        props.history.push('/search');
    }

    return (
        <div className="container">
            <Header userData={user} userIsLoggedIn={isLoggedIn} />
            <div className="justify-contect-center">
                <div className="row tx-center">
                    <div className="col-lg-12">
                        <br />
                        <center><h2>PDF SUBIDO EXITOSAMENTEI</h2></center>
                        <center><h2>RESULTADOS ENVIADOS POR EMAIL Y SMS</h2></center>
                    </div>
                </div>
                <div className="row tx-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <button onClick={handleLogout} className="btn-unagree">Volver al Listado</button>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
            <Footer />
        </div>
    )

}
export default SmsSuccess
