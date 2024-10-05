import React, { useEffect, useState } from 'react';
import { Select, Avatar, Icon } from '../../../components/common';

import { SectionTitle } from '../../../IssueDetails/Styles';
import { User, Username } from '../../../IssueDetails/AssigneesReporter/Styles';
import * as FirestoreService from '../../../../services/firestore';

const SpaceMembers = ({ project, spaceId }) => {

  const projectUsers = (project.members ? project.users.concat(project.members) : project.users)
  const [orgUser, setOrgUser] = useState(projectUsers);
  const [spaceMembers, setSpaceMembers] = useState((project.members ? project.members : []));

  useEffect(() => {
    FirestoreService.getOrgUsers(project.org)
      .then(getOrg => {
        if (getOrg.exists()) {
          const org = getOrg.data();
          org.users.forEach(async (user) => {
            getUserInfo(user.email)
          })
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => console.log(error));

  }, []);


  const getUserInfo = (userEmail) => {
    FirestoreService.getUserInfo(userEmail)
      .then(userInfo => {
        userInfo.forEach(async (doc) => {
          setOrgUser(prevState => ([...prevState, doc.data()]));
        });
      })
      .catch((error) => console.log(error));

  }

  const getUserById = userId => orgUser.find(user => user.id === userId);


  const allUser = orgUser.map(user => ({ value: user.id, label: user.name }));
  const owner = project.users.find(user => user.role === 'owner');
  const userOptions = spaceMembers.map(({ id }) => id);

  const updateIssue = (members, spaceId) => {
    FirestoreService.addUserToSpace(members, spaceId)
      .then(userInfo => {
        setSpaceMembers(members.members)
        //remove or add the user to userOptions
      })
      .catch((error) => console.log(error));
  };



  return (
    <>
      <SectionTitle>Owner</SectionTitle>
      <span disabled>
        <Select
          variant="empty"
          dropdownWidth={343}
          withClearValue={false}
          name="reporter"
          value={owner.id}
          options={[owner].map(user => ({ value: user.id, label: user.name }))}
          onChange={userId => updateIssue({ reporterId: userId })}
          renderValue={({ value: userId }) => renderUser(getUserById(userId), true)}
          renderOption={({ value: userId }) => renderUser(getUserById(userId))}
        /></span>
      <SectionTitle>Members</SectionTitle>
      <Select
        isMulti
        variant="empty"
        dropdownWidth={343}
        withClearValue={false}
        placeholder="Unassigned"
        name="assignees"
        value={userOptions}
        options={allUser}
        onChange={userIds => {
          updateIssue({ members: userIds.map(getUserById), spaceId });
        }}
        renderValue={({ value: userId, removeOptionValue }) =>
          renderUser(getUserById(userId), true, removeOptionValue)
        }
        renderOption={({ value: userId }) => renderUser(getUserById(userId), false)}
      />
    </>
  )
};

const renderUser = (user, isSelectValue, removeOptionValue) => {
  return (
    <User
      key={user.id}
      isSelectValue={isSelectValue}
      withBottomMargin={!!removeOptionValue}
      onClick={() => removeOptionValue && removeOptionValue()}
    >
      <Avatar avatarUrl={user.avatarUrl} name={user.name} size={24} />
      <Username>{user.name}</Username>
      {removeOptionValue && <Icon type="close" top={1} />}
    </User>
  );
}


export default SpaceMembers;