import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "rsuite";
import { TMContext } from "../../Service/context/context";
import Logout from "../../Utlis/Logout";

const Navbar = () => {
    const { contextData } = useContext(TMContext);
    const { user } = contextData;

    const history = useHistory();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        let isDataAvailable = false;

        if (user) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (user.id) {
                    isDataAvailable = true;
                    setUserData(user);
                } else fetchData();
            }, 100);
        }
    }, [user]);

    return (
        <div className="navbar-wrapper w-100 px-4 d-flex align-items-center justify-content-between">
            <div className="profile-info d-flex align-items-center">
                <img
                    className="mx-3"
                    src="https://avatars.dicebear.com/api/human/sample.svg"
                    alt={userData.fullName}
                />
                <p>{userData?.fullName?.split(' ')[0]}</p>
            </div>
            <Button
                appearance="link"
                className="logout"
                onClick={() => Logout(history)}
            >
                Logout
            </Button>
        </div>
    );
};

export default Navbar;
