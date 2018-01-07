'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _router = require('../../router');

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var app = {
  state: {
    routers: [_router.otherRouter].concat(_toConsumableArray(_router.appRouter)),
    menuList: [],
    tagsList: [].concat(_toConsumableArray(_router.otherRouter.children)),
    pageOpenedList: [],
    currentPageName: '',
    currentPath: [{
      title: '首页',
      path: '',
      name: 'home_index'
    }], // 面包屑数组
    openedSubmenuArr: [], // 要展开的菜单数组
    menuTheme: '', // 主题
    theme: '',
    todayWeather: null,
    currentWindowWidth: null
  },
  mutations: {
    getWindowWidth: function getWindowWidth(state, width) {
      "use strict";

      state.currentWindowWidth = width;
    },
    setTagsList: function setTagsList(state, list) {
      var _state$tagsList;

      (_state$tagsList = state.tagsList).push.apply(_state$tagsList, _toConsumableArray(list));
    },
    inCreateTag: function inCreateTag(state, tagObj) {
      state.pageOpenedList.splice(1, 0, tagObj);
    },
    removeTag: function removeTag(state, name) {
      state.pageOpenedList.map(function (item, index) {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1);
        }
      });
    },
    moveToSecond: function moveToSecond(state, index) {
      var openedPage = state.pageOpenedList[index];
      state.pageOpenedList.splice(index, 1);
      state.pageOpenedList.splice(1, 0, openedPage);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    setOpenedList: function setOpenedList(state) {
      state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [_router.otherRouter.children[0]];
    },
    setCurrentPath: function setCurrentPath(state, pathArr) {
      state.currentPath = pathArr;
    },
    setCurrentPageName: function setCurrentPageName(state, name) {
      state.currentPageName = name;
    },
    addOpenSubmenu: function addOpenSubmenu(state, name) {
      var hasThisName = false;
      var isEmpty = false;
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
    clearOpenedSubmenu: function clearOpenedSubmenu(state) {
      state.openedSubmenuArr.length = 0;
    },
    changeMenuTheme: function changeMenuTheme(state, theme) {
      state.menuTheme = theme;
    },
    changeMainTheme: function changeMainTheme(state, mainTheme) {
      state.theme = mainTheme;
    },
    setMenuList: function setMenuList(state, menuList) {
      state.menuList = menuList;
    },
    updateMenuList: function updateMenuList(state) {
      var accessCode = parseInt(_jsCookie2.default.get('access'));
      var menuList = [];
      _router.appRouter.forEach(function (item, index) {
        if (item.access !== undefined) {
          if (_util2.default.showThisRoute(item.access, accessCode)) {
            if (item.children.length <= 1) {
              menuList.push(item);
            } else {
              var i = menuList.push(item);
              var childrenArr = [];
              childrenArr = item.children.filter(function (child) {
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
            var _childrenArr = [];
            var _i = menuList.push(item);
            _childrenArr = item.children.filter(function (child) {
              if (child.access !== undefined) {
                if (_util2.default.showThisRoute(child.access, accessCode)) {
                  return child;
                }
              } else {
                return child;
              }
            });
            menuList[_i - 1].children = _childrenArr;
          }
        }
      });
      state.menuList = menuList;
    },
    setAvator: function setAvator(state, path) {
      localStorage.avatorImgPath = path;
    },
    getTodayWeather: function getTodayWeather(state, weather) {
      state.todayWeather = weather;
    }
  },
  actions: {}
};
exports.default = app;
//# sourceMappingURL=app.js.map