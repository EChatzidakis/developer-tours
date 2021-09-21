import React from 'react';
import Card from '../card/card.component';

import './card-list.styles.css';

const NoResults = () => {
  return (
    <div className="no-content">
      <h1>No Results.</h1>
      <p>Try something different</p>
    </div>
  );
}

const RenderCards = (items, handleClick) => {

  return (<div className='card-list'>
    {
      items.map((item, key) => {
        return (
          <Card
            key={key}
            item={item}
            handleClick={handleClick}
          />);
      })
    }
  </div>);
}

export const CardList = (props) => {

  const items = props.items || [];
  const handleClick = props.handleClick;
  if(items.length > 0) {
    return RenderCards(items, handleClick)
  }
  else {
    return NoResults();
  }
}