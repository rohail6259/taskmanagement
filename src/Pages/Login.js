import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Input, Button, ControlLabel } from "rsuite";
import { TMContext } from "../Service/context/context";

const Login = () => {
    const { contextData, dispatch } = useContext(TMContext);
    const { user } = contextData;

    const history = useHistory();
    const token = localStorage.getItem("token");

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        let isDataAvailable = false;

        if (!user.isAuthValid) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (user.isAuthValid) {
                    isDataAvailable = true;
                    history.push("/");
                } else fetchData();
            }, 500);
        }
    }, [user, history]);

    const handleFormInputOnChange = (value, event) =>
        setLoginData({
            ...loginData,
            [event.target.name]: value,
        });

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch({
            type: "LOGIN",
            payload: {
                loginData,
            },
        });
    };

    return (
        <>
            {token && history.push("/")}
            {!token && (
                <section className="login pt-5 pt-lg-0">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-8 min-vh-100 d-flex flex-column align-items-center justify-content-start justify-content-lg-center">
                                {/* TITLE & SUBTITLE */}
                                <div className="col-12">
                                    {/* LOGIN FORM */}
                                    <form
                                        onSubmit={(event) => handleLogin(event)}
                                    >
                                        <div className="form-group">
                                            <ControlLabel>Email</ControlLabel>
                                            <Input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={loginData.email}
                                                onChange={(value, event) =>
                                                    handleFormInputOnChange(
                                                        value,
                                                        event
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <ControlLabel>
                                                Password
                                            </ControlLabel>
                                            <Input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={loginData.password}
                                                onChange={(value, event) =>
                                                    handleFormInputOnChange(
                                                        value,
                                                        event
                                                    )
                                                }
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            appearance="primary"
                                            className="w-100"
                                        >
                                            Login
                                        </Button>
                                    </form>
                                    {/* SIGN UP LINK */}
                                    <p className="mt-3 text-center">
                                        Not a member?{" "}
                                        <Link to="/signup">Signup</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Login;
