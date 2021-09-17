import React from 'react';

import './availability-information.styles.css'

export const AvailabilityInformation = (props) => {
    
    // thanks google
    const parseISOString = (s) => {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }
    const isoFormatDMY = (d) => {
        function pad(n) { return (n < 10 ? '0' : '') + n }
        return pad(d.getUTCDate()) + '.' + pad(d.getUTCMonth() + 1) + '.' + d.getUTCFullYear();
    }
    const availability = props.availability;
    const startDate = isoFormatDMY(parseISOString(availability.available_from));
    const endDate = isoFormatDMY(parseISOString(availability.available_to));

    const numberOfDays = availability.length_of_stay;
    const pricePerNight = availability.price_per_night;
    const intpricePerNight = pricePerNight.amount;
    const currencyPerNight = (pricePerNight.currency === "Euro" ? "€" : "$" );

    return (
        <div className="dv-details availability-information">
            <p>
                <span className="spn-availability-information">{startDate + ' - ' + endDate}</span>
                <span className="spn-availability-information">{numberOfDays} nights</span>
                <span className="spn-availability-information">{intpricePerNight + currencyPerNight}/night</span>
            </p>
        </div>
    );
}