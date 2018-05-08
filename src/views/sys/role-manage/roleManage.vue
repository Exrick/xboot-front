<style lang="less">
@import "./roleManage.less";
</style>
<template>
    <div class="search">
        <Row>
            <Col>
                <Card>     
                    <Row class="operation">
                        <Button @click="addUser" type="primary" icon="plus-round">添加角色</Button>
                        <Button @click="delAll" type="ghost" icon="trash-a">批量删除</Button>
                        <Button @click="getRoleList" type="ghost" icon="refresh">刷新</Button>
                    </Row>
                     <Row>
                        <Alert show-icon>
                            已选择 <span class="select-count">{{selectCount}}</span> 项
                            <a class="select-clear" @click="clearSelectAll">清空</a>
                        </Alert>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :loading="loading" border :columns="columns" :data="data" ref="table" @on-selection-change="changeSelect"></Table>
                    </Row>
                    <Row type="flex" justify="end" class="code-row-bg page">
                        <Page :current="this.pageNumber" :total="total" :page-size="this.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Modal :title="modalTitle" v-model="roleModalVisible" :mask-closable='false' :width="500">
            <Form ref="roleForm" :model="roleForm" :label-width="80" :rules="roleFormValidate">
                <FormItem label="角色名称" prop="name">
                  <Input v-model="roleForm.name" placeholder="按照Spring Security约定请以‘ROLE_’开头"/>
                </FormItem>
                <FormItem label="对应权限值" prop="access">
                  <InputNumber :max="1000" :min="-1000" v-model="roleForm.access"></InputNumber>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelRole">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="submitRole">提交</Button>
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
      roleModalVisible: false,
      modalTitle: "",
      roleForm: {
        name: "",
        access: null
      },
      roleFormValidate: {
        name: [{ required: true, message: "角色名称不能为空", trigger: "blur" }]
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
          title: "角色名称",
          key: "name",
          sortable: true
        },
        {
          title: "对应权限值",
          key: "access",
          sortable: true
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true
        },
        {
          title: "更新时间",
          key: "updateTime",
          sortable: true
        },
        {
          title: "是否设置为注册用户默认角色",
          key: "defaultRole",
          align: "center",
          render: (h, params) => {
            if (params.row.defaultRole) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.cancelDefault(params.row);
                      }
                    }
                  },
                  "取消默认"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.setDefault(params.row);
                      }
                    }
                  },
                  "设为默认"
                )
              ]);
            }
          }
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
      this.getRoleList();
    },
    changePage(v) {
      this.pageNumber = v;
      this.getRoleList();
    },
    changePageSize(v) {
      this.pageSize = v;
      this.getRoleList();
    },
    getRoleList() {
      this.loading = true;
      let params = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: "createTime"
      };
      this.getRequest("/role/getAllByPage", params).then(res => {
        this.loading = false;
        if (res.success === true) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
        }
      });
    },
    cancelRole() {
      this.roleModalVisible = false;
    },
    submitRole() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          let url = "/role/add";
          if (this.modalType === 1) {
            // 编辑用户
            url = "/role/edit";
          }
          this.submitLoading = true;
          this.postRequest(url, this.roleForm).then(res => {
            this.submitLoading = false;
            if (res.success === true) {
              this.$Message.success("操作成功");
              this.init();
              this.roleModalVisible = false;
            }
          });
        }
      });
    },
    addUser() {
      this.modalType = 0;
      this.modalTitle = "添加角色";
      this.roleForm = {
        name: "",
        access: null
      };
      this.roleModalVisible = true;
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑角色";
      // 转换null为""
      for (let attr in v) {
        if (v[attr] === null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let roleInfo = JSON.parse(str);
      this.roleForm = roleInfo;
      this.roleModalVisible = true;
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除角色 " + v.name + " ?",
        onOk: () => {
          this.deleteRequest("/role/delAllByIds", { ids: v.id }).then(res => {
            if (res.success === true) {
              this.$Message.success("删除成功");
              this.init();
            }
          });
        }
      });
    },
    setDefault(v) {
      this.$Modal.confirm({
        title: "确认设置",
        content: "您确认要设置所选的 " + v.name + " 为注册用户默认角色?",
        onOk: () => {
          let params = {
            id: v.id,
            isDefault: true
          };
          this.postRequest("/role/setDefault", params).then(res => {
            if (res.success === true) {
              this.$Message.success("操作成功");
              this.init();
            }
          });
        }
      });
    },
    cancelDefault(v) {
      this.$Modal.confirm({
        title: "确认取消",
        content: "您确认要取消所选的 " + v.name + " 角色为默认?",
        onOk: () => {
          let params = {
            id: v.id,
            isDefault: false
          };
          this.postRequest("/role/setDefault", params).then(res => {
            if (res.success === true) {
              this.$Message.success("操作成功");
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
          this.deleteRequest("/role/delAllByIds", { ids: ids }).then(res => {
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