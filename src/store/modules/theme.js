const theme = {
    state: {
        theme: {
            mainTheme: "", // primary light darkmode
            menuTheme: "darkblue", // 侧边菜单主题 darkblue light dark black
            navTheme: "light", // 导航栏主题 light darkblue primary black
            menuWidth: 220, // 侧边菜单宽度
            navType: "1", // 导航菜单展示方式 1菜单模式 2单个下拉菜单 3图标
            navShowType: "app", // 下拉菜单展示方式 app图标 list列表（navType 1、3）
            showNavMenuIcon: true, // 是否显示图标（navType 1）
            fixNav: false, // 是否固定顶部导航
            showFold: true, // 显示折叠菜单图标
            showLogo: true, // 是否显示Logo
            showTags: true, // 是否显示多标签
            showSearch: true, // 是否显示搜索菜单
            showFooter: true, // 是否显示页脚
            weakMode: false, // 色弱模式
        }
    },
    mutations: {
        setTheme(state, v) {
            if (v && v != "undefined") {
                state.theme = JSON.parse(v);
                localStorage.theme = JSON.stringify(state.theme);
            }
        },
        setMainTheme(state, v) {
            state.theme.mainTheme = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setMenuTheme(state, v) {
            state.theme.menuTheme = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setNavTheme(state, v) {
            state.theme.navTheme = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setMenuWidth(state, v) {
            state.theme.menuWidth = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setNavType(state, v) {
            state.theme.navType = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setNavShowType(state, v) {
            state.theme.navShowType = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setShowNavMenuIcon(state, v) {
            state.theme.showNavMenuIcon = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setFixNav(state, v) {
            state.theme.fixNav = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setShowFold(state, v) {
            state.theme.showFold = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setShowLogo(state, v) {
            state.theme.showLogo = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setShowTags(state, v) {
            state.theme.showTags = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setShowSearch(state, v) {
            state.theme.showSearch = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setShowFooter(state, v) {
            state.theme.showFooter = v;
            localStorage.theme = JSON.stringify(state.theme);
        },
        setWeakMode(state, v) {
            state.theme.weakMode = v;
            localStorage.theme = JSON.stringify(state.theme);
        }
    }
};

export default theme;
