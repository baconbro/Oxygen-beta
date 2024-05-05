import React, { useEffect, useState } from 'react';
//import styled from '@xstyled/styled-components';
import styled from 'styled-components';

import { borderRadius, grid } from './constants';
import { Avatar, IssueTypeIcon, IssuePriorityIcon } from '../../../../../shared/components';
import { useWorkspace } from '../../../../../App/contexts/WorkspaceProvider';
import { IssueLink, Issue, Assignees, AssigneeAvatar } from '../../List/Issue/Styles';
import { Link } from 'react-router-dom';

const getBackgroundColor = (isDragging, isGroupedOver, authorColors) => {
    if (isDragging) {
        return authorColors.soft;
    }

    if (isGroupedOver) {
        return '#EBECF0';
    }

    return '#FFFFFF';
};

const getBorderColor = (isDragging, authorColors) =>
    isDragging ? authorColors.hard : 'transparent';

const imageSize = 40;

const CloneBadge = styled.div`
  background: #79f2c0;
  bottom: ${grid / 2}px;
  border: 2px solid #57d9a3;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);
  height: ${imageSize}px;
  width: ${imageSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled(Link)`
  border-color: ${(props) => getBorderColor(props.isDragging, props.colors)};
  //background-color: ${(props) => getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
  box-shadow: ${({ isDragging }) => (isDragging ? `2px 2px 1px #A5ADBA` : 'none')};
  box-sizing: border-box;
  padding: 1px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;



  &:hover,
  &:active {
    color: #091e42;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

/* const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`; */

const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

const Author = styled.small`
  color: ${(props) => props.colors.hard};
  flex-grow: 0;
  margin: 0;
  background-color: ${(props) => props.colors.soft};
  border-radius: ${borderRadius}px;
  font-weight: normal;
  padding: ${grid / 2}px;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

function getStyle(provided, style) {
    if (!style) {
        return provided.draggableProps.style;
    }

    return {
        ...provided.draggableProps.style,
        ...style,
    };
}

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function QuoteItem(props) {
    const { quote, isDragging, isGroupedOver, provided, style, isClone, index } = props;

    const [assig, setAssig] = useState([]);
    const { projectUsers,project } = useWorkspace()

    // Watch for changes in projectUsers and update assig accordingly
    useEffect(() => {
        const newAssig = quote.userIds.map(userId => projectUsers.find(user => user.id === userId));
        setAssig(newAssig);
    }, [projectUsers, quote.userIds]);

    const anonymousUser = {
        avatarUrl: "",
        email: "anonymous@oxgneap.com",
        id: 69420,
        name: "Anonymous",
        role: "member"
    }


    const assignees = Array.from(assig, v => v === undefined ? anonymousUser : v);

    const getIssueTypeDetails = (typeId) => {
      return Object.values(project.config.issueType).find(issueType => issueType.id === typeId);
    };

    const IconComponent = ({ typeId }) => {
      const issueTypeDetails = getIssueTypeDetails(typeId);
    
      if (!issueTypeDetails) return null; // Or some default icon
    
      const { icon, color } = issueTypeDetails;
      const iconClass = `bi bi-${icon}`;
    
      return (
        <i className={iconClass} 
        style={{ 
          color: color,  
          display: 'inline-block', 
          fontSize: '18px' }}></i>
      );
    };

    return (
        <Container
            to={`issues/${quote.id}`}
            isDragging={isDragging}
            isGroupedOver={isGroupedOver}
            isClone={isClone}
            colors='#FFFF'//{quote.author.colors}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getStyle(provided, style)}
            data-is-dragging={isDragging}
            data-testid={quote.id}
            data-index={index}
        >
            <div className="card" style={{ width: '100%', boxShadow: " 0px 1px 2px 0px rgba(9, 30, 66, 0.25)" }}>
                <div className="progress h-6px " style={{ backgroundColor: 'initial' }}>
                    <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100" style={{ width: quote.progress + '%', borderTopLeftRadius: '20px' }}></div>
                </div>
                <div className="card-body" style={{ padding: "1rem 1rem" }}>

                    <div className="mb-2">
                        <span className="fs-4  mb-1 text-gray-900">{quote.title}</span>
                    </div>
                    <div className="d-flex mb-3">
                        {quote.tags && quote.tags.map(tag => (
                            <div className="badge badge-light me-2" key={Object.values(tag)}>{Object.values(tag).toString()}</div>
                        ))}

                    </div>
                    {/*                 <div className="d-flex mb-3">
                  For counting the number of subtasks and the number of completed subtasks
                  <div className="badge badge-light me-2" key={Object.values(issue.subtasks)}>{Object.values(issue.subtasks).length}</div>
                  <div className="badge badge-light me-2" key={Object.values(issue.subtasks)}>{Object.values(issue.subtasks).filter(subtask => subtask.isCompleted === true).length}</div>
                </div> */}

                    {/* <div className="fs-6 fw-bold text-gray-600 mb-5"></div> content for image per exemple */}

                    <div className="d-flex flex-stack flex-wrapr">
                        <Assignees>
                            {assignees.map(user => (

                                <AssigneeAvatar
                                    key={user.id}
                                    size={24}
                                    avatarUrl={user.avatarUrl}
                                    name={user.name}
                                />

                            ))}
                        </Assignees>

                        <div className="d-flex my-1">
                            <span className='text-gray-600 fw-bold me-2'>#{quote.id}</span>
                            <IconComponent typeId={quote.type} />
                            <IssuePriorityIcon priority={quote.priority} top={-1} left={4} />
                        </div>

                    </div>

                </div>

            </div>
            {/*  {isClone ? <CloneBadge>Clone</CloneBadge> : null} */}
        </Container>
    );
}

export default React.memo(QuoteItem);
