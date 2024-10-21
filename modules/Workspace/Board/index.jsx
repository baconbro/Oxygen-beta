import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Filters from './Filters/filter';
import IssueDetails from '../../IssueDetails';
import { Modal } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import * as FirestoreService from '../../../services/firestore';
import { useWorkspace } from '../../../contexts/WorkspaceProvider';
import Dnd from './Lists/dnd';
import { useAuth } from '../../auth';

const propTypes = {
  //project: PropTypes.object.isRequired,
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
  hideOld:30,
};

const ProjectBoard = ({ fetchProject, updateLocalProjectIssues, refreshData }) => {

  //const [projectUsers,setProjectUser] = useState([])
  const { projectUsers, setProjectUsers,defaultFilters,filters,mergeFilters, project} = useWorkspace()

  const history = useNavigate();
  var id = useParams()

  //get the url params
  const match = useLocation();


  //if id.id is different from project.id then refresh the data
  useEffect(() => {
    const projectUsers = (project.members ? project.users.concat(project.members) : project.users)
    setProjectUsers(projectUsers)


  }, [id.id]);


  //const [filters, mergeFilters] = useMergeState(defaultFilters);

  const [showCreateAppModal, setShowCreateAppModal] = useState(true)
  const closeModal = () => {
    setShowCreateAppModal(false)
    history(-1)
  }

  //update the user to add the workspace id to his lastWorkspace 
  const { currentUser } = useAuth()
  const who = { email: currentUser?.email }
  FirestoreService.editUser(who, { lastWorkspace: project.spaceId })



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
    
    </Fragment>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
