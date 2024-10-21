
export interface KanbanBoardTask {
  id: string;
  status: {
    label: string;
    icon: string;
    color: string;
  };
  title: string;
  desctiption?: string;
  priority: 'High' | 'Low' | 'Medium';
  coverImage?: string;
  completedTasks?: number[];
  attachments?: number;
  date?: Date | string;
  members?: any[];
  listPosition?: number;
  progress?: number;
  tags?: string[];
  dueDate?: Date | string;
  storypoint?: number;
  tsize?: string;
  type?: number;

}

export interface KanbanBoard {
  id: number;
  title: string;
  category: string;
  coverImage?: string;
  totalTasks: number;
  comments: number;
  deadlines: number;
  users: any[];
}

export interface KanbanBoardItem {
  id: string;
  title: string;
  borderColor: string;
  isCollapsed?: boolean;
  tasks: KanbanBoardTask[];
}



export const kanbanItems: KanbanBoardItem[] = [
  {
    id: '1',
    title: 'Unassigned',
    borderColor: '#e5780b',
    isCollapsed: true,
    tasks: [
      {
        id: '1',
        status: {
          label: 'feature',
          icon: 'faCheckDouble',
          color: 'primary'
        },
        title: 'Develop a new feature for the Phoenix mobile app',
        priority: 'High'
      },
      {
        id: '2',
        status: {
          label: 'Bug',
          icon: 'faShoppingBag',
          color: 'danger'
        },
        title:
          'Conduct user research to gather feedback on the latest product iteration',
        priority: 'Medium'
      },
      {
        id: '3',
        status: {
          label: 'Issue',
          icon: 'faTriangleExclamation',
          color: 'warning'
        },
        title:
          'Review and approve marketing materials for the upcoming product launch',
        priority: 'Low'
      }
    ]
  },
  {
    id: '2',
    title: 'To do',
    borderColor: '#cbd0dd',
    tasks: [
      {
        id: '4',
        status: {
          label: 'Bug',
          icon: 'faShoppingBag',
          color: 'danger'
        },
        title:
          'Test and debug code for the e-commerce website checkout process',
        coverImage: 'kanban1',
        attachments: 15,
        members: [],
        priority: 'Medium'
      },
      {
        id: '5',
        status: {
          label: 'Issue',
          icon: 'faTriangleExclamation',
          color: 'warning'
        },
        title: 'Write a blog post on industry trends and best practices',
        date: 'Jan 25',
        members: [],
        priority: 'High'
      }
    ]
  },
  {
    id: '3',
    title: 'Doing',
    borderColor: '#3874ff',
    tasks: [
      {
        id: '6',
        status: {
          label: 'Bug',
          icon: 'faShoppingBag',
          color: 'danger'
        },
        title: 'Create wireframes for a new Phoenix landing page design',
        date: 'Jan 25',
        members: [],
        priority: 'Medium'
      },
      {
        id: '7',
        status: {
          label: 'Undefined',
          icon: 'faSpinner',
          color: 'secondary'
        },
        title:
          'Set up and configure a new software tool for the marketing team',
        completedTasks: [34, 5],
        members: [],
        priority: 'Low'
      },
      {
        id: '8',
        status: {
          label: 'Feature',
          icon: 'faCheckDouble',
          color: 'primary'
        },
        title: 'Draft and send a press release to announce a new partnership',
        date: 'Feb 28',
        attachments: 15,
        priority: 'Medium'
      },
      {
        id: '9',
        status: {
          label: 'Issue',
          icon: 'faTriangleExclamation',
          color: 'warning'
        },
        title: 'Conduct a security audit of the Phoenix web applications',
        date: 'Mar 2',
        attachments: 15,
        coverImage: 'glass',
        priority: 'High'
      }
    ]
  },
  {
    id: '4',
    title: 'Review',
    borderColor: '#0097eb',
    tasks: [
      {
        id: '10',
        status: {
          label: 'Issue',
          icon: 'faTriangleExclamation',
          color: 'warning'
        },
        title: 'Design and develop a new logo for the Phoenix',
        attachments: 15,
        members: [],
        priority: 'Medium'
      },
      {
        id: '11',
        status: {
          label: 'Issue',
          icon: 'faTriangleExclamation',
          color: 'warning'
        },
        title:
          'Create a fresh visual identity for Phoenix with a new logo design',
        completedTasks: [20, 18],
        members: [],
        priority: 'Low'
      },
      {
        id: '12',
        status: {
          label: 'Undefined',
          icon: 'faSpinner',
          color: 'secondary'
        },
        title:
          'Identify the best software vendors for a company-wide system through comprehensive research and evaluation',
        attachments: 15,
        priority: 'High'
      },
      {
        id: '13',
        status: {
          label: 'Feature',
          icon: 'faCheckDouble',
          color: 'primary'
        },
        title: 'Write and edit copy for a new email marketing campaign',
        attachments: 15,
        coverImage: 'wall',
        priority: 'Medium'
      }
    ]
  },
  {
    id: '5',
    title: 'Release',
    borderColor: '#25b003',
    tasks: [
      {
        id: '14',
        status: {
          label: 'Feature',
          icon: 'faCheckDouble',
          color: 'primary'
        },
        title: 'Improve Phoenix website usability through user testing',
        attachments: 15,
        members: [],
        priority: 'High'
      },
      {
        id: '15',
        status: {
          label: 'Bug',
          icon: 'faShoppingBag',
          color: 'danger'
        },
        title: 'Develop and deliver a training program for new employees',
        attachments: 15,
        coverImage: 'home',
        members: [],
        priority: 'Low'
      },
      {
        id: '16',
        status: {
          label: 'Undefined',
          icon: 'faSpinner',
          color: 'secondary'
        },
        title:
          'Organize and lead a brainstorming session to generate new product ideas',
        attachments: 15,
        members: [],
        priority: 'Medium'
      }
    ]
  }
];




export const kanbanActivities = [
  {
    id: '1',
    task: '<span class="fw-bold"> Alfen Loebe </span> Moved the task <a href="#!">"the standard chunk" </a>from <span class="fw-bold">Doing</span> to <span class="fw-bold">To Do</span>',
    time: '10:41 AM',
    date: 'Aughst 7,2022',
    icon: 'faRandom',
    iconColor: 'warning'
  },
  {
    id: '2',
    task: '<span class="fw-bold"> Jessie Samson </span> Attached image3.png to the task <a href="#!">"the standard chunk" </a>',
    time: '10:41 AM',
    date: 'Aughst 7,2022',
    icon: 'faPaperclip',
    iconColor: 'info'
  },
  {
    id: '3',
    task: '<span class="fw-bold"> Alfen Loebe </span> Moved the task <a href="#!">"the standard chunk" </a>from <span class="fw-bold">Doing</span> to <span class="fw-bold">To Do</span>',
    time: '10:41 AM',
    date: 'Aughst 7,2022',
    icon: 'faPlus',
    iconColor: 'info'
  },
  {
    id: '4',
    task: '<span class="fw-bold"> Alfen Loebe </span> Moved the task <a href="#!">"the standard chunk" </a>from <span class="fw-bold">Doing</span> to <span class="fw-bold">To Do</span>',
    time: '10:41 AM',
    date: 'Aughst 7,2022',
    icon: 'faRandom',
    iconColor: 'primary'
  }
];


