import React from 'react';

import toast from '../shared/utils/toast';
import { Button, ConfirmModal } from '../shared/components';


import * as FirestoreService from '../../App/services/firestore';
import history from 'browserHistory';

const ProjectDelete = ({ project }) => {
  const handleIssueDelete = async () => {
    try {
      await FirestoreService.deleteSpace(project.spaceId);

      history.push('/dashboard/');  
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title="Are you sure you want to delete this space and all content associated?"
      message="Once you delete, it's gone for good."
      confirmText="Delete space"
      onConfirm={handleIssueDelete}
      className="card card-flush border-0 h-md-100"
      renderLink={modal => (
        <button onClick={modal.open} className='btn btn-danger' > Delete space <i className='bi bi-trash'></i> </button>
      )}
    />
  );
};

export default ProjectDelete;
