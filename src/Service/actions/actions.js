import axios from "axios";

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
            localStorage.setItem("userId", data._id);
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

export async function getUserInfo(user, id) {
    try {
        let { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/${id}`
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
