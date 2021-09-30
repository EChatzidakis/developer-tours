import React from "react";

import './footer.styles.css';

export const  Footer = (props) => {

  if (!props.showFooter) {
    return <></>;
  }

  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Made by <a href="http://e-chatzidakis.com/" target="_blank">Stratos</a> - {currentYear}</p>
    </footer>
  );
}
