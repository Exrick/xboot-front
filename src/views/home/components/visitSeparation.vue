<template>
  <div>
    <Card>
      <p slot="title" class="card-title">
        <Icon type="md-locate" style="margin-right:5px"></Icon>访问用户分布
      </p>
      <Row type="flex" justify="center" align="middle" style="height:273px;">
        <apexchart type="donut" width="350" :options="chartOptions" :series="series" />
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: "visitSeparation",
  data() {
    return {
      series: [],
      chartOptions: {
        labels: ["移动端", "PC", "平板", "IOS", "其他"],
        plotOptions: {
          pie: {
            donut: {
              size: "70%"
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          position: "right"
        }
      }
    };
  },
  methods: {
    init() {
      this.series = [45, 18, 27, 15, 13];
    }
  },
  mounted() {
    this.init();
  }
};
</script>
