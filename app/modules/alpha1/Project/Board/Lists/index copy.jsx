import React ,{useState} from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import useCurrentUser from '../../../shared/hooks/currentUser';
import { moveItemWithinArray, insertItemIntoArray } from '../../../shared/utils/javascript';
import { IssueStatus } from '../../../shared/constants/issues';

import List from './List';
import { Lists } from './Styles';
import EmptyBoard from '../../../App/emptyStates/emptyBoard';

//firebase
import * as FirestoreService from '../../../App/services/firestore';

import {IssueTypeIcon, IssuePriorityIcon} from '../../../shared/components';

const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
};

const ProjectBoardLists = ({ project, filters, updateLocalProjectIssues }) => {
  const { currentUserId } = useCurrentUser();
  const [issueStatus, setIssueStatus] = useState(project.config.issueStatus); 

  const handleIssueDrop = ({ draggableId, destination, source }) => {
    if (!isPositionChanged(source, destination)) return;

    const issueId = Number(draggableId);
     const updatedFields= {
        status: destination.droppableId,
        listPosition: calculateIssueListPosition(project.issues, destination, source, issueId),
      }
      FirestoreService.editSubItem(project.org,updatedFields,issueId);
      //currentFields: project.issues.find(({ id }) => id === issueId),
      updateLocalProjectIssues(issueId, updatedFields)

  };
  const getSwimlaneTitle = (issue) => {
    if (filters.groupBy === 'priority') {
    return issue['priority'];
    }
    if (filters.groupBy === 'type') {
      return issue['type'];
      }
/*     if (filters.groupBy === 'dueDate') {
      return issue['priority'];
    }
    if (filters.groupBy === 'users') {
      return issue['priority'];
    } */
    return issue['projectId'];
  };
  const swimlaneGroups = Object.values(project.issues).reduce((groups, card) => {
    const swimlaneTitle = getSwimlaneTitle(card);
    if (!groups[swimlaneTitle]) {
      groups[swimlaneTitle] = [];
    }
    groups[swimlaneTitle].push(card);
    return groups;
    
  }, {});

  const getSwimlaneGroups = (swimlaneTitle) => {
    const updatedSwimlane = { ...project, issues: swimlaneGroups[swimlaneTitle] };
    return updatedSwimlane;
  }


  return (
     <div className="swimlanes">
      {Object.keys(swimlaneGroups).sort().reverse().map((swimlaneTitle, index) => (
        <div key={index} className="my-4">
          {filters.groupBy === 'priority' && <h2><IssuePriorityIcon priority={swimlaneTitle} right={5} />{swimlaneTitle}</h2>}
          {filters.groupBy === 'type' && <h2><IssueTypeIcon type={swimlaneTitle} />{swimlaneTitle}</h2>}
          <DragDropContext onDragEnd={handleIssueDrop}>
      <Lists>
        {issueStatus.map((status) => (
          status.id != 'backlog' ?
          
          <List
            key={status.id}
            status={status.id}
            project={getSwimlaneGroups(swimlaneTitle)}
            filters={filters}
            currentUserId={currentUserId}
          />:<div key={status.id}></div>
          
        ))}
      </Lists>
    </DragDropContext>
          </div>
      ))}

      
      {/* .map((swimlaneCards, index) => ( */}
        {/* <div key={index} className="swimlane">
          <h2>{getSwimlaneTitle(swimlaneCards[0])}</h2> */}
{/* if project.issues is undefined/null or empty array, show EmptyBoard */}
{(project.issues && project.issues.length > 0) ? <></> :<>
      <DragDropContext onDragEnd={handleIssueDrop}>
        <Lists>
          {issueStatus.map((status) => (
            status.id != 'backlog' ?          
            <List
              key={status.id}
              status={status.id}
              project={project}
              filters={filters}
              currentUserId={currentUserId}
            />:<div key={status.id}></div>
          ))}
        </Lists>
      </DragDropContext> 
      <EmptyBoard/>
      </>
      }
    </div>
      
      
    // </div>
  );
};

const isPositionChanged = (destination, source) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const calculateIssueListPosition = (...args) => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(...args);
  let position;

  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.listPosition - 1;
  } else if (!nextIssue) {
    position = prevIssue.listPosition + 1;
  } else {
    position = prevIssue.listPosition + (nextIssue.listPosition - prevIssue.listPosition) / 2;
  }
  return position;
};

const getAfterDropPrevNextIssue = (allIssues, destination, source, droppedIssueId) => {
  const beforeDropDestinationIssues = getSortedListIssues(allIssues, destination.droppableId);
  const droppedIssue = allIssues.find(issue => issue.id === droppedIssueId);
  const isSameList = destination.droppableId === source.droppableId;

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(beforeDropDestinationIssues, droppedIssue, destination.index)
    : insertItemIntoArray(beforeDropDestinationIssues, droppedIssue, destination.index);

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  };
};

const getSortedListIssues = (issues, status) =>
  issues.filter(issue => issue.status === status).sort((a, b) => a.listPosition - b.listPosition);

ProjectBoardLists.propTypes = propTypes;

export default ProjectBoardLists;
