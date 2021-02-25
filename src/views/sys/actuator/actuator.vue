<style lang="less">
@import "./actuator.less";
</style>
<template>
  <div class="search">
    <Card>
      <p slot="title">Spring Boot 2.x Actuator监控列表</p>
      <Table border :columns="columns" :data="data" ref="table"></Table>
    </Card>

    <Modal
      v-model="modalVisible"
      :mask-closable="false"
      :width="900"
      :fullscreen="full"
    >
      <div slot="header">
        <div class="ivu-modal-header-inner">{{ modalTitle }}</div>
        <a @click="full = !full" class="modal-fullscreen">
          <Icon
            v-show="!full"
            type="ios-expand"
            class="model-fullscreen-icon"
          />
          <Icon
            v-show="full"
            type="ios-contract"
            class="model-fullscreen-icon"
          />
        </a>
        <a @click="modalVisible = false" class="ivu-modal-close">
          <Icon type="ios-close" class="ivu-icon-ios-close" />
        </a>
      </div>
      <div style="position: relative">
        <div v-if="!full" style="max-height: 60vh; overflow: auto">
          <vue-json-pretty
            v-if="!full"
            :data="jsonData"
            :deep="deep"
            showLength
          />
        </div>
        <vue-json-pretty v-if="full" :data="jsonData" :deep="deep" showLength />
        <Spin fix v-if="loading" />
      </div>
      <div slot="footer">
        展开数据级数深度：
        <InputNumber
          :min="0"
          v-model="myDeep"
          @on-change="changDeep"
          style="margin-right: 10px"
        ></InputNumber>
        <Button @click="modalVisible = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
export default {
  name: "actuator",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      loading: false,
      modalTitle: "",
      modalVisible: false,
      full: false,
      deep: Infinity,
      myDeep: null,
      jsonData: {},
      columns: [
        {
          type: "index",
          width: 60,
          align: "center",
        },
        {
          title: "功能名称",
          key: "name",
          sortable: true,
        },
        {
          title: "URL",
          key: "url",
          sortable: true,
        },
        {
          title: "备注",
          key: "description",
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (
              !params.row.needPerm ||
              (this.$route.meta.permTypes &&
                this.$route.meta.permTypes.includes("view"))
            ) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      // type: "primary",
                      size: "small",
                      icon: "md-eye",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        this.showData(params.row);
                      },
                    },
                  },
                  "查看数据"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small",
                      icon: "ios-close-circle-outline",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {},
                    },
                  },
                  "您无权查看"
                ),
              ]);
            }
          },
        },
      ],
      data: [
        {
          name: "查看健康状态",
          url: "/health",
          needPerm: false, // 不需要查看权限
        },
        {
          name: "查看应用信息",
          url: "/info",
          needPerm: false,
        },
        {
          name: "查看环境变量",
          url: "/env",
          needPerm: true,
        },
        {
          name: "查看metrics指标",
          url: "/metrics",
          needPerm: false,
        },
        {
          name: "查看@Scheduled定时计划任务",
          url: "/scheduledtasks",
          needPerm: false,
        },
        {
          name: "查看日志文件",
          url: "/logfile",
          description:
            "数据极多，最大10M，可能加载较慢甚至造成卡顿，网速不给力可能将加载超时",
          needPerm: true,
        },
        {
          name: "查看最近100个请求",
          url: "/httptrace",
          description: "数据较多，可能加载较慢甚至造成卡顿",
          needPerm: true,
        },
        {
          name: "查看线程栈",
          url: "/threaddump",
          description: "数据较多，可能加载较慢甚至造成卡顿",
          needPerm: true,
        },
        {
          name: "查看所有URL映射列表",
          url: "/mappings",
          description: "数据较多，可能加载较慢甚至造成卡顿",
          needPerm: true,
        },
        {
          name: "查看所有Spring Beans的完整列表",
          url: "/beans",
          description: "数据较多，可能加载较慢甚至造成卡顿",
          needPerm: true,
        },
        {
          name: "查看配置类和自动配置类状态",
          url: "/conditions",
          description: "包含被应用或未被应用的原因，数据较多，可能加载较慢",
          needPerm: true,
        },
        {
          name: "查看所有@ConfigurationProperties的属性集合列表",
          url: "/configprops",
          description: "数据较多，可能加载较慢甚至造成卡顿",
          needPerm: true,
        },
        {
          name: "查看日志配置",
          url: "/loggers",
          description: "数据较多，可能加载较慢甚至造成卡顿",
          needPerm: true,
        },
      ],
    };
  },
  methods: {
    showData(v) {
      this.deep = Infinity;
      this.myDeep = null;
      this.modalVisible = true;
      this.loading = true;
      this.getRequest("/actuator" + v.url).then((res) => {
        this.loading = false;
        this.jsonData = res;
      });
      this.modalTitle = v.name + " (搜索快捷键Ctrl+F)";
    },
    changDeep(v) {
      this.deep = v;
    },
  },
  mounted() {},
};
</script>