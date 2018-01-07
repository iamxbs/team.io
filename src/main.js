import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import {routers, appRouter} from './router';
import Vuex from 'vuex';
import Util from 'util';
import App from './app.vue';
import Cookies from 'js-cookie';
import 'iview/dist/styles/iview.css';
import store from './store/index'
import svgIcon from './otherComponents/svg.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);
Vue.component('svgIcon', svgIcon);

// 路由配置
const RouterConfig = {
    routes: routers
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
  if (!Cookies.get('user') && to.name !== 'login') {  // 判断是否已经登录且前往的页面不是登录页
    next({
      name: 'login'
    });
  } else if (Cookies.get('user') && to.name === 'login') {  // 判断是否已经登录且前往的是登录页
    next({
      name: 'home_index'
    });
  } else {
    next()
  }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
// 状态管理
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
