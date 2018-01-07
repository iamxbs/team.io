'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _dev = require('../../config/dev.env');

var _dev2 = _interopRequireDefault(_dev);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = {};

util.title = function (title) {
  title = title || '软件协同管理';
  window.document.title = title;
};

var ajaxUrl = _dev2.default === 'development' ? 'http://127.0.0.1:8888' : _dev2.default === 'production' ? 'https://www.url.com' : 'https://debug.url.com';

util.ajax = _axios2.default.create({
  baseURL: ajaxUrl,
  timeout: 30000
});

util.inOf = function (arr, targetArr) {
  var res = true;
  arr.map(function (item) {
    if (targetArr.indexOf(item) < 0) {
      res = false;
    }
  });
  return res;
};

util.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};

util.showThisRoute = function (itAccess, currentAccess) {
  if ((typeof itAccess === 'undefined' ? 'undefined' : _typeof(itAccess)) === 'object') {
    return util.oneOf(currentAccess, itAccess);
  } else {
    return itAccess === currentAccess;
  }
};

util.getPathObjByName = function (vm, name) {
  var pathObj = vm.$store.state.app.routers.filter(function (item) {
    if (item.children.length <= 1) {
      return item.name === name;
    } else {
      var i = 0;
      var childArr = item.children;
      var len = childArr.length;
      while (i < len) {
        if (childArr[i].name === name) {
          return true;
        }
        i++;
      }
      return false;
    }
  })[0];
  return pathObj;
};

util.setCurrentPath = function (vm, name) {
  var title = '';
  vm.$store.state.app.routers.forEach(function (item) {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = item.title;
      }
    } else {
      item.children.forEach(function (child) {
        if (child.name === name) {
          title = child.title;
        }
      });
    }
  });
  var currentPathArr = [];
  if (name === 'home_index') {
    currentPathArr = [{
      title: '首页',
      path: '',
      name: 'home_index'
    }];
  } else if (name.indexOf('_index') >= 0 && name !== 'home_index') {
    currentPathArr = [{
      title: '首页',
      path: '/home',
      name: 'home_index'
    }, {
      title: title,
      path: '',
      name: name
    }];
  } else {
    var currentPathObj = vm.$store.state.app.routers.filter(function (item) {
      if (item.children.length <= 1) {
        return item.children[0].name === name;
      } else {
        var i = 0;
        var childArr = item.children;
        var len = childArr.length;
        while (i < len) {
          if (childArr[i].name === name) {
            return true;
          }
          i++;
        }
        return false;
      }
    })[0];
    if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
      currentPathArr = [{
        title: '首页',
        path: '',
        name: 'home_index'
      }];
    } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
      currentPathArr = [{
        title: '首页',
        path: '/home',
        name: 'home_index'
      }, {
        title: currentPathObj.title,
        path: '',
        name: name
      }];
    } else {
      var childObj = currentPathObj.children.filter(function (child) {
        return child.name === name;
      })[0];
      currentPathArr = [{
        title: '首页',
        path: '/home',
        name: 'home_index'
      }, {
        title: currentPathObj.title,
        path: '',
        name: currentPathObj.name
      }, {
        title: childObj.title,
        path: currentPathObj.path + '/' + childObj.path,
        name: name
      }];
    }
  }
  vm.$store.commit('setCurrentPath', currentPathArr);

  return currentPathArr;
};

util.openPage = function (vm, name, title) {
  vm.$router.push({
    name: name
  });
  var hasOpened = false;
  vm.pageTagsList.forEach(function (item, index) {
    if (item.name === name) {
      hasOpened = true;
      vm.$store.commit('moveToSecond', index);
    }
  });
  if (!hasOpened) {
    vm.$store.commit('inCreateTag', { name: name, title: title });
  }
};
String.prototype.getDate = function () {
  "use strict";

  var strArr = this.split('-');
  var date = new Date(strArr[0], strArr[1] - 1, strArr[2]);
  return date;
};
Date.prototype.getYMD = function () {
  var retDate = this.getMonth() + 1 + "-"; // 获取月份。
  retDate += this.getDate(); // 获取日。
  return retDate; // 返回日期。
};
util.getDays = function (day1, day2) {
  // 获取入参字符串形式日期的Date型日期
  var d1 = day1.getDate();
  var d2 = day2.getDate();

  // 定义一天的毫秒数
  var dayMilliSeconds = 1000 * 60 * 60 * 24;

  // 获取输入日期的毫秒数
  var d1Ms = d1.getTime();
  var d2Ms = d2.getTime();

  // 定义返回值
  var ret = void 0;

  // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
  // 每次循环结束，给d1Ms 增加一天
  for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {

    // 如果ret为空，则无需添加","作为分隔符
    if (!ret) {
      // 将给的毫秒数转换为Date日期
      var day = new Date(d1Ms);

      // 获取其年月日形式的字符串
      ret = day.getYMD();
    } else {

      // 否则，给ret的每个字符日期间添加","作为分隔符
      var _day = new Date(d1Ms);
      ret = ret + ',' + _day.getYMD();
    }
  }
  var array = ret.split(",");
  return array;
};

exports.default = util;
//# sourceMappingURL=util.js.map