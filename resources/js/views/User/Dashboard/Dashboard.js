import React, { useEffect, useState } from 'react'
import { getUser, removeUserSession } from '../../../components/Common';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
const Dashboard = (props) => {
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
        removeUserSession();
        props.history.push('/adminpanel');
    }

    const handleSearch = (event) => {

        let name = document.getElementById("searchword").value;
        if (name == "") {
            props.history.push('/search');
        } else {
            props.history.push('/find/' + name);
        }

    }

    const handleCreate = () => {
        props.history.push('/create');
    }

    const handleEdit = () => {
        props.history.push('/viewlist');
    }

    return (
        <div className="container">
            <Header userData={user} userIsLoggedIn={isLoggedIn} />
            <div className="justify-contect-center">
                <div className="tx-center">
                    <div className="row">
                        <div className="col-lg-12 tx-center">
                            <center><h1>HOLA {(user.name)?user.name.toUpperCase():user.name}!</h1></center>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 tx-center">
                            <center><h3 className="tx-center">Selecciona una de las opciones</h3></center>
                        </div>
                    </div>
                </div>
                <div className="row tx-center">
                    <div className="col-lg-6">
                        <button onClick={handleCreate} className="btn-agree">CREAR FICHA</button>
                    </div>
                    <div className="col-lg-6">
                        <button onClick={handleEdit} className="btn-agree">VER TUS FICHAS</button>
                    </div>
                </div>
                <br /><br />
                <div className="text-center">
                    <div className="text-center">
                        <h2>Buscar por RUT/NUMBRE/PASAPORTE</h2>
                    </div>
                    <div className="text-center">
                        <h3>(Rut y pasaportes sin puntos ni guion)</h3>
                    </div>
                </div><br /><br />
                <div className="row text-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4 tx-center">
                        <input type="text" name="searchword" id="searchword" />
                    </div>
                    <div className="col-lg-4"></div>
                </div>
                <div className="row tx-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4 tx-center">
                        <button onClick={handleSearch} className="btn-agree">BUSCAR</button>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
                <div className="row tx-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <button onClick={handleLogout} className="btn-unagree">Volver</button>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
            <Footer />
        </div>
    )

}
export default Dashboard
