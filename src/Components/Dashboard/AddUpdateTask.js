import React, { useState, useContext } from "react";
import { Button, Input } from "rsuite";
import { TMContext } from "../../Service/context/context";

const AddUpdateTask = ({ taskType, handleAddUpdateTaskPanel }) => {
    const { dispatch } = useContext(TMContext);

    const [taskName, setTaskName] = useState(taskType.title);

    const handleAddUpdateTask = () => {
        if (taskType.type === "new")
            dispatch({ type: "ADD_TASK", payload: { taskName } });
        else if (taskType.type === "update") {
            dispatch({
                type: "UPDATE_TASK",
                payload: { id: taskType.id, taskName: taskName },
            });
        }
        handleAddUpdateTaskPanel(false);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="add-task d-flex align-items-center justify-content-center">
            <div className="panel">
                <div
                    className="overlay"
                    onClick={() => handleAddUpdateTaskPanel(false)}
                ></div>
                <div className="task-wrapper p-4">
                    <h1 className="mb-4">{`+ ${capitalizeFirstLetter(
                        taskType.type
                    )} Task`}</h1>
                    <Input
                        type="text"
                        placeholder="Task Name"
                        className="mb-3"
                        value={taskName}
                        onChange={(value) => setTaskName(value)}
                    />
                    <Button
                        appearance="primary"
                        size="lg"
                        block
                        onClick={handleAddUpdateTask}
                    >
                        {`+ ${capitalizeFirstLetter(taskType.type)} Task`}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddUpdateTask;
