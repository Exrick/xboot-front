const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 9999,
        proxy: {
            '/xboot': {
                target: 'http://127.0.0.1:8888',  // 请求本地 需要xboot后端项目
                ws: true
            },
            '/foo': {
                target: '<other_url>'
            }
        }
    },
    // 打包时不生成.map文件 避免看到源码
    productionSourceMap: false,
    // 部署优化
    configureWebpack: {
        // 使用CDN
        // externals: {
        //     vue: 'Vue',
        //     'vue-i18n': 'VueI18n',
        //     axios: 'axios',
        //     'vue-router': 'VueRouter',
        //     vuex: 'Vuex',
        //     'view-design': 'iview',
        //     echarts: 'echarts',
        //     apexcharts: 'ApexCharts',
        //     'vue-apexcharts': 'VueApexCharts',
        //     dplayer: 'DPlayer',
        //     'print-js': 'printJS',
        //     html2canvas: 'html2canvas',
        //     'vue-lazyload': 'VueLazyload',
        //     gitalk: 'Gitalk',
        //     'js-cookie': 'Cookies',
        //     vuedraggable: 'vuedraggable',
        //     viewerjs: 'Viewer'
        // },
        // GZIP压缩
        plugins: [
            new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, // 匹配文件
                threshold: 10240 // 对超过10k文件压缩
            })
        ]
    }
}