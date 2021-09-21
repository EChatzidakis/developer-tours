import React, { Component } from 'react';

import { CardList } from '../card-list/card-list.component';
import HotelPage from '../hotel-page/hotel-page.component';
import Filter from '../filter/filter.component';

import './main-content.styles.css';

class MainContent extends Component {


    renderHomePage() {

        const items = this.props.content.currentHomePageContent.items;
        const handleClick = this.props.handleClick;
        return (
            <div id="main-content">
                <Filter 
                    currentFilterProps={this.props.content.filterProps}
                    filterIsDefault={this.props.content.filterDefault}
                    dates={this.props.dates}
                    updateFilterFunction={this.props.updateFilterFunction}
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
        const items = this.props.content.currentHomePageContent.items;
        const highlightedOffer = items.filter(item => item.offer.id === hotelPage.highlightedOffer.offerId)[0];
        return (
            <div id="main-content">
                <HotelPage 
                    hotelPage={hotelPage}
                    highlightedOffer={highlightedOffer}
                />
            </div>
        );
    }

    render() {
        const isHomePage = this.props.isHomePage;

        if (!isHomePage) {
            return this.renderHotelPage();
        }
        
        return this.renderHomePage();
    }
}

export default MainContent;