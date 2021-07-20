const Logout = (history) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    history.push("/login");
};

export default Logout;
