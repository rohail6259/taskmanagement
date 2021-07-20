import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, InputGroup, Input, Icon } from "rsuite";
import { TMContext } from "../Service/context/context";
import Logout from "../Utlis/Logout";

const Dashboard = () => {
    const { contextData } = useContext(TMContext);
    const { tasks } = contextData;

    const history = useHistory();

    const [taskData, setTaskData] = useState([]);

    useEffect(() => {
        let isDataAvailable = false;

        if (tasks) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (tasks.length > 0) {
                    isDataAvailable = true;
                    setTaskData(tasks);
                } else fetchData();
            }, 500);
        }
    }, [tasks]);

    const handleSearch = (value) => {
        let searchedValue = value.toLowerCase();
        let filteredData = tasks.filter((e) => {
            return e.title.toLowerCase().search(searchedValue) !== -1;
        });
        setTaskData(filteredData);
    };

    return (
        <section className="dashboard">
            <div className="container-fluid container-lg">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-8">
                        <div className="col-12">
                            {/* LOGOUT */}
                            <Button
                                className="logout"
                                appearance="default"
                                onClick={() => Logout(history)}
                            >
                                Logout
                            </Button>

                            {/* SEARCH INPUT */}
                            <InputGroup inside>
                                <InputGroup.Button>
                                    <Icon icon="search" />
                                </InputGroup.Button>
                                <Input
                                    placeholder="Search"
                                    type="search"
                                    onChange={(value) => handleSearch(value)}
                                />
                            </InputGroup>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
