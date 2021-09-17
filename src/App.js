import React, { Component } from 'react';

import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import MainContent from './components/main-content/main-content.component';

class App extends Component {

  constructor() {
    super();
    this.state = {
      content: {
        currentFilter: {},
        hotelPage: {
          hotelItem: {},
          highlightedOffer: {
            roomId: '',
            offerId: ''
          }
        }
      },
      dates: this.getDefaultDates(),
      filter: '',
      isHomePage: true,
      bigHeader: true
    };
  }

  componentDidMount() {
    this.getDefaultContent();
  }

  getDefaultContent() {
    const myHeaders = new Headers();
    myHeaders.append("X-DevTours-Developer", "Postman Client");
    myHeaders.append("Cookie", "ARRAffinity=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb; ARRAffinitySameSite=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const dates = this.state.dates;
    const url = 'https://afrecruitingfront-webapi-dev.azurewebsites.net/api/availabilities?startDate=' + dates.startDate + '&endDate=' + dates.endDate + '&rating=3&skip=0&top=10'
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(availabilities => this.setState({ content: { currentFilter: availabilities, hotelPage: {} } }))
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

    const currentFilter = this.state.content.currentFilter;
    const url = "https://afrecruitingfront-webapi-dev.azurewebsites.net/api/hotel/" + hotelId;
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(hotel => this.setState({
        isHomePage: false,
        content: {
          currentFilter: currentFilter,
          hotelPage: { 
            hotelItem: hotel,
            highlightedOffer: {
              roomId: roomId,
              offerId: offerId
            }
          }
        },
        bigHeader: false
      }))
      .catch(error => console.log('error', error));
  }

  getDefaultDates() {
    let startDate = new Date();
    let endDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(startDate.getDate() + 5);

    const startDateFormatted = this.formatDate(startDate);
    const endDateFormatted = this.formatDate(endDate);

    return { startDate: startDateFormatted, endDate: endDateFormatted }
  }

  formatDate(date) {
    const d = date;
    return d.toISOString().split('T')[0] + 'T12:00:00.000Z';
  }

  handleCheckAvailabilityClick = (e) => {
    const button = e.target;
    const hotelId = button.getAttribute('hotelid');
    const roomId = button.getAttribute('roomid');
    const offerId = button.getAttribute('offerid');

    this.getHotelPageContent(hotelId, roomId, offerId);

    //scroll to top
    window.scrollTo(0, 0);
  }

  render() {

    const isHomePage = this.state.isHomePage;
    const content = this.state.content;
    const bigHeader = this.state.bigHeader;

    return (
      <>
        <Header
          bigHeader={bigHeader}
        />
        <MainContent
          isHomePage={isHomePage}
          content={content}
          handleCheckAvailabilityClick={this.handleCheckAvailabilityClick}
        />
        <Footer
          showFooter={bigHeader}
        />
      </>
    );
  }
}

export default App;
