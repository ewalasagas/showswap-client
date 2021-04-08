import React from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';
import TicketsUser from './TicketsUser';

const AdminDashboard = () => {

    const {user: {_id, firstName, lastName, email, role}} = isAuthenticated();

    const updateAdminProfile = () => {
        return (
            <div class="dashboard">
            {/* file in admin/AddGenre */}
            <div className="admin-title">ADMIN MENU</div>
            <div className="list-group-item dashboard-btn-bcg">
            <Link className="btn btn-outline-light dashboard-btn-outline" to="/create/genre">Create Genre</Link> 
            </div>
            <div className="list-group-item dashboard-btn-bcg">
            <Link className="btn btn-outline-light dashboard-btn-outline" to="/create/ticket">Create Ticket</Link>
            </div>
            {/* <li className="list-group-item">
                <Link className="nav-link" to="/profile/update">Update Profile</Link>
            </li> */}
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mt-8 mb-5" style={{padding: 20}}>
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">First name: {firstName}</li>
                <li className="list-group-item">Last name: {lastName}</li>
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Role: {role === 1 ? 'Admin' : 'Registered User'}</li> 
            </ul>
        </div>
        )
    }

    const adminHeader = () => {
        return (
            <div className="jumbotron mt-3 admin-header">
                <h1 className="display-4 admin-welcome">Welcome Back {firstName}!</h1>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas non augue eget euismod. Vivamus eu luctus est. Sed scelerisque odio ac erat tempus pellentesque.</p>
                <hr className="my-4" />
                <p>Donec nec nulla vel ipsum egestas auctor in in nibh. Vestibulum ac sagittis mi. In a sapien odio. Nullam bibendum a risus quis vehicula. Nulla facilisi. Aenean elit neque, porta vel sagittis ac, bibendum eu dolor. Vestibulum non molestie metus. Phasellus pellentesque ultrices ligula, at viverra mauris accumsan eget. </p>
            </div>
        )
    }

    return (
        <div className="container-fluid">
            {adminHeader()}
            <div className="row">
                <div className="col-sm-3">
                    {updateAdminProfile()}
                </div>
                <div className="col-sm">
                    {adminInfo()}
                </div>
            </div>
            {/* <TicketsUser /> */}
        </div>
    );
}

export default AdminDashboard;