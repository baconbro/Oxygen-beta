import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Droppable,Draggable } from 'react-beautiful-dnd';
import { intersection } from 'lodash';

import { IssueStatusCopy } from '../../../../../constants/issues';

import Issue from './Issue';
import { List, Title, IssuesCount, Issues } from './Styles';
import AddItem from './AddItem';

import ProjectBoardIssueDetailsTitle from '../../../../IssueDetails/Title';

import { editSpace } from '../../../../../services/firestore';
import styled from 'styled-components';

const propTypes = {
  status: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  currentUserId: PropTypes.number,
};


const defaultProps = {
  currentUserId: null,
};

const Container = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: ${({ isDragging }) =>
    isDragging ? '#FFF' : '#FFF'};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: '#FFF';
  }
`;
const Wrapper = styled.div`
  background-color: #FFF
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: 5px;
  border: 5px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const ProjectBoardList = ({ status, project, filters, currentUserId, dragHandleProps }) => {
  const filteredIssues = filterIssues(project.issues, filters, currentUserId);
  const filteredListIssues = getSortedListIssues(filteredIssues, status);
  const allListIssues = getSortedListIssues(project.issues, status);
  const projectUsers = (project.members ? project.users.concat(project.members) : project.users)
  const [issueStatus, setIssueStatus] = useState(project.config.issueStatus)
  const [isFormOpen, setFormOpen] = useState(false);

  const lastIssue = (allListIssues) => {
    const listPositions = allListIssues.map(({ listPosition }) => listPosition);

    if (listPositions.length > 0) {
      return Math.max(...listPositions) + 1;
    }
    return 1;
  };
  const firstIssue = (allListIssues) => {
    const listPositions = allListIssues.map(({ listPosition }) => listPosition);

    if (listPositions.length > 0) {
      return Math.min(...listPositions) - 1;
    }
    return 1;
  };

  function getIssueStatusNameById(id) {
    const status = issueStatus.find((status) => status.id === id);
    return status ? status.name : 'Not found'; // Return the name if found, otherwise return 'Not found'.
  }

  const updateConfig = (newStatus) => {
    // Clone the current config object
    const newConfig = { ...project.config };

    // Find the index of the status you want to update
    const statusIndex = newConfig.issueStatus.findIndex(status => status.id === newStatus.id);

    // If the status was found, update its name
    if (statusIndex !== -1) {
      newConfig.issueStatus[statusIndex].name = newStatus.name;
    }

    // Update the document in Firestore
    editSpace({ config: newConfig }, project.spaceId, project.org);
  };

  return (
    <Draggable key={status} draggableId={status}>
      {(provided,snapshot) => (
        <Container key={status} ref={provided.innerRef} {...provided.draggableProps}>
          <Header isDragging={snapshot.isDragging}>
          <Title {...dragHandleProps} isDragging={snapshot.isDragging}>
            {isFormOpen ? (
              <ProjectBoardIssueDetailsTitle
                issue={{ title: getIssueStatusNameById(status) }}
                updateIssue={(updatedIssue) => {
                  updateConfig({ id: status, name: updatedIssue.title });
                }}
                InStyle={{ fontSize: 14 }} />
            ) :
              (

                <span onClick={() => setFormOpen(true)}>{getIssueStatusNameById(status)}</span>
              )}

            <IssuesCount>{formatIssuesCount(allListIssues, filteredListIssues)}</IssuesCount>
          </Title>
          </Header>
          <AddItem status={status} currentUserId={currentUserId} spaceId={project.spaceId} lastIssue={firstIssue(allListIssues)} />
          List here
          <Droppable
      droppableId={status}
    >
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={true}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          <div ref={dropProvided.innerRef}>
            {filteredListIssues.map((issue, index) => (
              <Issue key={issue.id} projectUsers={projectUsers} issue={issue} index={index} />
            ))}
            {provided.placeholder}
            </div>
            </Wrapper>
      )}
          </Droppable>
          {allListIssues.length > 3 &&
            <AddItem status={status} currentUserId={currentUserId} spaceId={project.spaceId} lastIssue={lastIssue(allListIssues)} />
          }
        </Container>
      )}
    </Draggable>
  );
};

 const filterIssues = (projectIssues, filters, currentUserId) => {
  let issues = projectIssues;
  return issues;
}; 

const getSortedListIssues = (issues, status) =>
  issues.filter(issue => issue.status === status).sort((a, b) => a.listPosition - b.listPosition);

const formatIssuesCount = (allListIssues, filteredListIssues) => {
  if (allListIssues.length !== filteredListIssues.length) {
    return `${filteredListIssues.length} of ${allListIssues.length}`;
  }
  return allListIssues.length;
};

ProjectBoardList.propTypes = propTypes;
ProjectBoardList.defaultProps = defaultProps;

export default ProjectBoardList;
