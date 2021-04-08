import React, {useState} from 'react';
import {signout, isAuthenticated} from '../auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, withRouter} from 'react-router-dom';
import '../sass/main.scss';
import Location from './Location';
import { GrLocation, GrCart } from 'react-icons/gr';
import CartTotal from './CartTotal';
import Cart from './Cart';
import Modal from 'react-modal';

const NavLogin = ({history}) => {
    const [show, setShow] = useState(false);
    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    return (
        <div className="navigation">
            <ul className="main-nav">
                <li className="main-nav title">
                    <Link to="/"><h1>ShowSwap</h1></Link>
                </li>
                <div className="main-nav move-left">
                    {!isAuthenticated() && (
                        <div>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </div>
                    )}
                    {isAuthenticated() && (
                        <li>
                            <div className="btn-signout" onClick={() => signout(() => {history.push("/");})}>SIGNOUT</div>
                        </li>  
                    )}     

                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li>
                            <Link to="/user/dashboard">USER</Link>
                        </li>    
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li>
                            <Link to="/admin/dashboard">ADMIN</Link>
                        </li>    
                    )}

                    <li>
                        <div className="circle">
                            <GrLocation className="circle-icons"/>
                        </div>
                        {" "}<Location />
                        
                    </li>
                    {isAuthenticated() && (
                    <li>
                    <a onClick={openModal}>
                        <div className="circle">
                            <GrCart className="circle-icons"/>
                        </div>
                        {" "}<CartTotal /></a>
                        <Modal
                            isOpen={show}
                            onRequestClose={closeModal} 
                            ariaHideApp={false}
                            style={customStyles}
                        > 
                        <button className="close-modal-popup" onClick={closeModal}>X</button>
                            <Cart />
                        
                        </Modal> 
                    </li>
                    )}
                </div>
            </ul>
        </div>
    );
}

const customStyles = {
    content : {
        alignContent: 'right',
        justifyContent: 'right'
    }
}

export default withRouter(NavLogin);