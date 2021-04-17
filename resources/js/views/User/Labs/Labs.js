import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import axios from 'axios';

const Labs = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);

    // check if user is authenticated and storing authentication data as states if true
    useEffect(() => {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            setIsLoggedIn(AppState.isLoggedIn);
            setUser(AppState.user);
        }
        getData();
    }, [isLoggedIn]);
    // 4.1
    const getData = () => {

        axios.get('/api/users/list/Lab').then(response => {
           setItems(response.data);
        });
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        axios.delete('/api/users/'+id);
        getData();
    }

    return (
        <div className="container">
            <Header userData={user} userIsLoggedIn={isLoggedIn} />
            <div className='row justify-content-center'>
                <div className='col-md-12'>

                    <br /><br />
                    <center><h1>LABORATORIES</h1></center>
                    {items.length!==0 ?

                    <table className="table table-hovered table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>PUT / PASAPORTE</th>
                                <th>NOMBRE</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                        {items.map((item,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item.dni_number.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()}</td>
                                <td>{item.name.toUpperCase()}</td>
                                <td>
                                    <Link className='btn btn-info' to={`/editlab/${item.id}`} >VER</Link>
                                    <form onSubmit={handleDelete} >
                                        <input type="hidden" name="id" value={item.id}  />
                                        <button type="submit" className="btn btn-danger">BORRAR</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    :   <table className="table table-hovered table-striped">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>PUT / PASAPORTE</th>
                                    <th>NOMBRE</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="4"><center>No result!</center></td>
                                </tr>
                            </tbody>
                        </table> }
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <Link className='btn btn-primary btn-agree' to='/createlab'>AGREGAR</Link>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <Link className='btn btn-primary btn-unagree' to='/adminpanel'>Volver</Link>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}
export default Labs
