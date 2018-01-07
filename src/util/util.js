import axios from 'axios';
import env from '../../config/dev.env';
import Cookies from 'js-cookie';

let util = {};

util.title = function (title) {
  title = title || '软件协同管理';
  window.document.title = title;
};

const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:8888'
    : env === 'production'
        ? 'https://www.url.com'
        : 'https://debug.url.com';

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
});

util.inOf = function (arr, targetArr) {
  let res = true;
  arr.map(item => {
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
  if (typeof itAccess === 'object') {
    return util.oneOf(currentAccess, itAccess);
  } else {
    return itAccess === currentAccess;
  }
};

util.getPathObjByName = function (vm, name) {
  let pathObj = vm.$store.state.app.routers.filter((item) => {
    if (item.children.length <= 1) {
      return item.name === name;
    } else {
      let i = 0;
      let childArr = item.children;
      let len = childArr.length;
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
  let title = '';
  vm.$store.state.app.routers.forEach(item => {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = item.title;
      }
    } else {
      item.children.forEach(child => {
        if (child.name === name) {
          title = child.title;
        }
      });
    }
  });
  let currentPathArr = [];
  if (name === 'home_index') {
    currentPathArr = [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ];
  } else if (name.indexOf('_index') >= 0 && name !== 'home_index') {
    currentPathArr = [
      {
        title: '首页',
        path: '/home',
        name: 'home_index'
      },
      {
        title: title,
        path: '',
        name: name
      }
    ];
  } else {
    let currentPathObj = vm.$store.state.app.routers.filter(item => {
      if (item.children.length <= 1) {
        return item.children[0].name === name;
      } else {
        let i = 0;
        let childArr = item.children;
        let len = childArr.length;
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
      currentPathArr = [
        {
          title: '首页',
          path: '',
          name: 'home_index'
        }
      ];
    } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
      currentPathArr = [
        {
          title: '首页',
          path: '/home',
          name: 'home_index'
        },
        {
          title: currentPathObj.title,
          path: '',
          name: name
        }
      ];
    } else {
      let childObj = currentPathObj.children.filter((child) => {
        return child.name === name;
      })[0];
      currentPathArr = [
        {
          title: '首页',
          path: '/home',
          name: 'home_index'
        },
        {
          title: currentPathObj.title,
          path: '',
          name: currentPathObj.name
        },
        {
          title: childObj.title,
          path: currentPathObj.path + '/' + childObj.path,
          name: name
        }
      ];
    }
  }
  vm.$store.commit('setCurrentPath', currentPathArr);

  return currentPathArr;
};

util.openPage = function (vm, name, title) {
  vm.$router.push({
    name: name
  });
  let hasOpened = false;
  vm.pageTagsList.forEach((item, index) => {
    if (item.name === name) {
      hasOpened = true;
      vm.$store.commit('moveToSecond', index);
    }
  });
  if (!hasOpened) {
    vm.$store.commit('inCreateTag', {name: name, title: title});
  }
};
String.prototype.getDate = function () {
  "use strict";
  let strArr = this.split('-');
  let date = new Date(strArr[0], strArr[1] - 1, strArr[2]);
  return date;
};
Date.prototype.getYMD = function () {
  let retDate = this.getMonth() + 1 + "-";    // 获取月份。
  retDate += this.getDate();               // 获取日。
  return retDate;                          // 返回日期。
}
util.getDays = function (day1, day2) {
  // 获取入参字符串形式日期的Date型日期
  let d1 = day1.getDate();
  let d2 = day2.getDate();

  // 定义一天的毫秒数
  let dayMilliSeconds = 1000 * 60 * 60 * 24;

  // 获取输入日期的毫秒数
  let d1Ms = d1.getTime();
  let d2Ms = d2.getTime();

  // 定义返回值
  let ret;

  // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
  // 每次循环结束，给d1Ms 增加一天
  for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {

    // 如果ret为空，则无需添加","作为分隔符
    if (!ret) {
      // 将给的毫秒数转换为Date日期
      let day = new Date(d1Ms);

      // 获取其年月日形式的字符串
      ret = day.getYMD();
    } else {

      // 否则，给ret的每个字符日期间添加","作为分隔符
      let day = new Date(d1Ms);
      ret = ret + ',' + day.getYMD();
    }
  }
  let array = ret.split(",");
  return array;
};

export default util;
