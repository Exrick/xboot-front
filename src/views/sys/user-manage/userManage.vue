<style lang="less">
@import "@/styles/table-common.less";
@import "./userManage.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <FormItem label="用户名" prop="nickname">
            <Input
              type="text"
              v-model="searchForm.nickname"
              clearable
              placeholder="请输入用户名"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="部门" prop="department">
            <department-choose
              @on-change="handleSelectDep"
              style="width: 200px"
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
                style="width: 200px"
              />
            </FormItem>
            <FormItem label="邮箱" prop="email">
              <Input
                type="text"
                v-model="searchForm.email"
                clearable
                placeholder="请输入邮箱"
                style="width: 200px"
              />
            </FormItem>
            <FormItem label="性别" prop="sex">
              <dict dict="sex" v-model="searchForm.sex" style="width: 200px" />
            </FormItem>
            <FormItem label="登录账号" prop="username">
              <Input
                type="text"
                v-model="searchForm.username"
                clearable
                placeholder="请输入登录账号"
                style="width: 200px"
              />
            </FormItem>
            <FormItem label="用户ID" prop="id">
              <Input
                type="text"
                v-model="searchForm.id"
                clearable
                placeholder="请输入用户ID"
                style="width: 200px"
              />
            </FormItem>
            <FormItem label="创建时间">
              <DatePicker
                :options="options"
                v-model="selectDate"
                type="daterange"
                format="yyyy-MM-dd"
                clearable
                @on-change="selectDateRange"
                placeholder="选择起始时间"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
          </span>
          <FormItem style="margin-left: -35px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search"
              >搜索</Button
            >
            <Button @click="handleReset">重置</Button>
            <a class="drop-down" @click="dropDown">
              {{ dropDownContent }}
              <Icon :type="dropDownIcon"></Icon>
            </a>
          </FormItem>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="add" type="primary" icon="md-add">添加用户</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Dropdown @on-click="handleDropdown">
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown" />
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="refresh">刷新</DropdownItem>
            <DropdownItem name="reset">重置用户密码</DropdownItem>
            <DropdownItem name="exportData">导出所选数据</DropdownItem>
            <DropdownItem name="exportAll">导出全部数据</DropdownItem>
            <DropdownItem name="importData">导入数据(付费)</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="dashed" @click="openSearch = !openSearch">{{
          openSearch ? "关闭搜索" : "开启搜索"
        }}</Button>
        <Button type="dashed" @click="openTip = !openTip">{{
          openTip ? "关闭提示" : "开启提示"
        }}</Button>
      </Row>
      <Alert show-icon v-show="openTip">
        已选择
        <span class="select-count">{{ this.selectList.length }}</span> 项
        <a class="select-clear" @click="clearSelectAll">清空</a>
      </Alert>
      <Table
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        sortable="custom"
        @on-sort-change="changeSort"
        @on-selection-change="showSelect"
        ref="table"
      ></Table>
      <Table
        :columns="exportColumns"
        :data="exportData"
        ref="exportTable"
        style="display: none"
      ></Table>
      <Row type="flex" justify="end" class="page">
        <Page
          :current="searchForm.pageNumber"
          :total="total"
          :page-size="searchForm.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10, 20, 50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Card>

    <Modal
      v-model="modalExportAll"
      title="确认导出"
      :loading="loadingExport"
      @on-ok="exportAll"
    >
      <p>您确认要导出全部 {{ total }} 条数据？</p>
    </Modal>

    <check-password ref="checkPass" @on-success="resetPass" />

    <addEdit
      :data="form"
      :type="showType"
      v-model="showUser"
      @on-submit="getDataList"
    />
  </div>
</template>

<script>
import {
  getUserListData,
  enableUser,
  disableUser,
  deleteUser,
  getAllUserData,
  resetUserPass,
} from "@/api/index";
import { validateMobile } from "@/libs/validate";
import departmentChoose from "../../my-components/xboot/department-choose";
import checkPassword from "@/views/my-components/xboot/check-password";
import addEdit from "./addEdit.vue";
import { shortcuts } from "@/libs/shortcuts";
import dict from "@/views/my-components/xboot/dict";
export default {
  name: "user-manage",
  components: {
    departmentChoose,
    checkPassword,
    addEdit,
    dict,
  },
  data() {
    return {
      height: 510,
      showUser: false,
      showType: "0",
      loading: true,
      openSearch: true,
      openTip: true,
      operationLoading: false,
      loadingExport: true,
      modalExportAll: false,
      drop: false,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      selectList: [],
      dataDep: [],
      searchKey: "",
      searchForm: {
        id: "",
        nickname: "",
        username: "",
        departmentId: "",
        mobile: "",
        email: "",
        sex: "",
        type: "",
        status: "",
        pageNumber: 1,
        pageSize: 10,
        sort: "createTime",
        order: "desc",
        startDate: "",
        endDate: "",
      },
      selectDate: null,
      options: {
        shortcuts: shortcuts,
      },
      form: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left",
        },
        {
          type: "index",
          width: 60,
          align: "center",
          fixed: "left",
        },
        {
          title: "登录账号",
          key: "username",
          minWidth: 125,
          sortable: true,
          fixed: "left",
        },
        {
          title: "用户名",
          key: "nickname",
          minWidth: 125,
          sortable: true,
          fixed: "left",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.showDetail(params.row);
                  },
                },
              },
              params.row.nickname
            );
          },
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
          minWidth: 120,
        },
        {
          title: "手机",
          key: "mobile",
          minWidth: 125,
          sortable: true,
        },
        {
          title: "邮箱",
          key: "email",
          minWidth: 180,
          sortable: true,
        },
        {
          title: "性别",
          key: "sex",
          width: 70,
          align: "center",
        },
        {
          title: "类型",
          key: "type",
          align: "center",
          width: 110,
          render: (h, params) => {
            let re = "",
              color = "";
            if (params.row.type == 0) {
              re = "普通用户";
              color = "default";
            } else if (params.row.type == 1) {
              re = "管理员";
              color = "blue";
            }
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: color,
                  },
                },
                re
              ),
            ]);
          },
          filters: [
            {
              label: "普通用户",
              value: 0,
            },
            {
              label: "管理员",
              value: 1,
            },
          ],
          filterMultiple: false,
          filterRemote: (e) => {
            let v = "";
            if (e.length > 0) {
              v = e[0];
            }
            this.searchForm.type = v;
            this.searchForm.pageNumber = 1;
            this.getDataList();
          },
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width: 100,
          render: (h, params) => {
            if (params.row.status == 0) {
              return h("div", [
                h("Badge", {
                  props: {
                    status: "success",
                    text: "启用",
                  },
                }),
              ]);
            } else if (params.row.status == -1) {
              return h("div", [
                h("Badge", {
                  props: {
                    status: "error",
                    text: "禁用",
                  },
                }),
              ]);
            }
          },
          filters: [
            {
              label: "启用",
              value: 0,
            },
            {
              label: "禁用",
              value: -1,
            },
          ],
          filterMultiple: false,
          filterRemote: (e) => {
            let v = "";
            if (e.length > 0) {
              v = e[0];
            }
            this.searchForm.status = v;
            this.searchForm.pageNumber = 1;
            this.getDataList();
          },
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true,
          sortType: "desc",
          width: 180,
        },
        {
          title: "操作",
          key: "action",
          width: 170,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            let enableOrDisable = "";
            if (params.row.status == 0) {
              enableOrDisable = h(
                "a",
                {
                  on: {
                    click: () => {
                      this.disable(params.row);
                    },
                  },
                },
                "禁用"
              );
            } else {
              enableOrDisable = h(
                "a",
                {
                  on: {
                    click: () => {
                      this.enable(params.row);
                    },
                  },
                },
                "启用"
              );
            }
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.edit(params.row);
                    },
                  },
                },
                "编辑"
              ),
              h("Divider", {
                props: {
                  type: "vertical",
                },
              }),
              enableOrDisable,
              h("Divider", {
                props: {
                  type: "vertical",
                },
              }),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.remove(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      exportColumns: [
        {
          title: "用户名",
          key: "username",
        },
        {
          title: "头像",
          key: "avatar",
        },
        {
          title: "所属部门ID",
          key: "departmentId",
        },
        {
          title: "所属部门",
          key: "departmentTitle",
        },
        {
          title: "手机",
          key: "mobile",
        },
        {
          title: "邮箱",
          key: "email",
        },
        {
          title: "性别",
          key: "sex",
        },
        {
          title: "用户类型",
          key: "type",
        },
        {
          title: "状态",
          key: "status",
        },
        {
          title: "删除标志",
          key: "delFlag",
        },
        {
          title: "创建时间",
          key: "createTime",
        },
        {
          title: "更新时间",
          key: "updateTime",
        },
      ],
      data: [],
      exportData: [],
      total: 0,
    };
  },
  methods: {
    init() {
      this.getDataList();
    },
    handleSelectDepTree(v) {
      this.form.departmentId = v;
    },
    handleSelectDep(v) {
      this.searchForm.departmentId = v;
    },
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    selectDateRange(v) {
      if (v) {
        this.searchForm.startDate = v[0];
        this.searchForm.endDate = v[1];
      }
    },
    getDataList() {
      // 多条件搜索用户列表
      this.loading = true;
      getUserListData(this.searchForm).then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
          if (this.data.length == 0 && this.searchForm.pageNumber > 1) {
            this.searchForm.pageNumber -= 1;
            this.getDataList();
          }
        }
      });
    },
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.selectDate = null;
      this.searchForm.startDate = "";
      this.searchForm.endDate = "";
      this.selectDep = [];
      this.searchForm.departmentId = "";
      // 重新加载数据
      this.getDataList();
    },
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == "normal") {
        this.searchForm.order = "";
      }
      this.getDataList();
    },
    handleDropdown(name) {
      if (name == "refresh") {
        this.getDataList();
      } else if (name == "reset") {
        if (this.selectList.length <= 0) {
          this.$Message.warning("您还未选择要重置密码的用户");
          return;
        }
        this.$refs.checkPass.show();
      } else if (name == "exportData") {
        if (this.selectList.length <= 0) {
          this.$Message.warning("您还未选择要导出的数据");
          return;
        }
        this.$Modal.confirm({
          title: "确认导出",
          content: "您确认要导出所选 " + this.selectList.length + " 条数据?",
          onOk: () => {
            this.$refs.exportTable.exportCsv({
              filename: "用户数据",
            });
          },
        });
      } else if (name == "exportAll") {
        this.modalExportAll = true;
      } else if (name == "importData") {
        this.$Modal.info({
          title: "请获取完整版",
          content: "支付链接: http://xpay.exrick.cn/pay?xboot",
        });
      }
    },
    exportAll() {
      getAllUserData().then((res) => {
        this.modalExportAll = false;
        if (res.success) {
          this.exportData = res.result;
          setTimeout(() => {
            this.$refs.exportTable.exportCsv({
              filename: "用户全部数据",
            });
          }, 1000);
        }
      });
    },
    resetPass() {
      this.$Modal.confirm({
        title: "确认重置",
        content:
          "您确认要重置所选的 " +
          this.selectList.length +
          " 条用户数据密码为【123456】?",
        loading: true,
        onOk: () => {
          let ids = "";
          this.selectList.forEach(function (e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          resetUserPass({ ids: ids }).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.clearSelectAll();
              this.getDataList();
            }
          });
        },
      });
    },
    showDetail(v) {
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
      this.showType = "0";
      this.showUser = true;
    },
    add() {
      this.showType = "2";
      this.showUser = true;
    },
    edit(v) {
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
      this.showType = "1";
      this.showUser = true;
    },
    enable(v) {
      this.$Modal.confirm({
        title: "确认启用",
        content: "您确认要启用用户 " + v.username + " ?",
        loading: true,
        onOk: () => {
          enableUser(v.id).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    disable(v) {
      this.$Modal.confirm({
        title: "确认禁用",
        content: "您确认要禁用用户 " + v.username + " ?",
        loading: true,
        onOk: () => {
          disableUser(v.id).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除用户 " + v.username + " ?",
        loading: true,
        onOk: () => {
          deleteUser({ ids: v.id }).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.clearSelectAll();
              this.$Message.success("删除成功");
              this.getDataList();
            }
          });
        },
      });
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
    showSelect(e) {
      this.exportData = e;
      this.selectList = e;
      this.selectList.length = e.length;
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    delAll() {
      if (this.selectList.length <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectList.length + " 条数据?",
        loading: true,
        onOk: () => {
          let ids = "";
          this.selectList.forEach(function (e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          deleteUser({ ids: ids }).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              this.clearSelectAll();
              this.getDataList();
            }
          });
        },
      });
    },
  },
  mounted() {
    // 计算高度
    this.height = Number(document.documentElement.clientHeight - 230);
    this.init();
  },
};
</script>