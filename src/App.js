import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TMContext, initialState } from "./Service/context/context";
import { reducer } from "./Service/reducer/reducer";
import ProtectedRoute from "./Components/Global/ProtectedRoute";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import NavbarHOC from "./Components/Global/NavbarHOC";

const App = () => {
    // REACT USEREDUCER - REDUX PATTERN
    const [contextData, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token !== null) {
            dispatch({ type: "GET_USER_INFO" });
            dispatch({ type: "GET_TASKS" });
        }
    }, []);

    return (
        <TMContext.Provider value={{ contextData, dispatch }}>
            <Router>
                <NavbarHOC />
                <Switch>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/login" component={Login} />
                    <ProtectedRoute path="/" exact component={Dashboard} />
                </Switch>
            </Router>
        </TMContext.Provider>
    );
};

export default App;
