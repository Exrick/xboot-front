<template>
  <div class="user-choose">
    <Button
      :size="size"
      :type="type"
      :shape="shape"
      @click="userModalVisible = true"
      :icon="icon"
      >{{ text }}</Button
    >
    <span
      v-show="showClear && selectUsers.length > 0"
      @click="clearData"
      class="clear"
      >清空已选</span
    >
    <Collapse simple class="collapse">
      <Panel name="1">
        已选择
        <span class="select-count">{{ selectUsers.length }}</span> 人
        <p slot="content">
          <Tag
            v-for="(item, i) in selectUsers"
            :key="i"
            :name="item.id"
            color="default"
            closable
            @on-close="handleCancelUser"
          >
            <Tooltip placement="top" :content="item.username">{{
              item.nickname
            }}</Tooltip>
          </Tag>
        </p>
      </Panel>
    </Collapse>
    <Drawer
      title="选择用户"
      closable
      v-model="userModalVisible"
      width="815"
      draggable
      :transfer="transfer"
      :mask-style="maskStyle"
      :class-name="className"
      class="user-choose-drawer"
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
        <span class="select-count">{{ selectUsers.length }}</span> 项
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
          transfer
        ></Page>
      </Row>
    </Drawer>
  </div>
</template>

<script>
import { getUserListData } from "@/api/index";
import departmentChoose from "./department-choose";
import dict from "@/views/my-components/xboot/dict";
export default {
  name: "userChoose",
  components: {
    departmentChoose,
    dict,
  },
  props: {
    value: {
      type: Array,
      default: [],
    },
    text: {
      type: String,
      default: "选择用户",
    },
    icon: {
      type: String,
      default: "md-person-add",
    },
    showClear: {
      type: Boolean,
      default: true,
    },
    size: String,
    type: String,
    shape: String,
    transfer: {
      type: Boolean,
      default: true,
    },
    maskStyle: Object,
    className: Object
  },
  data() {
    return {
      userLoading: true,
      userModalVisible: false,
      drop: false,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      selectUsers: this.value,
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
                      this.chooseUser(params.row);
                    },
                  },
                },
                "添加该用户"
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
    setData(v) {
      this.selectUsers = v;
      this.$emit("on-change", this.selectUsers);
      this.$emit("input", this.selectUsers);
    },
    chooseUser(v) {
      // 去重
      let that = this;
      let flag = true;
      this.selectUsers.forEach((e) => {
        if (v.id == e.id) {
          that.$Message.warning("已经添加过啦，请勿重复选择");
          flag = false;
        }
      });
      if (flag) {
        let u = {
          id: v.id,
          username: v.username,
          nickname: v.nickname,
        };
        this.selectUsers.push(u);
        this.$emit("on-change", this.selectUsers);
        this.$emit("input", this.selectUsers);
        this.$Message.success(`添加用户 ${v.nickname} 成功`);
      }
    },
    clearData() {
      this.selectUsers = [];
      this.$emit("on-change", this.selectUsers);
      this.$emit("input", this.selectUsers);
    },
    handleCancelUser(event, id) {
      // 删除所选用户
      this.selectUsers = this.selectUsers.filter((e) => {
        return e.id != id;
      });
      this.$emit("on-change", this.selectUsers);
      this.$emit("input", this.selectUsers);
      this.$Message.success("删除所选用户成功");
    },
    setCurrentValue(value) {
      if (value === this.selectUsers) {
        return;
      }
      this.selectUsers = value;
    },
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    },
  },
  mounted() {
    this.getDataList();
  },
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
}
.user-choose-drawer {
  .select-count {
    font-weight: 600;
    color: #40a9ff;
  }
  .drop-down {
    margin-left: 5px;
  }
}
</style>