import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import NotFound from './views/NotFound/NotFound'
// User is LoggedIn
import PrivateRoute from './PrivateRoute'
import Dashboard from './views/user/Dashboard/Dashboard';
import AdminPanel from './views/user/AdminPanel/AdminPanel';
import UserPanel from './views/user/UserPanel/UserPanel';
import LabPanel from './views/user/LabPanel/LabPanel';
import Users from './views/user/Users/Users';
import CreateUser from './views/user/Users/CreateUser';
import EditUser from './views/user/Users/EditUser';
import Labs from './views/user/Labs/Labs';
import CreateLab from './views/user/Labs/CreateLab';
import EditLab from './views/user/Labs/EditLab';
import Admins from './views/user/Admins/Admins';
import CreateAdmin from './views/user/Admins/CreateAdmin';
import EditAdmin from './views/user/Admins/EditAdmin';
import Search from './views/user/Dashboard/Search';
import Find from './views/user/Dashboard/Find';
import FindDate from './views/user/Dashboard/FindDate';
import ViewList from './views/user/Dashboard/ViewList';
import Create from './views/user/Dashboard/Create';
import Modify from './views/user/Dashboard/Modify';
import PdfView from './views/user/Dashboard/PdfView';
import SmsSuccess from './views/user/Dashboard/SmsSuccess';

const Main = (props) => (
    <Switch>
        {/*User might LogIn*/}
        <Route exact path='/' component={(props) => <Login {...props} />} />
        {/*User will LogIn*/}
        <Route path='/login' component={(props) => <Login {...props} />} />
        <Route path='/register' component={(props) => <Register {...props} />} />
        {/* User is LoggedIn*/}
        <PrivateRoute path='/dashboard' component={(props) => <Dashboard {...props} />} />
        {/* User is LoggedIn*/}
        <PrivateRoute path='/adminpanel' component={(props) => <AdminPanel {...props} />} />
        <PrivateRoute path='/userpanel' component={(props) => <UserPanel {...props} />} />
        <PrivateRoute path='/labpanel' component={(props) => <LabPanel {...props} />} />
        {/* User is LoggedIn*/}
        <PrivateRoute path='/createuser' component={(props) => <CreateUser {...props} />} />
        <PrivateRoute path='/edituser/:id' component={(props) => <EditUser {...props} />} />
        <PrivateRoute path='/users' component={(props) => <Users {...props} />} />
        {/* Labs is LoggedIn*/}
        <PrivateRoute path='/createadmin' component={(props) => <CreateAdmin {...props} />} />
        <PrivateRoute path='/editadmin/:id' component={(props) => <EditAdmin {...props} />} />
        <PrivateRoute path='/admins' component={(props) => <Admins {...props} />} />
        {/* Labs is LoggedIn*/}
        <PrivateRoute path='/createlab' component={(props) => <CreateLab {...props} />} />
        <PrivateRoute path='/editlab/:id' component={(props) => <EditLab {...props} />} />
        <PrivateRoute path='/labs' component={(props) => <Labs {...props} />} />
        {/* search */}
        <PrivateRoute path='/search' component={(props) => <Search {...props} />} />
        <PrivateRoute path='/find/:name' component={(props) => <Find {...props} />} />
        <PrivateRoute path='/labdateview/:date' component={(props) => <FindDate {...props} />} />
        <PrivateRoute path='/viewlist' component={(props) => <ViewList {...props} />} />
        <PrivateRoute path='/create' component={(props) => <Create {...props} />} />
        <PrivateRoute path='/:id/view' component={(props) => <Modify {...props} />} />
        <PrivateRoute path='/:id/pdfview' component={(props) => <PdfView {...props} />} />
        <PrivateRoute path='/smssuccess' component={(props) => <SmsSuccess {...props} />} />
        {/*Page Not Found*/}
        <Route component={(props) => <NotFound {...props} />} />

    </Switch>
);
export default Main;
