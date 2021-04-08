import React, { Component } from 'react';
import {connect} from 'react-redux';
import {filterTickets, sortTickets} from '../actions/ticketActions';
import {getGenres} from '../actions/genreActions';
import {FaSort} from 'react-icons/fa'

//maybe need to set to setState -- const [genre, setGenre] = useState(''); then value onChange (onClick or filter could help)
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: null    //null if modal doesn't exist
        };
        this.onBtnClick = this.onBtnClick.bind(this);
    }

    onBtnClick(event) {
        console.log(event.target.value) //now we get the value - need to match
        this.props.filterTickets(this.props.tickets, event.target.value)
    }
    //selected genre should be genre._id
    filterGenre(selectedGenre) {
        this.props.filterTickets(this.props.tickets, selectedGenre.target.value)
    }

    componentDidMount() {
        this.props.getGenres();
    }

    render() {
        console.log(this.props.genres); 
        console.log(this.filterGenre);
        return (
            !this.props.filteredTickets ?
            (
                <div>Loading..</div>
            ):(
                <div className="filter">
                    {/* <div className="filter-size">
                        <li>
                            <button className="btn btn-outline-light" onChange={this.onBtnClick} value="">ALL</button>
                        </li>
                    {this.props.genres.map(genre => (
                         <li key={genre._id}>
                              <button className="btn btn-outline-light" onChange={this.onBtnClick} value={genre._id}>{genre.name}</button>
                         </li>
                    ))}
                    </div> */}

                    <div className="filter-dropdown">
                        <select className="btn btn-secondary dropdown-toggle" value={this.props.sort} onChange={(e) => this.props.sortTickets(this.props.filteredTickets, e.target.value)}>
                            <option value="latest">NEWEST</option>
                            <option value="lowest">LOW</option>
                            <option value="highest">HIGH</option>
                        </select>
                    </div>
                    <div className="filter-result">viewing {this.props.filteredTickets.length}/{this.props.tickets.length}</div>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => ({
    genres: state.genres.items, //this gets the genre id
    sort: state.tickets.sort,
    tickets: state.tickets.items,
    filteredTickets: state.tickets.filteredItems,
    // genres: state.getGenres
})

export default connect(mapStateToProps, {getGenres, filterTickets, sortTickets})(Filter);