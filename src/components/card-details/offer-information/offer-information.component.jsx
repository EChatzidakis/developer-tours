import React from "react";
import ReactTooltip from "react-tooltip";

import './offer-information.styles.css';

export const OfferInformation = (props) => {

    //console.log(props);
    const roundNumbers = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

    const handleClick = props.handleClick;
    const hotelId = props.hotelId
    const roomId = props.roomId;
    // to avoid silly lines of code I will take for granted that all currencies are in EUR
    const offer = props.offer;
    const offerId = offer.id;
    const costs = offer.line_items;
    const finalPrice = costs.final_price;
    const grossPrice = costs.gross_price;
    const cityTaxAmount = costs.city_tax;
    const vatAmount = costs.vat;
    return (
        <div className="dv-details offer-information">
            <span className="spn-offer-information spn-charges-information" data-tip data-for={`price-sum-tip-${offerId}`}>
                <u>includes taxes and charges</u>
            </span>
            <ReactTooltip id={`price-sum-tip-${offerId}`} place="top" effect="solid">
                <ul>
                    <li>Gross Price: {roundNumbers(grossPrice.amount)}€</li>
                    <li>City Tax: {roundNumbers(cityTaxAmount.amount)}€</li>
                    <li>VAT: {roundNumbers(vatAmount.amount)}€</li>
                </ul>
            </ReactTooltip>
            
            <span className="spn-offer-information spn-offer-information">
                <h3>{finalPrice.amount}€</h3>
            </span>            

            <button
                className="btn-standard btn-active"
                onClick={handleClick}
                hotelid={hotelId}
                roomid={roomId}
                offerid={offerId}
            >
                Check Availability &gt;
            </button>
        </div>
    );
}