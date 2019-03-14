<style lang="less">
@import "./departmentManage.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="add" type="primary" icon="md-add">添加子部门</Button>
        <Button @click="addRoot" icon="md-add">添加一级部门</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Button @click="getParentList" icon="md-refresh">刷新</Button>
        <i-switch v-model="strict" size="large" style="margin-left:5px">
          <span slot="open">级联</span>
          <span slot="close">单选</span>
        </i-switch>
      </Row>
      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="6">
          <Alert show-icon>
            当前选择编辑：
            <span class="select-title">{{editTitle}}</span>
            <a class="select-clear" v-if="form.id" @click="cancelEdit">取消选择</a>
          </Alert>
          <Input
            v-model="searchKey"
            suffix="ios-search"
            @on-change="search"
            placeholder="输入部门名搜索"
            clearable
          />
          <div class="tree-bar" :style="{maxHeight: maxHeight}">
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
        </Col>
        <Col span="9">
          <Form ref="form" :model="form" :label-width="85" :rules="formValidate">
            <FormItem label="上级部门" prop="parentTitle">
              <Poptip trigger="click" placement="right-start" title="选择上级部门" width="250">
                <Input v-model="form.parentTitle" readonly style="width:400px"/>
                <div slot="content" style="position:relative;min-height:5vh">
                  <Tree :data="dataEdit" :load-data="loadData" @on-select-change="selectTreeEdit"></Tree>
                  <Spin size="large" fix v-if="loadingEdit"></Spin>
                </div>
              </Poptip>
            </FormItem>
            <FormItem label="部门名称" prop="title">
              <Input v-model="form.title" style="width:400px"/>
            </FormItem>
            <FormItem label="部门负责人" prop="mainHeader">
              <Select
                :loading="userLoading"
                not-found-text="该部门暂无用户数据"
                v-model="form.mainHeader"
                multiple
                style="width:400px"
              >
                <Option v-for="item in users" :value="item.id" :key="item.id">{{ item.username }}</Option>
              </Select>
            </FormItem>
            <FormItem label="副负责人" prop="viceHeader">
              <Select
                :loading="userLoading"
                not-found-text="该部门暂无用户数据"
                v-model="form.viceHeader"
                multiple
                style="width:400px"
              >
                <Option v-for="item in users" :value="item.id" :key="item.id">{{ item.username }}</Option>
              </Select>
            </FormItem>
            <FormItem label="排序值" prop="sortOrder">
              <InputNumber :max="1000" :min="0" v-model="form.sortOrder"></InputNumber>
              <span style="margin-left:5px">值越小越靠前，支持小数</span>
            </FormItem>
            <FormItem label="是否启用" prop="status">
              <i-switch size="large" v-model="form.status" :true-value="0" :false-value="-1">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-switch>
            </FormItem>
            <FormItem label="是否为父节点">
              <i-switch v-model="form.isParent">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <Form-item>
              <Button
                style="margin-right:5px"
                @click="submitEdit"
                :loading="submitLoading"
                type="primary"
                icon="ios-create-outline"
              >修改并保存</Button>
              <Button @click="handleReset">重置</Button>
            </Form-item>
          </Form>
        </Col>
      </Row>
    </Card>

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="formAdd" :model="formAdd" :label-width="85" :rules="formValidate">
        <div v-if="showParent">
          <FormItem label="上级部门：">{{form.title}}</FormItem>
        </div>
        <FormItem label="部门名称" prop="title">
          <Input v-model="formAdd.title"/>
        </FormItem>
        <FormItem label="排序值" prop="sortOrder">
          <InputNumber :max="1000" :min="0" v-model="formAdd.sortOrder"></InputNumber>
          <span style="margin-left:5px">值越小越靠前，支持小数</span>
        </FormItem>
        <FormItem label="是否启用" prop="status">
          <i-switch size="large" v-model="formAdd.status" :true-value="0" :false-value="-1">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelAdd">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="submitAdd">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  initDepartment,
  loadDepartment,
  addDepartment,
  editDepartment,
  deleteDepartment,
  searchDepartment,
  getUserByDepartmentId
} from "@/api/index";
export default {
  name: "department-manage",
  data() {
    return {
      loading: true,
      maxHeight: "500px",
      strict: true,
      userLoading: false,
      loadingEdit: true,
      modalVisible: false,
      selectList: [],
      selectCount: 0,
      showParent: false,
      modalTitle: "",
      editTitle: "",
      searchKey: "",
      form: {
        id: "",
        title: "",
        parentId: "",
        parentTitle: "",
        sortOrder: 0,
        status: 0
      },
      formAdd: {},
      formValidate: {
        title: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      },
      submitLoading: false,
      data: [],
      dataEdit: [],
      users: []
    };
  },
  methods: {
    init() {
      this.getParentList();
      this.getParentListEdit();
    },
    getParentList() {
      this.loading = true;
      initDepartment().then(res => {
        this.loading = false;
        if (res.success === true) {
          res.result.forEach(function(e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
          });
          this.data = res.result;
        }
      });
    },
    getParentListEdit() {
      this.loadingEdit = true;
      initDepartment().then(res => {
        this.loadingEdit = false;
        if (res.success === true) {
          res.result.forEach(function(e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
          });
          // 头部加入一级
          let first = {
            id: "0",
            title: "一级部门"
          };
          res.result.unshift(first);
          this.dataEdit = res.result;
        }
      });
    },
    loadData(item, callback) {
      loadDepartment(item.id).then(res => {
        if (res.success === true) {
          res.result.forEach(function(e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
          });
          callback(res.result);
        }
      });
    },
    search() {
      if (this.searchKey) {
        this.loading = true;
        searchDepartment({ title: this.searchKey }).then(res => {
          this.loading = false;
          if (res.success) {
            this.data = res.result;
          }
        });
      } else {
        this.getParentList();
      }
    },
    selectTree(v) {
      if (v.length > 0) {
        // 转换null为""
        for (let attr in v[0]) {
          if (v[0][attr] === null) {
            v[0][attr] = "";
          }
        }
        let str = JSON.stringify(v[0]);
        let data = JSON.parse(str);
        this.editTitle = data.title;
        // 加载部门用户数据
        this.userLoading = true;
        getUserByDepartmentId(data.id).then(res => {
          this.userLoading = false;
          if (res.success) {
            this.users = res.result;
          }
        });
        // 回显
        this.form = data;
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
      delete this.form.id;
      this.editTitle = "";
    },
    selectTreeEdit(v) {
      if (v.length > 0) {
        // 转换null为""
        for (let attr in v[0]) {
          if (v[0][attr] === null) {
            v[0][attr] = "";
          }
        }
        let str = JSON.stringify(v[0]);
        let data = JSON.parse(str);
        this.form.parentId = data.id;
        this.form.parentTitle = data.title;
      }
    },
    cancelAdd() {
      this.modalVisible = false;
    },
    handleReset() {
      this.$refs.form.resetFields();
      this.form.status = 0;
    },
    submitEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.form.id) {
            this.$Message.warning("请先点击选择要修改的部门");
            return;
          }
          this.submitLoading = true;
          editDepartment(this.form).then(res => {
            this.submitLoading = false;
            if (res.success === true) {
              this.$Message.success("编辑成功");
              this.init();
              this.modalVisible = false;
            }
          });
        }
      });
    },
    submitAdd() {
      this.$refs.formAdd.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          addDepartment(this.formAdd).then(res => {
            this.submitLoading = false;
            if (res.success === true) {
              this.$Message.success("添加成功");
              this.init();
              this.modalVisible = false;
            }
          });
        }
      });
    },
    add() {
      if (this.form.id == "" || this.form.id == null) {
        this.$Message.warning("请先点击选择一个部门");
        return;
      }
      this.modalTitle = "添加子部门";
      this.showParent = true;
      this.formAdd = {
        parentId: this.form.id,
        sortOrder: 0,
        status: 0
      };
      this.modalVisible = true;
    },
    addRoot() {
      this.modalTitle = "添加一级部门";
      this.showParent = false;
      this.formAdd = {
        parentId: 0,
        sortOrder: 0,
        status: 0
      };
      this.modalVisible = true;
    },
    changeSelect(v) {
      this.selectCount = v.length;
      this.selectList = v;
    },
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未勾选要删除的数据");
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
          deleteDepartment(ids).then(res => {
            if (res.success === true) {
              this.$Message.success("删除成功");
              this.selectList = [];
              this.selectCount = 0;
              this.cancelEdit();
              this.init();
            }
          });
        }
      });
    }
  },
  mounted() {
    // 计算高度
    let height = document.documentElement.clientHeight;
    this.maxHeight = Number(height - 287) + "px";
    this.init();
  }
};
</script>