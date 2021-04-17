import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { removeUserSession } from '../../../components/Common';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import "/css/calendar.css";

// must manually import the stylesheets for each plugin
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

const Search = (props) => {
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

    const [calendarWeekends, setCalendarWeekends] = useState(true);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [seletedDate, setSeletedDate] = useState(new Date());
    const [calendarComponentRef, setCalendarComponentRef] = useState(React.createRef());

    const handleDateClick = (arg) => {

        let str = formatDate(arg.dateStr, {
            month: 'long',
            year: 'numeric',
            day: 'numeric'
        });

        setSeletedDate(arg.dateStr);

        var days = document.querySelectorAll(".holiday");
        days.forEach(function(day) {
            day.classList.remove("holiday");
        });
        arg.dayEl.classList.add("holiday");

    };

    const toggleWeekends = () => {
        setCalendarWeekends(!calendarWeekends);
    };

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/dashboard');
    }

    const handleView = () => {
        props.history.push('/labdateview/' + seletedDate);
    }

    const gotoPast = () => {
        let calendarApi = calendarComponentRef.current.getApi();
        calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
    };

    return (
        <div className="container">
            <Header userData={user} userIsLoggedIn={isLoggedIn} />
            <div className="justify-contect-center">
                <div className="demo-app">
                    <div className="tx-center">
                        <div className="row">
                            <div className="col-md-12">
                                <center><h2>FICHAS</h2></center>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <center><h3>Selecciona una dia del calendario para ver tus fichas</h3></center>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <center><h3>creadas y luego click en VER FICHAS</h3></center>
                            </div>
                        </div>
                        <div className="row">
                            <h3><br /><br /></h3>
                        </div>
                    </div>
                    <div className="demo-app-calendar row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <FullCalendar
                                initialView="dayGridMonth"
                                headerToolbar={{
                                    left: "prev",
                                    center: "title",
                                    right: "next"
                                }}
                                buttonText={{
                                    prev: 'Prev Month',
                                    next: 'Next Month'
                                }}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                ref={calendarComponentRef}
                                weekends={calendarWeekends}
                                events={calendarEvents}
                                dateClick={handleDateClick}
                                selectable={true}
                                eventColor='#ff8006'
                            />
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                    <div className="row">
                        <h3><br /></h3>
                    </div>
                    <div className="row tx-center">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4 tx-center">
                            <button onClick={handleView} className="btn-agree">VER FICHAS</button>
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
            </div>
            <Footer />
        </div>
    );

}
export default Search
