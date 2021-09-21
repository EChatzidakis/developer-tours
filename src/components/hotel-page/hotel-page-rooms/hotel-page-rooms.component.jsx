import React from "react";
import { Component } from "react";
import ReactTooltip from "react-tooltip";

import './hotel-page-rooms.styles.css';

class HotelPageRooms extends Component {

    amenities = {
        balcony: "Balcony",
        garden_view: "Garden View",
        seaside_view: "Seaside View",
        terrace: "Terrace"
    }

    renderRoomAmenities(amenitiesObj) {
        return Object.keys(amenitiesObj).map((key, index) => {

            const hasAmenity = amenitiesObj[key];
            return (
                <li key={index}>
                    <span className={`amenity-item-${hasAmenity}`}>
                        {this.amenities[key]}
                    </span>
                </li>
            );
        });
    }

    renderTableData() {

        return this.props.rooms.map((room, index) => {

            const amenities = room.amenities;
            const descr = room.description;
            const id = room.id;
            // const images = room.images;
            const name = room.name;

            return (
                <tr key={id}>
                    <td className="room-name room-descr">
                        <span className="spn-room-name">{name}</span>
                        <p className="spn-room-descr">{descr}</p>
                    </td>
                    <td className="room-amenities">
                        <ul>
                            {this.renderRoomAmenities(amenities)}
                        </ul>
                    </td>
                    {this.renderMakeBookingCell(id)}
                </tr>
            );
        });
    }

    renderMakeBookingCell(roomId) {

        const availableRoomId = this.props.availableRoomId;
        const offerId = this.props.offerId;

        const isRoomAvailable = availableRoomId === roomId;
        const extraButtonClasses = (isRoomAvailable ? '' : ' btn-disabled');

        return (
            <td className="room-make-booking">
                {this.renderBookingInformation(isRoomAvailable, offerId)}
                <button
                    className={`btn-standard${extraButtonClasses}`}
                    disabled={!isRoomAvailable}
                    onClick={this.props.handleClick}
                    >
                    Make Booking
                </button>
            </td>
        );
    }

    renderBookingInformation(isRoomAvailable, offerId) {

        if (!isRoomAvailable) {
            return <h3>Room Unavailable</h3>
        }

        const roundNumbers = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

        const offer = this.props.highlightedOffer.offer;
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
            </div>
        );
    }

    render() {

        return (
            <div className="hotel-page-rooms-table-container">
                <table id="hotel-page-rooms-table">
                    <tbody>
                        <tr>
                            <th>Room information</th>
                            <th>Amenities</th>
                            <th></th>
                        </tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default HotelPageRooms;