import React, {useContext} from "react";
import HeadNavbar from "./components/HeadNavbar";
import Routing from "./components/Routing";
import {NotificationContainer} from "react-notifications";

let Main = () => {
    return (
        <div>
            <HeadNavbar />
            <Routing/>
            <NotificationContainer />
        </div>

    )
}

export default Main;