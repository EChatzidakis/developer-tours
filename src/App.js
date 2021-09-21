import React, { Component } from 'react';

import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import MainContent from './components/main-content/main-content.component';

import {DateFormatting}  from './modules/DateFormatting';

class App extends Component {

  constructor() {
    super();
    this.state = {
      content: {
        currentHomePageContent: {},
        hotelPage: {
          hotelItem: {},
          highlightedOffer: {
            roomId: '',
            offerId: ''
          }
        },
        filterDefault: true,
        filterProps: {
          locations: {
            list: [],
            selected: -1,
            selectedId: -1
          },
          rating: 5,
          numberOfResults: 10,
          dates: DateFormatting({ type: 'default', date: '' }),
        },
      },
      dates: DateFormatting({ type: 'default', date: '' }),
      isHomePage: true,
      bigHeader: true
    };
  }

  componentDidMount() {
    //this.getDefaultContent({type: 'default', date: ''});
    const filterProps = Object.assign({}, this.state.content.filterProps)
    this.updateFilterResults(filterProps)
    //scroll to top
    window.scrollTo(0, 0);
  }

  updateFilterResults = (filterProps) => {

    const locationId = (filterProps.locations.selectedId.length > 0 ? filterProps.locations.selectedId : '');
    const startDate = filterProps.dates.startDate;
    const endDate = filterProps.dates.endDate;
    const rating = filterProps.rating;
    const top = filterProps.numberOfResults;
    
    const myHeaders = new Headers();
    myHeaders.append("X-DevTours-Developer", "Postman Client");
    myHeaders.append("Cookie", "ARRAffinity=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb; ARRAffinitySameSite=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    //const dates = this.state.dates;
    const url = 'https://afrecruitingfront-webapi-dev.azurewebsites.net/api/availabilities?location=' + locationId + '&startDate=' + startDate + '&endDate=' + endDate + '&rating=' + rating + '&skip=0&top=' + top;
    console.log(url);
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(filterResults => {
        const newState = Object.assign({}, this.state);
        newState.content.currentHomePageContent = filterResults;
        this.setState(newState);
      })
      .catch(error => console.log('error', error));
  }

  getHotelPageContent(hotelId, roomId, offerId) {
    var myHeaders = new Headers();
    myHeaders.append("X-DevTours-Developer", "Postman Client");
    myHeaders.append("Cookie", "ARRAffinity=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb; ARRAffinitySameSite=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const newState = Object.assign({}, this.state);
    const url = "https://afrecruitingfront-webapi-dev.azurewebsites.net/api/hotel/" + hotelId;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(hotel => {
        newState.isHomePage = false;
        newState.bigHeader = false;
        newState.content.hotelPage.hotelItem = hotel;
        newState.content.hotelPage.highlightedOffer.roomId = roomId;
        newState.content.hotelPage.highlightedOffer.offerId = offerId;
        
        this.setState(newState);
      })
      .catch(error => console.log('error', error));
  }

  /**
   * redirects the user to the hotel page
   * @param {event} event 
   */
  handleCheckAvailabilityClickEvent = (event) => {
    const button = event.target;
    const hotelId = button.getAttribute('hotelid');
    const roomId = button.getAttribute('roomid');
    const offerId = button.getAttribute('offerid');

    this.getHotelPageContent(hotelId, roomId, offerId);

    //scroll to top
    window.scrollTo(0, 0);
  }

  /**
   * returns the user to the home page.
   * it keeps the latest filter used intact
   */
  handleReturnToHomePageClickEvent = (event) => {
    const newState = Object.assign({}, this.state);
    newState.isHomePage = true;
    newState.bigHeader = true;
    this.setState(newState);
  }

  render() {

    const isHomePage = this.state.isHomePage;
    const content = this.state.content;
    const bigHeader = this.state.bigHeader;

    return (
      <>
        <Header
          bigHeader={bigHeader}
          handleClick={this.handleReturnToHomePageClickEvent}
        />
        <MainContent
          isHomePage={isHomePage}
          content={content}
          dates={this.state.dates}
          handleClick={this.handleCheckAvailabilityClickEvent}
          updateFilterFunction={this.updateFilterResults}
        />
        <Footer
          showFooter={bigHeader}
        />
      </>
    );
  }
}

export default App;
