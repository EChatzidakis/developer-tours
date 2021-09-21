import React, { Component } from "react";
import TextField from '@mui/material/TextField';

import { DateFormatting } from "../../modules/DateFormatting";

import './make-booking-form.styles.css'

class MakeBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputsValidation: {
                name: true,
                phone: true,
                email: true,
                adults: true,
                room: true,
                more: true
            }
        };

        this.phoneInputRef = React.createRef();
        this.emailInputRef = React.createRef();
    }

    handleChange = (event) => {

        const { id, value } = event.target;
        const inputsValidation = {
            name: true,
            phone: true,
            email: true,
            adults: true,
            room: true,
            more: true
        };

        switch (id) {
            case "inp-name":
                inputsValidation.name = (value.match("^[a-zA-Z ]*$") === null ? false : true);
                break;

            case "inp-email":
                inputsValidation.email = (value.match("^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$") === null ? false : true);
                break;

            case "inp-phone":
                inputsValidation.phone = (value.length < 10 ? false : true);
                break;

            case "inp-adults":
                inputsValidation.adults = (value > 0 ? true : false);
                break;
            default:
                break;
        }

        const shouldChangeState = !(JSON.stringify(this.state.inputsValidation) === JSON.stringify(inputsValidation));
        if (shouldChangeState) {
            const newState = Object.assign({}, this.state);
            newState.inputsValidation = inputsValidation;
            this.setState(newState);
        }
    }

    render() {

        const inputValidation = this.state.inputsValidation;

        const availability = this.props.availability;
        const formatDateToType = 'toDDMMYYYY';
        const startDate = DateFormatting({ type: formatDateToType, date: availability.available_from });
        const endDate = DateFormatting({ type: formatDateToType, date: availability.available_to });


        const offer = this.props.offer;
        const finalPrice = offer.line_items.final_price.amount;

        const room = this.props.room;
        const roomName = room.name;

        return (
            <>
                <h2>Submit Form</h2>
                <form onSubmit={this.props.submitBooking}>
                    <div className="elem-group inlined">
                        <TextField
                            required
                            id="inp-name"
                            label="Name"
                            placeholder="John Doe"
                            onChange={this.handleChange}
                            error={!inputValidation.name}
                        />
                    </div>
                    <div className="elem-group inlined">
                        <TextField
                            required
                            id="inp-email"
                            label="E-mail"
                            placeholder="john.doe@email.com"
                            onChange={this.handleChange}
                            error={!inputValidation.email}
                        />
                    </div>
                    <div className="elem-group inlined">
                        <TextField
                            required
                            id="inp-phone"
                            label="Phone Number"
                            placeholder="0123 4567 8901"
                            onChange={this.handleChange}
                            error={!inputValidation.phone}
                        />
                    </div>
                    <hr />
                    <div className="elem-group inlined">
                        <TextField
                            id="inp-adults"
                            label="Adults"
                            type="number"
                            defaultValue={1}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.handleChange}
                            error={!inputValidation.adults}
                        />
                    </div>
                    <div className="elem-group inlined">
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Check-in Date"
                            defaultValue={startDate}
                        />
                    </div>
                    <div className="elem-group inlined">
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Check-out Date"
                            defaultValue={endDate}
                        />
                    </div>
                    <div className="elem-group">
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Select Room"
                            defaultValue={`${roomName + ': ' + finalPrice}€`}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <hr />
                    <div className="elem-group">
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Anything Else?"
                            multiline
                            placeholder="Tell us anything else that might be important."
                            style={{ width: '100%' }}
                        />
                    </div>
                    <button className="submit-form btn-standard" type="submit">Book The Rooms</button>
                </form>
            </>
        );
    }
}

export default MakeBooking;