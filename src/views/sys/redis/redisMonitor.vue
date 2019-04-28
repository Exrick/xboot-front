<template>
  <div>
    <Row>
      <Col span="12">
        <apexchart
          ref="memoryInfo"
          type="area"
          height="350"
          :options="memory.chartOptions"
          :series="memory.series"
        />
      </Col>
      <Col span="12">
        <apexchart
          ref="keySize"
          type="area"
          height="350"
          :options="key.chartOptions"
          :series="key.series"
        />
      </Col>
    </Row>
    <Row>
      <Divider orientation="left">Redis详细信息</Divider>
      <Table :columns="columns" :data="redisInfo" :show-header="false"></Table>
    </Row>
  </div>
</template>

<script>
import { getRedisKeySize, getRedisMemory, getRedisInfo } from "@/api/index";
export default {
  name: "redisMonitor",
  data() {
    return {
      memory: {
        series: [],
        chartOptions: {
          chart: {
            animations: {
              enabled: true,
              easing: "linear",
              dynamicAnimation: {
                speed: 3000
              }
            },
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth"
          },
          title: {
            text: "Redis内存实时占用情况（KB）",
            align: "left"
          },
          markers: {
            size: 0
          },
          xaxis: {},
          yaxis: {},
          legend: {
            show: false
          }
        },
        data: [],
        xdata: []
      },
      key: {
        series: [],
        chartOptions: {
          chart: {
            animations: {
              enabled: true,
              easing: "linear",
              dynamicAnimation: {
                speed: 3000
              }
            },
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#f5564e"],
          stroke: {
            curve: "smooth"
          },
          title: {
            text: "Redis key实时数量（个）",
            align: "left"
          },
          markers: {
            size: 0
          },
          xaxis: {},
          yaxis: {},
          legend: {
            show: false
          }
        },
        data: [],
        xdata: []
      },
      columns: [
        {
          key: "key",
          minWidth: 200
        },
        {
          key: "description",
          minWidth: 500
        },
        {
          key: "value",
          width: 400
        }
      ],
      redisInfo: [],
      timer: null
    };
  },
  methods: {
    init() {
      this.getData();
      this.getInfo();
    },
    // 统计
    getData() {
      let minMemory = 1e10;
      let minSize = 1e10;
      let maxMemory = -1e10;
      let maxSize = -1e10;
      this.timer = setInterval(() => {
        // 内存
        getRedisMemory().then(res => {
          let currentMemory = res.result.memory / 1024;
          // 更新最大最小值
          if (currentMemory < minMemory) {
            minMemory = currentMemory;
          }
          if (currentMemory > maxMemory) {
            maxMemory = currentMemory;
          }

          this.memory.data.push(currentMemory);
          this.memory.xdata.push(res.result.time);
          // 5个点
          if (this.memory.data.length >= 6) {
            this.memory.data.shift();
            this.memory.xdata.shift();
          }
          // 更新点信息
          this.$refs.memoryInfo.updateSeries([
            {
              name: "内存(KB)",
              data: this.memory.data.slice()
            }
          ]);
          // 更新最大最小值
          this.$refs.memoryInfo.updateOptions(
            {
              xaxis: {
                categories: this.memory.xdata.slice()
              },
              yaxis: {
                min: minMemory,
                max: maxMemory
              }
            },
            true,
            true
          );
        });
        // 键值
        getRedisKeySize().then(res => {
          let currentSize = res.result.keySize;
          // 更新最大最小值
          if (currentSize < minSize) {
            minSize = currentSize;
          }
          if (currentSize > maxSize) {
            maxSize = currentSize;
          }

          this.key.data.push(currentSize);
          this.key.xdata.push(res.result.time);
          // 5个点
          if (this.key.data.length >= 6) {
            this.key.data.shift();
            this.key.xdata.shift();
          }
          // 更新点信息
          this.$refs.keySize.updateSeries([
            {
              name: "key数量",
              data: this.key.data.slice()
            }
          ]);
          // 更新最大最小值
          this.$refs.keySize.updateOptions(
            {
              xaxis: {
                categories: this.key.xdata.slice()
              },
              yaxis: {
                min: minSize - 2,
                max: maxSize + 2
              }
            },
            true,
            true
          );
        });
      }, 5000);
    },
    getInfo() {
      getRedisInfo().then(res => {
        let data = [];
        res.result.forEach(e => {
          if (e.description) {
            data.push(e);
          }
        });
        this.redisInfo = data;
      });
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less">
</style>