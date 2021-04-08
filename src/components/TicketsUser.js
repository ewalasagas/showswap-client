import React, {Component} from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {getTickets} from '../actions/ticketActions';
import {addToCart} from '../actions/cartActions';
import ShowImage from './ShowImage';


class Tickets extends Component {
    //need constructor for modal
    constructor(props) {
        super(props);
        this.state = {
            ticket: null    //null if modal doesn't exist
        };
    }

    componentDidMount() {
        Modal.setAppElement('body');
        this.props.getTickets();
    }

    openModal = (ticket) => {
        this.setState({ticket})
    }

    closeModal = () => {
        this.setState({ticket: null})
    }



    render() {
        const {ticket} = this.state;
        console.log(this.props.tickets);
        return(
            <div className="">
                {
                    !this.props.tickets ? (
                        <div>Loading..</div>
                    ) : (
                        <ul className="concerts clearfix">
                            {this.props.tickets.map(ticket => (
                                <li key={ticket._id}>
                                    <div className="ticket">
                                        <a href={"#" + ticket._id} onClick={() => this.openModal(ticket)}>
                                            <div className="concert-photo">
                                                <ShowImage item={ticket} url="ticket" />
                                                {/* <img className="image" src={ticket.image} alt={ticket.artistName}/> */}
                                                <div className="concert-overlay">
                                                    <div className="concert-text">{ticket.artistName}</div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }

                {/* MODAL VIEW CLICK */}
                <div>
                    {ticket ? 
                        <Modal isOpen={true} onRequestClose={this.closeModal} style={customStyles}>
                            <button className="close-modal-popup" onClick={this.closeModal}>X</button>
                            <div className="product-details">
                                <div className="row justify-content-center">
                                    <div className="col">
                                        <img src={ticket.artistImage} alt={ticket.artistName} className="ticket-image-modal"/>
                                    </div>
                                    <div className="col">
                                        <div className="product-description">
                                            <div className="product-description-title"><h1>{ticket.artistName}</h1></div>
                                            <div className="product-seller">Seller: {ticket.seller} | SELLER NAME</div>
                                            {/* SELLER RATING MANUAL */}
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star"></span>

                                            <hr />
                                            <div className="container">
                                                <div className="row justify-content-md-center">
                                                    <div className="col-3">DATE: TEST</div>
                                                    <div className="col">{ticket.concertDate}</div>
                                                    <div className="w-100"></div>
                                                    <div className="col-3">VENUE:</div>
                                                    <div className="col">{ticket.venue}</div>
                                                    <div className="w-100"></div>
                                                    <div className="col-3">LOCATION:</div>
                                                    <div className="col"> {ticket.city}, {ticket.state}</div>
                                                    <div className="col-3">FILTER</div>
                                                    <div className="col"> {ticket.genre}</div>
                                                </div>    
                                            </div>
                                            <hr />
                                            <div className="product-description-price">
                                                <h4>${ticket.price.toFixed(2)}</h4>
                                                <div>
                                                    <button className="btn btn-success " onClick={() => (
                                                        this.props.addToCart(ticket),
                                                        this.closeModal()
                                                    )}>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>:""}
                </div>
            </div>
        )
    }
}

const customStyles = {
    content : {
        height: '80%',
        paddingTop: '100px'
    }
}

const mapStateToProps = (state) => ({
    tickets: state.tickets.filteredItems
})

export default connect(mapStateToProps,{getTickets, addToCart})(Tickets);