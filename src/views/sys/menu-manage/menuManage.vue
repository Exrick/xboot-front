<style lang="less">
@import "./menuManage.less";
</style>
<template>
    <div class="search">
        <Card>
          <Row class="operation">
            <Button @click="addUser" type="primary" icon="plus-round">添加菜单</Button>
            <Button @click="delAll" type="ghost" icon="trash-a">批量删除</Button>
          </Row>
          <Row type="flex" justify="left" class="code-row-bg">
            <Col span="6">
              <Tree :data="data" show-checkbox></Tree>
            </Col>
            <Col span="8">
              <Form ref="menuForm" :model="menuForm" :label-width="70" :rules="menuFormValidate">
                <FormItem label="菜单名称" prop="name">
                    <Input v-model="menuForm.name"/>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input type="password" v-model="menuForm.password"/>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input v-model="menuForm.email"/>
                </FormItem>
                <FormItem label="手机号" prop="mobile">
                    <Input v-model="menuForm.mobile"/>
                </FormItem>
                <FormItem label="性别">
                  <RadioGroup v-model="menuForm.sex">
                    <Radio :label="1">男</Radio>
                    <Radio :label="0">女</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="用户类型">
                  <Select v-model="menuForm.type" placeholder="请选择">
                    <Option :value="0">普通用户</Option>
                    <Option :value="1">管理员</Option>
                  </Select>
                </FormItem>
                <Form-item>
                  <Button @click="handleSearch" type="primary" icon="compose">修改</Button>
                  <Button @click="handleReset" type="ghost" >重置</Button>
                </Form-item>
              </Form>
            </Col>
          </Row>
        </Card>

        <Modal :title="modalTitle" v-model="roleModalVisible" :mask-closable='false' :width="500">
            <Form ref="menuForm" :model="menuForm" :label-width="70" :rules="menuFormValidate">
                <FormItem label="角色名称" prop="name">
                    <Input v-model="menuForm.name" placeholder="按照Spring Security约定请以‘ROLE_’开头"/>
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
      menuForm: {

      },
      menuFormValidate: {
        name: [{ required: true, message: "角色名称不能为空", trigger: "blur" }]
      },
      submitLoading: false,
      data: [
        {
          title: "parent 1",
          expand: true,
          children: [
            {
              title: "parent 1-1",
              expand: true,
              children: [
                {
                  title: "leaf 1-1-1"
                },
                {
                  title: "leaf 1-1-2"
                }
              ]
            },
            {
              title: "parent 1-2",
              expand: true,
              children: [
                {
                  title: "leaf 1-2-1"
                },
                {
                  title: "leaf 1-2-1"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    init() {},
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
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          let url = "/role/save";
          if (this.modalType === 1) {
            // 编辑用户
            url = "/role/update";
          }
          this.submitLoading = true;
          this.postRequest(url, this.menuForm).then(res => {
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
      this.menuForm = {
        sex: 1,
        roles: []
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
      this.menuForm = roleInfo;
      this.roleModalVisible = true;
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除角色 " + v.username + " ?",
        onOk: () => {
          this.deleteRequest("/role/delByIds", { ids: v.id }).then(res => {
            if (res.success === true) {
              this.$Message.success("删除成功");
              this.init();
            }
          });
        }
      });
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
          this.deleteRequest("/role/delByIds", { ids: ids }).then(res => {
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