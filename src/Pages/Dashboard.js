import React, { useState, useEffect, useContext } from "react";
import { TMContext } from "../Service/context/context";
import NoTask from "../Components/Dashboard/NoTask";
import AddTask from "../Components/Dashboard/AddTask";
import TaskList from "../Components/Dashboard/TaskList";

const Dashboard = () => {
    const { contextData } = useContext(TMContext);
    const { tasks } = contextData;

    const [taskData, setTaskData] = useState([]);
    const [isAddTaskShowing, serIsAddTaskShowing] = useState(false);

    useEffect(() => {
        let isDataAvailable = false;

        if (tasks) fetchData();

        function fetchData() {
            if (isDataAvailable) return;

            setTimeout(() => {
                if (tasks.length > 0) {
                    isDataAvailable = true;
                    setTaskData(tasks);
                } else fetchData();
            }, 500);
        }
    }, [tasks]);

    const handleAddTaskPanel = (value) => serIsAddTaskShowing(value);

    return (
        <section className="dashboard">
            {/* IF NOT TASK AVAILABLE  */}
            {taskData.length <= 0 && (
                <NoTask handleAddTaskPanel={handleAddTaskPanel} />
            )}

            {/* TASK LIST */}
            <TaskList
                tasks={tasks}
                taskData={taskData}
                setTaskData={setTaskData}
                handleAddTaskPanel={handleAddTaskPanel}
            />

            {/* ADD TASK MODAL */}
            {isAddTaskShowing && (
                <AddTask handleAddTaskPanel={handleAddTaskPanel} />
            )}
        </section>
    );
};

export default Dashboard;
