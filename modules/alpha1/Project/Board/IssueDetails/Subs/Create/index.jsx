import React, { Fragment, useState } from 'react';
import toast from '../../../../../shared/utils/toast';

import BodyForm from '../BodyForm';
import { Create, UserAvatar, Right, FakeTextarea } from './Styles';

import * as FirestoreService from '../../../../../App/services/firestore';
import { useAuth } from "../../../../../../auth";
import { number } from 'prop-types';
import { SearchReturn } from '../../../../../../../partials/layout/search/SearchReturn';


const ProjectBoardIssueDetailsCommentsCreate = ({ issueId, issue, fetchIssue }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [body, setBody] = useState('');
  const {currentUser} = useAuth();

  const hierarchie = {
    task: 'task',
    bug: 'task',
    story: 'task',
    epic: 'task',
    strategy: 'theme',
    theme: 'initiative',
    initiative: 'capability',
    capability: 'epic',
  }

  const searchAction = async (childIssue) => {
    //save parent issue in the child issue
    try{
    setCreating(true);
      await FirestoreService.editSubItem(
        currentUser?.all?.currentOrg,
        { parent: issue.id},
        childIssue.id,
        issue.projectId
        )
      setFormOpen(false);
      setCreating(false);
      setBody('');
    } catch (error) {
      toast.error(error);
    }
      }

  const handleCommentCreate = async () => {
    try {
      setCreating(true);
      await FirestoreService.addSubItem(currentUser?.all?.currentOrg,{
        description: '',
        status: '1', //first one in wokflow
        projectId: issue.projectId,
        listPosition: 50, //need to be dynamic
        type: 'type1',
        title: body,
        reporterId: 0,
        userIds: [],
        priority: '',
        users: [],
        parent: issue.id,
      }, 'userId')
      setFormOpen(false);
      setCreating(false);
      setBody('');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Create>
      <div className="d-flex align-items-center mb-8">
        <div className="form-check form-check-custom form-check-solid mx-5">
          <input className="form-check-input" type="checkbox" value="" disabled />
        </div>
        <div className="flex-grow-1">

          {isFormOpen ? (
            <>
            <BodyForm
              value={body}
              onChange={setBody}
              isWorking={isCreating}
              onSubmit={handleCommentCreate}
              onCancel={() => setFormOpen(false)}
            /> Or add existing work item
            <SearchReturn orgId={currentUser?.all?.currentOrg} scope={'project'} onAction={searchAction}/>
            </>
          ) : (
            <Fragment>
              <FakeTextarea onClick={() => setFormOpen(true)}>Add a sub item...</FakeTextarea>
            </Fragment>
          )}

        </div>


      </div>



    </Create>
  );
};

export default ProjectBoardIssueDetailsCommentsCreate;
