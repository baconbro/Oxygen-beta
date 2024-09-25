import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import { IssueTypeIcon, IssuePriorityIcon } from '../../../../../shared/components';

import { IssueLink, Issue, Assignees, AssigneeAvatar } from './Styles';
import { useWorkspace } from '../../../../../App/contexts/WorkspaceProvider';


const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const ProjectBoardListIssue = ({ projectUsersz, issue, index }) => {
  //const [projectUsers2,setProjectUser] = useState(projectUsers)
  const [assig, setAssig] = useState([]);
  const {projectUsers} = useWorkspace()

   // Watch for changes in projectUsers and update assig accordingly
   useEffect(() => {
    const newAssig = issue.userIds.map(userId => projectUsers.find(user => user.id === userId));
    setAssig(newAssig);
  }, [projectUsers, issue.userIds]);


  const match = useLocation();
  const anonymousUser = {avatarUrl: "",
  email: "anonymous@oxgneap.com",
  id: 69420,
  name: "Anonymous",
  role: "member"}

  //const assig = issue.userIds.map(userId => projectUsers2.find(user => user.id === userId));
  //const assignees = issue.userIds.map(userId => projectUsers.find(user => user.id === userId));
 
  const assignees = Array.from(assig, v => v === undefined ? anonymousUser : v);

  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <IssueLink
          to={`issues/${issue.id}`}
          ref={provided.innerRef}
          data-testid="list-issue"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Issue isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}>
            <div className="card" style={{boxShadow:" 0px 1px 2px 0px rgba(9, 30, 66, 0.25)"}}>
            <div className="progress h-6px " style={{backgroundColor: 'initial'}}>
                <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" style={{width: issue.progress+'%',borderTopLeftRadius: '20px'}}></div>
                </div>
              <div className="card-body" style={{padding: "1rem 1rem"}}>
              
                <div className="mb-2">
                  <span className="fs-4  mb-1 text-gray-900">{issue.title}</span>
                </div>
                <div className="d-flex mb-3">
                {issue.tags && issue.tags.map(tag => (
                <div className="badge badge-light me-2" key={Object.values(tag)}>{Object.values(tag).toString()}</div>
                ))}

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
                        size={24}
                        avatarUrl={user.avatarUrl}
                        name={user.name}
                      />
                   
                    ))}
                  </Assignees>

                  <div className="d-flex my-1">
                    <span className='text-gray-600 fw-bold me-2'>#{issue.id}</span>
                    <IssueTypeIcon type={issue.type} />
                    <IssuePriorityIcon priority={issue.priority} top={-1} left={4} />
                  </div>

                </div>

              </div>

            </div>


          </Issue>
        </IssueLink>
      )}
    </Draggable>
  );
};

ProjectBoardListIssue.propTypes = propTypes;

export default ProjectBoardListIssue;
