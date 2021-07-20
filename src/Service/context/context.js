import { createContext } from "react";

const initialState = {
    user: {
        id: "",
        isAuthValid: false,
        email: "",
        fullName: "",
    },
    tasks: [],
};

const TMContext = createContext();

export { TMContext, initialState };
