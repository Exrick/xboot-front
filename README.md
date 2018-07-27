# x-boot-front

> 作者目前大四 且为后台开发 能力经验有限 如有错误欢迎指正 期待您的捐赠支持！

### [宣传视频](https://www.bilibili.com/video/av23121122/)
- 作者亲自制作 [点我观看](https://www.bilibili.com/video/av23121122/)
### 在线Demo 
http://xboot.exrick.cn
### 后台项目地址：[X-Boot](https://github.com/Exrick/x-boot)
### 项目简介
- 项目基于 Vue-Cli 创建
- 后台加载动态权限菜单 权限控制至按钮
- 多语言切换
- iView使用图标库 [ionicons](http://ionicons.com/) 额外图标库 [vue-awesome](https://github.com/Justineo/vue-awesome)

![](https://i.loli.net/2018/07/24/5b56dfead395b.png)

![](https://i.loli.net/2018/07/24/5b56e00daab72.png)

![](https://i.loli.net/2018/07/24/5b56e06a81777.png)

![](https://i.loli.net/2018/07/24/5b56e08a4fb76.png)

![](https://i.loli.net/2018/07/24/5b56e0ac944a8.png)

![](https://i.loli.net/2018/07/24/5b56e0ce6eb53.png)

### 主要所用技术
- [Vue 2.5.x](https://cn.vuejs.org/)
- [iView](https://www.iviewui.com/)
- [iview-admin](https://github.com/iview/iview-admin)
- [iview-area](https://github.com/iview/iview-area)：城市级联组件
- [Vuex](https://vuex.vuejs.org/zh-cn/)
- Vue Router
- ES6
- webpack
- axios
- echarts
- cookie
- 第三方插件
    - [hotjar](https://github.com/Exrick/xmall/blob/master/study/hotjar.md)：一体化分析和反馈

### 本地开发构建运行

- 启动后端 [x-boot](https://github.com/Exrick/x-boot) 项目后，在 `config/index.js` 中修改你的后端接口地址代理配置
- 在项目根文件夹下先后执行命令 `npm install` 、 `npm run dev`
- 前台端口默认9999 http://localhost:9999

### 部署
- 先后执行命令 `npm install` 、 `npm run build` 将打包生成的 `dist` 静态文件放置服务器中，并配置路由代理

### 开发指南
- 组件使用详见[iView官网文档](https://www.iviewui.com/docs/guide/install)
- 权限按钮或其他内容显示控制自定义标签：`v-has`，使用示例：
    ```
    <Button v-has="'add'">添加按钮</Button>
    <Button v-has="'edit'">编辑按钮</Button>
    <Button v-has="'delete'">删除按钮</Button>
    <div v-has="'view'">需要view权限的界面内容</div>
    ```
    - 表格中[Render渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)权限判断示例
    ```
    render: (h, params) => {
        if(this.$route.meta.permTypes.includes("edit")){
            return ... ...
        }else{
            return ... ...
        }
    }
    ```

### 学习记录（更新中）

1.[axios请求封装 统一异常处理](https://github.com/Exrick/x-boot-front/wiki/axios%E8%AF%B7%E6%B1%82%E5%B0%81%E8%A3%85-%E7%BB%9F%E4%B8%80%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86)

2.路由菜单加载

3.控制权限至按钮显示

### 作者其他项目推荐
- [XPay个人免签收款支付系统v1.2](https://github.com/Exrick/xpay)

    - 现已支持移动端支付 手机扫码体验

    ![](http://p77xsahe9.bkt.clouddn.com/18-7-21/16350122.jpg)

- [XMall：基于SOA架构的分布式电商购物商城](https://github.com/Exrick/xmall)

    ![](https://i.loli.net/2018/07/22/5b54615b95788.jpg)

- 微信小程序APP 
    - [前台源码点我提前获取](http://xpay.exrick.cn/pay) [预览视频](https://v.qq.com/x/page/f0627kf4x1e.html)

    ![](https://i.loli.net/2018/07/21/5b52e1de385e7.png)
### 技术疑问交流
- QQ交流群 `475743731`，可获取详细文档、共享学习资源 和 [UI框架](https://github.com/Exrick/xmall/blob/master/study/FlatLab.md) [![](http://pub.idqqimg.com/wpa/images/group.png)](http://shang.qq.com/wpa/qunwpa?idkey=7b60cec12ba93ebed7568b0a63f22e6e034c0d1df33125ac43ed753342ec6ce7)
- 作者博客：[http://blog.exrick.cn](http://blog.exrick.cn)
### 捐赠
![](http://p77xsahe9.bkt.clouddn.com/18-7-20/54731550.jpg)

![](http://p77xsahe9.bkt.clouddn.com/18-6-28/32845239.jpg)