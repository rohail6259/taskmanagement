import React from "react";
import { InputGroup, Input, Checkbox, Icon, Button } from "rsuite";

const TaskList = ({ tasks, taskData, setTaskData, handleAddTaskPanel }) => {
    const navbar = document.querySelector(".navbar-wrapper");

    const handleSearch = (value) => {
        let searchedValue = value.toLowerCase();
        let filteredData = tasks.filter((e) => {
            return e.taskName.toLowerCase().search(searchedValue) !== -1;
        });
        setTaskData(filteredData);
    };

    return (
        <div
            className="container-fluid"
            style={{ marginTop: `${navbar?.offsetHeight + 30}px` }}
        >
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
                            onClick={() => handleAddTaskPanel(true)}
                        >
                            + New Task
                        </Button>
                    </div>
                </div>
                <div className="col-12 col-md-10">
                    <div className="task-list p-4">
                        {taskData.map((task, idx) => (
                            <React.Fragment key={`task-${idx}`}>
                                <div className="task py-2 px-1 w-100 d-flex align-items-center justify-content-between">
                                    <Checkbox><span>{task.taskName}</span></Checkbox>
                                    <div className="edit-delete d-flex">
                                        <Button
                                            appearance="link"
                                            className="mr-2"
                                        >
                                            <Icon icon="edit" />
                                        </Button>
                                        <Button
                                            appearance="link"
                                            className="mr-2"
                                        >
                                            <Icon icon="trash" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="separator"></div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
