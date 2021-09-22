import React, { Component } from "react";
import { HotelInformation } from "./hotel-information/hotel-information.component";
import { AvailabilityInformation } from "./availability-information/availability-information.component";
import { OfferInformation } from "./offer-information/offer-information.component";

import './card-details.css';

class CardDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hotel: {},
        };
        this.isComponentMounted = false;
    }

    componentDidMount() {
        this.isComponentMounted = true;
        this.fetchHotelProps();
    }
    
    componentDidUpdate(prevProps, prevState) {
        const shouldFetch = prevState.hotel.id !== this.state.hotel.id;
        if(this.isComponentMounted === true && shouldFetch){
            this.fetchHotelProps();
        }
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    fetchHotelProps() {

        var myHotelHeaders = new Headers();
        myHotelHeaders.append("X-DevTours-Developer", "Postman Client");
        myHotelHeaders.append("Cookie", "ARRAffinity=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb; ARRAffinitySameSite=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb");

        var requestHotelOptions = {
            method: 'GET',
            headers: myHotelHeaders,
            redirect: 'follow'
        };

        const urlHotel = 'https://afrecruitingfront-webapi-dev.azurewebsites.net/api/hotel/' + this.props.hotelId;
        fetch(urlHotel, requestHotelOptions)
            .then(response => response.json())
            .then(hotel => {
                if(this.isComponentMounted === true){
                    const newState = Object.assign({}, this.state);
                    newState.hotel = hotel;
                    this.setState(newState);
                }
            })
            .catch(error => console.log('error', error));
    }

    render() {
        
        const hotel = this.state.hotel;
        const hotelId = hotel.id;

        const handleClick = this.props.handleClick;
        const availability = this.props.availability;
        const offer = this.props.offer;
        const roomId = this.props.room.id;

        return (
            <div className="details-container">
                <div className="details-separator">
                    <HotelInformation
                        hotel={hotel}
                    />
                    <AvailabilityInformation
                        availability={availability}
                    />
                </div>
                <div className="details-separator">
                    <OfferInformation
                        hotelId={hotelId}
                        roomId={roomId}
                        offer={offer}
                        handleClick={handleClick}
                    />
                </div>
            </div>
        );
    }
}

export default CardDetails;