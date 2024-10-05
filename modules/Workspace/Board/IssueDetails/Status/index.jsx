import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { IssueStatus, IssueStatusCopy } from '../../../../../constants/issues';
import { Select, Icon } from '../../../../../components/common';

import { SectionTitle } from '../Styles';
import { Status } from './Styles';
import { useWorkspace } from '../../../../../contexts/WorkspaceProvider';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsStatus = ({ issue, updateIssue,customStatus }) => {
  const { project } = useWorkspace()

  return (
  <Fragment>
    
    {
    //custom status is for goals (beta1.0)
    customStatus ?( <Select
      variant="empty"
      dropdownWidth={343}
      withClearValue={false}
      name="status"
      value={issue.status}
      options={Object.values(customStatus.IssueStatus).map(status => ({
        value: status,
        label: customStatus.IssueStatusCopy[status],
      }))}
      onChange={status => updateIssue({ status })}
      renderValue={({ value: status }) => (
        <Status isValue color={status} className={`btn btn-${customStatus.IssueStatusClass[status]}`}>
          <div>{customStatus.IssueStatusCopy[status]}</div>
          <i className='bi bi-chevron-down'></i>
        </Status>
      )}
      renderOption={({ value: status }) => (
        <Status className={`btn btn-${customStatus.IssueStatusClass[status]}`} color={status}>{customStatus.IssueStatusCopy[status]}</Status>
      )}
    /> ) : (<Select
      variant="empty"
      dropdownWidth={343}
      withClearValue={false}
      name="status"
      value={issue.status}
      options={Object.values(project.config.issueStatus).map(status => ({
        value: status.id,
        label: status.name,
      }))}
      onChange={status => updateIssue({ status })}
      renderValue={({value : status} ) => (
        <Status isValue color={status}>
        <div>{project.config.issueStatus.find(statusName => statusName.id === status).name}</div>
        <i className='bi bi-chevron-down'></i>
      </Status>

      )}
      renderOption={({ label: status }) => (
        <Status color={status}>{status}</Status>
      )}
    />)}

  </Fragment>
)};

ProjectBoardIssueDetailsStatus.propTypes = propTypes;

export default ProjectBoardIssueDetailsStatus;
