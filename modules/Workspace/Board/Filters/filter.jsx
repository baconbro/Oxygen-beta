import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { xor } from 'lodash';
import {
  Filters,
  SearchInput,
  Avatars,
  AvatarIsActiveBorder,
  StyledAvatar,
  StyledButton,
  ClearAll,
} from './Styles';
import { Modal } from 'react-bootstrap'
import ProjectMembers from '../../WorkspaceSettings/Members';
import { useWorkspace } from '../../../../contexts/WorkspaceProvider';
import findAvailableParameters from '../../../../utils/issueVariables';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  defaultFilters: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  mergeFilters: PropTypes.func.isRequired,
};

const ProjectBoardFilters = ({ projectUsers, defaultFilters, filters, mergeFilters }) => {
  const [projectMembers, setprojectMembers] = useState([]);
  const { searchTerm, userIds, myOnly, recent, groupBy, viewType, viewStatus, hideOld } = filters;
  const [showMembersModal, setShowMembersModal] = useState(false)
  const { project } = useWorkspace();

  const areFiltersCleared = !searchTerm && userIds.length === 0 && !myOnly && !recent;
  useEffect(() => {


    //if projectMembers is not equal to projectUsers then set projectUsers to projectMembers
    if (projectMembers != projectUsers) {
      //setprojectMembers(projectUsers);
    }
    //wait here for 5 seconds
    setTimeout(() => {
      setprojectMembers(projectUsers);
    }
      , 500);


  }, [projectUsers]);

  const addMember = async (id) => { }
  const closeModal = () => {
    setShowMembersModal(false)
  }

  const handleTypeChange = type => {
    const typeIn = type.split(':')[0];
    mergeFilters({ viewType: xor(viewType, [typeIn]) })
  }
  const handleStatusChange = status => {
    const statusIn = status.split(':')[0];
    mergeFilters({ viewStatus: xor(viewStatus, [statusIn]) })
  }
  //reset filters
  const clearFilters = () => {
    mergeFilters(defaultFilters);
  };

  //For grouping
  //-----------------find variables for grouping

  const [availableParameters, setAvailableParameters] = useState({});

  const calculateAvailableParams = async () => { // Use async if fetching issues asynchronously
    const params = await findAvailableParameters(project.issues);
    setAvailableParameters(params);
  };
  useEffect(() => {
    // Only calculate if empty
    if (Object.keys(availableParameters).length === 0) calculateAvailableParams();
  }, []); // Run once on component mount

  // Global validation
  if (!project || Object.keys(project).length === 0) {
    return null;
  }

  return (
    <div className="d-flex flex-wrap flex-stack pb-7">
      <Filters data-testid="board-filters">
        <SearchInput
          value={searchTerm}
          onChange={value => mergeFilters({ searchTerm: value })}
          placeholder='Search'
          className="form-control"
        />
        <Avatars>
          {projectMembers && projectMembers.map(user => (
            <AvatarIsActiveBorder key={user.id} isActive={userIds.includes(user.id)}>
              <StyledAvatar
                avatarUrl={user.avatarUrl}
                name={user.name}
                size={35}
                className='avatar-circle'
                onClick={() => mergeFilters({ userIds: xor(userIds, [user.id]) })}
              />
            </AvatarIsActiveBorder>
          ))}
        </Avatars>
        {projectMembers.length === 0 && <span className='spinner-border spinner-border-sm align-middle ms-2'></span>}

        <a href="#" className="avatar avatar-35px avatar-circle" onClick={() => setShowMembersModal(true)} >
          <span className="avatar-label bg-secondary text-gray-300 fs-8 fw-bold"><i className="bi bi-person-plus-fill"></i> </span>
        </a>
        <Modal
          id='modal_issueDetail'
          tabIndex={-1}
          aria-hidden='true'
          dialogClassName='modal-dialog modal-dialog-centered mw-900px'
          show={showMembersModal}
          onHide={() => closeModal()}
          animation={false}
        //width={1040}
        //onClose={() => history(-1)}
        >
          <div className='modal-header'>
            <h2>Add user to workspace</h2>

            <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={() => closeModal()}>
              <i className='bi bi-x fs-2'></i>
            </div>

          </div>

          <div className='modal-body py-lg-10 px-lg-10'>
            <ProjectMembers project={project} spaceId={project?.spaceId} />


          </div>
        </Modal>

        <StyledButton
          variant="empty"
          isActive={recent}
          onClick={() => mergeFilters({ recent: !recent })}
          className="btn"
        >
          Recently Updated
        </StyledButton>
        {!areFiltersCleared && (
          <ClearAll onClick={() => mergeFilters(defaultFilters)}>Clear all</ClearAll>
        )}
        {/*         <div className='d-flex align-items-center flex-grow-1 mx-7'>
          <span className='fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block'>
            Group by:
          </span>
          <select
            className='form-select form-select-sm form-select w-100px w-xxl-125px'
            data-control='select2'
            data-placeholder='Latest'
            data-hide-search='true'
            value={groupBy}
            onChange={(event) => mergeFilters({ groupBy: event.target.value })}
          >
            <option key='all' value='all'>
            </option>
            {Object.keys(availableParameters).map((parameter) => (
              <option key={parameter} value={parameter}>
                {parameter}
              </option>
            ))}
          </select>
        </div> */}
        <div className='d-flex align-items-center flex-grow-1 mx-7'>
          <div className="m-0">
            <a href="#" className="btn btn-sm btn-flex bg-body btn-color-gray-700 btn-active-color-primary fw-bold" data-xgn-menu-trigger="click" data-xgn-menu-placement="bottom-end">
              <i className="bi bi-funnel fs-6 text-muted p-0"><span className="path1"></span><span className="path2"></span></i>
            </a>
            <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-xgn-menu="true" id="xgn_menu_644f08fa4bf63" >
              <div className="px-7 py-5">
                <div className="fs-5 text-dark fw-bold">Filter Options</div>
              </div>
              <div className="separator border-gray-200"></div>
              <div className="px-7 py-5">
                <div className="mb-10">
                  <label className="form-label fw-semibold">Issues Type:</label>
                  {project.config.issueType && Object.values(project.config.issueType).map(({ id, name }) => (
                    <div className="d-flex mb-1" key={id}>
                      <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={viewType.includes(id)}
                          onChange={() => handleTypeChange(id)}
                        />
                        <span className="form-check-label">
                          {name}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mb-10">
                  <label className="form-label fw-semibold">Issues Status:</label>

                  {project.config.issueStatus && Object.values(project.config.issueStatus).map(({ id, name }) => (
                    <div className="d-flex mb-1" key={id}>
                      <label className="form-check form-check-sm form-check-custom form-check-solid me-5">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={viewStatus.includes(id)}
                          onChange={() => handleStatusChange(id)}
                        />
                        <span className="form-check-label">
                          {name}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-end">
                  <button type="reset" className="btn btn-sm btn-light btn-active-light-primary me-2" data-xgn-menu-dismiss="true" onClick={clearFilters}>Reset</button>
                  <button type="submit" className="btn btn-sm btn-primary" data-xgn-menu-dismiss="true">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <StyledButton
          variant="empty"
          isActive={hideOld === 0} // Update isActive condition
          onClick={() => mergeFilters({ hideOld: hideOld == 0 ? 30 : 0 })}
          className="btn"
        >
          Show old
        </StyledButton>
      </Filters>
    </div>
  );
};

ProjectBoardFilters.propTypes = propTypes;

export default ProjectBoardFilters;
