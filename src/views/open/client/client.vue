<template>
  <div class="search">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <FormItem label="网站名称" prop="name">
            <Input
              type="text"
              v-model="searchForm.name"
              placeholder="请输入网站名称"
              clearable
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="网站主页" prop="homeUri">
            <Input
              type="text"
              v-model="searchForm.homeUri"
              placeholder="请输入网站主页"
              clearable
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="创建时间" prop="createTime">
            <DatePicker
              :options="options"
              v-model="selectDate"
              type="daterange"
              format="yyyy-MM-dd"
              clearable
              @on-change="selectDateRange"
              placeholder="选择起始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem style="margin-left: -35px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search"
              >搜索</Button
            >
            <Button @click="handleReset">重置</Button>
          </FormItem>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="add" type="primary" icon="md-add">添加</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
        <Button type="dashed" @click="openSearch = !openSearch">{{
          openSearch ? "关闭搜索" : "开启搜索"
        }}</Button>
        <Button type="dashed" @click="openTip = !openTip">{{
          openTip ? "关闭提示" : "开启提示"
        }}</Button>
      </Row>
      <Alert show-icon v-show="openTip">
        已选择
        <span class="select-count">{{ selectList.length }}</span> 项
        <a class="select-clear" @click="clearSelectAll">清空</a>
      </Alert>
      <Table
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        ref="table"
        sortable="custom"
        @on-sort-change="changeSort"
        @on-selection-change="changeSelect"
      ></Table>
      <Row type="flex" justify="end" class="page">
        <Page
          :current="searchForm.pageNumber"
          :total="total"
          :page-size="searchForm.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10, 20, 50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Card>

    <Modal
      :title="modalTitle"
      v-model="modalVisible"
      :mask-closable="false"
      :width="500"
    >
      <Form ref="form" :model="form" :label-width="100" :rules="formValidate">
        <FormItem label="clientId" v-if="modalType != 0">{{
          form.id
        }}</FormItem>
        <FormItem label="网站名称" prop="name">
          <Input v-model="form.name" clearable style="width: 100%" />
        </FormItem>
        <FormItem label="网站Logo" prop="logo" class="form-noheight">
          <upload-pic-input v-model="form.logo"></upload-pic-input>
        </FormItem>
        <FormItem label="clientSecret" prop="clientSecret">
          <Row type="flex" justify="space-between">
            <Input v-model="form.clientSecret" clearable style="width: 74%" />
            <Button @click="generateSecret">生成秘钥</Button>
          </Row>
        </FormItem>
        <FormItem label="网站主页" prop="homeUri">
          <Input v-model="form.homeUri" clearable style="width: 100%" />
        </FormItem>
        <FormItem label="回调地址" prop="redirectUri">
          <Input v-model="form.redirectUri" clearable style="width: 100%" />
        </FormItem>
        <FormItem label="自动授权" prop="autoApprove">
          <i-switch v-model="form.autoApprove">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          <Tooltip
            content="已认证登录的用户无需授权确认，自动通过（通常用于信任的内部站点和单点登录的实现）"
            placement="right"
            transfer
            max-width="280"
            style="display: inline-block !important"
          >
            <Icon
              type="md-help-circle"
              size="20"
              color="#c5c5c5"
              style="margin-left: 10px; cursor: pointer"
            />
          </Tooltip>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalVisible = false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit"
          >提交</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getSecretKey,
  getClientDataList,
  addClient,
  updateClient,
  deleteClient,
} from "@/api/open";
import uploadPicInput from "@/views/my-components/xboot/upload-pic-input";
import { shortcuts } from "@/libs/shortcuts";
export default {
  name: "client",
  components: {
    uploadPicInput,
  },
  data() {
    return {
      openSearch: true, // 显示搜索
      openTip: true, // 显示提示
      loading: true, // 表单加载状态
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      searchForm: {
        // 搜索框初始化对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
        startDate: "", // 起始时间
        endDate: "", // 终止时间
      },
      selectDate: null,
      options: {
        shortcuts: shortcuts,
      },
      form: {
        // 添加或编辑表单对象初始化数据
        name: "",
        logo: "",
        clientSecret: "",
        homeUri: "",
        redirectUri: "",
        autoApprove: false,
      },
      // 表单验证规则
      formValidate: {
        name: [{ required: true, message: "不能为空", trigger: "change" }],
        logo: [{ required: true, message: "不能为空", trigger: "change" }],
        clientSecret: [
          { required: true, message: "不能为空", trigger: "change" },
        ],
        homeUri: [
          {
            required: true,
            type: "url",
            message: "无效的URL链接",
            trigger: "change",
          },
        ],
        redirectUri: [
          {
            required: true,
            type: "url",
            message: "无效的回调链接",
            trigger: "change",
          },
        ],
      },
      submitLoading: false, // 添加或编辑提交状态
      selectList: [], // 多选数据
      columns: [
        // 表头
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "网站名称",
          key: "name",
          minWidth: 120,
          sortable: false,
        },
        {
          title: "Logo",
          key: "logo",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("Avatar", {
              props: {
                src: params.row.logo,
              },
            });
          },
        },
        {
          title: "clientId",
          key: "id",
          width: 190,
          sortable: false,
        },
        {
          title: "clientSecret",
          key: "clientSecret",
          minWidth: 150,
          sortable: false,
        },
        {
          title: "网站主页",
          key: "homeUri",
          minWidth: 120,
          sortable: false,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  attrs: {
                    href: params.row.homeUri,
                    target: "_blank",
                  },
                },
                params.row.homeUri
              ),
            ]);
          },
        },

        {
          title: "回调地址",
          key: "redirectUri",
          minWidth: 120,
          sortable: false,
        },
        {
          title: "自动授权",
          key: "autoApprove",
          align: "center",
          width: 100,
          render: (h, params) => {
            if (params.row.autoApprove) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "blue",
                    },
                  },
                  "开启"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "default",
                    },
                  },
                  "关闭"
                ),
              ]);
            }
          },
        },
        {
          title: "创建时间",
          key: "createTime",
          width: 170,
          sortable: true,
          sortType: "desc",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 130,
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.edit(params.row);
                    },
                  },
                },
                "编辑"
              ),
              h("Divider", {
                props: {
                  type: "vertical",
                },
              }),
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.remove(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数
    };
  },
  methods: {
    init() {
      this.getDataList();
    },
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.selectDate = null;
      this.searchForm.startDate = "";
      this.searchForm.endDate = "";
      // 重新加载数据
      this.getDataList();
    },
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order === "normal") {
        this.searchForm.order = "";
      }
      this.getDataList();
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    changeSelect(e) {
      this.selectList = e;
    },
    selectDateRange(v) {
      if (v) {
        this.searchForm.startDate = v[0];
        this.searchForm.endDate = v[1];
      }
    },
    generateSecret() {
      getSecretKey().then((res) => {
        if (res.success) {
          this.form.clientSecret = res.result;
        }
      });
    },
    getDataList() {
      this.loading = true;
      // 带多条件搜索参数获取表单数据 请自行修改接口
      getClientDataList(this.searchForm).then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
          if (this.data.length == 0 && this.searchForm.pageNumber > 1) {
            this.searchForm.pageNumber -= 1;
            this.getDataList();
          }
        }
      });
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType === 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            delete this.form.id;
            addClient(this.form).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          } else {
            // 编辑
            updateClient(this.form).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          }
        }
      });
    },
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      delete this.form.id;
      this.modalVisible = true;
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑";
      this.$refs.form.resetFields();
      // 转换null为""
      for (let attr in v) {
        if (v[attr] === null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
      this.modalVisible = true;
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v.name + " ?",
        loading: true,
        onOk: () => {
          // 删除
          deleteClient({ ids: v.id }).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.clearSelectAll();
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    delAll() {
      if (this.selectList.length <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectList.length + " 条数据?",
        loading: true,
        onOk: () => {
          let ids = "";
          this.selectList.forEach(function (e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          // 批量删除
          deleteClient({ ids: ids }).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.clearSelectAll();
              this.getDataList();
            }
          });
        },
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less">
@import "@/styles/table-common.less";
</style>