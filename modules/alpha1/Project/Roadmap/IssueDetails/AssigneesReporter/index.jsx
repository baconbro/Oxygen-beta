import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Select, Icon } from '../../../../shared/components';

import { SectionTitle } from '../Styles';
import { User, Username } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  projectUsers: PropTypes.array.isRequired,
};

const ProjectBoardIssueDetailsAssigneesReporter = ({ issue, updateIssue, projectUsers }) => {
  const getUserById = userId => projectUsers.find(user => user.id === userId)
  

  const userOptions = projectUsers.map(user => ({ value: user.id, label: user.name }));

  return (
    <Fragment>
      <SectionTitle>Assignees</SectionTitle>
      <Select
        isMulti
        variant="empty"
        dropdownWidth={343}
        withClearValue={false}
        placeholder="Unassigned"
        name="assignees"
        value={issue.userIds}
        options={userOptions}
        onChange={userIds => {
          updateIssue({ userIds, users: userIds.map(getUserById) });
        }}
        renderValue={({ value: userId, removeOptionValue }) =>
          renderUser(getUserById(userId), true, removeOptionValue)
        }
        renderOption={({ value: userId }) => renderUser(getUserById(userId), false)}
      />
    </Fragment>
  );
};

const renderUser = (user, isSelectValue, removeOptionValue) => {
/*   user === undefined ? user = {
    avatarUrl: "",
    email: "anonymous@oxgneap.com",
    id: 69420,
    name: "Anonymous",
    role: "member"
  } : user */

  return (
    <>
      <User
        key={user.id}
        isSelectValue={isSelectValue}
        withBottomMargin={!!removeOptionValue} 
      >
        <Avatar avatarUrl={user.avatarUrl} name={user.name} size={24} />
        <Username>{user.name}</Username>
        {removeOptionValue && <Icon type="close" top={1} onClick={() => removeOptionValue && removeOptionValue()} />}
      </User>
    </>
  );
}

ProjectBoardIssueDetailsAssigneesReporter.propTypes = propTypes;

export default ProjectBoardIssueDetailsAssigneesReporter;
