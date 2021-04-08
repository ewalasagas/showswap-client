import React from 'react';
import Tickets from './Tickets';
import Filter from './Filter';
import Search from './Search';
import Carousel from './Carousel';

class TicketList extends React.Component {
    render() {
        return (
            <div className="concert-lists panel panel-default">
                <div className="content" style={{display: 'flex', flexWrap: 'wrap'}}>
                    <div className="main" style={{flex: 1}}>
                        <Filter />
                        <Tickets />
                    </div>
                </div>
            </div>
        )
    }
}

export default TicketList;
