<style lang="less">
  @import "../../styles/common.less";
  @import "./access.less";
</style>

<template>
  <div class="access">
    <Row>
      <Col :md="12" :lg="8" style="padding:0 10px 10px 0">
        <Card>
          <p slot="title">
            <Icon type="md-contact" style="margin-bottom:2px"></Icon>
            当前用户
          </p>
          <div class="access-user-con access-current-user-con">
            <img :src="avatorPath" alt="">
            <p>当前用户本页面拥有按钮权限:</p>
            <b>{{ permTypes }}</b>
          </div>
        </Card>
      </Col>
      <Col :md="12" :lg="16" style="padding:0 10px 10px 0">
        <Card>
          <p slot="title">
            <Icon type="md-apps" style="margin-bottom:2px"></Icon>
            当前用户本页面拥有的按钮操作
          </p>
          <div class="access-user-con access-change-access-con">
            <Col span="4" class="buttons">
            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
              <Button v-has="'add'" type="primary">添加按钮</Button>
              <Button v-has="'edit'">编辑按钮</Button>
              <Button v-has="'delete'" type="error">删除按钮</Button>
            </Row>
            </Col>
            <Col span="17" class="padding-left-10">
            <Row type="flex" justify="center" align="middle" class="access-change-access-con-row">
              <p>
                您可以通过更换测试用户账号：<code>test</code>或<code>test2</code> 密码：<code>123456</code>，然后观察该页面按钮以及部门相关数据权限的变化<br><br> 自定义权限标签：
                <code>v-has</code>，示例：<code>{{example}}</code><br><br> 说明：该Demo大部分页面为演示功能，前端未配置根据权限隐藏按钮
              </p>
            </Row>
            </Col>
          </div>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col :md="12" :lg="14" style="padding:0 10px 10px 0">
        <Card>
          <p slot="title">
            <Icon type="md-grid" style="margin-bottom:2px"></Icon>
            表格中权限判断
          </p>
          <div>
            <Alert show-icon>
              iView Table组件已支持 slot-scope 用法，建议使用该新用法。
              以下为Render函数中实现权限按钮显示示例
            </Alert>
            <Table border :columns="columns" :data="data"></Table>
          </div>
        </Card>
      </Col>
      <Col :md="12" :lg="10" style="padding:0 10px 10px 0">
        <Card>
          <p slot="title" style="overflow:visible">
            <Icon type="md-contacts" style="margin-bottom:2px;margin-right:3px;"></Icon>
            通过当前用户角色显示
          </p>
          <p slot="extra">
            无需配置，全局可用
          </p>
          <Row>
            <div class="access-user-roles">
              <p>当前用户拥有角色:</p>
              <b>{{ roles }}</b>
            </div>
            <div class="btns">
              <Button v-hasRole="'ROLE_USER'" type="primary" style="margin-right:5px;">添加按钮</Button>
              <Button v-hasRole="'ROLE_TEST'" type="error">删除按钮</Button>
              <Button v-hasRole="'ROLE_ADMIN'">编辑按钮</Button>
            </div>
            <div class="role-demo">
              自定义角色权限标签：<code>v-hasRole</code><br><br>
              示例：<code>{{exampleRole}}</code>
            </div>
          </Row>
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
        roles: [],
        example: "<Button v-has=\"'add'\">添加按钮</Button>",
        exampleRole: "<Button v-hasRole=\"'ROLE_ADMIN'\">添加按钮</Button>",
        columns: [{
            title: "姓名",
            key: "name",
            render: (h, params) => {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "ios-person"
                  },
                  style: {
                    margin: "0 5px 3px 0"
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
                    "Button", {
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
                    "Button", {
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
                    "Button", {
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
        data: [{
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
      this.roles = this.getStore("roles")
    }
  };
</script>

<style>
  
</style>
