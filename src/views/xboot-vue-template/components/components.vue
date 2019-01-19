<template>
  <div>
    <Card>
      <Alert type="warning" show-icon>说明：大部分组件为包含真实数据接口的简单封装，方便大家的直接复用！</Alert>
      <Divider class="blue" orientation="left">图标选择弹框</Divider>
      <Input
        :icon="icon"
        v-model="icon"
        @on-focus="iconModalVisible=true"
        style="width:300px"
        placeholder="点我选择图标"
      />
      <h3 class="article">events</h3>
      <Table :columns="columns1" :data="data1" border size="small" width="500"></Table>

      <Divider class="blue" orientation="left">部门级联选择</Divider>
      <department-choose width="300px" @on-select="handleSelectDep" ref="dep"></department-choose>
      <h3 class="article">props</h3>
      <Table :columns="columns2" :data="data2" border size="small" width="700"></Table>
      <h3 class="article">events</h3>
      <Table :columns="columns3" :data="data3" border size="small" width="500"></Table>
      <h3 class="article">methods</h3>
      <Table :columns="columns4" :data="data4" border size="small" width="500"></Table>

      <Divider class="blue" orientation="left">部门树选择</Divider>
      <department-tree-choose multiple width="250px" @on-change="handleSelectDepTree" ref="depTree"></department-tree-choose>
      <div style="margin-top:10px;">{{selectDeps}}</div>
      <h3 class="article">props</h3>
      <Table :columns="columns5" :data="data5" border size="small" width="700"></Table>
      <h3 class="article">events</h3>
      <Table :columns="columns6" :data="data6" border size="small" width="500"></Table>
      <h3 class="article">methods</h3>
      <Table :columns="columns7" :data="data7" border size="small" width="700"></Table>

      <Divider class="blue" orientation="left">用户抽屉选择</Divider>
      <user-choose buttonText="点我选择用户" @on-change="handleSelectUser" ref="user"></user-choose>
      <div style="margin-top:10px;">{{selectUsers}}</div>
      <h3 class="article">props</h3>
      <Table :columns="columns8" :data="data8" border size="small" width="700"></Table>
      <h3 class="article">events</h3>
      <Table :columns="columns9" :data="data9" border size="small" width="700"></Table>
      <h3 class="article">methods</h3>
      <Table :columns="columns10" :data="data10" border size="small" width="700"></Table>

      <Divider class="blue" orientation="left">图片上传文本框</Divider>
      <upload-pic-input @on-change="handleUpload" width="250px" ref="upload"></upload-pic-input>
      <h3 class="article">props</h3>
      <Table :columns="columns11" :data="data11" border size="small" width="700"></Table>
      <h3 class="article">events</h3>
      <Table :columns="columns12" :data="data12" border size="small" width="700"></Table>
      <h3 class="article">methods</h3>
      <Table :columns="columns13" :data="data13" border size="small" width="700"></Table>
    </Card>

    <Modal title="选择图标" v-model="iconModalVisible" :width="800" :styles="{top: '30px'}" footer-hide>
      <icon-choose @on-select="handleSelectIcon"></icon-choose>
    </Modal>
  </div>
</template>

<script>
import iconChoose from "../../my-components/icon-choose";
import departmentChoose from "../../my-components/xboot/department-choose";
import departmentTreeChoose from "../../my-components/xboot/department-tree-choose";
import userChoose from "../../my-components/xboot/user-choose";
import uploadPicInput from "../../my-components/xboot/upload-pic-input";
export default {
  name: "components",
  components: {
    iconChoose,
    departmentChoose,
    userChoose,
    departmentTreeChoose,
    uploadPicInput
  },
  data() {
    return {
      iconModalVisible: false,
      icon: "",
      selectDeps: [],
      selectUsers: [],
      picUrl: "",
      columns1: [
        {
          title: "事件名",
          key: "name"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "返回值",
          key: "value"
        }
      ],
      data1: [
        {
          name: "on-select",
          type: "String",
          value: "选择图标英文名"
        }
      ],
      columns2: [
        {
          title: "属性",
          key: "name"
        },
        {
          title: "说明",
          key: "desc"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "默认值",
          key: "value"
        }
      ],
      data2: [
        {
          name: "width",
          desc: "选择框宽度，如200px",
          type: "String（需加上px单位）",
          value: "200px"
        }
      ],
      columns3: [
        {
          title: "事件名",
          key: "name"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "返回值",
          key: "value"
        }
      ],
      data3: [
        {
          name: "on-select",
          type: "String",
          value: "点击部门ID"
        }
      ],
      columns4: [
        {
          title: "方法名",
          key: "name"
        },
        {
          title: "说明",
          key: "type"
        },
        {
          title: "参数",
          key: "value"
        }
      ],
      data4: [
        {
          name: "clearSelect",
          type: "清空已选数据",
          value: "无"
        }
      ],
      columns5: [
        {
          title: "属性",
          key: "name"
        },
        {
          title: "说明",
          key: "desc"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "默认值",
          key: "value"
        }
      ],
      data5: [
        {
          name: "width",
          desc: "选择框宽度，如200px",
          type: "String（需加上px单位）",
          value: "200px"
        },
        {
          name: "placeholder",
          desc: "提示文字",
          type: "String",
          value: "点击选择部门"
        },
        {
          name: "multiple",
          desc: "是否选开启多选，默认false不开启",
          type: "Boolean",
          value: "false"
        }
      ],
      columns6: [
        {
          title: "事件名",
          key: "name"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "返回值",
          key: "value",
          width: 300
        }
      ],
      data6: [
        {
          name: "on-change",
          type: "Array",
          value: '选择部门id数组，仅包含部门id，例如 ["1","2","3"]'
        }
      ],
      columns7: [
        {
          title: "方法名",
          key: "name"
        },
        {
          title: "说明",
          key: "type"
        },
        {
          title: "参数",
          key: "value",
          width: 300
        }
      ],
      data7: [
        {
          name: "setSelectDep",
          type: "设置已选部门数据（回显使用）",
          value:
            "第一个参数为部门id数组（Array），第二个参数为部门标题（String）"
        }
      ],
      columns8: [
        {
          title: "属性",
          key: "name"
        },
        {
          title: "说明",
          key: "desc"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "默认值",
          key: "value"
        }
      ],
      data8: [
        {
          name: "buttonText",
          desc: "选择用户按钮文字",
          type: "String",
          value: "选择用户"
        },
        {
          name: "icon",
          desc: "选择用户按钮图标",
          type: "String",
          value: "md-person-add"
        },
        {
          name: "all",
          desc: "是否选择所有用户",
          type: "Boolean",
          value: "false"
        }
      ],
      columns9: [
        {
          title: "事件名",
          key: "name"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "返回值",
          key: "value",
          width: 300
        }
      ],
      data9: [
        {
          name: "on-change",
          type: "Array",
          value:
            '选择用户数组，仅包含用户id和username，例如 [{"id":"1","username":"name"}]'
        }
      ],
      columns10: [
        {
          title: "方法名",
          key: "name"
        },
        {
          title: "说明",
          key: "type"
        },
        {
          title: "参数",
          key: "value",
          width: 300
        }
      ],
      data10: [
        {
          name: "setSelectUser",
          type: "设置已选用户数据（回显使用）",
          value:
            '用户数组，需包含用户id和username，例如 [{"id":"1","username":"name"}]'
        },
        {
          name: "setSelectAllUser",
          type: "设置选择全部用户，返回全部用户数据",
          value: "无"
        }
      ],columns11: [
        {
          title: "属性",
          key: "name"
        },
        {
          title: "说明",
          key: "desc"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "默认值",
          key: "value"
        }
      ],
      data11: [
        {
          name: "width",
          desc: "选择框宽度，如200px",
          type: "String（需加上px单位）",
          value: "200px"
        },
      ],
      columns12: [
        {
          title: "事件名",
          key: "name"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "返回值",
          key: "value",
          width: 300
        }
      ],
      data12: [
        {
          name: "on-change",
          type: "String",
          value:
            '返回完整上传图片路径'
        }
      ],
      columns13: [
        {
          title: "方法名",
          key: "name"
        },
        {
          title: "说明",
          key: "type"
        },
        {
          title: "参数",
          key: "value",
          width: 300
        }
      ],
      data13: [
        {
          name: "setPicUrl",
          type: "设置文本框图片链接（回显使用）",
          value:
            '完整图片链接'
        },
      ]
    };
  },
  methods: {
    init() {},
    handleSelectIcon(v) {
      this.icon = v;
      this.iconModalVisible = false;
    },
    handleSelectDep(v) {
      this.$Message.info(`所选部门ID为 ${v}`);
    },
    handleSelectUser(v) {
      this.selectUsers = v;
    },
    selectAllUser() {
      this.$refs.user.setSelectAllUser();
    },
    handleSelectDepTree(v) {
      this.selectDeps = v;
    },
    handleUpload(v) {
      this.picUrl = v;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less">
.article {
  font-size: 16px;
  font-weight: 400;
  margin: 12px 0;
}
.blue {
  color: #40a9ff !important;
}
.collapse {
  font-size: 12px;
  margin-top: 15px;
  width: 500px;
  .select-count {
    font-size: 13px;
    font-weight: 600;
    color: #40a9ff;
  }
}
</style>