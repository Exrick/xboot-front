<template>
  <div class="user-choose">
    <Button @click="userModalVisible=true" :icon="icon">{{text}}</Button>
    <span @click="clearSelectData" class="clear">清空已选</span>
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
          >
            <Tooltip placement="top" :content="item.username">{{item.nickname}}</Tooltip>
          </Tag>
        </p>
      </Panel>
    </Collapse>
    <Drawer title="选择用户" closable v-model="userModalVisible" width="800" draggable>
      <Form ref="searchUserForm" :model="searchUserForm" inline :label-width="55">
        <Form-item label="用户名" prop="nickname">
          <Input
            type="text"
            v-model="searchUserForm.nickname"
            clearable
            placeholder="请输入用户名"
            style="width: 200px"
          />
        </Form-item>
        <Form-item label="部门" prop="department">
          <department-choose @on-change="handleSelectDep" style="width: 200px" ref="dep"></department-choose>
        </Form-item>
        <Form-item style="margin-left:-35px;" class="br">
          <Button @click="handleSearchUser" type="primary" icon="ios-search">搜索</Button>
          <Button @click="handleResetUser">重置</Button>
        </Form-item>
      </Form>
      <Alert show-icon>
        已选择
        <span class="select-count">{{selectUsers.length}}</span> 项
        <a style="margin-left: 10px;" @click="clearSelectData">清空已选</a>
      </Alert>
      <Table
        :loading="userLoading"
        border
        :columns="userColumns"
        :data="userData"
        style="margin: 2vh 0;"
      ></Table>
      <Row type="flex" justify="end">
        <Page
          :current="searchUserForm.pageNumber"
          :total="totalUser"
          :page-size="searchUserForm.pageSize"
          @on-change="changeUserPage"
          @on-page-size-change="changeUserPageSize"
          :page-size-opts="[10,20,50]"
          size="small"
          show-total
          show-elevator
          show-sizer
          transfer
        ></Page>
      </Row>
    </Drawer>
  </div>
</template>

<script>
import { getUserListData } from "@/api/index";
import departmentChoose from "./department-choose";
export default {
  name: "userChoose",
  components: {
    departmentChoose
  },
  props: {
    text: {
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
        id: "",
        nickname: "",
        type: "",
        status: "",
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
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
          key: "nickname",
          minWidth: 130,
          sortable: true
        },
        {
          title: "登录账号",
          key: "username",
          minWidth: 130,
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
          width: 125,
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
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true,
          sortType: "desc",
          width: 170
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
      totalUser: 0
    };
  },
  methods: {
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
        if (res.success) {
          this.userData = res.result.content;
          this.totalUser = res.result.totalElements;
        }
      });
    },
    handleSearchUser() {
      this.searchUserForm.pageNumber = 1;
      this.searchUserForm.pageSize = 10;
      this.getUserDataList();
    },
    handleResetUser() {
      this.$refs.searchUserForm.resetFields();
      this.searchUserForm.pageNumber = 1;
      this.searchUserForm.pageSize = 10;
      this.$refs.dep.clearSelect();
      this.searchUserForm.departmentId = "";
      // 重新加载数据
      this.getUserDataList();
    },
    setData(v) {
      this.selectUsers = v;
      this.$emit("on-change", this.selectUsers);
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
          username: v.username,
          nickname: v.nickname
        };
        this.selectUsers.push(u);
        this.$emit("on-change", this.selectUsers);
        this.$Message.success(`添加用户 ${v.nickname} 成功`);
      }
    },
    clearSelectData() {
      this.selectUsers = [];
      this.$emit("on-change", this.selectUsers);
    },
    handleCancelUser(e, id) {
      // 删除所选用户
      this.selectUsers = this.selectUsers.filter(e => {
        return e.id != id;
      });
      this.$emit("on-change", this.selectUsers);
      this.$Message.success("删除所选用户成功");
    }
  },
  mounted() {
    this.getUserDataList();
  }
};
</script>

<style lang="less">
.user-choose {
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
  .select-count {
    font-weight: 600;
    color: #40a9ff;
  }
}
</style>