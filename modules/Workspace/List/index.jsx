import React, { Fragment, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import useMergeState from '../../../hooks/mergeState';
import { Breadcrumbs, Modal, Avatar } from '../../../components/common';
import Filters from '../Board/Filters/filter';
import { useWorkspace } from '../../../contexts/WorkspaceProvider';
import { Status } from '../../IssueDetails/Status/Styles';
import { IssueStatusCopy } from '../../../constants/issues';
import AddItem from '../Board/Lists/List/AddItem';
import EmptyList from '../../../components/common/emptyStates/emptyList';
import { Type, TypeLabel } from '../../IssueDetails/Type/Styles';
import { IssueTypeCopy, IssuePriorityCopy } from '../../../constants/issues';
import { IssueTypeIcon, IssuePriorityIcon } from '../../../components/common';
import { User, Username } from '../../IssueDetails/Reporter/Styles';
import { formatDate } from '../../../utils/dateTime';
import { Priority, Label } from '../../IssueDetails/Priority/Styles';
import { intersection } from 'lodash';
import moment from 'moment';
import { IconComponent, IconText } from '../../../components/common/IssueIconComponent';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
  ColumnDef,//for column pinning
  getSortedRowModel,
} from '@tanstack/react-table'

import { useAuth } from '../../auth';


const defaultData = [
  {
    title: 'tanner',
    owner: 'linsley',
    objectiveId: 24,
    work: 90,
    status: 'In Relationship',
    progress: ["test", "again"],
    score: 60,
    subRows: [
      {
        title: 'tanner',
        owner: 'linsley',
        objectiveId: 24,
        work: 90,
        status: 'In Relationship',
        progress: ["test", "again"],
        score: 60,
      }
    ]
  },
  {
    title: 'tandy',
    owner: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]


const defaultFilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  recent: false,
  groupBy: 'None',
  viewType: [],
  viewStatus: [],
};

const filterIssues = (projectIssues, filters, currentUserId) => {
  const { searchTerm, userIds, myOnly, recent, viewStatus, viewType } = filters;
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


const groupTasksByParent = (tasks) => {
  const topLevelTasks = [];
  const taskMap = new Map();

  // Group tasks by their parent IDs
  tasks.forEach((task) => {
    task.subRows = []; // Initialize subRows for each task

    if (!task.parent) {
      topLevelTasks.push(task);
    } else {
      if (!taskMap.has(task.parent)) {
        // If parent task is not in taskMap, create a placeholder object
        // with only the subRows property to hold the child tasks until the parent is found
        taskMap.set(task.parent, { subRows: [] });
      }
      taskMap.get(task.parent).subRows.push(task);
    }
  });

  // Recursive function to assign subRows to their parent tasks
  const assignSubRows = (task) => {
    if (taskMap.has(task.id)) {
      task.subRows = taskMap.get(task.id).subRows;
      taskMap.delete(task.id); // Remove the task from the taskMap to avoid unnecessary recursion
      task.subRows.forEach(assignSubRows); // Recursively assign subRows for the current task's children
    }
  };

  // Assign subRows to topLevelTasks
  topLevelTasks.forEach(assignSubRows);

  // If there are any remaining tasks in taskMap, they are top-level tasks without a parent
  const remainingTasks = Array.from(taskMap.values());
  topLevelTasks.push(...remainingTasks);
  return topLevelTasks;
};










const List = () => {
  const { currentUser } = useAuth();
  const match = useLocation();
  const navigate = useNavigate();
  const { project, currentGoal, setCurrentGoal, setOrgUsers, setHighLevelWorkItems, orgUsers } = useWorkspace();
  const [refreshData, setRefreshData] = React.useState(true);
  const { projectUsers, defaultFilters, filters, mergeFilters } = useWorkspace()




  const reloadGoals = () => {
    if (project) {

      if (Object.keys(filteredIssues).length > 0) {
        const groupedTasks = groupTasksByParent(filteredIssues);

        // Convert the object of grouped tasks into an array of parent tasks
        setData(Object.values(groupedTasks));
        //setData(filteredIssues)
        setRefreshData(false);
        return
      }
      // Group tasks by parent
      const groupedTasks = groupTasksByParent(project.issues);

      // Convert the object of grouped tasks into an array of parent tasks
      setData(Object.values(groupedTasks));
      //setData(project.issues);
      setRefreshData(false);
      return
    }
  };

  const handleDataRefresh = () => {
    setRefreshData(true); // Trigger data retrieval by updating the state
    reloadGoals()
  };

  useEffect(() => {
    // This useEffect will be triggered whenever the `filters` state changes
    // and it will set `refreshData` to true
    setRefreshData(true);
  }, [filters]);


  useEffect(() => {
    if (refreshData) {
      reloadGoals();
      setRefreshData(false); // Reset the state after fetching data
    }
  }, [refreshData]);

  const [data, setData] = React.useState(() => [...defaultData])
  const rerender = React.useReducer(() => ({}), {})[1]
  const [expanded, setExpanded] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [sorting, setSorting] = React.useState([])


  const filteredIssues = filterIssues(project.issues, filters, currentUser?.all?.uid);




  const KrData = [
    {
      keyResult: 'tanner',
      owner: 'linsley',
      objectiveId: 24,
      keyResultId: 1,
      status: 'In Relationship',
      score: 30,
    },
    {
      keyResult: 'tanner',
      owner: 'linsley',
      objectiveId: 24,
      keyResultId: 2,
      status: 'In Relationship',
      score: 70,
    },

  ]
  const columnHelper = createColumnHelper()

  const defaultColumns = [
    columnHelper.accessor('type', {
      cell: ({ row, getValue }) => (
        <div
          style={{
            // Since rows are flattened by default,
            // we can use the row.depth property
            // and paddingLeft to visually indicate the depth
            // of the row
            paddingLeft: `${row.depth * 4}rem`
          }}
        >


          <RenderTask type={getValue()} />

        </div>),
      header: () => <span>Type</span>
      //footer: info => info.column.id,
    }),
    columnHelper.accessor('reporterId', {
      id: 'Reporter',
      cell: info => <OwnerName reporterId={info.getValue()} />,
      header: () => <span>Owner</span>,
      //footer: info => info.column.id,
    }),
    columnHelper.accessor('title', {
      header: () => 'Title',
      cell: value => <TruncatedCellRenderer value={value.getValue()} />,
      width: 300,
      //footer: info => info.column.id,
    }),
    columnHelper.accessor('status', {
      header: () => <span>Status</span>,
      cell: info => <Status className={`btn btn-${IssueStatusCopy[info.renderValue()]}`} color={info.renderValue()}>{IssueStatusCopy[info.renderValue()]}</Status>,
      //footer: info => info.column.id,
    }),
    columnHelper.accessor('id', {
      header: 'Key',
      cell: info => info.renderValue(),
      //footer: info => info.column.id,
    }),
    columnHelper.accessor('dueDate', {
      header: 'Due date',
      cell: info => <GetFormattedInputValue value={info.renderValue()} />,
      //footer: info => info.column.id,
    }),
    columnHelper.accessor('priority', {
      header: 'Priority',
      cell: info => <RenderPriority priority={info.renderValue()} />,
      //footer: info => info.column.id,
    }),
    columnHelper.accessor('reach', {
      header: 'Reach',
      cell: info => <Dots count={info.renderValue() || 0} />,
      //footer: info => info.column.id,
    }),
    columnHelper.accessor('impact', {
      header: 'Impact',
      cell: info => <Dots count={info.renderValue() || 0} />,
      //footer: info => info.column.id,
    }),
    columnHelper.accessor('confidence', {
      header: 'Confidence',
      cell: info => <Dots count={info.renderValue() || 0} />,
      //footer: info => info.column.id,
    }),
    columnHelper.accessor('effort', {
      header: 'Effort',
      cell: info => <Dots count={info.renderValue() || 0} />,
      //footer: info => info.column.id,
    }),
    columnHelper.accessor('rice', {
      header: 'RICE',
      cell: info => info.renderValue(),
      //footer: info => info.column.id,
    }),

  ]


  const [columns] = React.useState(() => [
    ...defaultColumns,
  ])

  //get the owner name 
  const OwnerName = ({ reporterId }) => {
    const foundItem = projectUsers.find(item => item.id === reporterId);
    let name = ''
    if (foundItem) {
      name = foundItem.name;
    }

    return (
      <User
        isSelectValue={false}
        withBottomMargin={false}
      >
        <Avatar avatarUrl={''} name={name} size={24} />
        <Username>{name}</Username>
      </User>)
  }
  const returnIssue = (id) => {
    return project.issues.find((issue) => issue.id === id);
  }

  const Progress = ({ progress }) => {
    return (
      <div className='progress h-6px w-100'>
        <div
          className='progress-bar bg-primary'
          role='progressbar'
          style={{ width: '50%' }}
        ></div>
      </div>
    )


  };
  const Score = ({ score }) => {
    return (
      <div className="d-flex align-items-senter">
        <span className={`badge badge-light-${score} fs-base`}>
          {score}
        </span>
      </div>
    )
  };
  // Custom cell renderer with text-truncate class
  const TruncatedCellRenderer = ({ value }) => {
    return <div className="text-dark fw-bold text-hover-primary fs-6 min-w-300px  cursor-pointer" >{value}</div>;
  };
  const RenderTask = ({ type }) => {
    return (
      <Type >
        <IssueTypeIcon type={type} top={1} />
        <IconComponent typeId={type} projectConfig={project.config} />
        <TypeLabel>
          <IconText typeId={type} projectConfig={project.config} />
        </TypeLabel>
      </Type>
    )
  }

  const GetFormattedInputValue = ({ value }) => {
    if (!value) return '';
    return <span className="badge badge-light">{formatDate(value)}</span>
  };

  const RenderPriority = ({ priority }) => (
    <Priority isValue={true}>
      <IssuePriorityIcon priority={priority} />
      <Label>{IssuePriorityCopy[priority]}</Label>
    </Priority>
  );
  const Dot = ({ active }) => (
    <i
      className={`bi bi-circle-fill fs-5 ${active ? 'text-primary' : 'text-light'}`}
      style={{ margin: '0 2px' }}
    />
  );

  const Dots = ({ count }) => {
    const dots = new Array(10).fill(null).map((_, index) => <Dot key={index} active={index < count} />);
    return <div className="d-flex flex-column flex-row-fluid">
      <div className="d-flex flex-column-auto h-25px  flex-center">{dots}
      </div>
    </div>;
  };



  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSubRows: row => row.subRows,
    state: {
      expanded,
      columnVisibility,
      sorting,
    },
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  const handleRowClick = (row) => {
    //get the object from data that matches the id
    const goal = data.find((goal) => goal.id === row.getValue('id'));
    setCurrentGoal(goal);
    /*     const drawerToggle = document.getElementById('goals_drawer_detail_toggle');
        drawerToggle.click(); */
    navigate(`issues/${row.getValue('id')}`)

  };

  return (
    <Fragment>
      <div id="xgn_app_toolbar" className="app-toolbar  py-3 py-lg-6 ">
        <div id="xgn_app_toolbar_container" className="app-container  container-xxl d-flex flex-stack ">
          <div className="d-flex flex-column justify-content-center flex-wrap me-3 ">
          <Filters
          projectUsers={projectUsers}
          defaultFilters={defaultFilters}
          filters={filters}
          mergeFilters={mergeFilters}
        />
          </div>
          <div className="d-flex align-items-center gap-2 gap-lg-3">
          <AddItem reloadList={handleDataRefresh} />
          </div>
        </div>
      </div>


      <div className='card kanban' >
        <div className='card-body' style={{ padding: "1rem 1rem" }}>
          <div className="table-responsive">
            <table className='table table-row-dashed table-row-gray-300 gy-3'>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id} className='fw-bold fs-6 text-gray-800'>
                    <th key={'expand' + headerGroup.id} className="max-w-50px min-w-25px">

                    </th>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} //className="max-w-200px min-w-150px"> 
                      >
                        {header.isPlaceholder
                          ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: <><i className="bi bi-filter-circle-fill fs-6 me-1 ms-2 text-primary"></i><i className="bi bi-arrow-up "></i></>,
                                desc: <><i className="bi bi-filter-circle-fill fs-6 me-1 ms-2 text-primary"></i><i className="bi bi-arrow-down "></i></>,
                              }[header.column.getIsSorted()] ?? null}
                            </div>
                          )}
                      </th>


                    ))}
                    <th key={'expand'} className="max-w-50px min-w-25px">
                      <div className="m-0">
                        <a href="#" className="btn btn-sm btn-flex bg-body btn-color-gray-700 btn-active-color-primary fw-bold" data-xgn-menu-trigger="click" data-xgn-menu-placement="bottom-end">
                          <i className="bi bi-plus fs-6 text-muted me-1"></i>
                        </a>
                        <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-xgn-menu="true" id="xgn_menu_Column" >
                          <div className="px-7 py-5">
                            <div className="fs-5 text-dark fw-bold">Columns</div>
                          </div>
                          <div className="separator border-gray-200"></div>
                          <div className="px-7 py-5">
                            <div className="mb-10">
                              <label className="form-label fw-semibold">
                                <input
                                  {...{
                                    type: 'checkbox',
                                    checked: table.getIsAllColumnsVisible(),
                                    onChange: table.getToggleAllColumnsVisibilityHandler(),
                                  }}
                                />{' '}
                                Toggle All
                              </label>
                              {table.getAllLeafColumns().map(column => {
                                return (
                                  <div key={column.id} className="px-1">
                                    <label>
                                      <input
                                        {...{
                                          type: 'checkbox',
                                          checked: column.getIsVisible(),
                                          onChange: column.getToggleVisibilityHandler(),
                                        }}
                                      />{' '}
                                      {column.id}
                                    </label>
                                  </div>
                                )
                              })}
                            </div>
                            <div className="d-flex justify-content-end">

                              <button type="submit" className="btn btn-sm btn-primary" data-xgn-menu-dismiss="true">Close</button>
                            </div>

                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} >
                    {/* Add a custom column with the expanding button */}
                    <td>
                      {row.getCanExpand() ? (
                        <button className='btn btn-icon btn-light btn-active-light-primary toggle h-25px w-25px me-1 '
                          {...{
                            onClick: row.getToggleExpandedHandler(),
                            style: {},
                          }}
                        >
                          {row.getIsExpanded() ? <span className="bi bi-dash fs-3 m-0"></span> : <span className="bi bi-plus fs-3 m-0 "></span>}
                        </button>
                      ) : (
                        ''
                      )}{''}
                    </td>
                    {/* Render the other data columns */}
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} onClick={() => {
                        if (cell.id === row.id + '_title') {
                          handleRowClick(row)
                        } else {
                          // do something else
                        }
                      }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map(header => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>
            <div className="h-4" />
            {/*             <button onClick={() => rerender()} className="border p-2">
                Rerender
              </button> */}
          </div>
        </div>
      </div>

      {(!data || data.length === 0) ?
        <EmptyList /> : ('')
      }

    </Fragment>
  );
};

export default List;