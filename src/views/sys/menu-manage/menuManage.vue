<style lang="less">
@import "./menuManage.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="addMenu" type="primary" icon="md-add">添加子节点</Button>
        <Button @click="addRootMenu" icon="md-add">添加顶部菜单</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Dropdown @on-click="handleDropdown">
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="refresh">刷新</DropdownItem>
            <DropdownItem name="expandOne">收合所有</DropdownItem>
            <DropdownItem name="expandTwo">仅展开一级</DropdownItem>
            <DropdownItem name="expandThree">仅展开两级</DropdownItem>
            <DropdownItem name="expandAll">展开所有</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
            <a class="select-clear" v-if="menuForm.id" @click="cancelEdit">取消选择</a>
          </Alert>
          <Input
            v-model="searchKey"
            suffix="ios-search"
            @on-change="search"
            placeholder="输入菜单名搜索"
            clearable
          />
          <div class="tree-bar" :style="{maxHeight: maxHeight}">
            <Tree
              ref="tree"
              :data="data"
              show-checkbox
              :render="renderContent"
              @on-check-change="changeSelect"
              :check-strictly="!strict"
            ></Tree>
          </div>
          <Spin size="large" fix v-if="loading"></Spin>
        </Col>
        <Col span="9" style="margin-left:10px">
          <Form ref="menuForm" :model="menuForm" :label-width="100" :rules="menuFormValidate">
            <FormItem label="类型" prop="type">
              <div v-show="menuForm.type==-1">
                <Icon type="ios-navigate-outline" size="16" style="margin:0 5px 3px 0;"></Icon>
                <span>顶部菜单</span>
              </div>
              <div v-show="menuForm.type==0">
                <Icon type="ios-list-box-outline" size="16" style="margin:0 5px 3px 0;"></Icon>
                <span>页面菜单</span>
              </div>
              <div v-show="menuForm.type==1">
                <Icon type="md-radio-button-on" size="16" style="margin:0 5px 3px 0;"></Icon>
                <span>操作按钮</span>
              </div>
            </FormItem>
            <FormItem label="名称" prop="title" v-if="menuForm.type==-1||menuForm.type==0">
              <Input v-model="menuForm.title"/>
            </FormItem>
            <FormItem label="名称" prop="title" v-if="menuForm.type==1">
              <Tooltip placement="right" content="操作按钮名称不得重复">
                <Input v-model="menuForm.title"/>
              </Tooltip>
            </FormItem>
            <FormItem label="路径" prop="path" v-if="menuForm.type==0">
              <Input v-model="menuForm.path"/>
            </FormItem>
            <FormItem label="请求路径" prop="path" v-if="menuForm.type==1">
              <Tooltip
                placement="right"
                :max-width="230"
                transfer
                content="填写后台请求URL，后台将作权限拦截，若无可填写'无'或其他"
              >
                <Input v-model="menuForm.path"/>
              </Tooltip>
            </FormItem>
            <FormItem label="按钮权限类型" prop="buttonType" v-if="menuForm.type==1">
              <Select v-model="menuForm.buttonType" placeholder="请选择或输入搜索" filterable clearable>
                <Option
                  v-for="(item, i) in dictPermissions"
                  :key="i"
                  :value="item.value"
                >{{item.title}}</Option>
              </Select>
            </FormItem>
            <FormItem label="英文名" prop="name" v-if="menuForm.type==-1">
              <Tooltip placement="right" content="需唯一">
                <Input v-model="menuForm.name"/>
              </Tooltip>
            </FormItem>
            <FormItem label="路由英文名" prop="name" v-if="menuForm.type==0">
              <Tooltip placement="right" content="需唯一">
                <Input v-model="menuForm.name"/>
              </Tooltip>
            </FormItem>
            <FormItem label="图标" prop="icon" v-if="menuForm.type==-1||menuForm.type==0">
              <icon-choose v-model="menuForm.icon"></icon-choose>
            </FormItem>
            <FormItem label="前端组件" prop="component" v-if="menuForm.type==0">
              <Input v-model="menuForm.component"/>
            </FormItem>
            <FormItem label="第三方网页链接" prop="url" v-if="menuForm.type==0">
              <Tooltip placement="right" content="前端组件需为 sys/monitor/monitor 时生效">
                <Input v-model="menuForm.url" placeholder="http://"/>
              </Tooltip>
            </FormItem>
            <FormItem label="排序值" prop="sortOrder">
              <InputNumber :max="1000" :min="0" v-model="menuForm.sortOrder"></InputNumber>
              <span style="margin-left:5px">值越小越靠前，支持小数</span>
            </FormItem>
            <FormItem label="始终显示" prop="showAlways" v-if="menuForm.level==1">
              <i-switch size="large" v-model="menuForm.showAlways">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-switch>
              <Tooltip
                content="当设为不始终显示时，一级菜单下仅有一个子级菜单只会显示该子级菜单，避免用户多次点击"
                placement="right"
                transfer
                max-width="280"
                style="display: inline-block !important;"
              >
                <Icon
                  type="md-help-circle"
                  size="20"
                  color="#c5c5c5"
                  style="margin-left:10px;cursor:pointer;"
                />
              </Tooltip>
            </FormItem>
            <FormItem label="是否启用" prop="status">
              <i-switch size="large" v-model="menuForm.status" :true-value="0" :false-value="-1">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
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

    <Modal
      draggable
      :title="modalTitle"
      v-model="menuModalVisible"
      :mask-closable="false"
      :width="500"
      :styles="{top: '30px'}"
    >
      <Form ref="menuFormAdd" :model="menuFormAdd" :label-width="100" :rules="menuFormValidate">
        <div v-if="showParent">
          <FormItem label="上级节点：">{{parentTitle}}</FormItem>
        </div>
        <FormItem label="类型" prop="type">
          <div v-show="menuFormAdd.type==-1">
            <Icon type="ios-navigate-outline" size="16" style="margin:0 5px 3px 0;"></Icon>
            <span>顶部菜单</span>
          </div>
          <div v-show="menuFormAdd.type==0">
            <Icon type="ios-list-box-outline" size="16" style="margin:0 5px 3px 0;"></Icon>
            <span>页面菜单</span>
          </div>
          <div v-show="menuFormAdd.type==1">
            <Icon type="md-radio-button-on" size="16" style="margin:0 5px 3px 0;"></Icon>
            <span>操作按钮</span>
          </div>
        </FormItem>
        <FormItem label="名称" prop="title" v-if="menuFormAdd.type==-1||menuFormAdd.type==0">
          <Input v-model="menuFormAdd.title"/>
        </FormItem>
        <FormItem label="名称" prop="title" v-if="menuFormAdd.type==1">
          <Tooltip placement="right" content="操作按钮名称不得重复">
            <Input v-model="menuFormAdd.title" style="width:368px"/>
          </Tooltip>
        </FormItem>
        <FormItem label="路径" prop="path" v-if="menuFormAdd.type==0">
          <Input v-model="menuFormAdd.path"/>
        </FormItem>
        <FormItem label="请求路径" prop="path" v-if="menuFormAdd.type==1">
          <Tooltip
            placement="right"
            :max-width="230"
            transfer
            content="填写后台请求URL，后台将作权限拦截，若无可填写'无'或其他"
          >
            <Input v-model="menuFormAdd.path" style="width:368px"/>
          </Tooltip>
        </FormItem>
        <FormItem label="按钮权限类型" prop="buttonType" v-if="menuFormAdd.type==1">
          <Select v-model="menuFormAdd.buttonType" placeholder="请选择或输入搜索" filterable clearable>
            <Option v-for="(item, i) in dictPermissions" :key="i" :value="item.value">{{item.title}}</Option>
          </Select>
        </FormItem>
        <FormItem label="英文名" prop="name" v-if="menuFormAdd.type==-1">
          <Tooltip placement="right" content="需唯一">
            <Input v-model="menuFormAdd.name"/>
          </Tooltip>
        </FormItem>
        <FormItem label="路由英文名" prop="name" v-if="menuFormAdd.type==0">
          <Tooltip placement="right" content="需唯一">
            <Input v-model="menuFormAdd.name" style="width:368px"/>
          </Tooltip>
        </FormItem>
        <FormItem label="图标" prop="icon" v-if="menuFormAdd.type==-1||menuFormAdd.type==0">
          <icon-choose v-model="menuFormAdd.icon"></icon-choose>
        </FormItem>
        <FormItem label="前端组件" prop="component" v-if="menuFormAdd.type==0">
          <Input v-model="menuFormAdd.component"/>
        </FormItem>
        <FormItem label="第三方网页链接" prop="url" v-if="menuFormAdd.type==0">
          <Tooltip placement="right" content="前端组件需为 sys/monitor/monitor 时生效">
            <Input v-model="menuFormAdd.url" placeholder="http://" style="width:368px"/>
          </Tooltip>
        </FormItem>
        <FormItem label="排序值" prop="sortOrder">
          <InputNumber :max="1000" :min="0" v-model="menuFormAdd.sortOrder"></InputNumber>
          <span style="margin-left:5px">值越小越靠前，支持小数</span>
        </FormItem>
        <FormItem label="始终显示" prop="showAlways" v-if="menuFormAdd.level==1">
          <i-switch size="large" v-model="menuFormAdd.showAlways">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
          <Tooltip
            content="当设为不始终显示时，一级菜单下仅有一个子级菜单只会显示该子级菜单，避免用户多次点击"
            placement="right"
            transfer
            max-width="280"
            style="display: inline-block !important;"
          >
            <Icon
              type="md-help-circle"
              size="20"
              color="#c5c5c5"
              style="margin-left:10px;cursor:pointer;"
            />
          </Tooltip>
        </FormItem>
        <FormItem label="是否启用" prop="status">
          <i-switch size="large" v-model="menuFormAdd.status" :true-value="0" :false-value="-1">
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
  getAllPermissionList,
  addPermission,
  editPermission,
  deletePermission,
  searchPermission,
  getDictDataByType
} from "@/api/index";
import IconChoose from "@/views/my-components/icon-choose";
import util from "@/libs/util.js";
export default {
  name: "menu-manage",
  components: {
    IconChoose
  },
  data() {
    return {
      loading: true,
      strict: true,
      maxHeight: "500px",
      expandLevel: 1,
      menuModalVisible: false,
      iconModalVisible: false,
      selectList: [],
      selectCount: 0,
      showParent: false,
      searchKey: "",
      parentTitle: "",
      editTitle: "",
      modalTitle: "",
      menuForm: {
        id: "",
        title: "",
        name: "",
        icon: "",
        path: "",
        component: "",
        parentId: "",
        buttonType: "",
        type: 0,
        sortOrder: 0,
        level: null,
        status: 0,
        url: "",
        showAlways: true
      },
      menuFormAdd: {
        buttonType: ""
      },
      menuFormValidate: {
        title: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "路由英文名不能为空", trigger: "blur" }
        ],
        icon: [{ required: true, message: "图标不能为空", trigger: "click" }],
        path: [{ required: true, message: "路径不能为空", trigger: "blur" }],
        component: [
          { required: true, message: "前端组件不能为空", trigger: "blur" }
        ]
      },
      submitLoading: false,
      data: [],
      dictPermissions: []
    };
  },
  methods: {
    init() {
      this.getAllList();
      this.getDictPermissions();
    },
    getDictPermissions() {
      getDictDataByType("permission_type").then(res => {
        if (res.success) {
          this.dictPermissions = res.result;
        }
      });
    },
    renderContent(h, { root, node, data }) {
      let icon = "";
      if (data.level == 0) {
        icon = "ios-navigate";
      } else if (data.level == 1) {
        icon = "md-list-box";
      } else if (data.level == 2) {
        icon = "md-list";
      } else if (data.level == 3) {
        icon = "md-radio-button-on";
      } else {
        icon = "md-radio-button-off";
      }
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            cursor: "pointer"
          },
          on: {
            click: () => {
              this.selectTree(data);
            }
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: icon,
                size: "16"
              },
              style: {
                "margin-right": "8px",
                "margin-bottom": "3px"
              }
            }),
            h(
              "span",
              {
                class: {
                  "ivu-tree-title": true,
                  "ivu-tree-title-selected": data.id == this.menuForm.id
                }
              },
              data.title
            )
          ])
        ]
      );
    },
    handleDropdown(name) {
      if (name == "expandOne") {
        this.expandLevel = 1;
        this.getAllList();
      } else if (name == "expandTwo") {
        this.expandLevel = 2;
        this.getAllList();
      } else if (name == "expandThree") {
        this.expandLevel = 3;
        this.getAllList();
      }
      if (name == "expandAll") {
        this.expandLevel = 4;
        this.getAllList();
      } else if (name == "refresh") {
        this.getAllList();
      }
    },
    getAllList() {
      this.loading = true;
      this.getRequest("/permission/getAllList").then(res => {
        this.loading = false;
        if (res.success) {
          // 仅展开指定级数 默认后台已展开所有
          let expandLevel = this.expandLevel;
          res.result.forEach(function(e) {
            if (expandLevel == 1) {
              if (e.level == 0) {
                e.expand = false;
              }
              if (e.children && e.children.length > 0) {
                e.children.forEach(function(c) {
                  if (c.level == 1) {
                    c.expand = false;
                  }
                  if (c.children && c.children.length > 0) {
                    c.children.forEach(function(b) {
                      if (b.level == 2) {
                        b.expand = false;
                      }
                    });
                  }
                });
              }
            } else if (expandLevel == 2) {
              if (e.level == 0) {
                e.expand = true;
              }
              if (e.children && e.children.length > 0) {
                e.children.forEach(function(c) {
                  if (c.level == 1) {
                    c.expand = false;
                  }
                  if (c.children && c.children.length > 0) {
                    c.children.forEach(function(b) {
                      if (b.level == 2) {
                        b.expand = false;
                      }
                    });
                  }
                });
              }
            } else if (expandLevel == 3) {
              if (e.level == 0) {
                e.expand = true;
              }
              if (e.children && e.children.length > 0) {
                e.children.forEach(function(c) {
                  if (c.level == 1) {
                    c.expand = true;
                  }
                  if (c.children && c.children.length > 0) {
                    c.children.forEach(function(b) {
                      if (b.level == 2) {
                        b.expand = false;
                      }
                    });
                  }
                });
              }
            }
          });
          this.data = res.result;
        }
      });
    },
    search() {
      if (this.searchKey) {
        this.loading = true;
        searchPermission({ title: this.searchKey }).then(res => {
          this.loading = false;
          if (res.success) {
            this.data = res.result;
          }
        });
      } else {
        this.getAllList();
      }
    },
    selectTree(v) {
      if (v && v.id != this.menuForm.id) {
        // 转换null为""
        for (let attr in v) {
          if (v[attr] == null) {
            v[attr] = "";
          }
        }
        let str = JSON.stringify(v);
        let menu = JSON.parse(str);
        this.menuForm = menu;
        this.editTitle = menu.title;
      } else {
        this.cancelEdit();
      }
    },
    cancelEdit() {
      let data = this.$refs.tree.getSelectedNodes()[0];
      if (data) {
        data.selected = false;
      }
      this.$refs.menuForm.resetFields();
      this.menuForm.id = "";
      delete this.menuForm.id;
      this.editTitle = "";
    },
    cancelAdd() {
      this.menuModalVisible = false;
    },
    handleReset() {
      let type = this.menuForm.type;
      this.$refs.menuForm.resetFields();
      this.menuForm.icon = "";
      this.menuForm.component = "";
      this.menuForm.type = type;
    },
    submitEdit() {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          if (!this.menuForm.id) {
            this.$Message.warning("请先点击选择要修改的菜单节点");
            return;
          }
          this.submitLoading = true;
          if (this.menuForm.sortOrder == null) {
            this.menuForm.sortOrder = "";
          }
          if (this.menuForm.buttonType == null) {
            this.menuForm.buttonType = "";
          }
          if (this.menuForm.type == 1) {
            this.menuForm.name = "";
            this.menuForm.icon = "";
            this.menuForm.component = "";
          }
          editPermission(this.menuForm).then(res => {
            this.submitLoading = false;
            if (res.success) {
              this.$Message.success("编辑成功");
              // 标记重新获取菜单数据
              this.$store.commit("setAdded", false);
              util.initRouter(this);
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
          this.submitLoading = true;
          if (this.menuFormAdd.type == 1) {
            this.menuFormAdd.name = "";
            this.menuFormAdd.icon = "";
            this.menuFormAdd.component = "";
          }
          addPermission(this.menuFormAdd).then(res => {
            this.submitLoading = false;
            if (res.success) {
              this.$Message.success("添加成功");
              // 标记重新获取菜单数据
              this.$store.commit("setAdded", false);
              util.initRouter(this);
              this.init();
              this.menuModalVisible = false;
            }
          });
        }
      });
    },
    addMenu() {
      if (this.menuForm.id == "" || this.menuForm.id == null) {
        this.$Message.warning("请先点击选择一个菜单权限节点");
        return;
      }
      this.parentTitle = this.menuForm.title;
      this.modalTitle = "添加子节点(可拖动)";
      this.showParent = true;
      let type = 0;
      if (this.menuForm.level == 1) {
        type = 0;
      } else if (this.menuForm.level == 2) {
        type = 1;
      } else if (this.menuForm.level == 3) {
        this.$Modal.warning({
          title: "抱歉，不能添加啦",
          content: "仅支持2级菜单目录"
        });
        return;
      } else {
        type = 0;
      }
      let component = "";
      this.menuFormAdd = {
        icon: "",
        type: type,
        parentId: this.menuForm.id,
        level: Number(this.menuForm.level) + 1,
        sortOrder: 0,
        buttonType: "",
        status: 0,
        showAlways: true
      };
      if (this.menuForm.level == 0) {
        this.menuFormAdd.path = "/";
        this.menuFormAdd.component = "Main";
      }
      this.menuModalVisible = true;
    },
    addRootMenu() {
      this.modalTitle = "添加顶部菜单(可拖动)";
      this.showParent = false;
      this.menuFormAdd = {
        type: -1,
        level: 0,
        sortOrder: 0,
        status: 0
      };
      this.menuModalVisible = true;
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
          deletePermission(ids).then(res => {
            if (res.success) {
              this.$Message.success("删除成功");
              // 标记重新获取菜单数据
              this.$store.commit("setAdded", false);
              util.initRouter(this);
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