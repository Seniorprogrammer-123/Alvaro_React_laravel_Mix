import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import axios from 'axios'

const CreateAdmin = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const sendingdata = {
            name : data.firstname,
            email : data.email,
            password : data.password,
        }
        // console.log(data);
        axios.post('/api/admins/create', sendingdata)
            .then(response => {
                // redirect to the homepage
                props.history.push('/admins')
            })
            .catch(error => {
                console.log(error);
                // errors: error.response.data.errors;
            })
    }
    // console.log("errors=>", errors);
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

    return (
        <div className="container">
            <Header userData={user} userIsLoggedIn={isLoggedIn} />
            <div className="hrspace"></div>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className='row justify-content-center'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <center><h3>ADMINISTRATOR: NOMBRE</h3></center>
                    </div>
                    <div className='col-md-3'></div>
                    <div className='col-md-3'></div>
                    <div className='col-md-6 card'>
                        <div className="row form-group">
                            <div className="col-md-4"><label>NUMBRE</label></div>
                            <div className="col-md-8"><input type="text" placeholder="NUMBRE" {...register("firstname", { required: true, maxLength: 80 })} /></div>
                        </div>
                        <div className="row form-group">
                            <div className="col-md-4"><label>EMAIL</label></div>
                            <div className="col-md-8"><input type="text" placeholder="EMAIL" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} /></div>
                        </div>
                        <div className="row form-group">
                            <div className="col-md-4"><label>PASSWORD</label></div>
                            <div className="col-md-8"><input type="password" placeholder="PASSWORD" {...register("password", { required: true })} /></div>
                        </div>
                    </div>
                    <div className='col-md-3'></div>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                        <input type="submit" className="btn-agree" value="GUARDAR" />
                    </div>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                        <Link className='btn btn-primary btn-unagree' to='/admins'>Volver</Link>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </form>
            <Footer />
        </div>
    );
}
export default CreateAdmin
