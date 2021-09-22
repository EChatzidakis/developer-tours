import React, { Component } from 'react';

import { CardList } from '../card-list/card-list.component';
import { BookingStatus } from '../booking-status/booking-status.component';
import HotelPage from '../hotel-page/hotel-page.component';
import FilterAccordion from '../filter/filter.component';

import './main-content.styles.css';

class MainContent extends Component {


    renderHomePage() {

        const items = this.props.content.filterResults.items;
        const handleClick = this.props.handleClick;
        return (
            <div id="main-content">
                <FilterAccordion 
                    currentFilterProps={this.props.content.filterProps}
                    filterIsDefault={this.props.content.filterDefault}
                    updateFilterResultsFunction={this.props.updateFilterResultsFunction}
                />
                <CardList
                    items={items}
                    handleClick={handleClick}
                />
            </div>
        );
    }

    renderHotelPage() {

        const hotelPage = this.props.content.hotelPage;
        const items = this.props.content.filterResults.items;
        const highlightedOffer = items.filter(item => item.offer.id === hotelPage.highlightedOffer.offerId)[0];
        return (
            <div id="main-content">
                <HotelPage 
                    hotelPage={hotelPage}
                    highlightedOffer={highlightedOffer}
                    submitBookingFormFunction={this.props.submitBookingFormFunction}
                />
            </div>
        );
    }

    renderBookingStatus() {
        return (<BookingStatus 
            bookingInfo={this.props.bookingInfo}
        />);
    }

    render() {
        const isHomePage = this.props.isHomePage;
        const showBookingStatus = this.props.showBookingStatus;
       
        if (isHomePage) {
            return this.renderHomePage();
        }
        else if(showBookingStatus) {
            return this.renderBookingStatus();
        }
        else {
            return this.renderHotelPage();
        }
    }
}

export default MainContent;