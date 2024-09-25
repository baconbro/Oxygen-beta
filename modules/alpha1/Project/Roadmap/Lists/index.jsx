import React, { useState,useEffect } from 'react';
import * as FirestoreService from '../../../App/services/firestore';
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { getStartEndDateForProject } from "./Tasks";
import { ViewSwitcher } from "./view-switcher";
import { useLocation } from 'react-router-dom';
import history from '../../../browserHistory';
import { intersection } from 'lodash';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import EmptyTimeline from '../../../App/emptyStates/emptyTimeline';



const ProjectBoardLists = ({ project, filters, updateLocalProjectIssues }) => {
  const currentUserId = 8908;
  const filteredIssues = filterIssues(project.issues, filters, currentUserId);
  const key = 'start';
  const keyy = 'end';
  const name = 'name';
  const progress = 'progress';
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1)
  const match = useLocation();
  const navigate = useNavigate();



  const todoListDate = filteredIssues.map(item => {
    return {
      ...item,
      ...{
        [key]: item[key] = item[key] ? new Date(item[key]) : new Date()
      },
      ...{
        [keyy]: item[keyy] = item[keyy] ? new Date(item[keyy]) : tomorrow
      },
      ...{
        [name]: item[name] = item.title
      }, ...{
        [progress]: item[progress] = item[progress] ? Number(item[progress]) : 0
      }
    }
  });
  const [view, setView] = useState(ViewMode.Day);
  const [tasks, setTasks] = useState(todoListDate);

  useEffect(() => {
    filteredIssuesUpdate();
  }, [filters]);

  const filteredIssuesUpdate = () => {
    if (Object.keys(filteredIssues).length>0){
    setTasks(filteredIssues)}
  }


  const [isChecked, setIsChecked] = useState(true);
  let columnWidth = 60;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }
  const handleTaskDelete = (task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleTaskChange = (task) => {
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
        
      }
    }
    const updatedFields = {
      start: task.start.getTime(),
      end: task.end.getTime(),
    }
    FirestoreService.editSubItem(project.org,updatedFields,task.id,project.spaceId);
    setTasks(newTasks);
    
  };

  const handleProgressChange = (task) => {
    const updatedFields = {progress: task.progress.toString()}
    FirestoreService.editSubItem(project.org,updatedFields,task.id,project.spaceId); 
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));

  };

  const handleDblClick = (task) => {
    navigate(`issues/${task.id}`)

    //history.push(`issues/${task.id}`)
  };

  const handleSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <div className="container mt-5">
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      {/* if project.issues is undefined/null or empty array, show EmptyBoard */}
      {(tasks && project.issues.length > 0) ? <><Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
      /></>:<><EmptyTimeline/></>}
      
    </div>
  )
}

const filterIssues = (projectIssues, filters, currentUserId) => {
  const { searchTerm, userIds, myOnly, recent, viewStatus, viewType } = filters;
  let issues = projectIssues;

  if (searchTerm) {
    issues = issues.filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (userIds.length > 0) {
    issues = issues.filter(issue => intersection(issue.userIds, userIds).length > 0);
  }
  if (myOnly && currentUserId) {
    issues = issues.filter(issue => issue.userIds.includes(currentUserId));
  }
  if (recent) {
    issues = issues.filter(issue => moment(issue.updatedAt).isAfter(moment().subtract(3, 'days')));
  }
  if (viewType.length > 0) {
    issues = issues.filter(issue => viewType.includes(issue.type));
  }
  if (viewStatus.length > 0) {
    issues = issues.filter(issue => viewStatus.includes(issue.status));
  }
  return issues;
};

export default ProjectBoardLists;
