<template>
  <div>
    <div style="display: flex">
      <Select
        v-model="value"
        :size="size"
        :loading="loading"
        :placeholder="placeholder"
        :multiple="multiple"
        :disabled="disabled"
        filterable
        :transfer="transfer"
        :clearable="clearable"
        :placement="placement"
        :not-found-text="notFoundText"
        :label-in-value="labelInValue"
        :transfer-class-name="transferClassName"
        :prefix="prefix"
        :max-tag-count="maxTagCount"
        :max-tag-placeholder="maxTagPlaceholder"
        @on-change="handleChange"
        @on-query-change="handleQueryChange"
        @on-clear="handleClear"
        @on-open-change="handleOpenChange"
        @on-select="handleSelect"
        :remote-method="searchUser"
      >
        <Option
          v-for="(item, i) in userList"
          :value="item.id"
          :key="i"
          :label="item.nickname"
          :tag="item.username"
        >
          <span style="margin-right: 10px">{{ item.nickname }}</span>
          <span style="color: #ccc">{{ item.username }}</span>
        </Option>
      </Select>
      <Button
        v-if="showButton"
        @click="userModalVisible = true"
        :size="size"
        :disabled="disabled"
        :icon="icon"
        :type="type"
        :shape="shape"
        :ghost="ghost"
        style="margin-left: 10px"
        >{{ text }}</Button
      >
    </div>
    <Drawer
      v-if="showButton"
      title="选择用户"
      closable
      v-model="userModalVisible"
      width="815"
      draggable
      :transfer="drawerTransfer"
      :mask-style="maskStyle"
      :class-name="className"
      class="user-select-drawer"
    >
      <Form ref="searchForm" :model="searchForm" inline :label-width="70">
        <FormItem label="用户名" prop="nickname">
          <Input
            type="text"
            v-model="searchForm.nickname"
            clearable
            placeholder="请输入用户名"
            style="width: 180px"
          />
        </FormItem>
        <FormItem label="部门" prop="department">
          <department-choose
            @on-change="handleSelectDep"
            style="width: 180px"
            ref="dep"
          ></department-choose>
        </FormItem>
        <span v-if="drop">
          <FormItem label="手机号" prop="mobile">
            <Input
              type="text"
              v-model="searchForm.mobile"
              clearable
              placeholder="请输入手机号"
              style="width: 180px"
            />
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input
              type="text"
              v-model="searchForm.email"
              clearable
              placeholder="请输入邮箱"
              style="width: 180px"
            />
          </FormItem>
          <FormItem label="性别" prop="sex">
            <dict dict="sex" v-model="searchForm.sex" style="width: 180px" />
          </FormItem>
          <FormItem label="登录账号" prop="username">
            <Input
              type="text"
              v-model="searchForm.username"
              clearable
              placeholder="请输入登录账号"
              style="width: 180px"
            />
          </FormItem>
          <FormItem label="用户ID" prop="id">
            <Input
              type="text"
              v-model="searchForm.id"
              clearable
              placeholder="请输入用户ID"
              style="width: 180px"
            />
          </FormItem>
        </span>
        <FormItem style="margin-left: -35px" class="br">
          <Button @click="handleSearchUser" type="primary" icon="ios-search"
            >搜索</Button
          >
          <Button @click="handleResetUser">重置</Button>
          <a class="drop-down" @click="dropDown">
            {{ dropDownContent }}
            <Icon :type="dropDownIcon"></Icon>
          </a>
        </FormItem>
      </Form>
      <Alert show-icon>
        已选择
        <span class="select-count">{{ selectCount }}</span> 项
        <a style="margin-left: 10px" @click="clearData">清空已选</a>
      </Alert>
      <Table
        :loading="userLoading"
        border
        :columns="userColumns"
        :data="userData"
        style="margin: 2vh 0"
      ></Table>
      <Row type="flex" justify="end">
        <Page
          :current="searchForm.pageNumber"
          :total="totalUser"
          :page-size="searchForm.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10, 20, 50]"
          size="small"
          show-total
          show-elevator
          show-sizer
          :transfer="true"
        ></Page>
      </Row>
    </Drawer>
  </div>
</template>

<script>
import { searchUserByName, getUserListData } from "@/api/index";
import departmentChoose from "./department-choose";
import dict from "@/views/my-components/xboot/dict";
export default {
  name: "userSelect",
  components: {
    departmentChoose,
    dict,
  },
  props: {
    showButton: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: "选择用户",
    },
    icon: {
      type: String,
      default: "md-person-add",
    },
    size: String,
    type: String,
    shape: String,
    ghost: {
      type: Boolean,
      default: false,
    },
    transfer: {
      type: Boolean,
      default: true,
    },
    drawerTransfer: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "请输入用户名搜索选择用户",
    },
    placement: {
      type: String,
      default: "bottom-start",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    notFoundText: {
      type: String,
      default: "无匹配数据",
    },
    labelInValue: {
      type: Boolean,
      default: false,
    },
    transferClassName: String,
    prefix: String,
    maxTagCount: Number,
    maxTagPlaceholder: Function,
    clearable: {
      type: Boolean,
      default: true,
    },
    maskStyle: Object,
    className: Object
  },
  data() {
    return {
      value: null,
      userList: [],
      loading: false,
      userLoading: true,
      userModalVisible: false,
      drop: false,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      selectCount: 0,
      searchForm: {
        id: "",
        nickname: "",
        type: "",
        status: "",
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
      },
      userColumns: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "用户名",
          key: "nickname",
          minWidth: 130,
          sortable: true,
        },
        {
          title: "登录账号",
          key: "username",
          minWidth: 130,
          sortable: true,
        },
        {
          title: "头像",
          key: "avatar",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("Avatar", {
              props: {
                src: params.row.avatar,
              },
            });
          },
        },
        {
          title: "所属部门",
          key: "departmentTitle",
          width: 120,
        },
        {
          title: "手机",
          key: "mobile",
          width: 125,
          sortable: true,
        },
        {
          title: "邮箱",
          key: "email",
          width: 180,
          sortable: true,
        },
        {
          title: "性别",
          key: "sex",
          width: 70,
          align: "center",
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true,
          sortType: "desc",
          width: 170,
        },
        {
          title: "操作",
          key: "action",
          width: 130,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            let title = "添加该用户";
            if (!this.multiple) {
              title = "选择该用户";
            }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.addUser(params.row);
                    },
                  },
                },
                title
              ),
            ]);
          },
        },
      ],
      userData: [],
      totalUser: 0,
    };
  },
  methods: {
    searchUser(v) {
      if (!v) {
        return;
      }
      this.loading = true;
      searchUserByName(v).then((res) => {
        this.loading = false;
        if (res.success) {
          this.userList = res.result;
        }
      });
    },
    handleChange(v) {
      this.$emit("input", v);
      this.$emit("on-change", v);
    },
    handleQueryChange(v) {
      this.$emit("on-query-change", v);
    },
    handleClear() {
      this.$emit("on-clear", "");
    },
    handleOpenChange(v) {
      this.$emit("on-open-change", v);
    },
    handleSelect(v) {
      this.$emit("on-select", v);
    },
    setData(v) {
      if (!v.length && v.length != 0) {
        // 单个
        if (this.multiple) {
          this.$Message.warning("多个选择仅支持传入用户数组数据");
          return;
        }
        if (!v) {
          return;
        }
        let list = [v];
        this.userList = list;
        setTimeout(() => {
          this.value = v.id;
          this.$emit("input", v.id);
          this.selectCount = 1;
        }, 10);
      } else if (v.length > 0) {
        // 多个
        if (!this.multiple) {
          this.$Message.warning("单个选择仅支持传入单个用户数据");
          return;
        }
        let list = [],
          ids = [];
        v.forEach((e) => {
          list.push(e);
          ids.push(e.id);
        });
        this.userList = list;
        setTimeout(() => {
          this.value = ids;
          this.$emit("input", ids);
          this.selectCount = v.length;
        }, 10);
      } else {
        if (this.multiple) {
          this.value = [];
          this.$emit("input", []);
        } else {
          this.value = "";
          this.$emit("input", "");
        }
      }
    },
    handleSelectDep(v) {
      this.searchForm.departmentId = v;
    },
    dropDown() {
      if (this.drop) {
        this.dropDownContent = "展开";
        this.dropDownIcon = "ios-arrow-down";
      } else {
        this.dropDownContent = "收起";
        this.dropDownIcon = "ios-arrow-up";
      }
      this.drop = !this.drop;
    },
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    getDataList() {
      this.userLoading = true;
      getUserListData(this.searchForm).then((res) => {
        this.userLoading = false;
        if (res.success) {
          this.userData = res.result.content;
          this.totalUser = res.result.totalElements;
        }
      });
    },
    handleSearchUser() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    handleResetUser() {
      this.$refs.searchForm.resetFields();
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.$refs.dep.clearSelect();
      this.searchForm.departmentId = "";
      // 重新加载数据
      this.getDataList();
    },
    clearData() {
      this.selectCount = 0;
      if (this.multiple) {
        this.value = [];
        this.$emit("input", []);
        this.$emit("on-change", []);
      } else {
        this.value = "";
        this.$emit("input", "");
        this.$emit("on-change", "");
      }
    },
    addUser(v) {
      if (this.multiple) {
        // 去重
        let flag = true;
        if (this.value && this.value.length > 0) {
          this.value.forEach((e) => {
            if (v.id == e) {
              this.$Message.warning("已经添加过啦，请勿重复选择");
              flag = false;
            }
          });
        } else {
          this.value = [];
        }
        if (flag) {
          let u = {
            id: v.id,
            username: v.username,
            nickname: v.nickname,
          };
          let isExist = false;
          this.userList.forEach((e) => {
            if (v.id == e.id) {
              isExist = true;
            }
          });
          if (!isExist) {
            this.userList.push(u);
          }
          setTimeout(() => {
            this.value.push(v.id);
            this.$emit("input", this.value);
            this.$emit("on-change", this.value);
            this.selectCount = this.value.length;
          }, 10);
          this.$Message.success(`添加用户 ${v.nickname} 成功`);
        }
      } else {
        // 单选
        this.userList = [
          {
            id: v.id,
            username: v.username,
            nickname: v.nickname,
          },
        ];
        setTimeout(() => {
          this.value = v.id;
          this.$emit("input", this.value);
          this.$emit("on-change", this.value);
          this.selectCount = 1;
        }, 10);
        this.$Message.success(`选择用户 ${v.nickname} 成功`);
      }
    },
  },
  mounted() {
    this.getDataList();
  },
};
</script>
<style lang="less">
.user-select-drawer {
  .select-count {
    font-weight: 600;
    color: #40a9ff;
  }
  .drop-down {
    margin-left: 5px;
  }
}
</style>