import React from 'react';
import PropTypes from 'prop-types';

import { sortByNewest } from '../../../../shared/utils/javascript';

import Create from './Create';
import Comment from './Comment';
import { Comments, Title } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  //fetchIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsComments = ({ issue, fetchIssue }) => (
  <Comments>
    <h3 className="fw-bold mb-1">Comments</h3>
    <Create issueId={issue.id} />
    {issue.comments && sortByNewest(issue.comments, 'createdAt').map(comment => (
      <Comment key={comment.id} comment={comment}  />
    ))}
  </Comments>
);

ProjectBoardIssueDetailsComments.propTypes = propTypes;

export default ProjectBoardIssueDetailsComments;
