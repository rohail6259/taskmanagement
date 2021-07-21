import React from "react";
import { Button } from "rsuite";

const NoTask = ({ handleAddUpdateTaskPanel }) => {
    return (
        <div className="container-fluid container-lg">
            <div className="row align-items-center justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-8 min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="no-task d-flex flex-column align-items-center justify-content-center">
                        <h2 className="mb-3">You have no task.</h2>
                        <Button
                            appearance="primary"
                            size="lg"
                            onClick={() =>
                                handleAddUpdateTaskPanel(true, "new")
                            }
                        >
                            + New Task
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoTask;
