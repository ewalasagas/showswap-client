import React from 'react';
import Card from 'react-bootstrap/Card';
import { IconContext } from "react-icons";
import {GiTicket} from 'react-icons/gi';
import {Link} from 'react-router-dom'; 

const form = (props) => {
    return (
        <div>
            <img src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?cs=srgb&dl=pexels-vishnu-r-nair-1105666.jpg&fm=jpg" style={{width: '100vw', height: 'auto', justifyContent:'center', alignContent: 'center'}}/>
            <div className="login-form container">
                <form className="form-signin">
                    {/* <img src="data:image/png;base64,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" fluid rounded grayscale className="login-registration-icon"/> */}
                    <IconContext.Provider value={{ size: '5em', className: "global-class-name" }}>
                    <div>
                        <GiTicket />
                    </div>
                    </IconContext.Provider>
                    {props.children}
                </form>
            </div>
        </div>
    );
}

export default form;