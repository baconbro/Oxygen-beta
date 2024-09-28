import React from 'react';
import PropTypes from 'prop-types';

import {
  IssueType,
  IssueStatus,
  IssuePriority,
  IssueTypeCopy,
  IssuePriorityCopy,
} from '../../../../constants/issues';
import toast from '../../../../utils/toast';
import useCurrentUser from '../../../../hooks/currentUser';
import { Form, IssueTypeIcon, Icon, Avatar, IssuePriorityIcon } from '../../../../components/common';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from './Styles';

//firebase
import * as FirestoreService from '../../App/services/firestore';

const propTypes = {
  project: PropTypes.object.isRequired,
  //fetchProject: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectIssueCreate = ({ project, fetchProject, onCreate, modalClose }) => {
  //const [{ isCreating }, createIssue] = useApi.post('/issues');
  const projectUsers = (project.members ? project.users.concat(project.members) : project.users )

  const { currentUserId } = useCurrentUser();

  return (
    <div className='card card-flush border-0 h-md-100'>
    <Form
      enableReinitialize
      initialValues={{
        type: IssueType.TASK,
        title: '',
        description: '',
        reporterId: currentUserId,
        userIds: [],
        priority: IssuePriority.MEDIUM,
      }}
      validations={{
        type: Form.is.required(),
        title: [Form.is.required(), Form.is.maxLength(200)],
        reporterId: Form.is.required(),
        priority: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await FirestoreService.addItem({
            ...values,
            status: IssueStatus.BACKLOG,
            projectId: project.spaceId,
            users: values.userIds.map(id => ({ id })),
            listPosition: 9999,
          },'userId');
          toast.success('Issue has been successfully created.');
          onCreate();
        } catch (error) {
          console.log(error)
        }
      }}
    >
      <FormElement>
        <FormHeading>Create issue</FormHeading>
        <Form.Field.Select
          name="type"
          label="Issue Type"
          tip="Start typing to get a list of possible matches."
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <Divider />
        <Form.Field.Input
          name="title"
          label="Short Summary"
          tip="Concisely summarize the issue in one or two sentences."
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Describe the issue in as much detail as you'd like."
        />
        <Form.Field.Select
          name="reporterId"
          label="Reporter"
          options={userOptions(projectUsers)}
          renderOption={renderUser(projectUsers)}
          renderValue={renderUser(projectUsers)}
        />
        <Form.Field.Select
          isMulti
          name="userIds"
          label="Assignees"
          tio="People who are responsible for dealing with this issue."
          options={userOptions(projectUsers)}
          renderOption={renderUser(projectUsers)}
          renderValue={renderUser(projectUsers)}
        />
        <Form.Field.Select
          name="priority"
          label="Priority"
          tip="Priority in relation to other issues."
          options={priorityOptions}
          renderOption={renderPriority}
          renderValue={renderPriority}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" >
            Create Issue
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
    </div>
  );
};

const typeOptions = Object.values(IssueType).map(type => ({
  value: type,
  label: IssueTypeCopy[type],
}));

const priorityOptions = Object.values(IssuePriority).map(priority => ({
  value: priority,
  label: IssuePriorityCopy[priority],
}));

const userOptions = projectUsers => projectUsers.map(user => ({ value: user.id, label: user.name }));

const renderType = ({ value: type }) => (
  <SelectItem>
    <IssueTypeIcon type={type} top={1} />
    <SelectItemLabel>{IssueTypeCopy[type]}</SelectItemLabel>
  </SelectItem>
);

const renderPriority = ({ value: priority }) => (
  <SelectItem>
    <IssuePriorityIcon priority={priority} top={1} />
    <SelectItemLabel>{IssuePriorityCopy[priority]}</SelectItemLabel>
  </SelectItem>
);

const renderUser = projectUsers => ({ value: userId, removeOptionValue }) => {
  const user = projectUsers.find(({ id }) => id === userId);

  return (
    <SelectItem
      key={user.id}
      withBottomMargin={!!removeOptionValue}
      onClick={() => removeOptionValue && removeOptionValue()}
    >
      <Avatar size={20} avatarUrl={user.avatarUrl} name={user.name} />
      <SelectItemLabel>{user.name}</SelectItemLabel>
      {removeOptionValue && <Icon type="close" top={2} />}
    </SelectItem>
  );
};

ProjectIssueCreate.propTypes = propTypes;

export default ProjectIssueCreate;
