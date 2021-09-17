import React from 'react';
import { FcGlobe } from "react-icons/fc";
// import { TiPlaneOutline } from "react-icons/ti";
import './header.styles.css';

export const Header = (props) => {

    const isBig = props.bigHeader;

    return (
        <header className={`show-big-${isBig}`}>
            <FcGlobe className="App-logo" />
            <h1>DeveloperTours</h1>
        </header>
    );
}
