<style lang="less">
@import "./quartzManage.less";
</style>
<template>
  <div class="search">
    <Row>
      <Col>
        <Card>
          <Row class="operation">
            <Button @click="addRole" type="primary" icon="md-add">安排新任务</Button>
            <Button @click="delAll" icon="md-trash">批量删除</Button>
            <Button @click="init" icon="md-refresh">刷新</Button>
            <circleLoading v-if="operationLoading"/>
          </Row>
          <Row>
            <Alert show-icon>
              已选择
              <span class="select-count">{{selectCount}}</span> 项
              <a class="select-clear" @click="clearSelectAll">清空</a>
            </Alert>
          </Row>
          <Row>
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
          </Row>
          <Row type="flex" justify="end" class="page">
            <Page
              :current="pageNumber"
              :total="total"
              :page-size="pageSize"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              :page-size-opts="[10,20,50]"
              size="small"
              show-total
              show-elevator
              show-sizer
            ></Page>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal draggable :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="80" :rules="formValidate">
        <FormItem label="任务类名" prop="jobClassName">
          <Input
            v-model="form.jobClassName"
            placeholder="例如 cn.exrick.xboot.quartz.jobs.Job"
            clearable
          />
        </FormItem>
        <FormItem label="cron表达式" prop="cronExpression" style="margin-bottom: 5px;">
          <Input v-model="form.cronExpression" clearable/>
          <a target="_blank" href="http://cron.qqe2.com/">
            <Icon type="md-arrow-dropright-circle" size="16" style="margin:0 3px 3px 0;"/>在线cron表达式生成
          </a>
        </FormItem>
        <FormItem label="参数" prop="parameter">
          <Input v-model="form.parameter"/>
        </FormItem>
        <FormItem label="备注" prop="description">
          <Input v-model="form.description"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelSubmit">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">保存并安排</Button>
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
  deleteQuartz
} from "@/api/index";
import circleLoading from "@/views/my-components/circle-loading.vue";
export default {
  name: "quartz-manage",
  components: {
    circleLoading
  },
  data() {
    return {
      loading: true,
      operationLoading: false,
      sortColumn: "createTime",
      sortType: "desc",
      modalType: 0,
      modalVisible: false,
      modalTitle: "",
      form: {
        id: "",
        jobClassName: "",
        cronExpression: "",
        paramter: "",
        description: ""
      },
      formValidate: {
        jobClassName: [
          { required: true, message: "任务类名不能为空", trigger: "blur" }
        ],
        cronExpression: [
          { required: true, message: "cron表达式不能为空", trigger: "blur" }
        ]
      },
      submitLoading: false,
      selectList: [],
      selectCount: 0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "任务类名",
          key: "jobClassName",
          sortable: true,
          width: 200
        },
        {
          title: "cron表达式",
          key: "cronExpression",
          sortable: true,
          width: 200
        },
        {
          title: "参数",
          key: "parameter",
          sortable: true,
          width: 180
        },
        {
          title: "备注",
          key: "description",
          sortable: true,
          minWidth: 180
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width: 140,
          render: (h, params) => {
            let re = "";
            if (params.row.status === 0) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      type: "dot",
                      color: "success"
                    }
                  },
                  "执行中"
                )
              ]);
            } else if (params.row.status === -1) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      type: "dot",
                      color: "error"
                    }
                  },
                  "已停止"
                )
              ]);
            }
          },
          filters: [
            {
              label: "执行中",
              value: 0
            },
            {
              label: "已停止",
              value: -1
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 0) {
              return row.status === 0;
            } else if (value === -1) {
              return row.status === -1;
            }
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 280,
          render: (h, params) => {
            let runOrResume = "";
            if (params.row.status == 0) {
              runOrResume = h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                    icon: "md-pause"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.pause(params.row);
                    }
                  }
                },
                "暂停"
              );
            } else {
              runOrResume = h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    icon: "md-play"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.resume(params.row);
                    }
                  }
                },
                "恢复执行"
              );
            }
            return h("div", [
              runOrResume,
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
                    click: () => {
                      this.edit(params.row);
                    }
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
      pageNumber: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    init() {
      this.getQuartzList();
    },
    changePage(v) {
      this.pageNumber = v;
      this.getQuartzList();
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.pageSize = v;
      this.getQuartzList();
    },
    changeSort(e) {
      this.sortColumn = e.key;
      this.sortType = e.order;
      if (e.order === "normal") {
        this.sortType = "";
      }
      this.getQuartzList();
    },
    getQuartzList() {
      this.loading = true;
      let params = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: this.sortColumn,
        order: this.sortType
      };
      getQuartzListData(params).then(res => {
        this.loading = false;
        if (res.success === true) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
        }
      });
    },
    cancelSubmit() {
      this.modalVisible = false;
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.modalType === 0) {
            // 添加
            this.submitLoading = true;
            addQuartz(this.form).then(res => {
              this.submitLoading = false;
              if (res.success === true) {
                this.$Message.success("操作成功");
                this.getQuartzList();
                this.modalVisible = false;
              }
            });
          } else {
            this.submitLoading = true;
            editQuartz(this.form).then(res => {
              this.submitLoading = false;
              if (res.success === true) {
                this.$Message.success("操作成功");
                this.getQuartzList();
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
        description: ""
      }),
        (this.modalVisible = true);
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑任务";
      // 转换null为""
      for (let attr in v) {
        if (v[attr] === null) {
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
        onOk: () => {
          this.operationLoading = true;
          pauseQuartz(v).then(res => {
            this.operationLoading = false;
            if (res.success === true) {
              this.$Message.success("操作成功");
              this.getQuartzList();
            }
          });
        }
      });
    },
    resume(v) {
      this.$Modal.confirm({
        title: "确认恢复",
        content: "您确认要恢复任务 " + v.jobClassName + " ?",
        onOk: () => {
          this.operationLoading = true;
          resumeQuartz(v).then(res => {
            this.operationLoading = false;
            if (res.success === true) {
              this.$Message.success("操作成功");
              this.getQuartzList();
            }
          });
        }
      });
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除任务 " + v.jobClassName + " ?",
        onOk: () => {
          this.operationLoading = true;
          deleteQuartz(v.id).then(res => {
            this.operationLoading = false;
            if (res.success === true) {
              this.$Message.success("操作成功");
              this.getQuartzList();
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
          deleteQuartz(ids).then(res => {
            this.operationLoading = false;
            if (res.success === true) {
              this.$Message.success("删除成功");
              this.clearSelectAll();
              this.getQuartzList();
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