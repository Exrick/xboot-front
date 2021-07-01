<template>
  <Card
    :padding="0"
    :bordered="bordered"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div
      class="card-content card1"
      :style="{ backgroundImage: backgroundImage }"
    >
      <div class="card-body" :style="{ height: cardHeight }">
        <Icon
          :type="icon"
          :color="iconColor"
          :size="iconSize"
          v-if="icon"
        ></Icon>
        <img :src="image" :width="width" :height="height" v-else />
        <div>
          <count-up
            :prefix="prefix"
            :suffix="suffix"
            :id="id"
            :end-val="endVal"
            :color="countColor"
            :countSize="countSize"
            :countWeight="countWeight"
            :decimalPlaces="decimalPlaces"
            :duration="duration"
            :delay="delay"
            :options="options"
          />
          <span
            :style="{
              color: titleColor,
              fontSize: titleSize,
              fontWeight: titleWeight,
            }"
            >{{ title }}</span
          >
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import countUp from "./countUp.vue";

export default {
  name: "card1",
  components: {
    countUp,
  },
  props: {
    id: String,
    cardHeight: {
      type: String,
      default: "102px",
    },
    backgroundColor: String,
    backgroundImage: String,
    bordered: {
      type: Boolean,
      default: true,
    },
    icon: String,
    iconSize: {
      type: [Number, String],
      default: 26,
    },
    iconColor: {
      type: String,
      default: "#478ef9",
    },
    image: {
      type: String,
      default: require("@/assets/dashboard/empty.png"),
    },
    width: {
      type: String,
      default: "26px",
    },
    height: {
      type: String,
      default: "26px",
    },
    prefix: String,
    suffix: String,
    endVal: Number,
    decimalPlaces: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 2,
    },
    delay: {
      type: Number,
      default: 0,
    },
    options: {
      type: Object,
      default: () => {
        return {
          startVal: 0,
          useEasing: true,
          useGrouping: true,
          separator: ",",
          decimal: ".",
        };
      },
    },
    countColor: {
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
    title: String,
    titleColor: {
      type: String,
      default: "#b5b5c5",
    },
    titleSize: {
      type: String,
      default: "12px",
    },
    titleWeight: {
      type: Number,
      default: 500,
    },
  },
};
</script>
<style lang="less" scoped>
.card-content {
  padding: 26px 30px;
}
.card1 {
  background-position: right top;
  background-size: 30% auto;
  background-repeat: no-repeat;
  .card-body {
    display: flex;
    flex-direction: column;
    height: 102px;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>


