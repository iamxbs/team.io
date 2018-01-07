'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _iview = require('iview');

var _iview2 = _interopRequireDefault(_iview);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _router = require('./router');

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _app = require('./app.vue');

var _app2 = _interopRequireDefault(_app);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

require('iview/dist/styles/iview.css');

var _index = require('./store/index');

var _index2 = _interopRequireDefault(_index);

var _svg = require('./otherComponents/svg.vue');

var _svg2 = _interopRequireDefault(_svg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vuex2.default);
_vue2.default.use(_iview2.default);
_vue2.default.component('svgIcon', _svg2.default);

// 路由配置
var RouterConfig = {
    routes: _router.routers
};

var router = new _vueRouter2.default(RouterConfig);

router.beforeEach(function (to, from, next) {
    _iview2.default.LoadingBar.start();
    _util2.default.title(to.meta.title);
    if (!_jsCookie2.default.get('user') && to.name !== 'login') {
        // 判断是否已经登录且前往的页面不是登录页
        next({
            name: 'login'
        });
    } else if (_jsCookie2.default.get('user') && to.name === 'login') {
        // 判断是否已经登录且前往的是登录页
        next({
            name: 'home_index'
        });
    } else {
        next();
    }
});

router.afterEach(function () {
    _iview2.default.LoadingBar.finish();
    window.scrollTo(0, 0);
});
// 状态管理
new _vue2.default({
    el: '#app',
    router: router,
    store: _index2.default,
    render: function render(h) {
        return h(_app2.default);
    },
    data: {
        currentPageName: ''
    },
    mounted: function mounted() {
        this.currentPageName = this.$route.name;
    },
    created: function created() {
        var tagsList = [];
        _router.appRouter.map(function (item) {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push.apply(tagsList, _toConsumableArray(item.children));
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
//# sourceMappingURL=main.js.map