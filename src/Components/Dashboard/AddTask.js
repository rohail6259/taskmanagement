import React, { useState, useContext } from "react";
import { Button, Input } from "rsuite";
import { TMContext } from "../../Service/context/context";

const AddTask = ({ handleAddTaskPanel }) => {
    const { dispatch } = useContext(TMContext);
    const [taskName, setTaskName] = useState("");

    const handleAddTask = () => {
        dispatch({ type: "ADD_TASK", payload: { taskName } });
        handleAddTaskPanel(false);
    };

    return (
        <div className="add-task d-flex align-items-center justify-content-center">
            <div className="panel">
                <div className="overlay" onClick={() => handleAddTaskPanel(false)}></div>
                <div className="task-wrapper p-4">
                    <h1 className="mb-4">+ New Task</h1>
                    <Input
                        type="text"
                        placeholder="Task Name"
                        className="mb-3"
                        onChange={(value) => setTaskName(value)}
                    />
                    <Button
                        appearance="primary"
                        size="lg"
                        block
                        onClick={handleAddTask}
                    >
                        + New Task
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
