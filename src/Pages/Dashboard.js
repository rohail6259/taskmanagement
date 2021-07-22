import React, { useState, useEffect, useContext, useRef } from "react";
import { TMContext } from "../Service/context/context";
import NoTask from "../Components/Dashboard/NoTask";
import AddUpdateTask from "../Components/Dashboard/AddUpdateTask";
import TaskList from "../Components/Dashboard/TaskList";
import DashboardOverview from "../Components/Dashboard/DashboardOverview";

const Dashboard = () => {
    console.log("Dashboard");
    const { contextData, dispatch } = useContext(TMContext);
    const { tasks } = contextData;

    const [taskData, setTaskData] = useState([]);
    const [taskSearchData, setTaskSearchData] = useState([]);
    const [isAddTaskShowing, setIsAddTaskShowing] = useState(false);

    let taskTypeRef = useRef({ type: "new", id: "", title: "" });

    const navbar = document.querySelector(".navbar-wrapper");

    useEffect(() => {
        dispatch({ type: "GET_TASKS" });
    }, [dispatch]);

    useEffect(() => {
        let isDataAvailable = false;

        if (tasks) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (tasks.length > 0) {
                    isDataAvailable = true;
                    setTaskData(tasks);
                    setTaskSearchData(tasks);
                } else fetchData();
            }, 500);
        }
    }, [tasks]);

    const handleAddUpdateTaskPanel = (
        value,
        type = "new",
        id = "",
        title = ""
    ) => {
        setIsAddTaskShowing(value);
        taskTypeRef.current = { type, id, title };
    };

    return (
        <section
            className="dashboard"
            style={{ marginTop: `${navbar?.offsetHeight + 30}px` }}
        >
            {/* IF NOT TASK AVAILABLE  */}
            {taskData.length <= 0 && (
                <NoTask handleAddUpdateTaskPanel={handleAddUpdateTaskPanel} />
            )}

            {/* OVERVIEW & TASK LIST */}
            {taskData.length > 0 && (
                <React.Fragment>
                    <DashboardOverview taskData={taskData} />
                    <TaskList
                        tasks={tasks}
                        taskData={taskData}
                        setTaskData={setTaskData}
                        taskSearchData={taskSearchData}
                        setTaskSearchData={setTaskSearchData}
                        handleAddUpdateTaskPanel={handleAddUpdateTaskPanel}
                        dispatch={dispatch}
                    />
                </React.Fragment>
            )}

            {/* ADD TASK MODAL */}
            {isAddTaskShowing && (
                <AddUpdateTask
                    taskType={taskTypeRef.current}
                    handleAddUpdateTaskPanel={handleAddUpdateTaskPanel}
                />
            )}
        </section>
    );
};

export default Dashboard;
