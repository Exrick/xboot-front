<template>
  <div>
    <Button @click="userModalVisible=true" :icon="icon">{{buttonText}}</Button>
    <span @click="clearSelectUser" class="clear">清空已选</span>
    <Collapse simple class="collapse">
      <Panel name="1">
        已选择
        <span class="select-count">{{selectUsers.length}}</span> 人
        <p slot="content">
          <Tag
            v-for="(item, i) in selectUsers"
            :key="i"
            :name="item.id"
            color="default"
            closable
            @on-close="handleCancelUser"
          >{{item.username}}</Tag>
        </p>
      </Panel>
    </Collapse>
    <Drawer title="选择用户" closable v-model="userModalVisible" width="800" draggable>
      <Form
        ref="searchUserForm"
        :model="searchUserForm"
        inline
        :label-width="55"
        class="search-form"
      >
        <Form-item label="用户名" prop="username">
          <Input
            type="text"
            v-model="searchUserForm.username"
            clearable
            placeholder="请输入用户名"
            style="width: 200px"
          />
        </Form-item>
        <Form-item label="部门" prop="department">
          <department-choose @on-select="handleSelectDep" ref="dep"></department-choose>
        </Form-item>
        <Form-item style="margin-left:-35px;" class="br">
          <Button @click="handleSearchUser" type="primary" icon="ios-search">搜索</Button>
          <Button @click="handleResetUser">重置</Button>
        </Form-item>
      </Form>
      <Table :loading="userLoading" border :columns="userColumns" :data="userData" ref="userTable"></Table>
      <Row type="flex" justify="end" class="code-row-bg page" style="margin: 10px 0;">
        <Page
          :current="searchUserForm.pageNumber"
          :total="totalUser"
          :page-size="searchUserForm.pageSize"
          @on-change="changeUserPage"
          @on-page-size-change="changeUserPageSize"
          :page-size-opts="[9,18,36]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
      <div class="drawer-footer">
        已选择
        <span class="select-count">{{selectUsers.length}}</span> 人
        <Button @click="clearSelectUser" style="margin-left:10px">清空已选</Button>
        <Button @click="setSelectAllUser" type="info" style="margin-left:10px">勾选全部</Button>
        <Button @click="userModalVisible=false" type="primary" style="margin-left:10px">关闭</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { getUserListData, getDictDataByType } from "@/api/index";
import departmentChoose from "./department-choose";
export default {
  name: "userChoose",
  components: {
    departmentChoose
  },
  props: {
    buttonText: {
      type: String,
      default: "选择用户"
    },
    icon: {
      type: String,
      default: "md-person-add"
    }
  },
  data() {
    return {
      userLoading: true,
      userModalVisible: false,
      selectUsers: [],
      searchUserForm: {
        username: "",
        type: "",
        status: "",
        pageNumber: 1, // 当前页数
        pageSize: 9, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc" // 默认排序方式
      },
      userColumns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "用户名",
          key: "username",
          width: 145,
          sortable: true
        },
        {
          title: "头像",
          key: "avatar",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("Avatar", {
              props: {
                src: params.row.avatar
              }
            });
          }
        },
        {
          title: "所属部门",
          key: "departmentTitle",
          width: 120
        },
        {
          title: "手机",
          key: "mobile",
          width: 115,
          sortable: true
        },
        {
          title: "邮箱",
          key: "email",
          width: 180,
          sortable: true
        },
        {
          title: "性别",
          key: "sex",
          width: 70,
          align: "center",
          render: (h, params) => {
            let re = "";
            this.dictSex.forEach(e => {
              if (e.value == params.row.sex) {
                re = e.title;
              }
            });
            return h("div", re);
          }
        },
        {
          title: "用户类型",
          key: "type",
          align: "center",
          width: 100,
          render: (h, params) => {
            let re = "";
            if (params.row.type === 1) {
              re = "管理员";
            } else if (params.row.type === 0) {
              re = "普通用户";
            }
            return h("div", re);
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width: 120,
          render: (h, params) => {
            if (params.row.status === 0) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "green"
                    }
                  },
                  "正常启用"
                )
              ]);
            } else if (params.row.status === -1) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "red"
                    }
                  },
                  "禁用"
                )
              ]);
            }
          }
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true,
          sortType: "desc",
          width: 150
        },
        {
          title: "操作",
          key: "action",
          width: 130,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.chooseUser(params.row);
                    }
                  }
                },
                "添加该用户"
              )
            ]);
          }
        }
      ],
      userData: [],
      totalUser: 0,
      dictMessageType: []
    };
  },
  methods: {
    getDictDataType() {
      getDictDataByType("message_type").then(res => {
        if (res.success) {
          this.dictMessageType = res.result;
        }
      });
      // 获取性别字典数据
      getDictDataByType("sex").then(res => {
        if (res.success) {
          this.dictSex = res.result;
        }
      });
    },
    handleSelectDep(v) {
      this.searchUserForm.departmentId = v;
    },
    changeUserPage(v) {
      this.searchUserForm.pageNumber = v;
      this.getUserDataList();
    },
    changeUserPageSize(v) {
      this.searchUserForm.pageSize = v;
      this.getUserDataList();
    },
    getUserDataList() {
      this.userLoading = true;
      getUserListData(this.searchUserForm).then(res => {
        this.userLoading = false;
        if (res.success === true) {
          this.userData = res.result.content;
          this.totalUser = res.result.totalElements;
        }
      });
    },
    handleSearchUser() {
      this.searchUserForm.pageNumber = 1;
      this.searchUserForm.pageSize = 9;
      this.getUserDataList();
    },
    handleResetUser() {
      this.$refs.searchUserForm.resetFields();
      this.searchUserForm.pageNumber = 1;
      this.searchUserForm.pageSize = 9;
      this.$refs.dep.clearSelect();
      this.searchUserForm.departmentId = "";
      // 重新加载数据
      this.getUserDataList();
    },
    setSelectUser(v) {
      this.selectUsers = v;
      // this.$emit("on-change", this.selectUsers);
    },
    setSelectAllUser() {
      let data = [];
      this.userData.forEach(e => {
        let u = {
          id: e.id,
          username: e.username
        };
        data.push(u);
      });
      this.selectUsers = data;
      this.$emit("on-change", data);
    },
    chooseUser(v) {
      // 去重
      let that = this;
      let flag = true;
      this.selectUsers.forEach(e => {
        if (v.id == e.id) {
          that.$Message.warning("已经添加过啦，请勿重复选择");
          flag = false;
        }
      });
      if (flag) {
        let u = {
          id: v.id,
          username: v.username
        };
        this.selectUsers.push(u);
        this.$emit("on-change", this.selectUsers);
        this.$Message.success(`添加用户 ${v.username} 成功`);
      }
    },
    clearSelectUser() {
      this.selectUsers = [];
      this.$emit("on-change", this.selectUsers);
    },
    handleCancelUser(e, id) {
      // 删除所选用户
      let newArray = [];
      this.selectUsers.forEach(e => {
        if (id != e.id) {
          newArray.push(e);
        }
      });
      this.selectUsers = newArray;
      this.$emit("on-change", this.selectUsers);
      this.$Message.success("删除所选用户成功");
    }
  },
  created() {
    this.getDictDataType();
    this.getUserDataList();
  }
};
</script>

<style lang="less">
.clear {
  font-size: 12px;
  margin-left: 15px;
  color: #40a9ff;
  cursor: pointer;
}
.collapse {
  font-size: 12px;
  margin-top: 15px;
  width: 500px;
}
.drawer-footer {
  z-index: 10;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.select-count {
  font-size: 13px;
  font-weight: 600;
  color: #40a9ff;
}
</style>

