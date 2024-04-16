import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import useCurrentUser from '../../../shared/hooks/currentUser';
import { moveItemWithinArray, insertItemIntoArray } from '../../../shared/utils/javascript';
//import { IssueStatus } from '../../../shared/constants/issues';

import List from './List';
import { Lists } from './Styles';
import EmptyBacklog from '../../../App/emptyStates/emptyBacklog';

//firebase
import * as FirestoreService from '../../../App/services/firestore';

const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
};

const ProjectBoardLists = ({ project, filters, updateLocalProjectIssues }) => {
  const { currentUserId } = useCurrentUser();

  // Get the keys of the IssueStatus
  const statuses = Object.keys(project.config.issueStatus);
  const firstStatus = project.config.issueStatus[0]?.id;
  const secondStatus = project.config.issueStatus[1]?.id;

  const handleIssueDrop = ({ draggableId, destination, source }) => {
    if (!isPositionChanged(source, destination)) return;

    const issueId = Number(draggableId);
    const updatedFields = {
      status: destination.droppableId,
      listPosition: calculateIssueListPosition(project.issues, destination, source, issueId),
    }
    FirestoreService.editSubItem(project.org, updatedFields, issueId, project.spaceId);
    //currentFields: project.issues.find(({ id }) => id === issueId),
    updateLocalProjectIssues(issueId, updatedFields)

  };

  return (
    <>
      <DragDropContext onDragEnd={handleIssueDrop}>
        <Lists>
          <List
            key={secondStatus}
            status={secondStatus}
            project={project}
            filters={filters}
            currentUserId={currentUserId}
          />
        </Lists>
        <Lists>
          <List
            key={firstStatus}
            status={firstStatus}
            project={project}
            filters={filters}
            currentUserId={currentUserId}
          />
        </Lists>
      </DragDropContext>
      {/* if project.issues is undefined/null or empty array, show EmptyBoard */}
      {(project.issues && project.issues.length > 0) ? <></> : <><EmptyBacklog /></>

      }
    </>
  )
}

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
