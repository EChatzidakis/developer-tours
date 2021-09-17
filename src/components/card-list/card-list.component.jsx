import React from 'react';
import Card from '../card/card.component';

import './card-list.styles.css';

export const CardList = (props) => {

  const items = props.items || [];
  const handleCheckAvailabilityClick = props.handleCheckAvailabilityClick;
  return (<div className='card-list'>
    {
      items.map((item, key) => {
        return (
          <Card
            key={key}
            item={item}
            handleCheckAvailabilityClick={handleCheckAvailabilityClick}
          />);
      })
    }
  </div>);
}