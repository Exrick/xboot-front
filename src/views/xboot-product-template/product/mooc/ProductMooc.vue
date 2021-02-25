<style lang="less">
@import "./ProductMooc.less";
</style>

<template>
  <div :class="{'container':true,'large': size=='large'}">
    <a @click="openProduct(data)">
      <div :class="{'card-top':type!='bounce', 'card-top bounce':type=='bounce'}">
        <Badge :text="data.tag" :class-name="bageClass">
          <img class="img-up" v-lazy="data.picUrl">
        </Badge>
        <div v-if="data.label" class="product-label">
          <span>{{data.label}}</span>
        </div>
        <div v-if="type=='bounce'">
          <img class="img-mid" v-lazy="data.picUrl" />
          <img class="img-down" v-lazy="data.picUrl" />
        </div>
      </div>
      <div class="card-content">
        <h3 class="name">{{data.title}}</h3>
        <div class="comment" v-if="size=='large'">
          <div>销量：{{data.sales}}</div>
          <div>评价：{{data.rate}} 分</div>
        </div>
        <div class="info">
          {{data.description}}
        </div>
        <div class="price">
          <span class="p">￥{{Number(data.price).toFixed(2)}}</span>
          <span v-if="size!='large'" class="sales">销量：{{data.sales}}</span>
          <div v-if="size=='large'" class="add-cart">
            <a>
              <Icon type="md-cart"></Icon>加入购物车</a>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "ProductMooc",
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          sales: 0
        };
      }
    },
    type: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    }
  },
  computed: {
    bageClass() {
      let tag = String(this.data.tag).toLowerCase();
      if (tag == "new" || tag == "hot") {
        return tag;
      } else {
        return "bage";
      }
    }
  },
  methods: {
    openProduct(v) {
      // window.open("//" + window.location.host + "/product?id=" + v.id);
    }
  },
  mounted() {}
};
</script>
