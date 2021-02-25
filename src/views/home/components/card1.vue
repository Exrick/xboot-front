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
      <div class="card-body">
        <Icon
          :type="icon"
          :color="iconColor"
          :size="iconSize"
          v-if="icon"
        ></Icon>
        <img :src="image" :width="width" :height="height" v-else />
        <div>
          <count-up
            class="card-title"
            :prefix="prefix"
            :suffix="suffix"
            :id-name="idName"
            :end-val="endVal"
            :color="titleColor"
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
    idName: String,
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
      default: "#2d8cf0",
    },
    image: String,
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
    titleColor: {
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
  padding: 24px 28px;
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


