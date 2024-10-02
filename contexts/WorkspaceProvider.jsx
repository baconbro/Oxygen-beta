import React, { useState, useContext } from 'react';
import useMergeState from '../hooks/mergeState';
const WorkspaceContext = React.createContext();

export function useWorkspace() {
    return useContext(WorkspaceContext)
  }

export function WorkspaceProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [projectUsers, setProjectUsers] = useState([]);
  const [orgUsers, setOrgUsers] = useState([]);
  const [project, setProject] = useState();
  const [currentGoal, setCurrentGoal] = useState([]);
  const [highLevelWorkItems, setHighLevelWorkItems] = useState();

  const addCard = card => {
    setCards([...cards, card]);
  };

  const defaultFilters = {
    searchTerm: '',
    userIds: [],
    myOnly: false,
    recent: false,
    groupBy: 'None',
    viewType: [],
    viewStatus: [],
    hideOld:30,
  };

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  const assignCard = (cardId, userId) => {
    const updatedCards = cards.map(card => {
      if (card.id === cardId) {
        return {
          ...card,
          assignedTo: userId,
        };
      }
      return card;
    });
    setCards(updatedCards);
  };
  const updateProjectContext = project => {
    setProject(project);
  };

  const contextValue = {
    cards,
    projectUsers,
    orgUsers,
    project,
    currentGoal,
    highLevelWorkItems,
    defaultFilters,
    filters,
    mergeFilters,
    setHighLevelWorkItems,
    setCurrentGoal,
    updateProjectContext,
    setOrgUsers,
    addCard,
    assignCard,
    setProjectUsers,
  };

  return (
    <WorkspaceContext.Provider value={contextValue}>
      {children}
    </WorkspaceContext.Provider>
  );
}
