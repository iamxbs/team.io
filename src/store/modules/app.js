import {otherRouter, appRouter} from '../../router';
import Cookies from 'js-cookie';
import Util from "util"

const app = {
  state: {
    routers: [
      otherRouter,
      ...appRouter
    ],
    menuList: [],
    tagsList: [...otherRouter.children],
    pageOpenedList: [],
    currentPageName: '',
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ],  // 面包屑数组
    openedSubmenuArr: [],  // 要展开的菜单数组
    menuTheme: '', // 主题
    theme: '',
    todayWeather: null,
    currentWindowWidth: null
  },
  mutations: {
    getWindowWidth (state, width){
      "use strict";
      state.currentWindowWidth = width
    },
    setTagsList (state, list) {
      state.tagsList.push(...list);
    },
    inCreateTag (state, tagObj) {
      state.pageOpenedList.splice(1, 0, tagObj);
    },
    removeTag (state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1);
        }
      });
    },
    moveToSecond (state, index) {
      let openedPage = state.pageOpenedList[index];
      state.pageOpenedList.splice(index, 1);
      state.pageOpenedList.splice(1, 0, openedPage);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    setOpenedList (state) {
      state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
    },
    setCurrentPath (state, pathArr) {
      state.currentPath = pathArr;
    },
    setCurrentPageName (state, name) {
      state.currentPageName = name;
    },
    addOpenSubmenu (state, name) {
      let hasThisName = false;
      let isEmpty = false;
      if (name.length === 0) {
        isEmpty = true;
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true;
      }
      if (!hasThisName && !isEmpty) {
        state.openedSubmenuArr.push(name);
      }
    },
    clearOpenedSubmenu (state) {
      state.openedSubmenuArr.length = 0;
    },
    changeMenuTheme (state, theme) {
      state.menuTheme = theme;
    },
    changeMainTheme (state, mainTheme) {
      state.theme = mainTheme;
    },
    setMenuList (state, menuList) {
      state.menuList = menuList;
    },
    updateMenuList (state) {
      let accessCode = parseInt(Cookies.get('access'));
      let menuList = [];
      appRouter.forEach((item, index) => {
        if (item.access !== undefined) {
          if (Util.showThisRoute(item.access, accessCode)) {
            if (item.children.length <= 1) {
              menuList.push(item);
            } else {
              let i = menuList.push(item);
              let childrenArr = [];
              childrenArr = item.children.filter(child => {
                if (child.access !== undefined) {
                  if (child.access === accessCode) {
                    return child;
                  }
                } else {
                  return child;
                }
              });
              menuList[i - 1].children = childrenArr;
            }
          }
        } else {
          if (item.children.length <= 1) {
            menuList.push(item);
          } else {
            let childrenArr = [];
            let i = menuList.push(item);
            childrenArr = item.children.filter(child => {
              if (child.access !== undefined) {
                if (Util.showThisRoute(child.access, accessCode)) {
                  return child;
                }
              } else {
                return child;
              }
            });
            menuList[i - 1].children = childrenArr;
          }
        }
      });
      state.menuList = menuList;
    },
    setAvator (state, path) {
      localStorage.avatorImgPath = path;
    },
    getTodayWeather(state, weather){
      state.todayWeather = weather
    }
  },
  actions: {}
};
export default app;