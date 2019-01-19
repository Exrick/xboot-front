<template>
  <div>
    <Poptip trigger="click" placement="right" title="选择部门" width="250">
      <div style="display:flex;">
        <Input
          v-model="departmentTitle"
          readonly
          :style="{width: width}"
          style="margin-right:10px;"
          :placeholder="placeholder"
        />
        <Button icon="md-trash" @click="clearSelect">清空已选</Button>
      </div>
      <div slot="content" class="tree-bar">
        <Input
          v-model="searchKey"
          suffix="ios-search"
          @on-change="searchDep"
          placeholder="输入部门名搜索"
          clearable
        />
        <Tree
          :data="dataDep"
          :load-data="loadData"
          @on-select-change="selectTree"
          :multiple="multiple"
        ></Tree>
        <Spin size="large" fix v-if="depLoading"></Spin>
      </div>
    </Poptip>
  </div>
</template>

<script>
import { initDepartment, loadDepartment, searchDepartment } from "@/api/index";
export default {
  name: "departmentTreeChoose",
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "200px"
    },
    placeholder: {
      type: String,
      default: "点击选择部门"
    }
  },
  data() {
    return {
      depLoading: false,
      departmentTitle: "",
      searchKey: "",
      dataDep: [],
      selectDep: [],
      department: []
    };
  },
  methods: {
    initDepartmentData() {
      initDepartment().then(res => {
        if (res.success === true) {
          res.result.forEach(function(e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
            if (e.status === -1) {
              e.title = "[已禁用] " + e.title;
              e.disabled = true;
            }
          });
          this.dataDep = res.result;
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
            if (e.status === -1) {
              e.title = "[已禁用] " + e.title;
              e.disabled = true;
            }
          });
          callback(res.result);
        }
      });
    },
    searchDep() {
      // 搜索部门
      if (this.searchKey) {
        this.depLoading = true;
        searchDepartment({ title: this.searchKey }).then(res => {
          this.depLoading = false;
          if (res.success) {
            res.result.forEach(function(e) {
              if (e.status === -1) {
                e.title = "[已禁用] " + e.title;
                e.disabled = true;
              }
            });
            this.dataDep = res.result;
          }
        });
      } else {
        this.initDepartmentData();
      }
    },
    selectTree(v) {
      let ids = [],
        title = "";
      v.forEach(e => {
        ids.push(e.id);
        if (title == "") {
          title = e.title;
        } else {
          title = title + "、" + e.title;
        }
      });
      this.departmentId = ids;
      this.departmentTitle = title;
      this.$emit("on-change", this.departmentId);
    },
    clearSelect() {
      this.departmentId = [];
      this.departmentTitle = "";
      this.initDepartmentData();
      this.$emit("on-change", this.departmentId);
    },
    setSelectDep(ids, title){
      this.departmentId = ids;
      this.departmentTitle = title;
      this.$emit("on-change", this.departmentId);
    }
  },
  created() {
    this.initDepartmentData();
  }
};
</script>

<style lang="less">
.tree-bar {
    max-height: 500px;
    overflow: auto;
    margin-top: 5px;
}

.tree-bar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.tree-bar::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 2px #d1d1d1;
    background: #e4e4e4;
}

.ivu-tree .ivu-tree-empty {
    margin-top: 10px;
    font-size: 12px;
}
</style>

