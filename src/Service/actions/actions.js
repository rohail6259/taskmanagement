import axios from "axios";
import getToken from "../../Utlis/GetToken";

export async function signup(user, signUpData) {
    try {
        let { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/signup`,
            {
                fullName: signUpData.fullName,
                email: signUpData.email,
                password: signUpData.password,
            }
        );
        if (data) {
            let userInfo = {
                fullName: signUpData.fullName,
                email: signUpData.email,
                password: signUpData.password,
            };
            login(user, userInfo);
        }
    } catch (error) {
        if (error.response.status === 400) alert("User already exits!");
    }
}

export async function login(user, userInfo) {
    try {
        let { data, headers } = await axios.post(
            `${process.env.REACT_APP_API_URL}/login`,
            {
                email: userInfo.email,
                password: userInfo.password,
            }
        );
        if (data) {
            localStorage.setItem("token", headers["x-auth-token"]);
            Object.assign(user, {
                id: data._id,
                isAuthValid: data.isAuthValid,
                email: data.email,
                fullName: data.fullName,
            });
        }
    } catch (error) {
        if (error.response.status === 400)
            alert("Email or Password do not match!");
    }
}

export async function getUserInfo(user) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/user`,
            {
                headers: { "x-auth-token": getToken() },
            }
        );
        if (data) {
            Object.assign(user, {
                id: data._id,
                isAuthValid: true,
                email: data.email,
                fullName: data.fullName,
            });
        }
    } catch (error) {
        if (error.response.status === 400) alert("User not found!");
    }
}

export async function getTask(tasks) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/tasks`,
            {
                headers: { "x-auth-token": getToken() },
            }
        );
        if (data) data.forEach((e) => tasks.push(e));
    } catch (error) {
        if (error.response.status === 400) alert("Tasks not found!");
    }
}

export async function addTask(tasks, taskName) {
    try {
        let { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/tasks`,
            { taskName },
            {
                headers: { "x-auth-token": getToken() },
            }
        );
        if (data.status === 1) getTask(tasks);
    } catch (error) {
        if (error.response.status === 400) alert("Unable to add the task");
    }
}

export async function updateTask(tasks, id, taskName) {
    try {
        let { data } = await axios.put(
            `${process.env.REACT_APP_API_URL}/tasks/${id}`,
            {
                taskName,
            },
            {
                headers: { "x-auth-token": getToken() },
            }
        );
        if (data.status === 1) getTask(tasks);
    } catch (error) {
        if (error.response.status === 400) alert("Unable to update the task");
    }
}

export async function updateTaskStatus(tasks, id, status) {
    try {
        let { data } = await axios.put(
            `${process.env.REACT_APP_API_URL}/tasks/${id}`,
            {
                status,
            },
            {
                headers: { "x-auth-token": getToken() },
            }
        );
        if (data.status === 1) getTask(tasks);
    } catch (error) {
        if (error.response.status === 400)
            alert("Unable to update the task status");
    }
}

export async function deleteTask(tasks, id) {
    try {
        let { data } = await axios.delete(
            `${process.env.REACT_APP_API_URL}/tasks/${id}`,
            {
                headers: { "x-auth-token": getToken() },
            }
        );
        if (data.status === 1) getTask(tasks);
    } catch (error) {
        if (error.response.status === 400) alert("Unable to delete the task");
    }
}
