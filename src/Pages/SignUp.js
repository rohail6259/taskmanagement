import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { TMContext } from "../Service/context/context";
import { Input, Button, ControlLabel } from "rsuite";

const SignUp = () => {
    const { contextData, dispatch } = useContext(TMContext);
    const { user } = contextData;

    const history = useHistory();

    const [signUpData, setSignUpData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        let isDataAvailable = false;
        let interval = null;

        if (!user.isAuthValid) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            interval = setTimeout(() => {
                if (user.isAuthValid) {
                    isDataAvailable = true;
                    history.push("/");
                } else fetchData();
            }, 500);
        }
        return () => clearInterval(interval);
    }, [user, history]);

    const handleFormInputOnChange = (value, event) =>
        setSignUpData({
            ...signUpData,
            [event.target.name]: value,
        });

    const handleSignUp = (event) => {
        event.preventDefault();
        dispatch({
            type: "SIGN_UP",
            payload: {
                signUpData,
            },
        });
    };

    return (
        <>
            <section className="signup pt-5 pt-lg-0">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-8 min-vh-100 d-flex flex-column align-items-center justify-content-start justify-content-lg-center">
                            <div className="col-12">
                                {/* SIGNUP FORM  */}
                                <form onSubmit={(event) => handleSignUp(event)}>
                                    <div className="form-group">
                                        <ControlLabel>Full Name</ControlLabel>
                                        <Input
                                            type="text"
                                            name="fullName"
                                            placeholder="Full Name"
                                            value={signUpData.fullName}
                                            onChange={(value, event) =>
                                                handleFormInputOnChange(
                                                    value,
                                                    event
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <ControlLabel>Email</ControlLabel>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={signUpData.email}
                                            onChange={(value, event) =>
                                                handleFormInputOnChange(
                                                    value,
                                                    event
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <ControlLabel>Password</ControlLabel>
                                        <Input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={signUpData.password}
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
                                        Sign Up
                                    </Button>
                                </form>
                                {/* LOGIN LINK */}
                                <p className="my-2 text-center">
                                    Already have an account?{" "}
                                    <Link to="/login">Login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;
