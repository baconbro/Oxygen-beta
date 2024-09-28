// @flow
import React, { useState, useEffect } from "react";
//import styled from "@xstyled/styled-components";
import styled from 'styled-components';


import PropTypes from "prop-types";
import Column from "./Column";
import reorder, { reorderQuoteMap } from "../reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { moveItemWithinArray, insertItemIntoArray } from "../../../../../../../utils/javascript";
import { editSubItem, editSpace } from "../../../../../App/services/firestore";
import { filterIssues } from "../../../../../../../utils/issueFilterUtils";
import { useUpdateItem } from "../../../../../../../services/itemServices";

const Container = styled.div`
  //min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  //min-width: 100vw;
  display: inline-flex;
`;

const Board = ({
  isCombineEnabled,
  initial,
  useClone,
  containerHeight,
  withScrollableColumns,
  project,
  filters,
}) => {
  const [columns, setColumns] = useState(initial);

  const [ordered, setOrdered] = useState(Object.keys(initial));
  const [issueStatus, setIssueStatus] = useState(project.config.issueStatus)
  const initialFilteredColumns = Object.keys(initial).reduce((acc, curr) => {
    acc[curr] = [];
    return acc;
  }, {});

  const [filteredColumns, setFilteredColumns] = useState(initialFilteredColumns);
  const editItemMutation = useUpdateItem();


  useEffect(() => {
    let newFilteredColumns = {};
    for (let column in columns) {
      newFilteredColumns[column] = filterIssues(columns[column], filters);
    }
    setFilteredColumns(newFilteredColumns);
  }, [columns, filters]);

  useEffect(() => {
    setColumns(initial);
  }, [initial]);



  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];

      withQuoteRemoved.splice(result.source.index, 1);

      const orderedColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved
      };
      setColumns(orderedColumns);
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const reorderedorder = reorder(ordered, source.index, destination.index);

      setOrdered(reorderedorder);

      const reorderedIssueStatus = reorder(issueStatus, source.index, destination.index);

      setIssueStatus(reorderedIssueStatus); // Update the local state if needed

      // Update the Firestore
      const newConfig = { ...project.config, issueStatus: reorderedIssueStatus };
      editSpace({ config: newConfig }, project.spaceId, project.org);

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination
    });

    setColumns(data.quoteMap);

    // logic of firebase
    const current = [...columns[source.droppableId]];
    const target = current[source.index];
    const issueId = source.droppableId;
    const updatedFields = {
      status: findIdByName(destination.droppableId, issueStatus),
      listPosition: calculateIssueListPosition(project.issues, destination, source, issueId, issueStatus),
    }
    const mutateItem = editItemMutation({
      orgId: project.org,
      field: updatedFields,
      itemId: target.id,
      workspaceId: project.spaceId,
    }
    );
  };


  const handleAddColumn = () => {
    // Define a new column name 
    const newColumnName = `Column ${ordered.length + 1}`;

    // Find the maximum ID in issueStatus
    const maxId = Math.max(...issueStatus.map(status => parseInt(status.id, 10)));

    // Generate a new ID by adding one to the maximum ID
    const newColumnId = `${maxId + 1}`;

    // Update the ordered state to include the new column
    setOrdered(prevOrdered => [...prevOrdered, newColumnName]);

    // Update the columns state to have an empty array for the new column 
    setColumns(prevColumns => ({ ...prevColumns, [newColumnName]: [] }));

    // Update the issueStatus to include the new column's name and ID
    setIssueStatus(prevIssueStatus => [...prevIssueStatus, { id: newColumnId, name: newColumnName }]);
  };

  const handleDeleteColumn = (columnName) => {
    // Check if the column has no issues
    if (columns[columnName].length > 0) {
      alert('You cannot delete a column that has issues in it.');
      return;
    }

    // Remove the column from the columns state
    setColumns(prevColumns => {
      const newColumns = { ...prevColumns };
      delete newColumns[columnName];
      return newColumns;
    });

    // Remove the column's name from the ordered state
    setOrdered(prevOrdered => prevOrdered.filter(name => name !== columnName));

    // Remove the column's corresponding entry in the issueStatus
    setIssueStatus(prevIssueStatus => {
      const newIssueStatus = prevIssueStatus.filter(status => status.name !== columnName);

      // Update the Firestore with the new issueStatus
      const newConfig = { ...project.config, issueStatus: newIssueStatus };
      editSpace({ config: newConfig }, project.spaceId, project.org);

      return newIssueStatus;
    });

  };


  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          ignoreContainerClipping={Boolean(containerHeight)}
          isCombineEnabled={isCombineEnabled}
        >
          {(provided) => (
            <div className="card">
              <Container ref={provided.innerRef} {...provided.droppableProps} className=" card-body ">
                {ordered.map((key, index) => (
                  index !== 0 && (
                    <Column
                      key={key}
                      index={index}
                      title={key}
                      items={filteredColumns[key] ? filteredColumns[key] : []}
                      isScrollable={withScrollableColumns}
                      isCombineEnabled={isCombineEnabled}
                      useClone={useClone}
                      project={project}
                      onDelete={() => handleDeleteColumn(key)}
                      className="bg-secondary"
                    />
                  )
                ))} {provided.placeholder}
                <button className="btn btn-outline btn-outline-dashed btn-outline-secondary btn-active-light-secondary h-50px w-275px" onClick={handleAddColumn}>
                  <i className="bi bi-plus text-primary"></i> Add another list
                </button>

              </Container>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

Board.defaultProps = {
  isCombineEnabled: false
};

Board.propTypes = {
  isCombineEnabled: PropTypes.bool
};

const calculateIssueListPosition = (...args) => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(...args);
  let position;

  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.listPosition - 1;
  } else if (!nextIssue) {
    position = prevIssue.listPosition + 1;
  } else {
    position = prevIssue.listPosition + (nextIssue.listPosition - prevIssue.listPosition) / 2;
  }
  return position;
};
const getAfterDropPrevNextIssue = (allIssues, destination, source, droppedIssueId, issueStatus) => {
  const statusId = findIdByName(destination.droppableId, issueStatus)
  const beforeDropDestinationIssues = getSortedListIssues(allIssues, statusId);
  const droppedIssue = allIssues.find(issue => issue.id === droppedIssueId);
  const isSameList = destination.droppableId === source.droppableId;

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(beforeDropDestinationIssues, droppedIssue, destination.index)
    : insertItemIntoArray(beforeDropDestinationIssues, droppedIssue, destination.index);

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  };
};

const getSortedListIssues = (issues, status) =>
  issues.filter(issue => issue.status === status).sort((a, b) => a.listPosition - b.listPosition);

const findIdByName = (name, statusArray) => {
  const status = statusArray.find((status) => status.name === name);
  return status ? status.id : null; // Return the ID if found, otherwise return null
};


export default Board;
