<style lang="less">
@import "./logManage.less";
</style>
<template>
  <div class="search">
    <Row>
      <Col>
        <Card>
          <Tabs :animated="false" @on-click="changeTab">
            <TabPane label="登陆日志" name="login">
            </TabPane>
            <TabPane label="操作日志" name="operation">
            </TabPane>
          </Tabs>
          <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form">
            <Form-item label="搜索日志">
              <Input type="text" v-model="searchKey" clearable placeholder="请输入搜索关键词" style="width: 200px"/>
            </Form-item>
            <Form-item label="创建时间">
              <DatePicker type="daterange" v-model="selectDate" format="yyyy-MM-dd" clearable @on-change="selectDateRange" placeholder="选择起始时间" style="width: 200px"></DatePicker>
            </Form-item>
            <Form-item style="margin-left:-35px;" class="br">
              <Button @click="handleSearch"  type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset" >重置</Button>
            </Form-item>
          </Form>
          <Row class="operation">
            <Button @click="clearAll" type="error" icon="md-trash">清空全部</Button>
            <Button @click="delAll" icon="md-trash">批量删除</Button>
            <Button @click="getLogList" icon="md-refresh">刷新</Button>
            <circleLoading v-if="operationLoading"/>
          </Row>
          <Row>
            <Alert show-icon>
              已选择 <span class="select-count">{{selectCount}}</span> 项
              <a class="select-clear" @click="clearSelectAll">清空</a>
            </Alert>
          </Row>
          <Row>
            <Table :loading="loading" border :columns="columns" :data="data" ref="table" sortable="custom" @on-sort-change="changeSort" @on-selection-change="changeSelect"></Table>
          </Row>
          <Row type="flex" justify="end" class="page">
            <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50]" size="small" show-total show-elevator show-sizer></Page>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getLogListData, deleteLog, deleteAllLog } from "@/api/index";
import circleLoading from "@/views/my-components/circle-loading.vue";
export default {
  name: "role-manage",
  components: {
    circleLoading
  },
  data() {
    return {
      loading: true,
      operationLoading: false,
      selectList: [],
      selectCount: 0,
      selectDate: null,
      searchKey: "",
      searchForm: {
        type: 1,
        pageNumber: 1,
        pageSize: 10,
        startDate: "",
        endDate: "",
        sort: "createTime",
        order: "desc"
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          type: "index",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          title: "操作名称",
          key: "name",
          width: 110,
          sortable: true,
          fixed: "left"
        },
        {
          title: "请求类型",
          key: "requestType",
          width: 120,
          align: "center",
          sortable: true,
          filters: [
            {
              label: "GET",
              value: "GET"
            },
            {
              label: "POST",
              value: "POST"
            },
            {
              label: "PUT",
              value: "PUT"
            },
            {
              label: "DELETE",
              value: "DELETE"
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === "GET") {
              return row.requestType === "GET";
            } else if (value === "POST") {
              return row.requestType === "POST";
            } else if (value === "PUT") {
              return row.requestType === "PUT";
            } else if (value === "DELETE") {
              return row.requestType === "DELETE";
            }
          }
        },
        {
          title: "请求路径",
          width: 150,
          key: "requestUrl"
        },
        {
          title: "请求参数",
          minWidth: 200,
          key: "requestParam",
          tooltip: true
        },
        {
          title: "登录用户",
          key: "username",
          width: 105,
          sortable: true
        },
        {
          title: "IP",
          key: "ip",
          width: 120,
          sortable: true
        },
        {
          title: "IP信息",
          key: "ipInfo",
          width: 100,
          sortable: true
        },
        {
          title: "耗时(毫秒)",
          key: "costTime",
          width: 130,
          sortable: true,
          align: "center",
          filters: [
            {
              label: "≤1000毫秒",
              value: 0
            },
            {
              label: ">1000毫秒",
              value: 1
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 0) {
              return row.costTime <= 1000;
            } else if (value === 1) {
              return row.costTime > 1000;
            }
          }
        },
        {
          title: "日志类型",
          key: "logType",
          align: "center",
          width: 110,
          render: (h, params) => {
            if (params.row.logType == 0) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "blue"
                    }
                  },
                  "操作日志"
                )
              ]);
            } else if (params.row.logType == 1) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "green"
                    }
                  },
                  "登陆日志"
                )
              ]);
            }
          }
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true,
          width: 150,
          sortType: "desc"
        },
        {
          title: "操作",
          key: "action",
          width: 98,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: [],
      total: 0
    };
  },
  methods: {
    init() {
      this.getLogList();
    },
    changeTab(v) {
      if (v == "login") {
        this.searchForm.type = 1;
      } else if (v == "operation") {
        this.searchForm.type = 0;
      }
      this.getLogList();
    },
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getLogList();
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getLogList();
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
      this.getLogList();
    },
    getLogList() {
      this.loading = true;
      this.searchForm.key = this.searchKey;
      getLogListData(this.searchForm).then(res => {
        this.loading = false;
        if (res.success === true) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
        }
      });
    },
    handleReset() {
      this.searchKey = "";
      this.selectDate = null;
      this.searchForm.startDate = "";
      this.searchForm.endDate = "";
      this.getLogList();
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除该条数据?",
        onOk: () => {
          this.operationLoading = true;
          deleteLog(v.id).then(res => {
            this.operationLoading = false;
            if (res.success === true) {
              this.$Message.success("删除成功");
              this.init();
            }
          });
        }
      });
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order === "normal") {
        this.searchForm.order = "";
      }
      this.getLogList();
    },
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
        onOk: () => {
          let ids = "";
          this.selectList.forEach(function(e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          this.operationLoading = true;
          deleteLog(ids).then(res => {
            this.operationLoading = false;
            if (res.success === true) {
              this.$Message.success("删除成功");
              this.clearSelectAll();
              this.init();
            }
          });
        }
      });
    },
    clearAll() {
      this.$Modal.confirm({
        title: "请谨慎进行此操作！",
        content: "您确认要彻底清空删除所有数据?",
        onOk: () => {
          this.loading = true;
          let ids = "";
          this.selectList.forEach(function(e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          deleteAllLog().then(res => {
            this.loading = false;
            if (res.success === true) {
              this.$Message.success("清空日志成功");
              this.clearSelectAll();
              this.init();
            }
          });
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>