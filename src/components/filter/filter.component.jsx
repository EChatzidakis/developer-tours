import React, { Component } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import deLocale from 'date-fns/locale/de';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import TextField from '@mui/material/TextField';

import './filter.styles.css'

class FilterAccordion extends Component {

    // amenitiesLocale = [
    //     { id: "terrace", title: "Terrace" },
    //     { id: "balcony", title: "Balcony" },
    //     { id: "seaside_view", title: "Seaside view" },
    //     { id: "garden_view", title: "Garden view" },
    //     { id: "breakfast_included", title: "Breakfast included" },
    //     { id: "free_cancellation", id: "Free cancelation" },
    //     { id: "free_parking", title: "Free Parking" },
    //     { id: "fitness", title: "Fitness club" },
    //     { id: "pool", title: "Pool" },
    //     { id: "free_wifi", title: "Free Wifi" }
    // ]

    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.currentFilterProps);
    }

    componentDidMount() {
        this.fetchLocations();
    }

    fetchLocations() {
        var myHeaders = new Headers();
        myHeaders.append("X-DevTours-Developer", "Postman Client");
        myHeaders.append("Cookie", "ARRAffinity=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb; ARRAffinitySameSite=d69d338ae03baf15937f175e6830fb0fe6a73832b054a61d5de9f669d81f93fb");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const url = "https://afrecruitingfront-webapi-dev.azurewebsites.net/api/location";
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(locations => {
                const newState = Object.assign({}, this.state);
                newState.locations.list = locations;
                this.setState(newState)
            })
            .catch(error => console.log('error', error));
    }

    onRatingChange = (event) => {
        const newRating = event.target.value;
        const newState = Object.assign({}, this.state);
        newState.rating = newRating;
        this.setState(newState)
    }

    onLocationChange = (event) => {
        const newState = Object.assign({}, this.state);
        const newLocation = event.target.value;
        const newLocationId = (newLocation < 0 ? 0 : newState.locations.list[newLocation].id);
        newState.locations.selected = newLocation;
        newState.locations.selectedId = newLocationId;
        this.setState(newState)
    }

    onNumberOfResultsChange = (event, value) => {
        const newValue = value;
        const newState = Object.assign({}, this.state);
        newState.numberOfResults = newValue;
        this.setState(newState)
    }

    onCheckInDateChange = (newValue) => {
        const newDate = new Date(newValue);
        const newState = Object.assign({}, this.state);
        newState.dates.startDate = newDate.toISOString();
        this.setState(newState)
    }

    onCheckOutDateChange = (newValue) => {
        const newDate = new Date(newValue);
        const newState = Object.assign({}, this.state);
        newState.dates.endDate = newDate.toISOString();
        this.setState(newState)
    }

    onFilterConfirm = () => {
        const filterProps = Object.assign({}, this.state);
        this.props.updateFilterResultsFunction(filterProps);
    }

    renderLocationSelect() {
        const locations = this.state.locations.list;
        return (
            [locations.map((location, index) => <MenuItem key={index} value={index} id={location.id}>{location.name}</MenuItem>)]
        );
    }

    render() {

        return (
            <div className="filter-container">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="filter-content"
                        id="filter-header"
                    >
                        <h3>Filter</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="filter-elem-group inlined">
                            <div className="filter-item">
                                <InputLabel id="location-select-label">Location</InputLabel>
                                <Select
                                    labelId="location-select-label"
                                    id="location-select"
                                    value={this.state.locations.selected}
                                    label="Location"
                                    onChange={this.onLocationChange}
                                >
                                    <MenuItem key={-1} value={-1} id={-1}>I feel Lucky!</MenuItem>
                                    {this.renderLocationSelect()}
                                </Select>
                            </div>
                            <div className="filter-item">
                                <InputLabel id="rating-select-label">Rating</InputLabel>
                                <Select
                                    labelId="rating-select-label"
                                    id="rating-select"
                                    value={this.state.rating}
                                    label="Rating"
                                    onChange={this.onRatingChange}
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div className="filter-elem-group inlined">
                            <div className="filter-item">
                                <InputLabel id="top-select-label">Top</InputLabel>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={this.state.numberOfResults}
                                    exclusive
                                    onChange={this.onNumberOfResultsChange}
                                >
                                    <ToggleButton value={5}>5</ToggleButton>
                                    <ToggleButton value={10}>10</ToggleButton>
                                    <ToggleButton value={15}>15</ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                        <div className="filter-elem-group filter-elem-group-dates inlined">
                            <div className="filter-item">
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
                                    <DatePicker
                                        label="Check-in Date"
                                        mask="__.__.____"
                                        value={this.state.dates.startDate}
                                        onChange={this.onCheckInDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="filter-item">
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
                                    <DatePicker
                                        label="Check-out Date"
                                        mask="__.__.____"
                                        value={this.state.dates.endDate}
                                        onChange={this.onCheckOutDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </AccordionDetails>
                    <AccordionDetails>
                        <button className="btn-standard btn-filter" onClick={this.onFilterConfirm}>Search</button>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }
}

export default FilterAccordion;