import Vue from 'vue';
import ViewUI from 'view-design';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import { routers, otherRouter } from './router';
import store from '../store';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    Util.title(to.meta.title);
    var name = to.name;
    if (Cookies.get('locking') == '1' && name !== 'locking') {
        // 判断当前是否是锁定状态
        next({
            replace: true,
            name: 'locking'
        });
    } else if (Cookies.get('locking') == '0' && name == 'locking') {
        next(false);
    } else {
        // 白名单
        var whiteList = name != 'login' && name != 'regist' && name != 'regist-result' && name != 'authorize';
        if (!Cookies.get('userInfo') && whiteList) {
            // 判断是否已经登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (Cookies.get('userInfo') && name == 'login') {
            // 判断是否已经登录且前往的是登录页
            Util.title();
            next({
                name: 'home_index'
            });
        } else {
            Util.toDefaultPage([...routers], name, router, next);
        }
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});
