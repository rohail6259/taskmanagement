const Logout = (history) => {
    localStorage.removeItem("token");
    history.push("/login");
};

export default Logout;
