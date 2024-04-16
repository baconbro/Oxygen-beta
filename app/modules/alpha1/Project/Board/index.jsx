import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

import useMergeState from '../../shared/hooks/mergeState';
import Filters from './Filters';
import IssueDetails from './IssueDetails';
import { Modal } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import * as FirestoreService from '../../App/services/firestore';
import { useWorkspace } from '../../App/contexts/WorkspaceProvider';
import Dnd from './Lists/dnd';
import { useAuth } from '../../../auth';

const propTypes = {
  project: PropTypes.object.isRequired,
  //fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
};

const defaultFilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  recent: false,
  groupBy: 'None',
  viewType: [],
  viewStatus: [],
};

const ProjectBoard = ({ project, fetchProject, updateLocalProjectIssues, refreshData }) => {

  //const [projectUsers,setProjectUser] = useState([])
  const { projectUsers, setProjectUsers } = useWorkspace()

  const history = useNavigate();
  var id = useParams()

  //get the url params
  const match = useLocation();

  const updateAvatars = () => {
    projectUsers.forEach(async (user) => {
      const userInfo = await FirestoreService.getUserInfo(user.email, user.id);
      userInfo.forEach(async (doc) => {
        const userInfo = doc.data();
        user.name = userInfo.name;
        user.avatarUrl = userInfo.avatarUrl;
      });
    });
  }

  //if id.id is different from project.id then refresh the data
  useEffect(() => {
    //refreshData()
    updateAvatars()
    const projectUsers = (project.members ? project.users.concat(project.members) : project.users)
    setProjectUsers(projectUsers)


  }, [id.id]);


  const [filters, mergeFilters] = useMergeState(defaultFilters);

  const [showCreateAppModal, setShowCreateAppModal] = useState(true)
  const closeModal = () => {
    setShowCreateAppModal(false)
    history(-1)
  }

  //update the user to add the workspace id to his lastWorkspace 
  const {currentUser} = useAuth()
  const who = {email:currentUser?.email }
  FirestoreService.editUser(who,{lastWorkspace: project.spaceId })



  return (
    <Fragment>
      <div className="d-flex align-items-center py-2 py-md-1">
        <Filters
          projectUsers={projectUsers}
          defaultFilters={defaultFilters}
          filters={filters}
          mergeFilters={mergeFilters}
        />

      </div>



      <div className='card kanban flex-row flex-column-fluid' >
        <div>
          {/* <Lists
            project={project}
            filters={filters}
            updateLocalProjectIssues={updateLocalProjectIssues}
          /> */}
          <Dnd
            project={project}
            filters={filters}
            updateLocalProjectIssues={updateLocalProjectIssues}
            projectUsers={projectUsers} />
          <Routes>
            <Route
              path="issues/:issueId"
              element={
                <Modal
                  id='modal_issueDetail'
                  tabIndex={-1}
                  aria-hidden='true'
                  dialogClassName='modal-dialog modal-dialog-centered mw-900px'
                  show={showCreateAppModal}
                  onHide={() => closeModal()}
                  animation={false}
                //width={1040}
                //onClose={() => history(-1)}
                >
                  <IssueDetails
                    issueId={id.issueId}
                    projectUsers={projectUsers}
                    //fetchProject={fetchProject}
                    updateLocalProjectIssues={updateLocalProjectIssues}
                    modalClose={() => setShowCreateAppModal(false)}
                    issueProps={project.issues}
                  />
                </Modal>

              }
            />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
