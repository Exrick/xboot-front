# xboot-front

> 作者大四作品 且为后台开发 能力经验有限 如有错误欢迎指正 期待您的捐赠支持！

### 宣传视频
- [作者亲自制作XBoot文字快闪宣传视频](http://www.bilibili.com/av30284667)
- [作者亲自制作其他项目宣传视频](https://www.bilibili.com/video/av23121122/)

### [在线Demo](http://xboot.exrick.cn)
http://xboot.exrick.cn
### 后台项目地址：[X-Boot](https://github.com/Exrick/x-boot)
> 涉及技术：Spring Boot 2.x/Spring Security/JWT/Spring Data JPA+Mybatis-Plus/Redis/Elasticsearch 分布式限流/同步锁/验证码/SnowFlake雪花算法ID生成 动态权限管理 数据权限 代码生成 日志记录 定时任务 第三方账号、短信登录
### 项目简介
- 项目基于 Vue-Cli 3.0正式版创建
- 主要Main组件框架基于iView-admin 1.0版本 修复其BUG
- 组件库升级iView3.0
- 后台加载动态权限菜单 多方式轻松权限控制至按钮显示
- 提供Vue空白模版，只需修改后台请求和对应实体字段即可完成页面开发
- 多语言切换、消息管理、第三方社交账号或短信登录
- iView使用图标库 [ionicons](http://ionicons.com/) 额外图标库 [vue-awesome](https://github.com/Justineo/vue-awesome)

### 截图预览

![QQ截图20180826163917.png](https://i.loli.net/2018/08/26/5b826868e2359.png)

![QQ截图20180826163956.png](https://i.loli.net/2018/08/26/5b8268c57d1e3.png)

![QQ截图20180826164058.png](https://i.loli.net/2018/08/26/5b8268d63d156.png)

![QQ截图20180826164129.png](https://i.loli.net/2018/08/26/5b8268dec28ee.png)

![QQ截图20180826164144.png](https://i.loli.net/2018/08/26/5b8268e6a091f.png)

![QQ截图20180826164226.png](https://i.loli.net/2018/08/26/5b8268efab94a.png)

### [完整版截图细节展示](https://github.com/Exrick/x-boot/wiki/%E5%AE%8C%E6%95%B4%E7%89%88%E6%88%AA%E5%9B%BE%E7%BB%86%E8%8A%82%E5%B1%95%E7%A4%BA)


### 主要所用技术
- [Vue 2.5.x](https://cn.vuejs.org/)
- [Vue Cli 3.x](https://github.com/vuejs/vue-cli)：[官方中文文档](https://github.com/vuejs/vue-cli/tree/dev/docs/zh/config)
- Vue Router
- [Vuex](https://vuex.vuejs.org/zh-cn/)
- [vue-i18n](https://github.com/kazupon/vue-i18n)：国际化多语言插件 使用5.0.x版本
- [iView](https://www.iviewui.com/)
- [iview-admin](https://github.com/iview/iview-admin)
- [iview-area](https://github.com/iview/iview-area)：城市级联组件
- [wangeditor](https://github.com/wangfupeng1988/wangEditor)：轻量富文本编辑器
- [gitalk](https://github.com/gitalk/gitalk)：基于github issue评论插件
- [vue-stomp](https://github.com/FlySkyBear/vue-stomp)
- [vue-json-pretty](https://github.com/leezng/vue-json-pretty)：Json美化
- [Print.js](http://printjs.crabbly.com/)：打印
- ES6
- webpack
- axios
- echarts
- cookie
- 第三方插件或服务
    - [hotjar](https://github.com/Exrick/xmall/blob/master/study/hotjar.md)：一体化分析和反馈
    - [Vaptcha人机验证码](https://www.vaptcha.com/)

### 本地开发构建运行

- 启动后端 [x-boot](https://github.com/Exrick/x-boot) 项目后，在 `vue.config.js` 中修改你的后端接口地址代理配置
- 在项目根文件夹下先后执行命令 `npm install` (若有报错请使用[cnpm](https://npm.taobao.org/))、 `npm run dev`
- 前台端口默认9999 http://localhost:9999

### 部署
- 执行过命令 `npm install` 后，执行 `npm run build` 将打包生成的 `dist` 静态文件放置Nginx服务器中，并配置反向代理。当然还可放置Spring Web等其他项目resources静态资源文件夹下可避免跨域(不推荐)。
- Nginx配置提醒 由于路由默认已使用history模式 需加入以下配置 完整配置参考见下方开发指南
```
location / {
	if (!-e $request_filename) {
        rewrite ^(.*)$ /index.html?s=$1 last;
        break;
    }
    ...
}
```
### 开发指南及技术栈说明
- [XBoot前端开发配置及部署说明【必读】](https://github.com/Exrick/xboot-front/wiki/XBoot%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E9%85%8D%E7%BD%AE%E5%8F%8A%E9%83%A8%E7%BD%B2%E8%AF%B4%E6%98%8E%E3%80%90%E5%BF%85%E8%AF%BB%E3%80%91)
- [如何使用XBoot前端Vue模板快速开发增删改页面](https://github.com/Exrick/xboot-front/wiki/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8XBoot%E5%89%8D%E7%AB%AFVue%E6%A8%A1%E6%9D%BF%E5%BF%AB%E9%80%9F%E5%BC%80%E5%8F%91%E5%A2%9E%E5%88%A0%E6%94%B9%E9%A1%B5%E9%9D%A2)
- 现已提供简单封装的带后台真实接口数据的组件，见XBoot业务组件菜单

### 学习记录（更新中）

1.[axios请求封装 统一异常处理](https://github.com/Exrick/x-boot-front/wiki/axios%E8%AF%B7%E6%B1%82%E5%B0%81%E8%A3%85-%E7%BB%9F%E4%B8%80%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86)

2.路由菜单加载

3.控制权限至按钮显示

4.[基于Websocket实现发送消息后右上角消息图标红点实时显示](https://github.com/Exrick/x-boot/wiki/%E5%9F%BA%E4%BA%8EWebsocket%E5%AE%9E%E7%8E%B0%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E5%90%8E%E5%8F%B3%E4%B8%8A%E8%A7%92%E6%B6%88%E6%81%AF%E5%9B%BE%E6%A0%87%E7%BA%A2%E7%82%B9%E5%AE%9E%E6%97%B6%E6%98%BE%E7%A4%BA)

### Docker下前端端集群部署(更新中)

> 后端端集群部署请跳转至[x-boot](https://github.com/Exrick/x-boot)项目查看

1.[Docker的安装与常用命令](https://github.com/Exrick/x-boot/wiki/Docker%E7%9A%84%E5%AE%89%E8%A3%85%E4%B8%8E%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4)

2.Nginx集群搭建

3.XBoot前端集群部署及负载均衡配置

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
- QQ交流群 `475743731(付费)`，可获取各项目详细图文文档、疑问解答 [![](http://pub.idqqimg.com/wpa/images/group.png)](http://shang.qq.com/wpa/qunwpa?idkey=7b60cec12ba93ebed7568b0a63f22e6e034c0d1df33125ac43ed753342ec6ce7)
- 免费交流群 `562962309` [![](http://pub.idqqimg.com/wpa/images/group.png)](http://shang.qq.com/wpa/qunwpa?idkey=52f6003e230b26addeed0ba6cf343fcf3ba5d97829d17f5b8fa5b151dba7e842)

- 作者博客：[http://blog.exrick.cn](http://blog.exrick.cn)
### [捐赠](http://xpay.exrick.cn/pay)