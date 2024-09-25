import React, { useState, useRef, useEffect } from "react";
//import styled from "@xstyled/styled-components";
import styled from 'styled-components';


import { grid, borderRadius } from "../styles/constants";
import { Draggable } from "react-beautiful-dnd";
import ItemList from "./list";
import Title from "../styles/title";
import AddItem from "../../List/AddItem";
import { useAuth } from "../../../../../../auth";
import { editSpace } from "../../../../../App/services/firestore";
import { IssuesCount } from "../../List/Styles";

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
  border-radius: 2%;
`;

const Header = styled.div`

  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? '#AAAA' : '#ffffff'};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ''#CCCC;
  }
`;

const Column = (props) => {
  const title = props.title;
  const items = props.items;
  const index = props.index;
  const project = props.project
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const inputRef = useRef(null);

  //get current user data
  const { currentUser } = useAuth();

  const firstIssue = (allListIssues) => {
    const listPositions = allListIssues.map(({ listPosition }) => listPosition);

    if (listPositions.length > 0) {
      return Math.min(...listPositions) - 1;
    }
    return 1;
  };

  const findIdByName = (name, statusArray) => {
    const status = statusArray.find((status) => status.name === name);
    return status ? status.id : null; // Return the ID if found, otherwise return null
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsEditing(false);
      // Save the changes
      // Find and update the status object with the matching ID
      const reorderedIssueStatus = project.config.issueStatus.map((status) =>
        status.id === findIdByName(title, project.config.issueStatus) ? { ...status, name: currentTitle } : status
      );

      // Update the config object with the new issueStatus array
      const newConfig = { ...project.config, issueStatus: reorderedIssueStatus };
      // Update the Firestore
      editSpace({ config: newConfig }, project.spaceId, project.org);



    }
  };


  useEffect(() => {
    // Add an event listener to detect clicks outside the input
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentTitle]);

  return (
    <Draggable draggableId={title} index={index} >
      {(provided, snapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps} className="d-flex flex-row-auto w-275px bg-light-primary">
          <Header isDragging={snapshot.isDragging}>
            <div {...provided.dragHandleProps}>
              {isEditing ? (
                <input
                  ref={inputRef}
                  value={currentTitle}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                  onBlur={() => {
                    // Handle saving the new title here
                    setIsEditing(false);
                  }}
                  autoFocus
                />
              ) : (
                <div className="d-flex flex-stack">
                  <div className="fw-bold fs-4">
                    <Title
                      isDragging={snapshot.isDragging}
                      aria-label={`${title} item list`}
                      onClick={() => setIsEditing(true)}
                    >
                      {currentTitle}
                      <IssuesCount className="fs-6 text-gray-400 ms-2">{formatIssuesCount(items)}</IssuesCount>
                    </Title>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" data-xgn-menu-trigger="click" data-xgn-menu-placement="bottom-end">
                      <i className="bi bi-three-dots"></i></button>

                    <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px py-3" data-xgn-menu="true">
                      <div className="menu-item px-3">
                        <button className="flex-stack px-3 btn btn-active-danger" onClick={props.onDelete}>
                          Delete status

                          <span className="ms-2" data-bs-toggle="tooltip" aria-label="Specify a target name for future usage and reference" data-bs-original-title="Specify a target name for future usage and reference" data-xgn-initialized="1">
                            <i className="bi bi-trash fs-6"></i>            </span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

          </Header>
          <div className="h-3px w-100 bg-primary mb-9"></div>
          <AddItem status={findIdByName(title, project.config.issueStatus)} currentUserId={currentUser.all.uid} spaceId={project.spaceId} lastIssue={firstIssue(items)} />
          <ItemList
            listId={title}
            listType="Item"
            style={{
              backgroundColor: snapshot.isDragging ? '#AAAA' : null
            }}
            items={items}
            internalScroll={props.isScrollable}
            isCombineEnabled={Boolean(props.isCombineEnabled)}
            useClone={Boolean(props.useClone)}
          />
        </Container>
      )}
    </Draggable>

  );
};

const formatIssuesCount = (allListIssues) => {


  return allListIssues.length;
};

export default Column;
