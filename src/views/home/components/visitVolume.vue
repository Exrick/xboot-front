<template>
  <div class="visit">
    <Card>
      <p slot="title" class="card-title">
        <Icon type="md-map" style="margin-right: 5px"></Icon>每日来访量统计
      </p>
      <div slot="extra">
        <DatePicker
          :options="options"
          type="daterange"
          placeholder="选择日期范围"
          style="width: 250px"
        ></DatePicker>
      </div>
      <div style="height: 273px">
        <apexchart
          type="bar"
          height="280"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </Card>
  </div>
</template>

<script>
import { addDays, subDays } from "date-fns";
import { shortcuts } from "@/libs/shortcuts";
var zh = require("../../../libs/zh.json");
export default {
  name: "visitVolume",
  data() {
    return {
      options: {
        shortcuts: shortcuts,
      },
      series: [
        {
          name: "",
          data: [],
        },
      ],
      chartOptions: {
        colors: ["#398af7", "#63a3f9", "#b3d1fd"],
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          locales: [zh],
          defaultLocale: "zh",
        },
        plotOptions: {
          bar: {
            columnWidth: "40%",
            horizontal: false,
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            datetimeFormatter: {
              year: "yyyy年",
              month: "yyyy年MMM",
              day: "MMMdd日",
            },
          },
          categories: [],
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: "MMM dd日",
          },
        },
      },
    };
  },
  methods: {
    init() {
      this.series = [
        {
          name: "登录次数",
          data: [44, 55, 41, 67, 22, 43, 27, 45, 15, 44, 30, 44, 30, 15],
        },
        {
          name: "浏览量",
          data: [13, 23, 20, 8, 13, 27, 23, 20, 8, 13, 27, 13, 27, 50],
        },
        {
          name: "注册用户",
          data: [11, 17, 15, 15, 21, 14, 17, 15, 15, 21, 14, 21, 14, 35],
        },
      ];
      let categories = [];
      let num = 14;
      let start = subDays(new Date(), num);
      for (let i = 0; i < num; i++) {
        categories.push(addDays(start, i).getTime());
      }
      this.chartOptions.xaxis.categories = categories;
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="less">
.visit {
  .ivu-card-head {
    border-bottom: none !important;
  }
}
</style>
