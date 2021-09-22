import React from 'react';
import { BiMap } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

import './hotel-information.styles.css';

export const HotelInformation = (props) => {

    const hotelName = props.hotel.name;
    const rating = props.hotel.rating;
    const location = (props.hotel.location && props.hotel.location.name ? props.hotel.location.name : '');
    const streetAddress = props.hotel.address;

    return (
        <div className="dv-details hotel-information">
            <div className="name-container">
                <h2>{hotelName}</h2>
                <div className="card-details hotel-rating">
                    <span className="hotel-rating-svg">
                        <FaStar />
                    </span>
                    <span className="hotel-rating-int">
                        {rating}
                    </span>
                </div>
            </div>
            <p>
                <span className="hotel-information-svg">
                    <BiMap />
                </span>
                <span className="spn-hotel-information">
                    {location}, {streetAddress}
                </span>
            </p>
        </div>
    );
}