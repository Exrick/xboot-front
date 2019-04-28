const dict = {
    state: {
        // 经常需要读取的数据字典
        sex: [],
    },
    mutations: {
        // 设置值的改变方法
        setSex(state, list) {
            state.sex = list;
        },
    }
};

export default dict;
