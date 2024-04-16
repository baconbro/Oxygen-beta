import React from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";

export const ViewSwitcher= ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  return (
    <div className="d-flex mb-4">
      <button className="btn btn-light me-2" onClick={() => onViewModeChange(ViewMode.Day)}>
        Day
      </button>
      <button
        className="btn btn-light me-2"
        onClick={() => onViewModeChange(ViewMode.Week)}
      >
        Week
      </button>
      <button
        className="btn btn-light me-2"
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Month
      </button>
      <button
        className="btn btn-light me-2"
        onClick={() => onViewModeChange(ViewMode.Year)}
      >
        Year
      </button>

      <div className="form-check form-switch form-check-custom form-check-solid">
        
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
            className="form-check-input"
          />
          <span className="Slider" />
          <label className="form-check-label">
          Show Task List
        </label>
        
      </div>
    </div>
  );
};