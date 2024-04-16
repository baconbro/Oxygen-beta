import React from 'react';
import PropTypes from 'prop-types';

import toast from '../shared/utils/toast';
import { Button, ConfirmModal } from '../shared/components';

//firebase
import * as FirestoreService from '../App/services/firestore';
import { useAuth } from '../../auth';
import { useLocation, useNavigate } from 'react-router-dom';

const propTypes = {
  issue: PropTypes.object.isRequired,
  //fetchProject: PropTypes.func.isRequired,
  //modalClose: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsDelete = ({ issue, fetchProject, modalClose }) => {
  const {currentUser} = useAuth();
  const location = useLocation();
  const path = '/goals';
  const navigate = useNavigate();

  const handleIssueDelete = async () => {
    try {
      await FirestoreService.deleteGoal(currentUser?.all?.currentOrg,issue.id);
      //modalClose();
      navigate(path);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title="Are you sure you want to delete this ?"
      message="Once you delete, it's gone for good."
      confirmText="Delete"
      onConfirm={handleIssueDelete}
      className="card card-flush border-0 h-md-100"
      renderLink={modal => (
        <Button icon="trash" iconSize={19} variant="empty" onClick={modal.open} className=" btn btn-sm" />
      )}
    />
  );
};

ProjectBoardIssueDetailsDelete.propTypes = propTypes;

export default ProjectBoardIssueDetailsDelete;
