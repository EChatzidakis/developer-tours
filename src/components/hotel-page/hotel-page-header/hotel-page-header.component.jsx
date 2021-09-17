import React from "react";

import { BiMap } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

import './hotel-page-header.styles.css';

export const HotelPageHeader = (props) => {

    return (
        <>
            <div className="hotel-info hotel-name">
                <h2>{props.hotelName}</h2>
            </div>
            <div className="hotel-info hotel-info-extra">
                <div className="hotel-location">
                    <span className="hotel-location-svg">
                        <BiMap />
                    </span>
                    <span className="hotel-location-city">{props.hotelLocationCity}, </span>
                    <span className="hotel-location-address">{props.hotelAddress}</span>
                </div>
                <div className="hotel-rating">
                    <span className="hotel-rating-svg">
                        <FaStar />
                    </span>
                    <span className="hotel-rating-int">
                        {props.hotelRating}
                    </span>
                </div>
            </div>
        </>
    );
}