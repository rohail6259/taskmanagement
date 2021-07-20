import React from "react";
import { withRouter } from "react-router-dom";
import Navbar from "./Navbar";

const NavbarHOC = withRouter(({ location }) => {
    return <>{location.pathname === "/" ? <Navbar /> : ""}</>;
});

export default NavbarHOC;
