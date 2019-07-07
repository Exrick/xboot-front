<template>
  <div>
    <Alert type="warning" show-icon>
      说明：因原作者已长时间未维护，现自行引入至项目中维护！原项目Github地址：
      <a
        href="https://github.com/lison16/tree-table-vue"
        target="_blank"
        class="href-text"
      >https://github.com/lison16/tree-table-vue</a>
    </Alert>
    <div class="href-text">
      <b>修复与优化：</b>
      <br>
      <br>· 避免引入组件导致的不兼容IE浏览器问题
      <br>· 修复Expand插槽不显示BUG
      <br>· 修复单击行事件、双击行事件、tree-icon-click点击事件、expand-cell-click点击事件不响应BUG
      <br>· Index索引与多选列样式居中
      <br>· 新增Loading加载中状态属性
      <br>· 新增PrimaryKey属性，避免刷新数据后是否折叠状态丢失
      <br>
      <br>
    </div>
    <div class="operation">
      <Button icon="md-add">添加一级节点</Button>
      <Button icon="md-refresh" @click="refresh">刷新</Button>
    </div>
    <Alert show-icon>
      已选择
      <span class="select-count">{{selectCount}}</span> 项
      这里还可以做一些数据统计显示
    </Alert>
    <tree-table
      ref="treeTable"
      :loading="loading"
      :data="tableData"
      :columns="columns"
      :border="true"
      :show-index="true"
      :is-fold="true"
      :expand-type="true"
      primary-key="id"
      expand-key="name"
      @checkbox-click="handleCheckBoxClick"
      @row-click="handleRowClick"
      @row-dblclick="handleRowDbClick"
    >
      <template slot="expand" slot-scope="scope">
        {{ `我的姓名是 ${scope.row.name},
        这一行的索引是 ${scope.rowIndex}.`
        }}
      </template>
      <template slot="action" slot-scope="scope">
        <Button
          type="primary"
          @click="click(scope.row)"
          size="small"
          icon="md-add"
          style="margin-right:5px"
        >添加子节点</Button>
        <Button
          size="small"
          @click="click(scope.row)"
          icon="ios-create-outline"
          style="margin-right:5px"
        >编辑</Button>
        <Button type="error" @click="click(scope.row)" size="small" icon="md-trash">删除</Button>
      </template>
    </tree-table>

    <h3 class="article">props</h3>
    <Table :columns="props" :data="data1" border size="small" width="1000"></Table>
    <h3 class="article">columns configs</h3>
    <Table :columns="props" :data="data2" border size="small" width="1000"></Table>
    <h3 class="article">events</h3>
    <Table :columns="events" :data="data3" border size="small" width="1000"></Table>
    <h3 class="article">methods</h3>
    <Table :columns="methods" :data="data4" border size="small" width="1000"></Table>
  </div>
</template>
<script>
import TreeTable from "@/views/my-components/tree-table/Table/Table";
export default {
  name: "xboot-components",
  components: {
    TreeTable
  },
  data() {
    return {
      loading: false,
      selectCount: 0,
      columns: [
        {
          title: "姓名",
          key: "name",
          minWidth: "200px"
        },
        {
          title: "性别",
          key: "sex",
          align: "center",
          headerAlign: "center",
          minWidth: "50px"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          headerAlign: "center",
          minWidth: "200px"
        },
        {
          title: "更新时间",
          key: "updateTime",
          align: "center",
          headerAlign: "center",
          minWidth: "200px"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          headerAlign: "center",
          width: "250px",
          type: "template",
          template: "action"
        }
      ],
      tableData: [
        {
          id: 1,
          name: "Jack",
          sex: "男",
          createTime: "2018-08-08 00:08:00",
          updateTime: "2018-08-08 00:08:00",
          children: [
            {
              id: 2,
              name: "Ashley",
              sex: "女",
              createTime: "2018-08-08 00:08:00",
              updateTime: "2018-08-08 00:08:00",
              children: [
                {
                  id: 3,
                  name: "Ashley",
                  sex: "女",
                  createTime: "2018-08-08 00:08:00",
                  updateTime: "2018-08-08 00:08:00"
                },
                {
                  id: 4,
                  name: "Taki",
                  sex: "男",
                  createTime: "2018-08-08 00:08:00",
                  updateTime: "2018-08-08 00:08:00"
                }
              ]
            },
            {
              id: 5,
              name: "Taki",
              sex: "男",
              createTime: "2018-08-08 00:08:00",
              updateTime: "2018-08-08 00:08:00"
            }
          ]
        },
        {
          id: 6,
          name: "Tom",
          sex: "男",
          createTime: "2018-08-08 00:08:00",
          updateTime: "2018-08-08 00:08:00",
          children: [
            {
              id: 7,
              name: "Ashley",
              sex: "女",
              createTime: "2018-08-08 00:08:00",
              updateTime: "2018-08-08 00:08:00"
            }
          ]
        },
        {
          id: 8,
          name: "Tom",
          sex: "男",
          createTime: "2018-08-08 00:08:00",
          updateTime: "2018-08-08 00:08:00"
        },
        {
          id: 9,
          name: "Tom",
          sex: "男",
          createTime: "2018-08-08 00:08:00",
          updateTime: "2018-08-08 00:08:00",
          children: [
            {
              id: 10,
              name: "Ashley",
              sex: "女",
              createTime: "2018-08-08 00:08:00",
              updateTime: "2018-08-08 00:08:00"
            }
          ]
        }
      ],
      events: [
        {
          title: "事件名",
          key: "name",
          width: 150
        },
        {
          title: "说明",
          key: "type",
          width: 300
        },
        {
          title: "返回值",
          key: "value"
        }
      ],
      props: [
        {
          title: "属性",
          key: "name",
          width: 130
        },
        {
          title: "说明",
          key: "desc",
          width: 500
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "默认值",
          key: "value",
          width: 150
        }
      ],
      configs: [
        {
          title: "属性",
          key: "name",
          width: 130
        },
        {
          title: "说明",
          key: "desc",
          width: 500
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "默认值",
          key: "value",
          width: 150
        }
      ],
      methods: [
        {
          title: "方法名",
          key: "name",
          width: 150
        },
        {
          title: "说明",
          key: "type",
          width: 300
        },
        {
          title: "参数",
          key: "value"
        }
      ],
      data1: [
        {
          name: "loading",
          desc: "是否加载状态",
          type: "Boolean",
          value: "false"
        },
        {
          name: "primary-key",
          desc:
            "设置主键列的key（columns列对象里的prop），避免刷新数据后折叠状态丢失",
          type: "String",
          value: "-"
        },
        {
          name: "data",
          desc: "是否选开启多张上传，默认true开启，设为false仅限制一张",
          type: "Array",
          value: "[]"
        },
        {
          name: "tree-type",
          desc: "是否为树形表格",
          type: "Boolean",
          value: "true"
        },
        {
          name: "columns",
          desc: "表格各列的配置（具体见下方Columns Configs文档部分）",
          type: "Array",
          value: "-"
        },
        {
          name: "expand-key",
          desc: "需要显示展开按钮的列的key（columns列对象里的prop）",
          type: "String",
          value: "默认为第一列的prop"
        },
        {
          name: "show-header",
          desc: "是否显示表头",
          type: "Boolean",
          value: "true"
        },
        {
          name: "show-index",
          desc: "是否显示数据索引",
          type: "Boolean",
          value: "false"
        },
        {
          name: "index-text",
          desc: "数据索引名称",
          type: "String",
          value: "#"
        },
        {
          name: "show-summary",
          desc: "是否显示表尾合计行",
          type: "Boolean",
          value: "false"
        },
        {
          name: "sum-text",
          desc: "表尾合计行首列名称",
          type: "String",
          value: "合计"
        },
        {
          name: "summary-method",
          desc: "表尾合计行计算方法",
          type: "Function(data, column, columnIndex)",
          value: "-"
        },
        {
          name: "children-prop",
          desc: "树形表格中遍历的属性名称",
          type: "String",
          value: "children"
        },
        {
          name: "is-fold",
          desc: "树形表格中父级是否默认折叠",
          type: "Boolean",
          value: "true"
        },
        {
          name: "expand-type",
          desc:
            "是否为展开行类型表格（为 True 时，需要添加名称为 '$expand' 的作用域插槽, 它可以获取到 row, rowIndex)",
          type: "Boolean",
          value: "false"
        },
        {
          name: "selectable",
          desc: "是否为多选类型表格",
          type: "Boolean",
          value: "true"
        },
        {
          name: "row-key",
          desc: "行数据的Key，用来优化 Table 的渲染",
          type: "Function(row, rowIndex)",
          value: "rowIndex"
        },
        {
          name: "row-class-name",
          desc: "额外的表格行的样式类名",
          type: "String, Function(row, rowIndex)",
          value: "-"
        },
        {
          name: "cell-class-name",
          desc: "额外的表格行的样式类名",
          type: "String, Function(row, rowIndex, column, columnIndex)",
          value: "-"
        },
        {
          name: "row-style",
          desc: "额外的表格行的样式",
          type: "Object, Function(row, rowIndex)",
          value: "-"
        },
        {
          name: "cell-style",
          desc: "额外的表格单元格的样式",
          type: "Object, Function(row, rowIndex, column, columnIndex)",
          value: "-"
        }
      ],
      data2: [
        {
          name: "title",
          desc: "列标题名称",
          type: "String",
          value: "-"
        },
        {
          name: "key",
          desc: "对应列内容的属性名",
          type: "String",
          value: "-"
        },
        {
          name: "align",
          desc: "对应列内容的对齐方式，可选值有 'center', 'right'",
          type: "String",
          value: "left"
        },
        {
          name: "headerAlign",
          desc: "对应列标题的对齐方式，可选值有 'center', 'right'",
          type: "String",
          value: "left"
        },
        {
          name: "width",
          desc: "列宽度",
          type: "[String, Number]",
          value: "auto"
        },
        {
          name: "minWidth",
          desc: "列最小宽度",
          type: "[String, Number]",
          value: "80px"
        },
        {
          name: "type",
          desc: "列类型，可选值有 'template'(自定义列模板)",
          type: "String",
          value: "-"
        },
        {
          name: "template",
          desc:
            "列类型为 'template'(自定义列模板) 时，对应的作用域插槽（它可以获取到 row, rowIndex, column, columnIndex）名称",
          type: "String",
          value: "-"
        }
      ],
      data3: [
        {
          name: "cell-click",
          type: "单击某一单元格",
          value: "row, rowIndex, column, columnIndex, $event"
        },
        {
          name: "cell-dblclick",
          type: "双击某一单元格",
          value: "row, rowIndex, column, columnIndex, $event"
        },
        {
          name: "cell-contextmenu",
          type: "在某一单元格上点击鼠标右键",
          value: "row, rowIndex, column, columnIndex, $event"
        },
        {
          name: "cell-mouseenter",
          type: "鼠标滑入某一单元格",
          value: "row, rowIndex, column, columnIndex, $event"
        },
        {
          name: "cell-mouseleave",
          type: "鼠标滑出某一单元格",
          value: "row, rowIndex, column, columnIndex, $event"
        },
        {
          name: "row-click",
          type: "单击某一行",
          value: "row, rowIndex, $event"
        },
        {
          name: "row-dblclick",
          type: "双击某一行",
          value: "row, rowIndex, $event"
        },
        {
          name: "row-contextmenu",
          type: "在某一行上点击鼠标右键",
          value: "row, rowIndex, $event"
        },
        {
          name: "row-mouseenter",
          type: "鼠标滑入某一行",
          value: "row, rowIndex, $event"
        },
        {
          name: "row-mouseleave",
          type: "鼠标滑出某一行",
          value: "row, rowIndex, $event"
        },
        {
          name: "checkbox-click",
          type: "鼠标单击checkbox",
          value: "row, rowIndex, $event"
        },
        {
          name: "tree-icon-click",
          type: "鼠标单击树形icon",
          value: "row, rowIndex, $event"
        },
        {
          name: "expand-cell-click",
          type: "鼠标单击展开单元格",
          value: "row, rowIndex, $event"
        }
      ],
      data4: [
        {
          name: "getCheckedProp",
          type:
            "当表格为多选类型表格时，用于获取当前所选项的属性，返回一个数组；属性默认为'index'。",
          value: "prop"
        }
      ]
    };
  },
  methods: {
    refresh() {
      this.loading = true;
      let that = this;
      setTimeout(function() {
        that.loading = false;
      }, 1000);
    },
    handleRowClick(row, rowIndex, $event) {
      console.log("单击了数据ID为：" + row.id + " 的一行数据");
    },
    handleRowDbClick(row, rowIndex, $event) {
      this.$Message.info("双击了数据ID为：" + row.id + " 的一行数据");
    },
    handleCheckBoxClick() {
      this.selectCount = this.$refs.treeTable.getCheckedProp().length;
    },
    click(v) {
      this.$Message.info("点击数据ID为：" + v.id);
    }
  }
};
</script>
<style lang="less">
.article {
  font-size: 16px;
  font-weight: 400;
  margin: 12px 0;
}
.href-text {
  font-size: 12px;
}
.operation {
  margin-bottom: 2vh;
}
.select-count {
  font-size: 13px;
  font-weight: 600;
  color: #40a9ff;
}
</style>
