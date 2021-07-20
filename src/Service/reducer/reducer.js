import { initialState } from "../context/context";
import { signup, login, getUserInfo } from "../actions/actions";

export const reducer = (contextData = initialState, { type, payload }) => {
    let user = {};

    switch (type) {
        case "SIGN_UP":
            signup(user, payload.signUpData);
            return { ...contextData, user };

        case "LOGIN":
            login(user, payload.loginData);
            return { ...contextData, user };

        case "GET_USER_INFO":
            getUserInfo(user, payload.id);
            return { ...contextData, user };

        default:
            return contextData;
    }
};
