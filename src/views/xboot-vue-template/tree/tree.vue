<style lang="less">
@import "@/styles/tree-common.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation" align="middle" justify="space-between">
        <div>
          <Button
            @click="add"
            type="primary"
            icon="md-add"
            v-show="showType == 'tree'"
            >添加子节点</Button
          >
          <Button @click="addRoot" icon="md-add">添加一级节点</Button>
          <Button @click="delAll" icon="md-trash">批量删除</Button>
          <Button @click="getParentList" icon="md-refresh">刷新</Button>
          <Input
            v-model="searchKey"
            suffix="ios-search"
            @on-change="search"
            placeholder="输入名称搜索"
            clearable
            style="width: 250px"
            v-show="showType == 'list'"
          />
          <i-switch
            v-model="strict"
            size="large"
            style="margin-left: 5px"
            v-show="showType == 'tree'"
          >
            <span slot="open">级联</span>
            <span slot="close">单选</span>
          </i-switch>
        </div>
        <div>
          <RadioGroup v-model="showType" type="button">
            <Radio title="树结构" label="tree">
              <Icon type="md-list"></Icon>
            </Radio>
            <Radio title="列表" label="list">
              <Icon type="ios-apps"></Icon>
            </Radio>
          </RadioGroup>
        </div>
      </Row>
      <Row type="flex" justify="start" :gutter="16" v-show="showType == 'tree'">
        <Col :sm="8" :md="8" :lg="8" :xl="6">
          <Alert show-icon>
            当前选择编辑：
            <span class="select-title">{{ editTitle }}</span>
            <a
              class="select-clear"
              v-show="form.id && editTitle"
              @click="cancelEdit"
              >取消选择</a
            >
          </Alert>
          <Input
            v-model="searchKey"
            suffix="ios-search"
            @on-change="search"
            placeholder="输入名称搜索"
            clearable
          />
          <div style="position: relative">
            <div class="tree-bar" :style="{ maxHeight: maxHeight }">
              <Tree
                ref="tree"
                :data="data"
                :load-data="loadData"
                show-checkbox
                @on-check-change="changeSelect"
                @on-select-change="selectTree"
                :check-strictly="!strict"
              ></Tree>
            </div>
            <Spin size="large" fix v-if="loading"></Spin>
          </div>
        </Col>
        <Col :sm="16" :md="16" :lg="16" :xl="9">
          <Form
            ref="form"
            :model="form"
            :label-width="100"
            :rules="formValidate"
          >
            <FormItem label="上级节点" prop="parentTitle" class="form-noheight">
              <div style="display: flex">
                <Input
                  v-model="form.parentTitle"
                  readonly
                  style="margin-right: 10px"
                />
                <Poptip
                  transfer
                  trigger="click"
                  placement="right-start"
                  title="选择上级节点"
                  width="250"
                >
                  <Button icon="md-list">选择分类</Button>
                  <div slot="content" class="tree-bar tree-select">
                    <Tree
                      :data="dataEdit"
                      :load-data="loadData"
                      @on-select-change="selectTreeEdit"
                    ></Tree>
                    <Spin size="large" fix v-if="loadingEdit"></Spin>
                  </div>
                </Poptip>
              </div>
            </FormItem>
            <FormItem label="节点名称" prop="title">
              <Input v-model="form.title" />
            </FormItem>
            <FormItem label="排序值" prop="sortOrder">
              <Tooltip
                trigger="hover"
                placement="right"
                content="值越小越靠前，支持小数"
              >
                <InputNumber
                  :max="1000"
                  :min="0"
                  v-model="form.sortOrder"
                ></InputNumber>
              </Tooltip>
            </FormItem>
            <FormItem label="是否启用" prop="status">
              <i-switch
                size="large"
                v-model="form.status"
                :true-value="0"
                :false-value="-1"
              >
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-switch>
            </FormItem>
            <FormItem class="br">
              <Button
                @click="submitEdit"
                :loading="submitLoading"
                :disabled="!form.id || !editTitle"
                type="primary"
                icon="ios-create-outline"
                >修改并保存</Button
              >
              <Button @click="handleReset">重置</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Alert show-icon v-show="showType == 'list'">
        已选择
        <span class="select-count">{{ selectList.length }}</span> 项
        <a class="select-clear" @click="clearSelectAll">清空</a>
      </Alert>
      <Table
        row-key="title"
        :load-data="loadData"
        :columns="columns"
        :data="data"
        :loading="loading"
        border
        :update-show-children="true"
        ref="table"
        @on-selection-change="showSelect"
        v-if="showType == 'list'"
      ></Table>
    </Card>

    <Modal
      :title="modalTitle"
      v-model="modalVisible"
      :mask-closable="false"
      :width="500"
    >
      <Form
        ref="formAdd"
        :model="formAdd"
        :label-width="100"
        :rules="formValidate"
      >
        <div v-if="showParent">
          <FormItem label="上级节点：">{{ form.title }}</FormItem>
        </div>
        <FormItem label="节点名称" prop="title">
          <Input v-model="formAdd.title" />
        </FormItem>
        <FormItem label="排序值" prop="sortOrder">
          <Tooltip
            trigger="hover"
            placement="right"
            content="值越小越靠前，支持小数"
          >
            <InputNumber
              :max="1000"
              :min="0"
              v-model="formAdd.sortOrder"
            ></InputNumber>
          </Tooltip>
        </FormItem>
        <FormItem label="是否启用" prop="status">
          <i-switch
            size="large"
            v-model="formAdd.status"
            :true-value="0"
            :false-value="-1"
          >
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalVisible = false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="submitAdd"
          >提交</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "tree",
  data() {
    return {
      showType: "tree",
      loading: false, // 树加载状态
      maxHeight: "500px",
      strict: true,
      loadingEdit: false, // 编辑上级树加载状态
      modalVisible: false, // 添加显示
      selectList: [], // 多选数据
      showParent: false, // 显示上级标识
      modalTitle: "", // 添加标题
      editTitle: "", // 编辑节点名称
      searchKey: "", // 搜索树
      form: {
        // 编辑对象初始化数据
        id: "",
        title: "",
        parentId: "",
        parentTitle: "",
        sortOrder: 0,
        status: 0,
      },
      formAdd: {
        // 添加对象初始化数据
      },
      formValidate: {
        // 表单验证规则
        title: [{ required: true, message: "名称不能为空", trigger: "change" }],
        sortOrder: [
          {
            required: true,
            type: "number",
            message: "排序值不能为空",
            trigger: "change",
          },
        ],
      },
      submitLoading: false,
      data: [],
      dataEdit: [],
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
          title: "名称",
          key: "title",
          minWidth: 120,
          sortable: true,
          tree: true,
        },
        {
          title: "排序",
          key: "sortOrder",
          width: 150,
          sortable: true,
          align: "center",
          sortType: "asc",
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true,
          width: 200,
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.tableAdd(params.row);
                    },
                  },
                },
                "添加子节点"
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
    };
  },
  methods: {
    init() {
      // 初始化一级节点
      this.getParentList();
      // 初始化一级节点为编辑上级节点使用
      this.getParentListEdit();
    },
    getParentList() {
      // this.loading = true;
      // this.getRequest("一级数据请求路径，如/tree/getByParentId/0").then(res => {
      //   this.loading = false;
      //   if (res.success) {
      //     res.result.forEach(function(e) {
      //       if (e.isParent) {
      //         e.loading = false;
      //         e.children = [];
      //         e._loading = false;
      //       }
      //     });
      //     this.data = res.result;
      //   }
      // });
      // 模拟请求成功
      this.data = [
        {
          title: "一级1",
          id: "1",
          parentId: "0",
          parentTitle: "一级节点",
          status: 0,
          loading: false,
          sortOrder: 1,
          createTime: "2020-12-10 19:51:59",
          children: [
            {
              title: "二级1",
              id: "2",
              loading: false,
              parentId: "1",
              status: 0,
              parentTitle: "一级1",
              sortOrder: 2,
              createTime: "2020-12-10 19:51:59",
              children: [
                {
                  title: "三级1",
                  id: "3",
                  status: 0,
                  parentId: "2",
                  parentTitle: "二级1",
                  sortOrder: 3,
                  createTime: "2020-12-10 19:51:59",
                },
              ],
            },
          ],
        },
        {
          title: "一级2",
          id: "4",
          parentId: "0",
          parentTitle: "一级节点",
          status: 0,
          sortOrder: 4,
          createTime: "2020-12-10 19:51:59",
        },
        {
          title: "一级3",
          id: "5",
          parentId: "0",
          parentTitle: "一级节点",
          status: -1,
          sortOrder: 5,
          createTime: "2020-12-10 19:51:59",
        },
      ];
    },
    getParentListEdit() {
      // this.loadingEdit = true;
      // this.getRequest("/tree/getByParentId/0").then(res => {
      //   this.loadingEdit = false;
      //   if (res.success) {
      //     res.result.forEach(function(e) {
      //       if (e.isParent) {
      //         e.loading = false;
      //         e.children = [];
      //       }
      //     });
      //     // 头部加入一级
      //     let first = {
      //       id: "0",
      //       title: "一级节点"
      //     };
      //     res.result.unshift(first);
      //     this.dataEdit = res.result;
      //   }
      // });
      // 模拟请求成功
      this.dataEdit = [
        {
          id: "0",
          title: "一级节点",
        },
        {
          title: "一级1",
          id: "1",
          parentId: "0",
          parentTitle: "一级节点",
          status: 0,
          loading: false,
          children: [
            {
              title: "二级1",
              id: "2",
              loading: false,
              parentId: "1",
              status: 0,
              parentTitle: "一级1",
              children: [
                {
                  title: "三级1",
                  id: "3",
                  status: 0,
                  parentId: "2",
                  parentTitle: "二级1",
                },
              ],
            },
          ],
        },
        {
          title: "一级2",
          id: "4",
          parentId: "0",
          parentTitle: "一级节点",
          status: 0,
        },
        {
          title: "一级3",
          id: "5",
          parentId: "0",
          parentTitle: "一级节点",
          status: -1,
        },
      ];
    },
    loadData(item, callback) {
      // 异步加载树子节点数据
      // this.getRequest("请求路径，如/tree/getByParentId/" + item.id).then(res => {
      //   if (res.success) {
      //     res.result.forEach(function(e) {
      //       if (e.isParent) {
      //         e.loading = false;
      //         e.children = [];
      //         e._loading = false;
      //       }
      //     });
      //     callback(res.result);
      //   }
      // });
    },
    search() {
      // 搜索树
      if (this.searchKey) {
        // 模拟请求
        // this.loading = true;
        // this.getRequest("搜索请求路径", { title: this.searchKey }).then(res => {
        //   this.loading = false;
        //   if (res.success) {
        //     res.result.forEach(function(e) {
        //       if (e.isParent) {
        //         e.loading = false;
        //         e.children = [];
        //         e._loading = false;
        //       }
        //     });
        //     this.data = res.result;
        //   }
        // });
        // 模拟请求成功
        this.data = [
          {
            title: "这里需要请求后端接口",
            id: "1",
            parentId: "0",
            parentTitle: "一级节点",
            status: 0,
            sortOrder: 1,
            createTime: "2020-12-10 19:51:59",
          },
          {
            title: "所以这里是假数据",
            id: "4",
            parentId: "0",
            parentTitle: "一级节点",
            status: 0,
            sortOrder: 2,
            createTime: "2020-12-10 19:51:59",
          },
          {
            title: "我是被禁用的节点",
            id: "5",
            parentId: "0",
            parentTitle: "一级节点",
            status: -1,
            sortOrder: 3,
            createTime: "2020-12-10 19:51:59",
          },
        ];
      } else {
        // 为空重新加载
        this.getParentList();
      }
    },
    selectTree(v) {
      if (v.length > 0) {
        // 转换null为""
        for (let attr in v[0]) {
          if (v[0][attr] == null) {
            v[0][attr] = "";
          }
        }
        let str = JSON.stringify(v[0]);
        let data = JSON.parse(str);
        this.form = data;
        this.editTitle = data.title;
      } else {
        this.cancelEdit();
      }
    },
    cancelEdit() {
      let data = this.$refs.tree.getSelectedNodes()[0];
      if (data) {
        data.selected = false;
      }
      this.$refs.form.resetFields();
      this.form.id = "";
      this.editTitle = "";
    },
    selectTreeEdit(v) {
      if (v.length > 0) {
        // 转换null为""
        for (let attr in v[0]) {
          if (v[0][attr] == null) {
            v[0][attr] = "";
          }
        }
        let str = JSON.stringify(v[0]);
        let data = JSON.parse(str);
        if (this.form.id == data.id) {
          this.$Message.warning("请勿选择自己作为父节点");
          v[0].selected = false;
          return;
        }
        this.form.parentId = data.id;
        this.form.parentTitle = data.title;
      }
    },
    handleReset() {
      this.$refs.form.resetFields();
      this.form.status = 0;
    },
    submitEdit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.id) {
            this.$Message.warning("请先点击选择要修改的节点");
            return;
          }
          this.submitLoading = true;
          // 避免传入null字符串
          // this.postRequest("请求路径，如/tree/edit", this.form).then(res => {
          //   this.submitLoading = false;
          //   if (res.success) {
          //     this.$Message.success("编辑成功");
          //     this.init();
          //     this.modalVisible = false;
          //   }
          // });
          // 模拟成功
          this.submitLoading = false;
          this.$Message.success("编辑成功");
          this.modalVisible = false;
        }
      });
    },
    submitAdd() {
      this.$refs.formAdd.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          // this.postRequest("请求路径，如/tree/add", this.formAdd).then(res => {
          //   this.submitLoading = false;
          //   if (res.success) {
          //     this.$Message.success("添加成功");
          //     this.init();
          //     this.modalVisible = false;
          //   }
          // });
          // 模拟成功
          this.submitLoading = false;
          this.$Message.success("添加成功");
          this.modalVisible = false;
        }
      });
    },
    add() {
      if (!this.form.id) {
        this.$Message.warning("请先点击选择一个节点");
        return;
      }
      this.modalTitle = "添加子节点";
      this.showParent = true;
      if (!this.form.children) {
        this.form.children = [];
      }
      this.formAdd = {
        parentId: this.form.id,
        sortOrder: this.form.children.length + 1,
        status: 0,
      };
      this.modalVisible = true;
    },
    addRoot() {
      this.modalTitle = "添加一级节点";
      this.showParent = false;
      this.formAdd = {
        parentId: 0,
        sortOrder: this.data.length + 1,
        status: 0,
      };
      this.modalVisible = true;
    },
    changeSelect(v) {
      this.selectList = v;
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    tableAdd(v) {
      this.form = v;
      this.add();
      this.editTitle = "";
      let data = this.$refs.tree.getSelectedNodes()[0];
      if (data) {
        data.selected = false;
      }
    },
    showSelect(e) {
      this.selectList = e;
    },
    remove(v) {
      this.selectList = [];
      this.selectList.push(v);
      this.delAll();
    },
    delAll() {
      if (this.selectList.length <= 0) {
        this.$Message.warning("您还未勾选要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content:
          "您确认要删除所选的 " +
          this.selectList.length +
          " 条数据及其下级所有数据?",
        loading: true,
        onOk: () => {
          let ids = "";
          this.selectList.forEach(function (e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          // this.deleteRequest("请求路径，如/tree/delByIds/" + ids).then(res => {
          //   this.$Modal.remove();
          //   if (res.success) {
          //     this.$Message.success("删除成功");
          //     this.selectList = [];
          //     this.cancelEdit();
          //     this.init();
          //   }
          // });
          // 模拟成功
          this.$Modal.remove();
          this.$Message.success("删除成功");
          this.selectList = [];
          this.cancelEdit();
        },
      });
    },
  },
  mounted() {
    // 计算高度
    let height = document.documentElement.clientHeight;
    this.maxHeight = Number(height - 287) + "px";
    this.init();
  },
};
</script>