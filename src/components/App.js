import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, NavItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import '../sass/main.scss';
import NavLogin from './NavLogin';
import PrivateRoute from '../auth/PrivateRoute';
import Dashboard from './UserDashboard';
import AdminRoute from '../auth/AdminRoute';
import AdminDashboard from './AdminDashboard';
import AddGenre from '../admin/AddGenre';
import AddTicket from '../admin/AddTicket';

const App = () => {
        return (
            <Router>
              <NavLogin />
                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                    <AdminRoute path="/create/genre" exact component={AddGenre} />
                    <PrivateRoute path="/create/ticket" exact component={AddTicket} />
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </Router>
        )
}


export default App;