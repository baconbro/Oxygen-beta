import React, { useEffect, useState } from 'react';
//import styled from '@xstyled/styled-components';
import styled from 'styled-components';

import { borderRadius, grid } from '../styles/constants';
import { Avatar, IssueTypeIcon, IssuePriorityIcon } from '../../../../../../components/common';
import { useWorkspace } from '../../../../../../contexts/WorkspaceProvider';
import { IssueLink, Issue, Assignees, AssigneeAvatar } from '../../List/Issue/Styles';
import { Link } from 'react-router-dom';
import { IconComponent } from '../../../../../../components/common/IssueIconComponent';

const getBackgroundColor = (isDragging, isGroupedOver, authorColors) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return '#EBECF0';
  }

  return '#FFFFFF';
};

const getBorderColor = (isDragging, authorColors) =>
  isDragging ? authorColors.hard : 'transparent';

const imageSize = 40;

const Container = styled(Link)`
  border-color: ${(props) => getBorderColor(props.isDragging, props.colors)};
  //background-color: ${(props) => getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
  box-shadow: ${({ isDragging }) => (isDragging ? `2px 2px 1px #A5ADBA` : 'none')};
  box-sizing: border-box;
  padding: 1px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;



  &:hover,
  &:active {
    color: #091e42;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;





function getStyle(provided, style) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

function Item(props) {
  const { item, isDragging, isGroupedOver, provided, style, isClone, index } = props;

  const [assig, setAssig] = useState([]);
  const { projectUsers, project } = useWorkspace()

  // Watch for changes in projectUsers and update assig accordingly
  useEffect(() => {
    const newAssig = item.userIds.map(userId => projectUsers.find(user => user.id === userId));
    setAssig(newAssig);
  }, [projectUsers, item.userIds]);

  const anonymousUser = {
    avatarUrl: "",
    email: "anonymous@oxgneap.com",
    id: 69420,
    name: "Anonymous",
    role: "member"
  }


  const assignees = Array.from(assig, v => v === undefined ? anonymousUser : v);

  /*     const getIssueTypeDetails = (typeId) => {
        return Object.values(project.config.issueType).find(issueType => issueType.id === typeId);
      };
  
      const IconComponent = ({ typeId }) => {
        const issueTypeDetails = getIssueTypeDetails(typeId);
      
        if (!issueTypeDetails) return null; // Or some default icon
      
        const { icon, color } = issueTypeDetails;
        const iconClass = `bi bi-${icon}`;
      
        return (
          <i className={iconClass} 
          style={{ 
            color: color,  
            display: 'inline-block', 
            fontSize: '18px' }}></i>
        );
      }; */

  return (
    <Container
      to={`issues/${item.id}`}
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      colors='#FFFF'//{item.author.colors}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={item.id}
      data-index={index}
    >
      <div className="card" style={{ width: '100%', boxShadow: " 0px 1px 2px 0px rgba(9, 30, 66, 0.25)" }}>
        <div className="progress h-6px " style={{ backgroundColor: 'initial' }}>
          <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" style={{ width: item.progress + '%', borderTopLeftRadius: '20px' }}></div>
        </div>
        <div className="card-body" style={{ padding: "1rem 1rem" }}>

          <div className="mb-2">
            <span className="fs-4  mb-1 text-gray-900">{item.title}</span>
          </div>
          <div className="d-flex mb-3">
            {item.tags && <i className="bi bi-tags me-2"></i>}
            {item.tags && item.tags.map(tag => (
              <div className="badge badge-light me-2" key={Object.values(tag)}>{Object.values(tag).toString()}</div>
            ))}

          </div>
          <div className="d-flex mb-3">
            {item.dueDate && <div className="badge badge-light me-2"> <i className="bi bi-calendar-event me-2"></i> {item.dueDate.split('T')[0]}</div>}
          </div>
          <div className="d-flex mb-3">
            {item.tsize && <div className="badge badge-light me-2"><i className="bi bi-rulers me-2"></i>{item.tsize}</div>}
            {item.storypoint && <div className="badge badge-light me-2"><i className="bi bi-ticket-fill me-2"></i>{item.storypoint}</div>}
          </div>
          {/*                 <div className="d-flex mb-3">
                  For counting the number of subtasks and the number of completed subtasks
                  <div className="badge badge-light me-2" key={Object.values(issue.subtasks)}>{Object.values(issue.subtasks).length}</div>
                  <div className="badge badge-light me-2" key={Object.values(issue.subtasks)}>{Object.values(issue.subtasks).filter(subtask => subtask.isCompleted === true).length}</div>
                </div> */}

          {/* <div className="fs-6 fw-bold text-gray-600 mb-5"></div> content for image per exemple */}

          <div className="d-flex flex-stack flex-wrapr">
            <Assignees>
              {assignees.map(user => (

                <AssigneeAvatar
                  key={user.id}
                  size={25}
                  avatarUrl={user.avatarUrl}
                  name={user.name}
                />

              ))}
            </Assignees>

            <div className="d-flex my-1">
              <span className='text-gray-600 fw-bold me-2'>#{item.id}</span>
              <IconComponent typeId={item.type} projectConfig={project.config} />
              <IssuePriorityIcon priority={item.priority} top={-1} left={4} />
            </div>

          </div>

        </div>

      </div>
      {/*  {isClone ? <CloneBadge>Clone</CloneBadge> : null} */}
    </Container>
  );
}

export default React.memo(Item);
