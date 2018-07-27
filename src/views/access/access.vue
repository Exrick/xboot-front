<style lang="less">
@import "../../styles/common.less";
@import "./access.less";
</style>

<template>
    <div class="access">
        <Row>
            <Col span="8">
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                        当前用户
                    </p>
                    <div class="access-user-con access-current-user-con">
                        <img :src="avatorPath" alt="">
                        <p>当前用户本页面拥有按钮权限:</p>
                        <b>{{ permTypes }}</b>
                    </div>
                </Card>
            </Col>
            <Col span="16" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="android-contacts"></Icon>
                        当前用户本页面拥有的按钮操作
                    </p>
                    <div class="access-user-con access-change-access-con">
                        <Col span="4" class="buttons">
                            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <Button v-has="'add'" type="primary">添加按钮</Button>
                                <Button v-has="'edit'" type="ghost">编辑按钮</Button>
                                <Button v-has="'delete'" type="error">删除按钮</Button>
                            </Row>
                        </Col>
                        <Col span="16" class="padding-left-10">
                            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <p>
                                    您可以通过更换测试用户账号：test或test2 密码：123456，然后观察该页面按钮和表格中的变化<br><br>
                                    自定义权限标签：<code>v-has</code>，示例：<code>{{example}}</code><br><br>
                                    其他页面为演示功能，未配置隐藏权限按钮
                                </p>
                            </Row>
                        </Col>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span="16">
                <Card style="margin-top:10px">
                    <p slot="title">
                        <Icon type="ios-list-outline"></Icon>
                        表格Render函数中权限判断
                    </p>
                    <div>
                        <Alert show-icon>
                            由于表格中操作按钮或其他自定义内容使用
                            <a target="_blank" href="https://cn.vuejs.org/v2/guide/render-function.html">Render渲染函数</a>
                            ，需在函数内实现权限判断，详见该示例页面代码
                        </Alert>
                        <Table border :columns="columns" :data="data"></Table>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "access_index",
  data() {
    return {
      permTypes: [],
      example: "<Button v-has=\"'add'\">添加按钮</Button>",
      columns: [
        {
          title: "姓名",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            if (this.permTypes.includes("edit")) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  "删除"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        }
      ],
      data: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        }
      ]
    };
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
    initMeta() {
      let permTypes = this.$route.meta.permTypes;
      if (permTypes !== null && permTypes !== undefined) {
        this.permTypes = permTypes;
      }
    }
  },
  created() {
    this.initMeta();
  }
};
</script>

<style>
</style>
