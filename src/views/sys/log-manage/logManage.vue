<style lang="less">
@import "@/styles/table-common.less";
@import "./logManage.less";
</style>
<template>
  <div class="search">
    <Card>
      <Tabs
        v-model="tabName"
        :animated="false"
        @on-click="changeTab"
        v-if="!member"
      >
        <TabPane label="登录日志" name="1"></TabPane>
        <TabPane label="操作日志" name="0"></TabPane>
      </Tabs>
      <Tabs
        v-model="tabName"
        :animated="false"
        @on-click="changeTab"
        v-if="member"
      >
        <TabPane label="登录日志" name="3"></TabPane>
        <TabPane label="操作日志" name="2"></TabPane>
      </Tabs>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <FormItem label="搜索日志">
            <Input
              type="text"
              v-model="searchKey"
              clearable
              placeholder="请输入搜索关键词"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="创建时间">
            <DatePicker
              :options="options"
              type="daterange"
              v-model="selectDate"
              format="yyyy-MM-dd"
              clearable
              @on-change="selectDateRange"
              placeholder="选择起始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem style="margin-left: -35px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search"
              >搜索</Button
            >
            <Button @click="handleReset">重置</Button>
          </FormItem>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="clearAll" type="error" icon="md-trash">清空全部</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
        <Button type="dashed" @click="openSearch = !openSearch">{{
          openSearch ? "关闭搜索" : "开启搜索"
        }}</Button>
        <Button type="dashed" @click="openTip = !openTip">{{
          openTip ? "关闭提示" : "开启提示"
        }}</Button>
      </Row>
      <Alert v-show="openTip">
        已选择
        <span class="select-count">{{ selectList.length }}</span> 项
        <a class="select-clear" @click="clearSelectAll">清空</a>
      </Alert>
      <Table
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        ref="table"
        sortable="custom"
        @on-sort-change="changeSort"
        @on-selection-change="changeSelect"
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
  </div>
</template>

<script>
import { getLogListData, deleteLog, deleteAllLog } from "@/api/index";
import { shortcuts } from "@/libs/shortcuts";
export default {
  name: "log-manage",
  data() {
    return {
      tabName: "",
      member: false,
      openSearch: true,
      openTip: true,
      loading: true,
      selectList: [],
      selectDate: null,
      options: {
        shortcuts: shortcuts,
      },
      searchKey: "",
      searchForm: {
        type: "",
        pageNumber: 1,
        pageSize: 10,
        startDate: "",
        endDate: "",
        sort: "createTime",
        order: "desc",
      },
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
          title: "操作名称",
          key: "name",
          width: 120,
          fixed: "left",
          tooltip: true,
        },
        {
          title: "请求类型",
          key: "requestType",
          width: 120,
          align: "center",
          filters: [
            {
              label: "GET",
              value: "GET",
            },
            {
              label: "POST",
              value: "POST",
            },
            {
              label: "PUT",
              value: "PUT",
            },
            {
              label: "DELETE",
              value: "DELETE",
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            return row.requestType == value;
          },
        },
        {
          title: "请求路径",
          width: 150,
          key: "requestUrl",
          tooltip: true,
        },
        {
          title: "请求参数",
          minWidth: 200,
          key: "requestParam",
          tooltip: true,
        },
        {
          title: "登录账号",
          key: "username",
          minWidth: 120,
          tooltip: true,
        },
        {
          title: "IP",
          key: "ip",
          width: 150,
          tooltip: true,
        },
        {
          title: "IP信息",
          key: "ipInfo",
          width: 190,
        },
        {
          title: "耗时(毫秒)",
          key: "costTime",
          width: 150,
          sortable: true,
          align: "center",
          filters: [
            {
              label: "≤1000毫秒",
              value: 0,
            },
            {
              label: ">1000毫秒",
              value: 1,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value == 0) {
              return row.costTime <= 1000;
            } else if (value == 1) {
              return row.costTime > 1000;
            }
          },
        },
        {
          title: "设备信息",
          minWidth: 200,
          key: "device",
          tooltip: true,
        },
        {
          title: "日志类型",
          key: "logType",
          align: "center",
          width: 110,
          render: (h, params) => {
            let color = "",
              text = "";
            if (params.row.logType == 0) {
              color = "blue";
              text = "操作日志";
            } else if (params.row.logType == 1) {
              color = "green";
              text = "登陆日志";
            }
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: color,
                  },
                },
                text
              ),
            ]);
          },
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true,
          width: 170,
          sortType: "desc",
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
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
      data: [],
      total: 0,
    };
  },
  methods: {
    init() {},
    changeTab(v) {
      this.searchForm.type = v;
      this.getDataList();
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
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      this.searchForm.key = this.searchKey;
      getLogListData(this.searchForm).then((res) => {
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
    handleReset() {
      this.searchKey = "";
      this.selectDate = null;
      this.searchForm.startDate = "";
      this.searchForm.endDate = "";
      this.getDataList();
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除该条数据?",
        loading: true,
        onOk: () => {
          deleteLog({ ids: v.id }).then((res) => {
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
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    changeSelect(e) {
      this.selectList = e;
    },
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == "normal") {
        this.searchForm.order = "";
      }
      this.getDataList();
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
          deleteLog({ ids: ids }).then((res) => {
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
    clearAll() {
      this.$Modal.confirm({
        title: "请谨慎进行此操作！",
        content: "您确认要彻底清空删除所有数据?",
        onOk: () => {
          this.loading = true;
          let ids = "";
          this.selectList.forEach(function (e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          deleteAllLog().then((res) => {
            this.loading = false;
            if (res.success) {
              this.$Message.success("清空日志成功");
              this.clearSelectAll();
              this.getDataList();
            }
          });
        },
      });
    },
    changeLog(name) {
      if (name.indexOf("member") > -1) {
        this.member = true;
        this.tabName = "3";
        this.searchForm.type = "3";
      } else {
        this.member = false;
        this.tabName = "1";
        this.searchForm.type = "1";
      }
      this.searchForm.pageNumber = 1;
      this.getDataList();
    },
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      this.changeLog(to.name);
    },
  },
  mounted() {
    this.changeLog(this.$route.name);
  },
};
</script>