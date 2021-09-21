import React, { Component } from 'react';

import CardDetails from '../card-details/card-details.component';
import { HandleImageLinks } from '../../modules/handle-image-links';

//styles
import './card.styles.css';

class Card extends Component {
  
    render() {

        //console.log(this.props);
        const handleClick = this.props.handleClick;
        const item = this.props.item || {};
        const hotelId = item.hotelId;
        const availability = item.availability;
        const offer = item.offer;
        const room = item.room;

        const images =  HandleImageLinks(room.images, hotelId);
        return (
            <div className='card-container'>
                <div className="img-container">
                    <img src={images[0].url} alt=""/>
                </div>
                <CardDetails
                    hotelId={hotelId}
                    room={room}
                    availability={availability}
                    offer={offer}
                    handleClick={handleClick}
                />
            </div>
        )
    }
}

export default Card;