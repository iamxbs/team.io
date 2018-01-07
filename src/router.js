import Main from './views/Main.vue';

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => {
    require(['./views/Login.vue'], resolve);
  }
};

export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {
      path: 'home', title: '首页', name: 'home_index', component: resolve => {
      require(['./views/home/home.vue'], resolve);
    }
    },
    {
      path: 'ownSpace', title: '个人中心', name: 'ownspace_index', component: resolve => {
      require(['./views/own-space/own-space.vue'], resolve);
    }
    },
    {
      path: 'message', title: '消息中心', name: 'message_index', component: resolve => {
      require(['./views/message/message.vue'], resolve);
    }
    },
    {
      path: 'demandDetail', title: '需求详细', name: 'demandDetail_index', component: resolve => {
      require(['./views/demandDetail/demandDetail.vue'], resolve);
    }
    },
    {
      path: 'personalTask',
      title: '个人任务',
      name: 'plan_personalTask',
      component: resolve => {
        require(['./views/operations/personalTask.vue'], resolve);
      }
    }
  ]
};

export const appRouter = [
  // 新添加
  // {
  //   path: '/plan',
  //   icon: 'social-buffer',
  //   title: '计划管理',
  //   name: 'plan',
  //   access: [1],
  //   component: Main,
  //   children: [
  //     {
  //       path: 'planInput',
  //       title: '计划录入',
  //       icon: 'compose',
  //       name: 'plan_planInput',
  //       component: resolve => {
  //         require(['./views/operations/planInput.vue'], resolve);
  //       }
  //     },
  //     {
  //       path: 'workRecords',
  //       title: '工时统计',
  //       icon: 'android-upload',
  //       name: 'plan_workRecords',
  //       component: resolve => {
  //         require(['./views/operations/workRecords.vue'], resolve);
  //       }
  //     }
  //   ]
  // },
  {
    path: '/planInput',
    title: '计划录入',
    access: [0, 1],
    icon: 'compose',
    name: 'plan_planInput',
    component: Main,
    children: [
      {
        path: 'Input',
        icon: 'compose',
        name: 'planInput',
        title: '计划录入',
        component: resolve => {
          require(['./views/operations/planInput.vue'], resolve);
        }
      }
    ]
  },
  {
    path: '/workRecords',
    title: '工时统计',
    access: [0, 2],
    icon: 'android-upload',
    name: 'plan_workRecords',
    component: Main,
    children: [
      {
        path: 'Records',
        icon: 'android-upload',
        name: 'workRecords',
        title: '工时统计',
        component: resolve => {
          require(['./views/operations/workRecords.vue'], resolve);
        }
      }
    ]
  },
  {
    path: '/demand',
    icon: 'ios-list',
    title: '需求查看',
    name: 'demand',
    access: [0, 1, 2],
    component: Main,
    children: [
      {
        path: 'personal',
        title: '个人需求查看',
        icon: 'person',
        name: 'demand_person',
        component: resolve => {
          require(['./views/demands/personalDemand/person.vue'], resolve);
        }
      },
      {
        path: 'quarter',
        title: '季度需求查看',
        icon: 'stats-bars',
        name: 'demand_quarter',
        component: resolve => {
          require(['./views/demands/quarterDemand/quarter.vue'], resolve);
        }
      },
      {
        path: 'progress',
        title: '需求进度查看',
        icon: 'stats-bars',
        name: 'demand_progress',
        component: resolve => {
          require(['./views/demands/demandProgress/progress.vue'], resolve);
        }
      }
    ]
  },
  {
    path: '/configs',
    icon: 'xbox',
    title: '配置管理',
    access: [0],
    name: 'configs',
    component: Main,
    children: [
      {
        path: 'jurisdiction',
        title: '权限设定',
        icon: 'android-unlock',
        name: 'configs_jurisdiction',
        component: resolve => {
          require(['./views/configs/jurisdiction.vue'], resolve);
        }
      },
      {
        path: 'basic',
        title: '基本配置',
        icon: 'social-windows',
        name: 'configs_basic',
        component: resolve => {
          require(['./views/configs/basic.vue'], resolve);
        }
      },
      {
        path: 'map',
        title: '百度地图',
        icon: 'social-windows',
        name: 'baiduMap',
        component: resolve => {
          require(['./otherComponents/map.vue'], resolve);
        }
      }
    ]
  }
];

export const routers = [
  loginRouter,
  otherRouter,
  ...appRouter
];
