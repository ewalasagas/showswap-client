import React from 'react';
import {FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaGoogle} from 'react-icons/fa'

const Footer = () => {
    return (
        <div className="bg-dark text-center text-white footer">
            <div className="container p-4">
                <div className="mb-4">
                    <div className="btn btn-outline-light btn-floating m-1">
                        <FaFacebookF />
                    </div>
                    <div className="btn btn-outline-light btn-floating m-1">
                        <FaTwitter />
                    </div>
                    <div className="btn btn-outline-light btn-floating m-1">
                        <FaInstagram />
                    </div>
                    <div className="btn btn-outline-light btn-floating m-1">
                        <FaGithub />
                    </div>
                    <div className="btn btn-outline-light btn-floating m-1">
                        <FaGoogle />
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-auto">
                        <p className="pt-2">
                            <strong>Sign up for our newsletter</strong>
                        </p>
                    </div>
                    <div className="col-md-5 col-12">
                        <div className="form-outline form-white mb-4">
                            <input type="email" id="form5Example2" className="form-control" placeholder="Email Address" />
                        </div>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-outline-light mb-4" />
                    </div>
                </div>
                <div className="mb-4">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
                        repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
                        eum harum corrupti dicta, aliquam sequi voluptate quas.
                    </p>
                </div>
                <p>Copyright ShowSwap 2020-2021</p>
            </div>
        </div>
    );
}

export default Footer;
