import React, { Component } from "react";
import TextField from '@mui/material/TextField';

import NumberFormat from 'react-number-format';
import { DateFormatting } from "../../modules/DateFormatting";

import './make-booking-form.styles.css'

class MakeBooking extends Component {

    constructor(props) {
        super(props);

        this.phoneInputRef = React.createRef();
        this.emailInputRef = React.createRef();
    }
    phoneNumberMask(props, inputRef) {
        console.log([props, inputRef])
        const {ref} = props;
        return (
            <NumberFormat
                getInputRef={ref}
                format="+## ###-###-####"
                mask="_"
                isNumericString
                customInput={TextField}
            />
        );
    }
    render() {

        console.log(this.props);
        const availability = this.props.availability;
        const formatDateToType = 'toDDMMYYYY';
        const startDate = DateFormatting({ type: formatDateToType, date: availability.available_from });
        const endDate = DateFormatting({ type: formatDateToType, date: availability.available_to });


        const offer = this.props.offer;
        const finalPrice = offer.line_items.final_price.amount;

        const room = this.props.room;
        const roomName = room.name;

        return (
            <form onSubmit={this.props.submitBooking}>
                <div className="elem-group inlined">
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        placeholder="John Doe"
                    />
                </div>
                <div className="elem-group inlined">
                    <TextField
                        required
                        id="outlined-required"
                        label="E-mail"
                        placeholder="john.doe@email.com"
                    />
                </div>
                <div className="elem-group inlined">
                    <TextField
                        required
                        id="react-number-format"
                        label="Phone Number"
                        placeholder="+49 123 4567 7890 "
                        inputRef={this.phoneInputRef}
                        InputProps={{
                            inputComponent: this.phoneNumberMask
                        }}
                    />
                </div>
                <hr />
                <div className="elem-group inlined">
                    <TextField
                        id="outlined-number"
                        label="Adults"
                        type="number"
                        defaultValue={1}
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                        style={{width: '100%'}}
                    />
                </div>
                <hr />
                <div className="elem-group">
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Anything Else?"
                        multiline
                        placeholder="Tell us anything else that might be important."
                        style={{width: '100%'}}
                    />
                </div>
                <button type="submit">Book The Rooms</button>
            </form>

        );
    }
}

export default MakeBooking;