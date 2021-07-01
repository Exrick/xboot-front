<template>
  <Card :padding="0" :style="{ backgroundColor: backgroundColor }">
    <div
      class="card-content card2"
      :style="{ backgroundImage: backgroundImage }"
    >
      <div class="card-body">
        <div :style="{ color: color }" class="card-title">{{ title }}</div>
        <div class="card-data">
          <count-up
            :prefix="prefix"
            :suffix="suffix"
            :id="id"
            :end-val="endVal"
            :color="dataColor"
            :countSize="countSize"
            :countWeight="countWeight"
          />
          <span
            class="card-description"
            :style="{
              color: descriptionColor,
              fontSize: descriptionSize,
              fontWeight: descriptionWeight,
            }"
            >{{ description }}</span
          >
        </div>
        <Progress
          :percent="endVal"
          :stroke-color="color"
          :stroke-width="strokeWidth"
          hide-info
        />
      </div>
    </div>
  </Card>
</template>

<script>
import countUp from "@/views/my-components/widget/countUp.vue";

export default {
  name: "card2",
  components: {
    countUp,
  },
  props: {
    id: String,
    backgroundColor: String,
    backgroundImage: String,
    title: String,
    prefix: String,
    suffix: String,
    endVal: Number,
    color: {
      type: String,
      default: "#19be6b",
    },
    dataColor: {
      type: String,
      default: "#3f4255",
    },
    countSize: {
      type: String,
      default: "24px",
    },
    countWeight: {
      type: Number,
      default: 600,
    },
    description: String,
    strokeWidth: {
      type: Number,
      default: 6.5,
    },
    descriptionColor: {
      type: String,
      default: "#b5b5c5",
    },
    descriptionSize: {
      type: String,
      default: "12px",
    },
    descriptionWeight: {
      type: Number,
      default: 500,
    },
  },
};
</script>
<style lang="less" scoped>
.card-content {
  height: 150px;
  padding: 26px 30px;
}
.card2 {
  background-position: right top;
  background-size: 30% auto;
  background-repeat: no-repeat;
  .card-body {
    display: flex;
    flex-direction: column;
    height: 102px;
    justify-content: space-around;
    align-items: flex-start;
    .card-title {
      font-weight: 600;
    }
    .card-data {
      display: flex;
      align-items: flex-end;
      .card-description {
        margin: 0 0 5px 5px;
      }
    }
  }
}
</style>


