import { initialState } from "../context/context";
import {
    signup,
    login,
    getUserInfo,
    getTask,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus
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
            getUserInfo(user);
            return { ...contextData, user };

        case "GET_TASKS":
            getTask(tasks);
            return { ...contextData, tasks };

        case "ADD_TASK":
            addTask(tasks, payload.taskName);
            return { ...contextData, tasks };

        case "UPDATE_TASK":
            updateTask(tasks, payload.id, payload.taskName);
            return { ...contextData, tasks };

        case "UPDATE_TASK_STATUS":
            updateTaskStatus(tasks, payload.id, payload.status);
            return { ...contextData, tasks };

        case "DELETE_TASK":
            deleteTask(tasks, payload.id);
            return { ...contextData };

        default:
            return contextData;
    }
};
