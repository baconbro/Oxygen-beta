import React from 'react';
import PropTypes from 'prop-types';

import { formatDateTimeConversational,formatDate } from '../../../../shared/utils/dateTime';

import { Dates } from './Styles';
import { SectionTitle } from '../Styles';
import DatePicker from '../../../../shared/components/DatePicker';

const propTypes = {
  issue: PropTypes.object.isRequired,
};

const ProjectBoardIssueDetailsDates = ({ issue, updateIssue }) => (
  <>
  <SectionTitle>Dates</SectionTitle>
    <div className='text-muted fw-bold mb-3'>Created at {formatDateTimeConversational(issue.createdAt)}</div>
    <div className='text-muted fw-bold mb-3'>Updated at {formatDateTimeConversational(issue.updatedAt)}</div>
    <div className='text-muted fw-bold mb-3'>Due date 
    <DatePicker
    onChange={dueDate => updateIssue({ dueDate })}
    value={issue.dueDate}
    />
    </div>
    
  </>
);

ProjectBoardIssueDetailsDates.propTypes = propTypes;

export default ProjectBoardIssueDetailsDates;
