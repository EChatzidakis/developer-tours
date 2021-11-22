import React, { Component } from 'react';

import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import MainContent from './components/main-content/main-content.component';

import { DateFormatting } from './modules/DateFormatting';

class App extends Component {

  constructor() {
    super();
    this.state = {
      content: {
        filterResults: {},
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
          amenities: {
            terrace: false,
            balcony: false,
            seaside_view: false,
            garden_view: false,
            breakfast_included: false,
            free_cancellation: false,
            free_parking: false,
            fitness: false,
            pool: false,
            free_wifi: false
          },
          rating: 5,
          numberOfResults: 10,
          dates: DateFormatting({ type: 'default', date: '' }),
        },
      },
      isHomePage: true,
      bigHeader: true,
      showBookingStatus: false,
      bookingInfo: {}
    };
  }

  componentDidMount() {
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


    const url = 'https://afrecruitingfront-webapi-dev.azurewebsites.net/api/availabilities?location=' + locationId + '&startDate=' + startDate + '&endDate=' + endDate + '&rating=' + rating + '&skip=0&top=' + top;
    console.log(url);
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(filterResults => {
        const newState = Object.assign({}, this.state);
        newState.content.filterResults = filterResults;
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

  /**
   * fires when the user submits his booking request
   * @param {} bookingInfo 
   */
  submitBooking = (bookingInfo) => {

    var myHeaders = new Headers();
    myHeaders.append("X-DevTours-Developer", bookingInfo.userName);
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

    const offerId = bookingInfo.offerId;
    const url = "https://afrecruitingfront-webapi-dev.azurewebsites.net/api/booking?=" + offerId;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        const newState = Object.assign({}, this.state);
        newState.showBookingStatus = true;
        newState.bookingInfo = result;
        newState.isHomePage = false;
        this.setState(newState);
      })
      .catch(error => console.log('error', error));
  }

  render() {

    const isHomePage = this.state.isHomePage;
    const content = this.state.content;
    const bigHeader = this.state.bigHeader;
    const showBookingStatus = this.state.showBookingStatus;
    console.log("Hello World!");

    return (
      <>
        <Header
          bigHeader={bigHeader}
          handleClick={this.handleReturnToHomePageClickEvent}
        />
        <MainContent
          isHomePage={isHomePage}
          content={content}
          showBookingStatus={showBookingStatus}
          bookingInfo={this.state.bookingInfo}
          handleClick={this.handleCheckAvailabilityClickEvent}
          updateFilterResultsFunction={this.updateFilterResults}
          submitBookingFormFunction={this.submitBooking}
        />
        <Footer
          showFooter={bigHeader}
        />
      </>
    );
  }
}

export default App;