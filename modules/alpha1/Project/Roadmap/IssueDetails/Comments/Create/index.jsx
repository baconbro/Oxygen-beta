import React, { Fragment, useState } from 'react';
import toast from '../../../../../../../utils/toast';

import BodyForm from '../BodyForm';
import ProTip from './ProTip';
import { Create, UserAvatar, Right, FakeTextarea } from './Styles';

import * as FirestoreService from '../../../../../App/services/firestore';
import { useAuth } from "../../../../../App/contexts/AuthContext"


const ProjectBoardIssueDetailsCommentsCreate = ({ issueId, fetchIssue }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [body, setBody] = useState('');

  const {currentUser} = useAuth();

  const handleCommentCreate = async () => {
    try {
      setCreating(true);
      await FirestoreService.addComment(body,issueId,currentUser); 
      setFormOpen(false);
      setCreating(false);
      setBody('');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Create>
      {currentUser && <UserAvatar name={currentUser.displayName} avatarUrl={currentUser.photoURL} />}
      <Right>
        {isFormOpen ? (
          <BodyForm
            value={body}
            onChange={setBody}
            isWorking={isCreating}
            onSubmit={handleCommentCreate}
            onCancel={() => setFormOpen(false)}
          />
        ) : (
          <Fragment>
            <FakeTextarea onClick={() => setFormOpen(true)}>Add a comment...</FakeTextarea>
            <ProTip setFormOpen={setFormOpen} />
          </Fragment>
        )}
      </Right>
    </Create>
  );
};

export default ProjectBoardIssueDetailsCommentsCreate;
