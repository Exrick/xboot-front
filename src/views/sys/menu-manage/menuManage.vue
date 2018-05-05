<style lang="less">
@import "./menuManage.less";
</style>
<template>
    <div class="search">
        <Card>
          <Row class="operation">
            <Button @click="addMenu" type="primary" icon="plus-round">添加菜单</Button>
            <Button @click="delAll" type="ghost" icon="trash-a">批量删除</Button>
            <Button @click="getMenuList" type="ghost" icon="refresh">刷新</Button>
          </Row>
          <Row type="flex" justify="start" class="code-row-bg">
            <Col span="6">
              <Tree :data="data" show-checkbox @on-check-change="changeSelect" @on-select-change="selectTree"></Tree>
              <Spin size="large" fix v-if="loading"></Spin>
            </Col>
            <Col span="9">
              <Form ref="menuForm" :model="menuForm" :label-width="80" :rules="menuFormValidate">
                <FormItem label="菜单ID" prop="id">
                    <Input v-model="menuForm.id" disabled />
                </FormItem>
                <FormItem label="菜单名称" prop="name">
                    <Input v-model="menuForm.name"/>
                </FormItem>
                <FormItem label="标题" prop="title">
                    <Input v-model="menuForm.title"/>
                </FormItem>
                <FormItem label="图标" prop="icon"  style="margin-bottom: 5px;">
                    <Input v-model="menuForm.icon"/>
                    <span>
                      图标请参考 <a target="_blank" href="http://ionicons.com/"><Icon type="ionic"></Icon> ionicons</a>
                    </span>
                </FormItem>
                <FormItem label="路径" prop="path">
                    <Input v-model="menuForm.path"/>
                </FormItem>
                <FormItem label="一级菜单" prop="parent" >
                  <i-switch v-model="menuForm.parent" size="large" @on-change="changeParent">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                  </i-switch>
                </FormItem>
                <FormItem label="前端组件" v-if="isChild" prop="component" :error="errorComponent">
                    <Input v-model="menuForm.component"/>
                </FormItem>
                <FormItem label="父级菜单ID" prop="parentId" v-if="isChild" :error="errorParent">
                    <Input v-model="menuForm.parentId"/>
                </FormItem>
                <FormItem label="所需权限值" prop="access">
                  <InputNumber :max="1000" :min="-1000" v-model="menuForm.access"></InputNumber>
                  <span style="margin-left:5px">不填则始终显示</span>
                </FormItem>
                <Form-item>
                  <Button @click="submitEdit" :loading="submitLoading" type="primary" icon="compose">修改</Button>
                  <Button @click="handleReset" type="ghost" >重置</Button>
                </Form-item>
              </Form>
            </Col>
          </Row>
        </Card>

        <Modal title="添加菜单" v-model="menuModalVisible" :mask-closable='false' :width="500">
            <Form ref="menuFormAdd" :model="menuFormAdd" :label-width="80" :rules="menuFormValidate">
                <FormItem label="菜单名称" prop="name">
                    <Input v-model="menuFormAdd.name"/>
                </FormItem>
                <FormItem label="标题" prop="title">
                    <Input v-model="menuFormAdd.title"/>
                </FormItem>
                <FormItem label="图标" prop="icon"  style="margin-bottom: 5px;">
                    <Input v-model="menuFormAdd.icon"/>
                    <span>
                      图标请参考 <a target="_blank" href="http://ionicons.com/"><Icon type="ionic"></Icon> ionicons</a>
                    </span>
                </FormItem>
                <FormItem label="路径" prop="path">
                    <Input v-model="menuFormAdd.path"/>
                </FormItem>
                <FormItem label="一级菜单" prop="parent" >
                  <i-switch v-model="menuFormAdd.parent" size="large" @on-change="changeParentAdd">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                  </i-switch>
                </FormItem>
                <FormItem label="前端组件" v-if="isChildAdd" prop="component" :error="errorComponentAdd">
                    <Input v-model="menuFormAdd.component"/>
                </FormItem>
                <FormItem label="父级菜单ID" prop="parentId" v-if="isChildAdd" :error="errorParentAdd">
                    <Input v-model="menuFormAdd.parentId"/>
                </FormItem>
                <FormItem label="所需权限值" prop="access">
                  <InputNumber :max="1000" :min="-1000" v-model="menuFormAdd.access"></InputNumber>
                  <span style="margin-left:5px">不填则始终显示</span>
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
export default {
  name: "role-manage",
  data() {
    return {
      loading: true,
      modalType: 0,
      menuModalVisible: false,
      selectList: [],
      selectCount: 0,
      menuForm: {
        name: "",
        parent: false,
        access: null,
        parentId: "",
        component: ""
      },
      menuFormAdd: {
        name: "",
        parent: false,
        access: null,
        parentId: "",
        component: ""
      },
      isChild: true,
      isChildAdd: true,
      errorParent: "",
      errorComponent: "",
      errorParentAdd: "",
      errorComponentAdd: "",
      menuFormValidate: {
        name: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        icon: [{ required: true, message: "图标不能为空", trigger: "blur" }],
        path: [{ required: true, message: "路径不能为空", trigger: "blur" }]
      },
      submitLoading: false,
      data: []
    };
  },
  methods: {
    init() {
      this.getMenuList();
    },
    getMenuList() {
      this.loading = true;
      this.getRequest("/menu/getAllList").then(res => {
        this.loading = false;
        if (res.success === true) {
          this.data = res.result;
        }
      });
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
        let menu = JSON.parse(str);
        this.menuForm = menu;
        this.changeParent()
      }
    },
    changeParent() {
      if (this.menuForm.parent) {
        this.isChild = false;
      } else {
        this.isChild = true;
      }
    },
    changeParentAdd() {
      if (this.menuFormAdd.parent) {
        this.isChildAdd = false;
      } else {
        this.isChildAdd = true;
      }
    },
    cancelAdd() {
      this.menuModalVisible = false;
    },
    handleReset() {
      this.$refs.menuForm.resetFields();
    },
    submitEdit() {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          if (
            this.isChild &&
            (this.menuForm.parentId === "" || this.menuForm.component === "")
          ) {
            this.errorParent = "不能为空";
            this.errorComponent = "不能为空";
            return;
          } else {
            this.errorParent = "";
            this.errorComponent = "";
          }
          this.submitLoading = true;
          if (this.menuForm.access === null) {
            this.menuForm.access = "";
          }
          this.postRequest("/menu/edit", this.menuForm).then(res => {
            this.submitLoading = false;
            if (res.success === true) {
              this.$Message.success("编辑成功");
              this.init();
              this.menuModalVisible = false;
            }
          });
        }
      });
    },
    submitAdd() {
      this.$refs.menuFormAdd.validate(valid => {
        if (valid) {
          if (
            this.isChildAdd &&
            (this.menuFormAdd.parentId === "" ||
              this.menuFormAdd.component === "")
          ) {
            this.errorParentAdd = "不能为空";
            this.errorComponentAdd = "不能为空";
            return;
          } else {
            this.errorParentAdd = "";
            this.errorComponentAdd = "";
          }
          this.submitLoading = true;
          if (this.menuFormAdd.access === null) {
            this.menuFormAdd.access = "";
          }
          this.postRequest("/menu/add", this.menuFormAdd).then(res => {
            this.submitLoading = false;
            if (res.success === true) {
              this.$Message.success("添加成功");
              this.init();
              this.menuModalVisible = false;
            }
          });
        }
      });
    },
    addMenu() {
      this.menuModalVisible = true;
    },
    changeSelect(v) {
      this.selectCount = v.length;
      this.selectList = v;
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
          this.deleteRequest("/menu/delByIds", { ids: ids }).then(res => {
            if (res.success === true) {
              this.$Message.success("删除成功");
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