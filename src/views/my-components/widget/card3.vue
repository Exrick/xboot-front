<template>
  <Card
    :padding="0"
    :bordered="bordered"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div
      class="card-content card3"
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
          <div
            class="card-title"
            :style="{
              color: titleColor,
              fontSize: titleSize,
              fontWeight: titleWeight,
              marginBottom: titleBottom,
            }"
          >
            {{ title }}
          </div>
          <div
            class="card-description"
            :style="{
              color: descriptionColor,
              fontSize: descriptionSize,
              fontWeight: descriptionWeight,
              marginBottom: descriptionBottom,
            }"
          >
            {{ description }}
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: "card3",
  components: {},
  props: {
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
      type: Number,
      default: 36,
    },
    iconColor: {
      type: String,
      default: "#478ef9",
    },
    image: String,
    width: {
      type: String,
      default: "30px",
    },
    height: {
      type: String,
      default: "30px",
    },
    title: String,
    titleColor: {
      type: String,
      default: "#3f4255",
    },
    titleSize: {
      type: String,
      default: "18px",
    },
    titleWeight: {
      type: Number,
      default: 600,
    },
    titleBottom: {
      type: String,
      default: "0px",
    },
    description: String,
    descriptionColor: {
      type: String,
      default: "#3f4255",
    },
    descriptionSize: {
      type: String,
      default: "12px",
    },
    descriptionWeight: {
      type: Number,
      default: 500,
    },
    descriptionBottom: {
      type: String,
      default: "0px",
    },
  },
};
</script>
<style lang="less" scoped>
.card-content {
  padding: 26px 30px;
}
.card3 {
  background-position: right top;
  background-size: 30% auto;
  background-repeat: no-repeat;
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .card-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-description {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>


