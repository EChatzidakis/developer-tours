import React from "react";

import './footer.styles.css';

export const  Footer = (props) => {

  if (!props.showFooter) {
    return <></>;
  }

  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Made by Stratos for AppsFactory - {currentYear}</p>
    </footer>
  );
}
