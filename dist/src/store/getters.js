"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getters = {
  routers: function routers(state) {
    return state.routers;
  },
  menuList: function menuList(state) {
    return state.menuList;
  },
  tagsList: function tagsList(state) {
    return state.tagsList;
  },
  pageOpenedList: function pageOpenedList(state) {
    return state.pageOpenedList;
  },
  currentPageName: function currentPageName(state) {
    return state.currentPageName;
  },
  currentPath: function currentPath(state) {
    return state.currentPath;
  },
  openedSubmenuArr: function openedSubmenuArr(state) {
    return state.openedSubmenuArr;
  },
  menuTheme: function menuTheme(state) {
    return state.menuTheme;
  },
  theme: function theme(state) {
    return state.theme;
  },
  todayWeather: function todayWeather(state) {
    return state.todayWeather;
  },
  currentWindowWidth: function currentWindowWidth(state) {
    return state.currentWindowWidth;
  }
};
exports.default = getters;
//# sourceMappingURL=getters.js.map