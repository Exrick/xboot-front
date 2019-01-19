<template>
  <div>
    <Cascader
      v-model="selectDep"
      :data="department"
      :load-data="loadData"
      @on-change="handleChangeDep"
      change-on-select
      filterable
      clearable
      placeholder="请选择或输入搜索部门"
      :style="{width: width}"
    ></Cascader>
  </div>
</template>

<script>
import { initDepartment, loadDepartment } from "@/api/index";
export default {
  name: "departmentChoose",
  props: {
    width: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
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
              e.value = e.id;
              e.label = e.title;
              e.loading = false;
              e.children = [];
            } else {
              e.value = e.id;
              e.label = e.title;
            }
            if (e.status === -1) {
              e.label = "[已禁用] " + e.label;
              e.disabled = true;
            }
          });
          this.department = res.result;
        }
      });
    },
    loadData(item, callback) {
      item.loading = true;
      loadDepartment(item.value).then(res => {
        item.loading = false;
        if (res.success === true) {
          res.result.forEach(function(e) {
            if (e.isParent) {
              e.value = e.id;
              e.label = e.title;
              e.loading = false;
              e.children = [];
            } else {
              e.value = e.id;
              e.label = e.title;
            }
            if (e.status === -1) {
              e.label = "[已禁用] " + e.label;
              e.disabled = true;
            }
          });
          item.children = res.result;
          callback();
        }
      });
    },
    handleChangeDep(value, selectedData) {
      let departmentId = "";
      // 获取最后一个值
      if (value && value.length > 0) {
        departmentId = value[value.length - 1];
      }
      this.$emit("on-select", departmentId);
    },
    clearSelect() {
      this.selectDep = [];
    }
  },
  created() {
    this.initDepartmentData();
  }
};
</script>

<style lang="less">
</style>

