import { useState, useEffect } from 'react';
import { Route, useLocation, useNavigate, useParams, Navigate, Routes } from 'react-router-dom';

import { updateArrayItemById } from '../../utils/javascript';
import { createQueryParamModalHelpers } from '../../utils/queryParamModal';
import { PageLoader } from '../../components/common';

import Board from './Board';
import ProjectSettings from './WorkspaceSettings';


import Backlog from './Backlog';
import Roadmap from './Roadmap';
import { PageTitle } from '../../layout/core';
import IssueDetailsPage from './Board/issueDetail';
import { useAuth } from '../auth';
import { useWorkspace } from '../../contexts/WorkspaceProvider';
import List from './List';

import { useGetSpace } from '../../services/workspaceServices';
import { useGetItems } from '../../services/itemServices';
import { useGetOrgUsers } from '../../services/userServices';
import { useGetUserViews } from '../../services/userViewServices';
import { getIssueField } from '../../utils/getIssueX';

const Project = () => {
  //get current user data
  const { currentUser } = useAuth();
  var id = useParams()
  const [data, setLocalData] = useState();
  const { project, updateProjectContext, setOrgUsers } = useWorkspace();
  const { data: spaceData, status, error } = useGetSpace(id.id, currentUser?.all?.currentOrg);
  const { data: items, status: itemsStatus, error: itemsError } = useGetItems(id.id, currentUser?.all?.currentOrg);
  const { data: orgusers, status: orgusersStatus, error: orgusersError } = useGetOrgUsers(currentUser?.all?.currentOrg);


  //for the breadcrumbs
  const location = useLocation();

  //set timeout to wait for data to load
  //get current time
  const time = new Date().getTime();
  const [timeout, setTimeout] = useState(time);

  // Get user views for the side menu
  const { data: userViews, isLoading } = useGetUserViews(
    currentUser?.all?.id,
    currentUser?.all?.currentOrg
  );



  useEffect(() => {
    if (data) {
      try {
        //const spaceData = await FirestoreService.getSpaceData(id.id, currentUser?.all?.currentOrg);

        const orgDataUsers = orgusers
        setOrgUsers(orgDataUsers)

        if (spaceData) {
          const a = spaceData

          if (a) {
            // For 'users'
            for (const user of a.users) {
              const userDetail = orgDataUsers.users[user.id];
              if (userDetail) {
                user.avatarUrl = userDetail.photoURL;
                user.name = userDetail.fName;
              }
            }

            // For 'members'
            if (a.members) {
              // Map over members to create an array of promises
              const memberPromises = a.members.map(async member => {
                try {
                  const memberDetail = orgDataUsers[member.id];
                  if (memberDetail) {
                    member.avatarUrl = memberDetail.photoURL;
                    member.name = memberDetail.fName;

                    return member;  // Return the modified member
                  }

                  return null;  // If no memberDetail available
                } catch (error) {
                  console.error(`Error fetching data for member ${member.id}:`, error);
                  return null;
                }
              });

              // Await all member data fetches
              const fetchedMembers = Promise.all(memberPromises);

              // Filter out null values if you want
              // const validMembers = fetchedMembers.filter(Boolean);
            }
          }
        } else {
          console.log('space-not-found');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [data]);

  useEffect(() => {
    if (itemsStatus === 'success' && items) {
      setLocalData({
        project: {
          ...spaceData,
          issues: items
        }
      });
      updateProjectContext({
        ...spaceData,
        issues: items
      });
    }
  }, [itemsStatus, items]);

  const history = useNavigate();

  // Handle loading and error states
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  if (status === 'success' && !spaceData) {
    return <div>No data found</div>;
  }


  //set the breadcrumbs
  const url = location.pathname.split('/')[3];
  const issue = location.pathname.split('/')[5];
  const url2 = location.pathname.split('/').slice(0, -2).join('/');
  const accountBreadCrumbs = [];
  //if url contain issue, add the issue id to the breadcrumbs
  if (location.pathname.includes('issues')) {
    accountBreadCrumbs.push({

      title: url,
      path: `${url2}`,
      isSeparator: false,
      isActive: true,

    })
  }

  const refreshData = () => {
    console.log('refreshData');

  }

  const issueSearchModalHelpers = createQueryParamModalHelpers('issue-search');
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');
  if (!project || id.id !== project?.spaceId) return <PageLoader />;




  const updateLocalProjectIssues = (issueId, updatedFields) => {
    setLocalData(currentData => ({
      project: {
        ...currentData.project,
        issues: updateArrayItemById(currentData.project.issues, issueId, updatedFields),
      },
    }));
    updateProjectContext(currentData => ({

      ...currentData,
      issues: updateArrayItemById(currentData.issues, issueId, updatedFields),
    }));
  };

  const updateLocalProjectConfig = (updatedFields) => {
    setLocalData(currentData => ({
      project: {
        ...currentData.project, ...updatedFields
      },
    }));
    updateProjectContext(currentData => ({

      ...currentData, ...updatedFields

    }));
  };

  // set workspaceSideMenu with userViews.data
  // Sort userViews by lastTime in descending order
  const sortedUserViews = userViews?.sort((a, b) => new Date(b.lastTime) - new Date(a.lastTime)) || [];

  const workspaceSideMenu = sortedUserViews.map((view, index) => ({
    position: index,
    title: getIssueField(project.issues, view.itemId, 'title'),
    to: `/workspace/${id.id}/issue/${view.itemId}`,
    icon: '', // Assuming view has an icon property
  })) || [];

  //set the inner navigation of the workspace
  const workspaceInnerNavigation = [
    {
      position: 0,
      title: 'Board',
      to: `/workspace/${id.id}/board`,
      icon: '/media/icons/duotune/general/gen009.svg',
    },
    {
      position: 0,
      title: 'Backlog',
      to: `/workspace/${id.id}/backlog`,
      icon: '/media/icons/duotune/abstract/abs015.svg',
    },
    {
      position: 0,
      title: 'Roadmap',
      to: `/workspace/${id.id}/roadmap`,
      icon: '/media/icons/duotune/maps/map003.svg',
    },
    {
      position: 0,
      title: 'List',
      to: `/workspace/${id.id}/List`,
      icon: '/media/icons/duotune/files/fil002.svg',
    },
    {
      position: 0,
      title: 'Settings',
      to: `/workspace/${id.id}/settings`,
      icon: '/media/icons/duotune/coding/cod001.svg',
    },

  ]



  return (
    <>
      <Routes>
        <Route
          path="/board/*"
          element={
            <Board
              project={project}
              updateLocalProjectIssues={updateLocalProjectIssues}
              refreshData={refreshData}
            />
          }
        />
        <Route
          path="/board/issues/:issueId/*"
          element={
            <IssueDetailsPage
              project={project}
              updateLocalProjectIssues={updateLocalProjectIssues}
              refreshData={refreshData}
            />
          }
        />
        <Route
          path="/backlog/issues/:issueId/*"
          element={
            <IssueDetailsPage
              project={project}
              updateLocalProjectIssues={updateLocalProjectIssues}
              refreshData={refreshData}
            />
          }
        />
        <Route
          path="/list/issues/:issueId/*"
          element={
            <IssueDetailsPage
              project={project}
              updateLocalProjectIssues={updateLocalProjectIssues}
              refreshData={refreshData}
            />
          }
        />
        <Route
          path="/roadmap/issues/:issueId/*"
          element={
            <IssueDetailsPage
              project={project}
              updateLocalProjectIssues={updateLocalProjectIssues}
              refreshData={refreshData}
            />
          }
        />

        <Route
          path="/backlog/*"
          element={
            <Backlog
              project={project}
              updateLocalProjectIssues={updateLocalProjectIssues}
              refreshData={refreshData}
            />
          }
        />
        <Route
          path="/roadmap/*"
          element={
            <Roadmap
              project={project}
              updateLocalProjectIssues={updateLocalProjectIssues}
              refreshData={refreshData}
            />
          }
        />
        <Route
          path="/list/*"
          element={
            <List
              project={project}
              updateLocalProjectIssues={updateLocalProjectIssues}
              refreshData={refreshData}
            />
          }
        />

        <Route
          path="/settings"
          element={
            <ProjectSettings
              project={project}
              spaceId={id.id}
              updateLocalProjectConfig={updateLocalProjectConfig}
            />
          }
        />
      </Routes>
      {id['*'] === "" && <Navigate to={`${location.pathname}/board`} replace />}
      <PageTitle breadcrumbs={accountBreadCrumbs} pageSideMenu={workspaceSideMenu} pageInnerNavigation={workspaceInnerNavigation}>{[project.title]}</PageTitle>

    </>

  );
};

export default Project;
