// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview';
import iviewArea from 'iview-area';
import App from './App'
import { router } from './router/index'
import { appRouter } from './router/router';
import store from './store';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/brands/qq';
import 'vue-awesome/icons/brands/weixin';
import 'vue-awesome/icons/brands/weibo';
import { getRequest, postRequest, deleteRequest, uploadFileRequest } from './utils/api';

Vue.config.productionTip = false
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(iviewArea);
Vue.component('icon', Icon);
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
    },
    created() {
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
})
