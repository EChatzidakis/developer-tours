import React from 'react';
import { BiMap } from "react-icons/bi";

import './hotel-information.styles.css';

export const HotelInformation = (props) => {
    return (
        <div className="dv-details hotel-information">
            <h2>{props.name}</h2>
            <p>
                <span className="hotel-information-svg">
                    <BiMap />
                </span>
                <span className="spn-hotel-information">
                    {props.location.name}, {props.address}
                </span>
            </p>
        </div>
    );
}