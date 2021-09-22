import React from 'react';

import './booking-status.styles.css';

export const BookingStatus = (props) => {
    console.log(props);
    return (
        <div className="booking-status-container">
            <h2>Your booking status is {props.bookingInfo.status}.</h2>
            <p>
                <b>Booking Id:</b> {props.bookingInfo.booking_id}
            </p>
            <p>
                We will contact you when there is an update in your status.
            </p>
        </div>
    );
}