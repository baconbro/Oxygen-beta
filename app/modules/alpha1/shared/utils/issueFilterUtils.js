import { intersection } from 'lodash';
import moment from 'moment';

export const filterIssues = (projectIssues, filters, currentUserId) => {
  const { searchTerm, userIds, myOnly, recent, viewType, viewStatus } = filters;
  let issues = projectIssues;

  if (searchTerm) {
    issues = issues.filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (userIds.length > 0) {
    issues = issues.filter(issue => intersection(issue.userIds, userIds).length > 0);
  }
  if (myOnly && currentUserId) {
    issues = issues.filter(issue => issue.userIds.includes(currentUserId));
  }
  if (recent) {
    issues = issues.filter(issue => moment(issue.updatedAt).isAfter(moment().subtract(3, 'days')));
  }
  if (viewType.length > 0) {
    issues = issues.filter(issue => viewType.includes(issue.type));
  }
  if (viewStatus.length > 0) {
    issues = issues.filter(issue => viewStatus.includes(issue.status));
  }
  return issues;
};
