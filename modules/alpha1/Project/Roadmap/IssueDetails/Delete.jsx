import React from 'react';
import PropTypes from 'prop-types';

import toast from '../../../../../utils/toast';
import { Button, ConfirmModal } from '../../../../../components/common';

//firebase
import * as FirestoreService from '../../../App/services/firestore';

const propTypes = {
  issue: PropTypes.object.isRequired,
  //fetchProject: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsDelete = ({ issue, fetchProject, modalClose }) => {
  const handleIssueDelete = async () => {
    try {
      await FirestoreService.deleteItem(issue.id);
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title="Are you sure you want to delete this issue?"
      message="Once you delete, it's gone for good."
      confirmText="Delete issue"
      onConfirm={handleIssueDelete}
      className="card card-flush border-0 h-md-100"
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} />
      )}
    />
  );
};

ProjectBoardIssueDetailsDelete.propTypes = propTypes;

export default ProjectBoardIssueDetailsDelete;
