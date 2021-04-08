import React from 'react';
import Video from './video';
import headerVideo from '../images/showswap_video.mp4';
import TicketList from './TicketList';
import Footer from './Footer';
import Carousely from './Carousel';

const HomePage = () => {
    return (
        <div>
            <Video video={headerVideo} />
            <div style={{color: 'white', top: '50%', position: 'absolute', marginLeft: '20px'}} className="container header__description-container">
                <h2 className="header__description-title">Give Tickets &amp; Get Tickets</h2>
                <div className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend diam eu tempor ullamcorper. Quisque lacus enim, luctus in hendrerit sed, condimentum eu leo. Aliquam vehicula malesuada vestibulum. Fusce euismod massa libero, vel tempor mauris molestie at. Vestibulum id pharetra turpis. Nulla turpis nibh, pulvinar fringilla ex id, iaculis fringilla neque. In ac diam in felis lacinia vestibulum at quis justo
                </div>
            </div>
            <div>
                <Carousely />
            </div>
            <div>
                <h1 className="tickets-selling">Tickets Currently Selling</h1>
                <hr className="tickets-selling-line"></hr>
            </div> 
            <div className="ticket-container">
                <TicketList />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>   
    );
}

export default HomePage;