import React, { Component } from "react";

import { MdFreeBreakfast } from "react-icons/md";
import { MdFitnessCenter } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { MdLocalParking } from "react-icons/md";
import { MdWifi } from "react-icons/md";
import { MdPool } from "react-icons/md";

import { GiCheckMark } from "react-icons/gi";
import { GiCancel } from "react-icons/gi";

import './hotel-page-amenities.styles.css'


class HotelPageAmenities extends Component {

    amenities = {
        breakfast_included: {
            name: 'Breakfast Incuded',
            svg: MdFreeBreakfast,
            bool: this.props.hotelAmenities.breakfast_included === undefined ? false : this.props.hotelAmenities.breakfast_included
        },
        fitness: {
            name: 'Fitness Center',
            svg: MdFitnessCenter,
            bool: this.props.hotelAmenities.fitness === undefined ? false : this.props.hotelAmenities.fitness
        },
        free_cancellation: {
            name: 'Free Cancelation',
            svg: MdCancel,
            bool: this.props.hotelAmenities.free_cancellation === undefined ? false : this.props.hotelAmenities.free_cancellation
        },
        free_parking: {
            name: 'Free Parking',
            svg: MdLocalParking,
            bool: this.props.hotelAmenities.free_parking === undefined ? false : this.props.hotelAmenities.free_parking
        },
        free_wifi: {
            name: 'Free WiFi',
            svg: MdWifi,
            bool: this.props.hotelAmenities.free_wifi === undefined ? false : this.props.hotelAmenities.free_wifi
        },
        pool: {
            name: 'Swimming Pool',
            svg: MdPool,
            bool: this.props.hotelAmenities.pool === undefined ? false : this.props.hotelAmenities.pool
        },
    }

    renderTableData() {
        return Object.keys(this.props.hotelAmenities).map((key) => {

            const AmenitySvg = this.amenities[key].svg;
            const amenityName = this.amenities[key].name;
            const bool = this.amenities[key].bool === undefined ? false : this.amenities[key].bool;
            
            return (
                <tr key={key}>
                    <td>
                        <span className="hotel-amenities-svg">
                            <AmenitySvg />
                        </span>
                        <span className="hotel-amenities-feature">
                            {amenityName}
                        </span>
                    </td>
                    <td>
                        <span className={`hotel-amenities-svg-${bool}`}>
                            <span className="svg-true">
                                <GiCheckMark />
                            </span>
                            <span className="svg-false">
                                <GiCancel />
                            </span>
                        </span>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="hotel-page-amenities-table-container">
                <table id="hotel-page-amenities-table">
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default HotelPageAmenities;