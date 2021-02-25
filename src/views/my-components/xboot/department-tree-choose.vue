<template>
  <div>
    <div style="display: flex;">
      <Input
        v-model="departmentTitle"
        readonly
        :size="size"
        :disabled="disabled"
        :prefix="prefix"
        :suffix="suffix"
        style="margin-right: 10px"
        :placeholder="placeholder"
        :clearable="clearable"
        @on-clear="clearSelect"
      />
      <Poptip
        transfer
        trigger="click"
        placement="right"
        title="选择部门"
        width="250"
      >
        <Button
          :size="size"
          :disabled="disabled"
          :icon="icon"
          :type="type"
          :shape="shape"
          :ghost="ghost"
          >{{ text }}</Button
        >
        <div slot="content">
          <Input
            v-model="searchKey"
            suffix="ios-search"
            @on-change="searchDep"
            placeholder="输入部门名搜索"
            clearable
          />
          <div class="dep-tree-bar">
            <Tree
              :data="dataDep"
              :load-data="loadData"
              @on-select-change="selectTree"
              :multiple="multiple"
            ></Tree>
            <Spin size="large" fix v-if="depLoading"></Spin>
          </div>
        </div>
      </Poptip>
    </div>
  </div>
</template>

<script>
import { initDepartment, loadDepartment, searchDepartment } from "@/api/index";
export default {
  name: "departmentTreeChoose",
  props: {
    text: {
      type: String,
      default: "选择部门",
    },
    icon: {
      type: String,
      default: "md-list",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: String,
    type: String,
    shape: String,
    ghost: {
      type: Boolean,
      default: false,
    },
    prefix: String,
    suffix: String,
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "点击选择部门",
    },
  },
  data() {
    return {
      depLoading: false,
      departmentTitle: "",
      searchKey: "",
      dataDep: [],
      selectDep: [],
      departmentId: [],
    };
  },
  methods: {
    initDepartmentData() {
      initDepartment().then((res) => {
        if (res.success) {
          res.result.forEach(function (e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
            if (e.status == -1) {
              e.title = "[已禁用] " + e.title;
              e.disabled = true;
            }
          });
          this.dataDep = res.result;
        }
      });
    },
    loadData(item, callback) {
      loadDepartment(item.id).then((res) => {
        if (res.success) {
          res.result.forEach(function (e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
            if (e.status == -1) {
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
        searchDepartment({ title: this.searchKey }).then((res) => {
          this.depLoading = false;
          if (res.success) {
            res.result.forEach(function (e) {
              if (e.status == -1) {
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
      v.forEach((e) => {
        ids.push(e.id);
        if (title == "") {
          title = e.title;
        } else {
          title = title + "、" + e.title;
        }
      });
      this.departmentId = ids;
      this.departmentTitle = title;
      if (this.multiple) {
        this.$emit("on-change", this.departmentId);
      } else {
        this.$emit("on-change", this.departmentId[0]);
      }
    },
    clearSelect() {
      this.departmentId = [];
      this.departmentTitle = "";
      this.initDepartmentData();
      if (this.multiple) {
        this.$emit("on-change", []);
      } else {
        this.$emit("on-change", "");
      }
      this.$emit("on-clear");
    },
    setData(ids, title) {
      this.departmentTitle = title;
      if (this.multiple) {
        this.departmentId = ids;
      } else {
        this.departmentId = [];
        this.departmentId.push(ids);
      }
      this.$emit("on-change", this.departmentId);
    },
  },
  mounted() {
    this.initDepartmentData();
  },
};
</script>

<style lang="less">
.dep-tree-bar {
  position: relative;
  min-height: 80px;
  max-height: 500px;
  overflow: auto;
  margin-top: 5px;
}

.dep-tree-bar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.dep-tree-bar::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 2px #d1d1d1;
  background: #e4e4e4;
}
</style>

