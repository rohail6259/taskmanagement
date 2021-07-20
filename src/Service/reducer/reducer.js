import { initialState } from "../context/context";
import {
    signup,
    login,
    getUserInfo,
    getTask,
    addTask,
    updateTask,
    deleteTask,
} from "../actions/actions";

export const reducer = (contextData = initialState, { type, payload }) => {
    let user = {};
    let tasks = [];

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

        case "GET_TASKS":
            getTask(tasks);
            return { ...contextData, tasks };

        case "ADD_TASK":
            addTask(tasks, payload.taskName);
            return { ...contextData, tasks };

        case "UPDATE_TASK":
            updateTask(payload.taskName);
            return { ...contextData };

        case "DELETE_TASK":
            deleteTask(tasks, payload.taskName);
            return { ...contextData, tasks };

        default:
            return contextData;
    }
};
