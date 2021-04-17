import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import axios from 'axios'

const Create = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    // console.log("errors=>", errors);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const firstYearOptions = [];
     const secondYearOptions = [];
     const yearOptions = [];
     const dateOptions = [];
     for (var i = 0; i < 31; i++) {
         dateOptions.push({value: i + 1, label: i + 1});
     }

     const cdate = new Date();
     const cyear = cdate.getFullYear();
     const cmonth = cdate.getMonth()+1;
     const cdt = cdate.getDate();
     for (var i = 2010; i < cyear + 1; i++) {
         firstYearOptions.push({value: i, label: i});
         secondYearOptions.push({value: i, label: i});
     }

     const monthOptions = [
         { value: '1', label: 'Enero' },
         { value: '2', label: 'Febrero' },
         { value: '3', label: 'Marzo' },
         { value: '4', label: 'Abril' },
         { value: '5', label: 'Mayo' },
         { value: '6', label: 'Junio' },
         { value: '7', label: 'Julio' },
         { value: '8', label: 'Agosto' },
         { value: '9', label: 'Septiembre' },
         { value: '10', label: 'Octubre' },
         { value: '11', label: 'Noviembre' },
         { value: '12', label: 'Diciembre' },
     ];


    const options = [
        { value: 'ISAPRE', label: 'ISAPRE' },
        { value: 'FONSANA', label: 'FONSANA' },
        { value: 'PARTICULAR', label: 'PARTICULAR' },
    ];

    for (var i = cyear - 100; i < cyear + 1; i++) {
        yearOptions.push({value: i, label: i});
    }

    const marginT = {
        marginTop:'12px'
    }

    const [data, setData] = useState({
        motive: '',
        dni_number: '',
        nation: '',
        firstname: '',
        lastname: '',
        middlename: '',
        email: '',
        sex: 'M',
        age: 0,
        birth_day: 1,
        birth_month: 1,
        birth_year: cyear,
        married: 'A',
        address: '',
        region: '',
        city: '',
        country: '',
        phone: '',
        health: 'ISAPRE',
        fever_above: 0,
        sore_throat: 0,
        myalgia: 0,
        pneumonia: 0,
        encephalitis: 0,
        couch: 0,
        lady_nasal: 0,
        respiratory_difficulty: 0,
        hypotention: 0,
        agusia: 0,
        anosmia: 0,
        headache: 0,
        tachypnea: 0,
        hypoxia: 0,
        ayanosis: 0,
        dehydration_food_refused: 0,
        hemodynamic_commitment: 0,
        consultation_respiratory: 0,
        base_disease: 0,
        disease: '',
        first_vaccine_day: 1,
        first_vaccine_month: 1,
        first_vaccine_year: 2010,
        second_vaccine_day: 1,
        second_vaccine_month: 1,
        second_vaccine_year: 2010,
        symptom_day: cdt,
        symptom_month: cmonth,
        symptom_year: cyear,
        symptom_city: '',
        symptom_country: '',
        pregnant: 'N',
        pregweek: 0,
        imagepath: '',
        errors: [],
        imagedata: [],
        first_vaccine_status: 0,
        second_vaccine_status: 0,
        viajo: 0,
    });

    const onSubmit = (event) => {
        if(data.motive == ''){
            // alert("Ingrese el motivo");
            document.getElementsByName("motive")[0].focus();
            return;
        }
        if(data.dni_number == ''){
            // alert("Ingrese el pasaporte");
            document.getElementsByName("dni_number")[0].focus();
            return;
        }
        if(data.nation == ''){
            // alert("Entrar en la nación");
            document.getElementsByName("nation")[0].focus();
            return;
        }
        if(data.firstname == ''){
            // alert("Ingrese el nombre");
            document.getElementsByName("firstname")[0].focus();
            return;
        }
        if(data.lastname == ''){
            // alert("Ingrese el apellido");
            document.getElementsByName("lastname")[0].focus();
            return;
        }
        if(data.middlename == ''){
            // alert("Ingrese el segundo nombre.");
            document.getElementsByName("middlename")[0].focus();
            return;
        }
        if(data.address == ''){
            // alert("Ingrese la direccion");
            document.getElementsByName("address")[0].focus();
            return;
        }
        if(data.region == ''){
            // alert("Entrar en la región");
            document.getElementsByName("region")[0].focus();
            return;
        }
        if(data.city == ''){
            // alert("Entrar en la ciudad");
            document.getElementsByName("city")[0].focus();
            return;
        }
        if(data.country == ''){
            // alert("Entrar en el pais");
            document.getElementsByName("country")[0].focus();
            return;
        }
        if(data.phone == ''){
            // alert("Ingrese el número de teléfono");
            document.getElementsByName("phone")[0].focus();
            return;
        }
        if(data.health == ''){
            // alert("Ingrese el estado de salud");
            document.getElementsByName("health")[0].focus();
            return;
        }
        if(data.disease == ''){
            // alert("Entrar en enfermedad");
            document.getElementsByName("disease")[0].focus();
            return;
        }
        if(data.symptom_city == ''){
            // alert("Ingrese la ciudad del síntoma");
            document.getElementsByName("symptom_city")[0].focus();
            return;
        }
        if(data.symptom_country == ''){
            // alert("Ingrese el país del síntoma");
            document.getElementsByName("symptom_country")[0].focus();
            return;
        }

        if(data.imagedata != ''){
            const fd = new FormData();

            fd.append('image', data.imagedata);
            // console.log(fd.get("image"));
            // Post Request to laravel API Route

            axios.post('/api/upload', fd)
                .then(res => {
                    // setData({ ...data, imagepath: res.data.message});
                }
            );
        }

        const sendingData = {
            motive: data.motive,
            dni_number: data.dni_number,
            nation: data.nation,
            firstname: data.firstname,
            lastname: data.lastname,
            middlename: data.middlename,
            email: data.email,
            sex: data.sex,
            age: data.age,
            birthday: data.birth_year + "-" + data.birth_month + "-" + data.birth_day,
            married: data.married,
            address: data.address,
            region: data.region,
            city: data.city,
            country: data.country,
            phone: data.phone,
            health: data.health,
            fever_above: data.fever_above,
            sore_throat: data.sore_throat,
            myalgia: data.myalgia,
            pneumonia: data.pneumonia,
            encephalitis: data.encephalitis,
            couch: data.couch,
            lady_nasal: data.lady_nasal,
            respiratory_difficulty: data.respiratory_difficulty,
            hypotention: data.hypotention,
            agusia: data.agusia,
            anosmia: data.anosmia,
            headache: data.headache,
            tachypnea: data.tachypnea,
            hypoxia: data.hypoxia,
            ayanosis: data.ayanosis,
            dehydration_food_refused: data.dehydration_food_refused,
            hemodynamic_commitment: data.hemodynamic_commitment,
            consultation_respiratory: data.consultation_respiratory,
            base_disease: data.base_disease,
            disease: data.disease,
            vaccine_first: data.first_vaccine_year + "-" + data.first_vaccine_month + "-" + data.first_vaccine_day,
            vaccine_second: data.second_vaccine_year + "-" + data.second_vaccine_month + "-" + data.second_vaccine_day,
            symptom_date: cyear + "-" + data.symptom_month + "-" + data.symptom_day,
            pregnant: data.pregnant,
            pregweek: data.pregweek,
            symptom_city: data.symptom_city,
            symptom_country: data.symptom_country,
            imagepath: data.imagepath,
        }

        // console.log(sendingData);

        axios.post('/api/report', sendingData)
            .then(response => {
                // redirect to the homepage
                props.history.push('/dashboard')
            })
            .catch(error => {
                console.log(error);
                // errors: error.response.data.errors;
            })
    }

    // input = React.createRef();

    const handleChange = (file) => {
        // alert(file[0].name);
        setData({ ...data, imagepath: file[0].name, imagedata: file[0] });
    }

    const imageUpload = (e) => {
        e.preventDefault();
        document.getElementById("imagepath").click();
    }


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



    const radioChange = (e) => {
        setData({...data, motive: e.target.value});
    }

    const inputChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const sexChange = (e) => {
        let checkval = 'M';
        if (e.target.value == 'F')
            checkval = 'F';
        setData({...data, [e.target.name]: checkval});
    }

    const marrChange = (e) => {
        let checkval = 'M';
        if (e.target.value == 'A')
            checkval = 'A';
        setData({...data, [e.target.name]: checkval});
    }

    const checkChange = (e) => {
        let checkval = 0;
        if (e.target.checked === true)
            checkval = 1;
        setData({...data, [e.target.name]: checkval});
    }

    const pregnantChange = (e) => {
        let checkval = 'N';
        if (e.target.value == 'Y')
            checkval = 'Y';
        setData({...data, [e.target.name]: checkval});
    }



    return (
        <div className="container">
            <Header userData={user} userIsLoggedIn={isLoggedIn} />
            <div className="hrspace"></div>
            <form onSubmit={handleSubmit(onSubmit)}  encType="miltipart/form-data" >
                <div className='row justify-content-center'>
                    <div className="col-md-12">
                        <h2>MOTIVO CONSULTA MUESTRA PCR</h2>
                    </div>
                    <div className="col-md-12 card">
                        <label>
                            <input type="radio" className="option-input radio" name="motive" value="CONTRACT" checked={ data.motive == "CONTRACT" } onChange={radioChange} />
                            CONTRACTO
                        </label>
                        <label>
                            <input type="radio" className="option-input radio" name="motive" value="JOB" checked={ data.motive == "JOB" } onChange={radioChange} />
                            TRABAJO
                        </label>
                        <label>
                            <input type="radio" className="option-input radio" name="motive" value="TRAVEL" checked={ data.motive == "TRAVEL" } onChange={radioChange} />
                            VIAJE
                        </label>
                        <label>
                            <input type="radio" className="option-input radio" name="motive" value="SHOWS_SYMPTOMS" checked={ data.motive == "SHOWS_SYMPTOMS" } onChange={radioChange} />
                            PRESENTA SINTOMAS
                        </label>
                    </div>
                    <div className="col-md-12">
                        <h2>INFORMACION DEL PACIENTE</h2>
                    </div>
                    <div className="col-md-12 card">
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    RUT / PASAPORTE
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <input type="text" name="dni_number" onChange={inputChange} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    NACIONALIDAD
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <input type="text" name="nation" onChange={inputChange} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    NOMBRES
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <input type="text" name="firstname" onChange={inputChange} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    APPELIDO PATERNO
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <input type="text" name="lastname" onChange={inputChange} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    APPELIDO MATERNO
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <input type="text" name="middlename" onChange={inputChange} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    EMAIL
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <input type="email" name="email" onChange={inputChange} required />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-1">
                                <label style={marginT}>SEXO</label>
                            </div>
                            <div className="col-lg-2">
                                <label>
                                    <input type="radio" className="option-input radio" value="M" name="sex" onChange={sexChange} checked={data.sex == 'M'} />
                                    M
                                </label>
                            </div>
                            <div className="col-lg-2">
                                <label>
                                    <input type="radio" className="option-input radio" value="F" name="sex" onChange={sexChange} checked={data.sex == 'F'} />
                                    F
                                </label>
                            </div>
                            <div className="col-lg-1">
                                <label style={marginT}>EDAD</label>
                            </div>
                            <div className="col-lg-2">
                                <input type="number" name="age" style={marginT} onChange={inputChange} value={data.age} />
                            </div>
                            <div className="col-lg-2">
                                <label>
                                    <input type="radio" className="option-input radio" value="M" name="married" onChange={marrChange} checked={data.married == 'M'} />
                                    M
                                </label>
                            </div>
                            <div className="col-lg-2">
                                <label>
                                    <input type="radio" className="option-input radio" value="A" name="married" onChange={marrChange} checked={data.married == 'A'} />
                                    A
                                </label>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-12">
                                <label>
                                    FECHA NACIMIENTO
                                </label>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    DIA
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <select name="birth_day" onChange={inputChange}>
                                    {
                                        dateOptions.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    MES
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <select name="birth_month" onChange={inputChange}>
                                    {
                                        monthOptions.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    ANO
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <select name="birth_year" onChange={inputChange}>
                                    {
                                        yearOptions.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    DIRECCION
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <input type="text" name="address" onChange={inputChange} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    REGION
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <input type="text" name="region" onChange={inputChange} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    CIUDAD
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <input type="text" name="city" onChange={inputChange} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    COMUNA
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <input type="text" name="country" onChange={inputChange} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    TELEFONO
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <input type="text" name="phone" onChange={inputChange} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-5">
                                <label className="splite-item">
                                    PREVISION
                                </label>
                            </div>
                            <div className="col-lg-7">
                                <select name="health" onChange={inputChange} value={data.health} >
                                    {
                                        options.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h2>ANTECEDENTES CLINICOS</h2>
                    </div>
                    <div className="col-md-12 card">
                        <div className="row form-group">
                            <div className="col-lg-12">
                                <label>
                                    FECHA INICIO SINTOMAS
                                </label>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    DIA
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <select name="symptom_day" defaultValue={cdate.getDate()} onChange={inputChange}>
                                    {
                                        dateOptions.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    MES
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <select name="symptom_month" defaultValue={cdate.getMonth()+1} onChange={inputChange}>
                                    {
                                        monthOptions.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    ANO
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <input type="text" name="symptom_year" value={cyear} readOnly />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-4">
                                <label>
                                    <input type="radio" className="option-input radio" name="pregnant" value="N" onChange={pregnantChange} checked={data.pregnant == 'N'} />
                                    TRABAJADO
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <label>
                                    <input type="radio" className="option-input radio" name="pregnant" value="Y" onChange={pregnantChange} checked={data.pregnant == 'Y'} />
                                    EMBARAZO
                                </label>
                            </div>
                            <div className="col-lg-2" style={marginT}>
                                <label className="splite-item">
                                    SEMGEST
                                </label>
                            </div>
                            <div className="col-lg-3 paciente" style={marginT}>
                                <input type="number" name="pregweek" min="0" max="9" value={data.pregweek} onChange={inputChange} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-12">
                                <label>
                                    <input type="checkbox" className="option-input radio" name="viajo" onChange={checkChange} />
                                    VIAJO AL EXTRANJERO 14 DIAS ANTES SINTOMAS
                                </label>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-2">
                                <label className="splite-item">
                                    CIUDAD
                                </label>
                            </div>
                            <div className="col-lg-4">
                                <input type="text" name="symptom_city" onChange={inputChange} />
                            </div>
                            <div className="col-lg-2">
                                <label className="splite-item">
                                    PAIS
                                </label>
                            </div>
                            <div className="col-lg-4">
                                <input type="text" name="symptom_country" onChange={inputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h2>SINTOMAS</h2>
                    </div>
                    <div className="col-md-12 card">
                        <label>
                            <input type="checkbox" className="option-input radio" name="fever_above" onChange={checkChange} />
                                FIEBRE SOBRE 38
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="sore_throat" onChange={checkChange} />
                                DOLOR DE GARGANTA
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="myalgia" onChange={checkChange} />
                                MIALGIA
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="pneumonia" onChange={checkChange} />
                                NEUMONÍA
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="encephalitis" onChange={checkChange} />
                                ENCEFALITIS
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="couch" onChange={checkChange} />
                                TOS
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="lady_nasal" onChange={checkChange} />
                                SEÑOREA / CONGESTIÓN NASAL
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="respiratory_difficulty" onChange={checkChange} />
                                DIFICULTAD RESPIRATORIA
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="hypotention" onChange={checkChange} />
                                HIPOTENSIÓN
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="agusia" onChange={checkChange} />
                                AGUSIA
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="anosmia" onChange={checkChange} />
                                ANOSMIA
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="headache" onChange={checkChange} />
                                CEFALEA
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="tachypnea" onChange={checkChange} />
                                TAQUIPNEA
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="hypoxia" onChange={checkChange} />
                                HIPOXIA
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="ayanosis" onChange={checkChange} />
                                CIANOSIS
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="dehydration_food_refused" onChange={checkChange} />
                                DESHIDRATACIÓN O RECHAZÓ ALIMENTARIO(L)
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="hemodynamic_commitment" onChange={checkChange} />
                                COMPROMISO HEMODINÁMICO
                            </label>
                        <label>
                            <input type="checkbox" className="option-input radio" name="consultation_respiratory" onChange={checkChange} />
                                CONSULTA POR DET. DE CUADRO RESPIRATORIO
                            </label>
                        <label className="form-group">
                            <input type="checkbox" className="option-input radio" name="base_disease" onChange={checkChange} />
                                ENFERMEDAD DE BASE
                            </label>
                        <div className="row form-group">
                            <div className="col-md-6">
                                <label>QUE ENFERMEDAD</label>
                            </div>
                            <div className="col-md-6">
                                <input type="text" name="disease" onChange={inputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h2>ANTECEDENTES DE VACUNACION</h2>
                    </div>
                    <div className="col-md-12 card">
                        <div className="row form-group">
                            <div className="col-lg-12">
                                <label>
                                    <input type="checkbox" className="option-input radio" name="first_vaccine_status" onChange={checkChange} />
                                    VACUNA CONTRA LA INFLUENZA
                                </label>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-12">
                                <label>
                                    FECHA VACUNACION
                                </label>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    DIA
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <select name="first_vaccine_day" onChange={inputChange}>
                                    {
                                        dateOptions.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    MES
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <select name="first_vaccine_month" onChange={inputChange}>
                                    {
                                        monthOptions.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    ANO
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <select name="first_vaccine_year" onChange={inputChange}>
                                    {
                                        firstYearOptions.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-12">
                                <label>
                                    <input type="checkbox" className="option-input radio" name="second_vaccine_status" onChange={checkChange} />
                                    VACUNA CONTRA COVID-19
                                </label>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-12">
                                <label>
                                    FECHA VACUNACION
                                </label>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    DIA
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <select name="second_vaccine_day" onChange={inputChange}>
                                    {
                                        dateOptions.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    MES
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <select name="second_vaccine_month" onChange={inputChange}>
                                    {
                                        monthOptions.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-lg-1">
                                <label className="splite-item">
                                    ANO
                                </label>
                            </div>
                            <div className="col-lg-3">
                                <select name="second_vaccine_year" onChange={inputChange}>
                                    {
                                        secondYearOptions.map((item,i)=>(
                                            <option key={i} value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <button className="btn-agree">GUARDAR</button>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <input type="file" name="imagepath" id="imagepath" accept="image/jpg,image/bmp,image/jpeg,image/png" style={{ display: 'none' }} onChange={(e) => handleChange(e.target.files)} />
                        <input type="button" className="btn-agree" value="TOMAR FOTO CARNET / PASAPORTE" onClick={imageUpload} />
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </form>
            <Footer />
        </div>
    );
}
export default Create
