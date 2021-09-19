import React, { Component } from "react";
import { HotelPageHeader } from "./hotel-page-header/hotel-page-header.component";
import HotelPageAmenities from "./hotel-page-amenities/hotel-page-amenities.component";
import HotelPageRooms from './hotel-page-rooms/hotel-page-rooms.component';
import MakeBooking from '../make-booking-form/make-booking-form.component';

import SimpleImageSlider from 'react-simple-image-slider';

import { HandleImageLinks } from '../../modules/handle-image-links';

import './hotel-page.styles.css';

class HotelPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliderWidth: 0,
            sliderHeight: 0
        }
    }

    /**
     * Event controller for the size of image slider.
     * Fires on window resize.
     */
    sliderResize = () => {
        const newSliderWidth = (window.innerWidth < 975 ? 360 : 850);
        const newSliderHeight = (newSliderWidth === 850 ? 478 : 203);

        const currentWidth = this.state.sliderWidth;

        if (newSliderWidth !== currentWidth) {
            this.setState({ sliderWidth: newSliderWidth, sliderHeight: newSliderHeight })
        }
    }

    /**
     * fires when the user submits his booking request
     * @param {event} e 
     */
    submitBooking = (e) => {
        e.preventDefault();
        
        var myHeaders = new Headers();
        myHeaders.append("X-DevTours-Developer", "Postman Client");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Cookie", "ARRAffinity=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb; ARRAffinitySameSite=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", "asdf");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        const offerId = this.props.hotelPage.highlightedOffer.offerId;
        const url ="https://afrecruitingfront-webapi-dev.azurewebsites.net/api/booking?=" + offerId;
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
        window.addEventListener("resize", this.sliderResize)
        this.sliderResize();
    }

    render() {

        const hotelPageInfo = this.props.hotelPage.hotelItem;
        const highlightedRoomId = this.props.hotelPage.highlightedOffer.roomId;
        const highlightedOfferId = this.props.hotelPage.highlightedOffer.offerId;

        const hotelId = hotelPageInfo.id
        const hotelName = hotelPageInfo.name;
        const hotelLocationCity = hotelPageInfo.location.name;
        const hotelAddress = hotelPageInfo.address;
        const hotelRating = hotelPageInfo.rating;

        const propsImages = hotelPageInfo.images
        const imgLinks = HandleImageLinks(propsImages, hotelId);
        const sliderWidth = this.state.sliderWidth;
        const sliderHeight = this.state.sliderHeight;

        const hotelAmenities = hotelPageInfo.amenities;
        const hotelDescription = hotelPageInfo.description;

        const hotelRooms = hotelPageInfo.rooms;
        const highlightedOffer = this.props.highlightedOffer;

        const highlightedAvailability = this.props.highlightedOffer.availability;
        const highlightedRoom = this.props.highlightedOffer.room;
        const highlightedOfferInfo = this.props.highlightedOffer.offer;

        return (
            <div className="hotel-page-container">
                <div className="hotel-page-section hotel-page-header-container">
                    <HotelPageHeader
                        hotelName={hotelName}
                        hotelLocationCity={hotelLocationCity}
                        hotelAddress={hotelAddress}
                        hotelRating={hotelRating}
                    />
                </div>
                <div className="hotel-page-section img-slider-container">
                    <SimpleImageSlider
                        width={sliderWidth}
                        height={sliderHeight}
                        images={imgLinks}
                        showBullets={true}
                        showNavs={true}
                    />
                </div>
                <div className="hotel-page-section hotel-page-information-container">
                    <div className="hotel-page-amenities hotel-page-information">
                        <HotelPageAmenities
                            hotelAmenities={hotelAmenities}
                        />
                        <div className="hotel-page-description">
                            <span className="spn-hotel-page-description">{hotelDescription}</span>
                        </div>
                    </div>
                </div>
                <div className="hotel-page-section hotel-rooms-container">
                    <HotelPageRooms
                        rooms={hotelRooms}
                        availableRoomId={highlightedRoomId}
                        offerId={highlightedOfferId}
                        highlightedOffer={highlightedOffer}
                    />
                </div>
                <div className="hotel-page-section make-booking hidden">
                    <MakeBooking 
                        availability={highlightedAvailability}
                        room={highlightedRoom}
                        offer={highlightedOfferInfo}
                        onFormSubmit={this.submitBooking}
                    />
                </div>
            </div>
        )
    }
}

export default HotelPage;