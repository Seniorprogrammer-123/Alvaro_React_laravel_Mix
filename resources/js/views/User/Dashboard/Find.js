import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const Find = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [items, setItems] = useState([]);
    const [user, setUser] = useState({});
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


    const handleLogout = () => {
        props.history.push('/dashboard');
    }

    const getData = () => {
        const name = props.match.params.name;
        axios.get('/api/findreport/'+name).then(response => {
            setItems(response.data);
        })

    }

    const handleDelete = (e) => {
        e.preventDefault();
        const id=e.target.id.value;
        axios.delete('/api/report/'+id);
        getData();
    }



    return (
        <div className='container'>
            <Header userData={user} userIsLoggedIn={isLoggedIn} />
            <br />
            <div className='row justify-content-center'>
                <div className='col-md-12'>

                    <br /><br />
                    <center><h1>FICHAS {props.match.params.name.toUpperCase()}</h1></center>
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
                                <td>{item.firstname.toUpperCase()}&nbsp;{item.lastname.toUpperCase()}</td>
                                <td>
                                    <Link className='btn btn-info' to={`/${item.id}/pdfview`} key={item.id}>VER</Link>
                                    <Link to={`/uploads/pdfs/${item.imagepath}`} target="_blank" className="btn btn-danger">PDF</Link>
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

                </div>
            </div>
            <div className='row justify-content-center'>
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <button onClick={handleLogout} className="btn-unagree">Volver</button>
                </div>
                <div className="col-lg-4"></div>
            </div>
            <Footer />
        </div>
    )

}

export default Find
