import Cookies from 'js-cookie';

const user = {
    state: {
        nickname: "",
        avatar: ""
    },
    mutations: {
        setUserInfo(state, v) {
            state.nickname = v.nickname;
            state.avatar = v.avatar;
            localStorage.nickname = v.nickname;
            localStorage.avatar = v.avatar;
        },
        setNickname(state, v) {
            state.nickname = v;
            localStorage.nickname = v;
        },
        setAvatar(state, v) {
            state.avatar = v;
            localStorage.avatar = v;
        },
        logout() {
            Cookies.remove('userInfo');
            // 清空打开的页面等数据 保留语言、主题等配置数据
            let lang = localStorage.lang, theme = localStorage.theme;
            localStorage.clear();
            localStorage.lang = lang;
            localStorage.theme = theme;
        }
    }
};

export default user;
