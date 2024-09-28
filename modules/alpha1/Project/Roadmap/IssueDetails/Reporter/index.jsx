import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Select, Icon } from '../../../../../../components/common';

import { SectionTitle } from '../Styles';
import { User, Username } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  projectUsers: PropTypes.array.isRequired,
};

const ProjectBoardIssueDetailsReporter = ({ issue, updateIssue, projectUsers }) => {
  const getUserById = userId => projectUsers.find(user => user.id === userId)
  

  const userOptions = projectUsers.map(user => ({ value: user.id, label: user.name }));

  return (
    <Fragment>
      <SectionTitle>Reporter</SectionTitle>
      <Select
        variant="empty"
        dropdownWidth={343}
        withClearValue={false}
        name="reporter"
        value={issue.reporterId}
        options={userOptions}
        onChange={userId => updateIssue({ reporterId: userId })}
        renderValue={({ value: userId }) => renderUser(getUserById(userId), true)}
        renderOption={({ value: userId }) => renderUser(getUserById(userId))}
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

ProjectBoardIssueDetailsReporter.propTypes = propTypes;

export default ProjectBoardIssueDetailsReporter;
