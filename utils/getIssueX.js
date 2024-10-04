export function getIssueField(issues, issueId, field) {
    // Convert issueId to a number for comparison
    const numericIssueId = Number(issueId);

    const issue = issues.find(issue => issue.id === numericIssueId);
    if (issue) {
        return issue[field];
    }
    return null;
}
