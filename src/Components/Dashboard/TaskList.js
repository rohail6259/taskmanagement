import React from "react";
import { InputGroup, Input, Checkbox, Icon, Button } from "rsuite";

const TaskList = ({
    tasks,
    taskData,
    setTaskData,
    taskSearchData,
    setTaskSearchData,
    handleAddUpdateTaskPanel,
    dispatch,
}) => {
    const handleSearch = (value) => {
        let searchedValue = value.toLowerCase();
        let filteredData = tasks.filter((e) => {
            return e.taskName.toLowerCase().search(searchedValue) !== -1;
        });
        setTaskSearchData(filteredData);
    };

    const handleDelete = (id) => {
        const _tasks = [...taskData];
        const filteredTask = _tasks.filter((task) => task._id !== id);
        setTaskData(filteredTask);
        setTaskSearchData(filteredTask);

        dispatch({ type: "DELETE_TASK", payload: { id } });
    };

    const handleCompletedTask = (checked, id) => {
        dispatch({
            type: "UPDATE_TASK_STATUS",
            payload: { id, status: checked },
        });
    };

    return (
        <div className="container-fluid mb-5">
            <div className="row align-items-center justify-content-center">
                <div className="col-12 col-md-10 d-block d-md-flex">
                    <div className="col-12 col-md-5 col-lg-6 text-center text-md-left mb-2 pl-0 pr-2">
                        <h1>Tasks</h1>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3 mb-2 px-2">
                        <InputGroup inside>
                            <InputGroup.Button>
                                <Icon icon="search" />
                            </InputGroup.Button>
                            <Input
                                placeholder="Search by task name"
                                type="search"
                                onChange={(value) => handleSearch(value)}
                            />
                        </InputGroup>
                    </div>
                    <div className="col-12 col-md-3 col-lg-3 px-2">
                        <Button
                            appearance="primary"
                            block
                            onClick={() =>
                                handleAddUpdateTaskPanel(true, "new")
                            }
                        >
                            + New Task
                        </Button>
                    </div>
                </div>
                <div className="col-12 col-md-10">
                    <div className="panels task-list p-4">
                        {taskSearchData.length <= 0 && (
                            <h2 className="text-center">No match found!</h2>
                        )}
                        {/* TASKS LIST */}
                        {taskData.length > 0 &&
                            taskSearchData.map((task, idx) => (
                                <React.Fragment key={`task-${idx}`}>
                                    <div className="task py-2 px-1 w-100 d-flex align-items-center justify-content-between">
                                        <Checkbox
                                            checked={task.status}
                                            onChange={(value, checked) =>
                                                handleCompletedTask(
                                                    checked,
                                                    task._id
                                                )
                                            }
                                        >
                                            <span
                                                className={
                                                    task.status
                                                        ? "completed"
                                                        : ""
                                                }
                                            >
                                                {task.taskName}
                                            </span>
                                        </Checkbox>
                                        <div className="edit-delete d-flex">
                                            <Button
                                                appearance="link"
                                                className="mr-2"
                                                onClick={() =>
                                                    handleAddUpdateTaskPanel(
                                                        true,
                                                        "update",
                                                        task._id,
                                                        task.taskName
                                                    )
                                                }
                                            >
                                                <Icon icon="edit" />
                                            </Button>
                                            <Button
                                                appearance="link"
                                                className="mr-2"
                                                onClick={() =>
                                                    handleDelete(task._id)
                                                }
                                            >
                                                <Icon icon="trash" />
                                            </Button>
                                        </div>
                                    </div>
                                    {taskData.length - 1 === idx ? (
                                        ""
                                    ) : (
                                        <div className="separator"></div>
                                    )}
                                </React.Fragment>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
