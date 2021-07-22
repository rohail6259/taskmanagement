import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie } from "recharts";

const DashboardOverview = ({ taskData }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            let eachCellSize = 1000 / taskData.length;
            let data = [];
            let completedTasksLength = taskData.filter(
                (e) => e.status === true
            )?.length;
            for (let i = 0; i <= 1; i++) {
                data.push({
                    name: i === 0 ? "Pending" : "Completed",
                    value:
                        i === 0
                            ? eachCellSize *
                              (taskData.length - completedTasksLength)
                            : eachCellSize * completedTasksLength,
                });
            }
            setChartData(data);
        }, 1000);
    }, [taskData]);

    const getCompletedTasks = () => {
        return taskData.filter((e) => e.status === true)?.length || 0;
    };

    return (
        <div className="container-fluid">
            <div className="row align-items-center justify-content-center">
                <div className="col-12 col-md-10 d-md-block d-lg-flex px-0 mt-md-3 mb-md-5">
                    {/* NUMBER OF COMPLETED TASKS */}
                    <div className="col-12 col-lg-4">
                        <div className="panels info-wrapper w-100 p-4">
                            <h1 className="mb-3">Tasks Completed</h1>
                            <div className="total-completed">
                                <span className="done">
                                    {getCompletedTasks()} /
                                </span>
                                <span className="total">{taskData.length}</span>
                            </div>
                        </div>
                    </div>
                    {/* LATEST TASKS LIST */}
                    <div className="col-12 col-lg-4 my-3 my-lg-0">
                        <div className="panels info-wrapper w-100 p-4">
                            <h2 className="mb-3">Latest Created Tasks</h2>
                            <ul className="pl-3">
                                {taskData
                                    ?.slice(Math.max(taskData.length - 4, 0))
                                    ?.reverse()
                                    ?.map((task, idx) => (
                                        <React.Fragment
                                            key={`task-list-${idx}`}
                                        >
                                            <li>
                                                <span
                                                    className={
                                                        task.status
                                                            ? "completed"
                                                            : ""
                                                    }
                                                >
                                                    {task.taskName}
                                                </span>
                                            </li>
                                        </React.Fragment>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    {/* DATA VISUALIZATION */}
                    <div className="col-12 col-lg-4 mb-3 mb-lg-0">
                        <div
                            className="panels info-wrapper w-100 p-4"
                            style={{ height: "17em" }}
                        >
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        dataKey="value"
                                        data={chartData}
                                        fill="#5285EC"
                                        label
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
