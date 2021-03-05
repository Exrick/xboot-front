<style lang="less">
@import "@/styles/table-common.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation" align="middle" justify="space-between">
        <div>
          <Button @click="add" type="primary" icon="md-add">添加</Button>
          <Button @click="delAll" icon="md-trash">批量删除</Button>
          <Button @click="getDataList" icon="md-refresh">刷新</Button>
          <Button type="dashed" @click="openTip = !openTip">{{
            openTip ? "关闭提示" : "开启提示"
          }}</Button>
        </div>
        <!-- 动态列按钮 -->
        <Poptip placement="bottom-end" width="160">
          <Button shape="circle" icon="md-apps"></Button>
          <div slot="content">
            <CheckboxGroup v-model="columnSettings" @on-change="changeColumns">
              <div
                v-for="(column, i) in columns"
                :key="i"
                style="margin: 3px 0"
              >
                <Checkbox
                  :label="column.key"
                  :disabled="column.disabled"
                  v-if="column.key && column.key.indexOf(whiteColumns) <= -1"
                >
                  <span>{{ column.title }}</span>
                </Checkbox>
              </div>
            </CheckboxGroup>
          </div>
        </Poptip>
      </Row>
      <Alert show-icon v-show="openTip">
        已选择
        <span class="select-count">{{ selectList.length }}</span> 项
        <a class="select-clear" @click="clearSelectAll">清空</a>
        这里还可以做一些数据统计显示
        <span style="float: right">点击右上角按钮配置动态列↑</span>
      </Alert>
      <Table
        :loading="loading"
        border
        :columns="dynamicColums"
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
      :title="modalTitle"
      v-model="modalVisible"
      :mask-closable="false"
      :width="500"
    >
      <Form ref="form" :model="form" :label-width="80" :rules="formValidate">
        <FormItem label="名称" prop="name">
          <Input v-model="form.name" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit"
          >提交</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  data() {
    return {
      openTip: true, // 显示提示
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      form: {
        // 添加或编辑表单对象初始化数据
        name: "",
      },
      // 表单验证规则
      formValidate: {
        name: [{ required: true, message: "不能为空", trigger: "change" }],
      },
      submitLoading: false, // 添加或编辑提交状态
      selectList: [], // 多选数据
      // 表格动态列 默认勾选显示的列的key
      columnSettings: ["name", "sex", "createTime", "updateTime"],
      // 不能配置的列（不显示）
      whiteColumns: ["action"],
      columns: [
        // 表头
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
          title: "名称",
          key: "name",
          sortable: true,
        },
        {
          title: "性别",
          key: "sex",
          sortable: true,
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true,
          sortType: "desc",
        },
        {
          title: "更新时间",
          key: "updateTime",
          sortable: true,
          // 禁止配置的列
          disabled: true,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
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
      columnChange: false,
      data: [], // 表单数据
      total: 0, // 表单数据总数
    };
  },
  // 表格动态列 计算属性
  computed: {
    dynamicColums: function () {
      this.columnChange;
      return this.columns.filter((item) => item.hide != true);
    },
  },
  methods: {
    init() {
      this.getDataList();
    },
    changeColumns(v) {
      this.columns.map((item) => {
        let hide = true;
        for (let i = 0; i < v.length; i++) {
          if (!item.key) {
            hide = false;
            break;
          }
          if (item.key == v[i] || item.key.indexOf(this.whiteColumns) > -1) {
            hide = false;
            break;
          }
        }
        item.hide = hide;
        return item;
      });
      // 触发计算方法
      this.columnChange = !this.columnChange;
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
      // 请求后端获取表单数据 请自行修改接口
      // this.getRequest("请求路径", this.searchForm).then(res => {
      //   this.loading = false;
      //   if (res.success) {
      //     this.data = res.result.content;
      //     this.total = res.result.totalElements;
      //     if (this.data.length == 0 && this.searchForm.pageNumber > 1) {
      //       this.searchForm.pageNumber -= 1;
      //       this.getDataList();
      //     }
      //   }
      // });
      // 以下为模拟数据
      this.data = [
        {
          id: "1",
          name: "XBoot",
          sex: "男",
          createTime: "2018-08-08 00:08:00",
          updateTime: "2018-08-08 00:08:00",
        },
        {
          id: "2",
          name: "Exrick",
          sex: "女",
          createTime: "2018-08-08 00:08:00",
          updateTime: "2018-08-08 00:08:00",
        },
      ];
      this.total = this.data.length;
      this.loading = false;
    },
    handleCancel() {
      this.modalVisible = false;
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            delete this.form.id;
            // this.postRequest("请求地址", this.form).then(res => {
            //   this.submitLoading = false;
            //   if (res.success) {
            //     this.$Message.success("操作成功");
            //     this.getDataList();
            //     this.modalVisible = false;
            //   }
            // });
            // 模拟请求成功
            this.submitLoading = false;
            this.$Message.success("操作成功");
            this.getDataList();
            this.modalVisible = false;
          } else {
            // 编辑
            // this.postRequest("请求地址", this.form).then(res => {
            //   this.submitLoading = false;
            //   if (res.success) {
            //     this.$Message.success("操作成功");
            //     this.getDataList();
            //     this.modalVisible = false;
            //   }
            // });
            // 模拟请求成功
            this.submitLoading = false;
            this.$Message.success("操作成功");
            this.getDataList();
            this.modalVisible = false;
          }
        }
      });
    },
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      delete this.form.id;
      this.modalVisible = true;
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑";
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
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v.name + " ?",
        loading: true,
        onOk: () => {
          // 删除
          // this.deleteRequest("请求地址，如/deleteByIds/" + v.id).then(res => {
          //   this.$Modal.remove();
          //   if (res.success) {
          //     this.$Message.success("操作成功");
          //     this.clearSelectAll();
          //     this.getDataList();
          //   }
          // });
          // 模拟请求成功
          this.$Message.success("操作成功");
          this.clearSelectAll();
          this.$Modal.remove();
          this.getDataList();
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
          // 批量删除
          // this.deleteRequest("请求地址，如/deleteByIds/" + ids).then(res => {
          //   this.$Modal.remove();
          //   if (res.success) {
          //     this.$Message.success("操作成功");
          //     this.clearSelectAll();
          //     this.getDataList();
          //   }
          // });
          // 模拟请求成功
          this.$Message.success("操作成功");
          this.$Modal.remove();
          this.clearSelectAll();
          this.getDataList();
        },
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>