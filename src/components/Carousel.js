import React from 'react';
import { Carousel } from 'react-bootstrap';

const Carousely = () => {
    return (
        <div className="carousel-all">
            <div className='container-fluid' >
                <div className="row carousel-all-row">
                    <div className="col-12 carousel-all-col">
                        <Carousel>
                            <Carousel.Item className="carousel-center">
                                <div className="carousel-container">
                                    <img
                                        className="d-block w-100 carousel-img"
                                        src="https://i.ibb.co/dJHSnjZ/pexels-stas-knop-1626481.jpg"
                                        alt="First slide"
                                    />
                                </div>
                                <Carousel.Caption>
                                    <h1><span className="carousel-title a">Plans changed? Sell tickets now!</span></h1>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <div className="carousel-container">
                                    <img
                                        className="d-block w-100 carousel-img"
                                        src="https://i.ibb.co/09j7Bdc/pexels-elviss-railijs-bit-ns-1389429.jpg"
                                        alt="Second slide"
                                    />
                                </div>

                                    <Carousel.Caption>
                                        <h1><span className="carousel-title b">Lookout for new updates and shows daily!</span></h1>
                                    </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <div className="carousel-container">
                                    <img
                                        className="d-block w-100 carousel-img"
                                        src="https://i.ibb.co/QQY15yc/pexels-expect-best-351265.jpg"
                                        alt="Third slide"
                                    />
                                </div>
                                <Carousel.Caption>
                                <h1><span className="carousel-title c">Don't miss out on the theatrics!</span></h1>
                                </Carousel.Caption>
                            </Carousel.Item>

                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousely;