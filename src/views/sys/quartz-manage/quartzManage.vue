<style lang="less">
@import "@/styles/table-common.less";
@import "./quartzManage.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="addRole" type="primary" icon="md-add"
          >添加新任务</Button
        >
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Button @click="init" icon="md-refresh">刷新</Button>
        <Button type="dashed" @click="openTip = !openTip">{{
          openTip ? "关闭提示" : "开启提示"
        }}</Button>
        <Input
          v-model="searchForm.key"
          suffix="ios-search"
          @on-change="getDataList"
          placeholder="输入关键词搜索"
          clearable
          style="width: 250px"
        />
      </Row>
      <Alert show-icon v-show="openTip">
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

    <Modal
      draggable
      :title="modalTitle"
      v-model="modalVisible"
      :mask-closable="false"
      :width="500"
    >
      <Form ref="form" :model="form" :label-width="100" :rules="formValidate">
        <FormItem label="任务类引用路径" prop="jobClassName">
          <Input
            v-model="form.jobClassName"
            placeholder="例如 cn.exrick.xboot.quartz.jobs.Job"
            clearable
          />
        </FormItem>
        <FormItem
          label="cron表达式"
          prop="cronExpression"
          style="margin-bottom: 5px"
        >
          <Input v-model="form.cronExpression" clearable />
          <a target="_blank" href="https://www.pppet.net/">
            <Icon
              type="md-arrow-dropright-circle"
              size="16"
              style="margin: 0 3px 3px 0"
            />在线cron表达式生成
          </a>
        </FormItem>
        <FormItem label="参数" prop="parameter">
          <Input v-model="form.parameter" />
        </FormItem>
        <FormItem label="备注" prop="description">
          <Input v-model="form.description" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelSubmit">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit"
          >保存并执行</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getQuartzListData,
  addQuartz,
  editQuartz,
  pauseQuartz,
  resumeQuartz,
  deleteQuartz,
} from "@/api/index";
export default {
  name: "quartz-manage",
  data() {
    return {
      openTip: true,
      loading: true,
      sortColumn: "createTime",
      sortType: "desc",
      modalType: 0,
      modalVisible: false,
      modalTitle: "",
      searchForm: {
        // 搜索框初始化对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
        key: "",
      },
      form: {
        id: "",
        jobClassName: "",
        cronExpression: "",
        paramter: "",
        description: "",
      },
      formValidate: {
        jobClassName: [
          { required: true, message: "任务类名不能为空", trigger: "change" },
        ],
        cronExpression: [
          { required: true, message: "cron表达式不能为空", trigger: "change" },
        ],
      },
      submitLoading: false,
      selectList: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "任务类",
          key: "jobClassName",
          sortable: true,
          minWidth: 300,
        },
        {
          title: "cron表达式",
          key: "cronExpression",
          sortable: true,
          width: 150,
        },
        {
          title: "参数",
          key: "parameter",
          sortable: true,
          minWidth: 180,
        },
        {
          title: "备注",
          key: "description",
          sortable: true,
          minWidth: 180,
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width: 130,
          render: (h, params) => {
            let re = "";
            if (params.row.status == 0) {
              return h("div", [
                h("Badge", {
                  props: {
                    status: "success",
                    text: "执行中",
                  },
                }),
              ]);
            } else if (params.row.status == -1) {
              return h("div", [
                h("Badge", {
                  props: {
                    status: "error",
                    text: "已停止",
                  },
                }),
              ]);
            }
          },
          filters: [
            {
              label: "执行中",
              value: 0,
            },
            {
              label: "已停止",
              value: -1,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            return row.status == value;
          },
        },
        {
          title: "创建时间",
          key: "createTime",
          width: 170,
          sortable: true,
          sortType: "desc",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          fixed: "right",
          width: 220,
          render: (h, params) => {
            let runOrResume = "";
            if (params.row.status == 0) {
              runOrResume = h(
                "a",
                {
                  on: {
                    click: () => {
                      this.pause(params.row);
                    },
                  },
                },
                "暂停"
              );
            } else {
              runOrResume = h(
                "a",
                {
                  on: {
                    click: () => {
                      this.resume(params.row);
                    },
                  },
                },
                "恢复执行"
              );
            }
            return h("div", [
              runOrResume,
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
    init() {
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
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == "normal") {
        this.searchForm.order = "";
      }
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      getQuartzListData(this.searchForm).then((res) => {
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
    cancelSubmit() {
      this.modalVisible = false;
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType == 0) {
            // 添加
            this.submitLoading = true;
            addQuartz(this.form).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          } else {
            this.submitLoading = true;
            editQuartz(this.form).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          }
        }
      });
    },
    addRole() {
      this.modalType = 0;
      this.modalTitle = "添加任务";
      this.$refs.form.resetFields();
      (this.form = {
        paramter: "",
        description: "",
      }),
        (this.modalVisible = true);
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑任务";
      this.$refs.form.resetFields();
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
      this.modalVisible = true;
    },
    pause(v) {
      this.$Modal.confirm({
        title: "确认停止",
        content: "您确认要停止任务 " + v.jobClassName + " ?",
        loading: true,
        onOk: () => {
          pauseQuartz(v).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    resume(v) {
      this.$Modal.confirm({
        title: "确认恢复",
        content: "您确认要恢复任务 " + v.jobClassName + " ?",
        loading: true,
        onOk: () => {
          resumeQuartz(v).then((res) => {
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
        content: "您确认要删除任务 " + v.jobClassName + " ?",
        loading: true,
        onOk: () => {
          deleteQuartz({ ids: v.id }).then((res) => {
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
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    changeSelect(e) {
      this.selectList = e;
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
          deleteQuartz({ ids: ids }).then((res) => {
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
    this.init();
  },
};
</script>