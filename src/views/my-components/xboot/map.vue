<template>
  <div>
    <div style="display: flex">
      <Input
        v-model="data"
        @on-change="handleChange"
        :placeholder="placeholder"
        :size="size"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :clearable="clearable"
        v-if="showInput"
        style="margin-right: 10px"
      />
      <Button
        :size="size"
        :type="type"
        :shape="shape"
        :ghost="ghost"
        :disabled="disabled"
        :icon="icon"
        @click="handleShow"
        >{{ text }}</Button
      >
    </div>
    <Modal
      v-model="showModal"
      :mask-closable="false"
      :width="width"
      :fullscreen="full"
      @on-visible-change="changeModal"
      class="map-modal"
    >
      <div slot="header">
        <div class="ivu-modal-header-inner">{{ text }}</div>
        <a @click="handleFull" class="modal-fullscreen">
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
        <a @click="showModal = false" class="ivu-modal-close">
          <Icon type="ios-close" class="ivu-icon-ios-close" />
        </a>
      </div>
      <div :id="id" :style="{ width: '100%', height: modalHeight }"></div>
      <div slot="footer">
        <Row align="middle" justify="space-between">
          <Alert show-icon style="margin-bottom: 0"
            >当前选点坐标：{{ currentValue }}</Alert
          >
          <div>
            <Button type="text" @click="showModal = false">取消</Button>
            <Button type="primary" @click="handelSubmit">确认提交</Button>
          </div>
        </Row>
      </div>
    </Modal>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
export default {
  name: "map",
  props: {
    id: {
      type: String,
      default: "map",
    },
    value: {
      type: String,
      default: "",
    },
    showInput: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: "地图选点",
    },
    width: {
      type: Number,
      default: 900,
    },
    pitch: {
      type: Number,
      default: 0
    },
    decimal: {
      type: Number,
      default: 6,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    size: String,
    type: String,
    shape: String,
    ghost: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "输入坐标或选择地点",
    },
    maxlength: Number,
    readonly: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "md-locate",
    },
    style: {
      type: String,
      default: "mapbox://styles/mapbox/streets-v11",
    },
    center: {
      type: Array,
      default: [116.35, 39.85],
    },
    zoom: {
      type: Number,
      default: 9,
    },
    compact: {
      type: Boolean,
      default: true,
    },
    customAttribution: {
      type: String,
      default: "",
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    changeStyle: {
      type: Boolean,
      default: true,
    },
    navigation: {
      type: Boolean,
      default: true,
    },
    locate: {
      type: Boolean,
      default: true,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    building3D: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      data: this.value,
      mapbox: null,
      currentValue: "",
      showModal: false,
      full: false,
      modalHeight: "500px",
      marker: null,
    };
  },
  methods: {
    init() {
      if (!config.mapboxToken) {
        return;
      }
      mapboxgl.accessToken = config.mapboxToken;
      this.mapbox = new mapboxgl.Map({
        container: this.id,
        style: this.style,
        center: this.center,
        zoom: this.zoom,
        pitch: this.pitch,
        attributionControl: false,
      });
      // 属性
      this.mapbox.addControl(
        new mapboxgl.AttributionControl({
          compact: this.compact,
          customAttribution: this.customAttribution,
        })
      );
      // 搜索
      if (this.searchable) {
        this.mapbox.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
          })
        );
      }
      // 地图样式切换
      class ChangeStyleControl {
        getDefaultPosition() {
          const defaultPosition = "top-right";
          return defaultPosition;
        }
        onAdd(map) {
          this.map = map;
          this.controlContainer = document.createElement("div");
          this.controlContainer.classList.add("mapboxgl-ctrl");
          this.controlContainer.classList.add("mapboxgl-ctrl-group");
          this.mapStyleContainer = document.createElement("div");
          this.styleButton = document.createElement("button");
          this.styleButton.type = "button";
          this.mapStyleContainer.classList.add("mapboxgl-style-list");
          const defaultStyle = "街道地图";
          const styles = [
            { title: "街道地图", uri: "mapbox://styles/mapbox/streets-v11" },
            {
              title: "卫星街道",
              uri: "mapbox://styles/mapbox/satellite-streets-v11",
            },
            { title: "暗黑风格", uri: "mapbox://styles/mapbox/dark-v10" },
            { title: "明亮风格", uri: "mapbox://styles/mapbox/light-v10" },
            { title: "户外地图", uri: "mapbox://styles/mapbox/outdoors-v11" },
            { title: "卫星地图", uri: "mapbox://styles/mapbox/satellite-v9" },
          ];
          for (const style of styles) {
            const styleElement = document.createElement("button");
            styleElement.type = "button";
            styleElement.innerText = style.title;
            styleElement.classList.add(
              style.title.replace(/[^a-z0-9-]/gi, "_")
            );
            styleElement.dataset.uri = JSON.stringify(style.uri);
            styleElement.addEventListener("click", (event) => {
              const srcElement = event.srcElement;
              if (srcElement.classList.contains("active")) {
                return;
              }
              this.map.setStyle(JSON.parse(srcElement.dataset.uri));
              setTimeout(() => {
                const labelList = this.map.getStyle().layers.filter((layer) => {
                  return /-label/.test(layer.id);
                });
                for (let labelLayer of labelList) {
                  this.map.setLayoutProperty(labelLayer.id, "text-field", [
                    "coalesce",
                    ["get", "name_zh-Hans"],
                    ["get", "name"],
                  ]);
                }
              }, 500);
              this.mapStyleContainer.style.display = "none";
              this.styleButton.style.display = "block";
              const elms = this.mapStyleContainer.getElementsByClassName(
                "active"
              );
              while (elms[0]) {
                elms[0].classList.remove("active");
              }
              srcElement.classList.add("active");
            });
            if (style.title === defaultStyle) {
              styleElement.classList.add("active");
            }
            this.mapStyleContainer.appendChild(styleElement);
          }
          this.styleButton.classList.add("mapboxgl-ctrl-icon");
          this.styleButton.classList.add("mapboxgl-style-switcher");
          this.styleButton.addEventListener("click", () => {
            this.styleButton.style.display = "none";
            this.mapStyleContainer.style.display = "block";
          });
          document.addEventListener("click", this.onDocumentClick);
          this.controlContainer.appendChild(this.styleButton);
          this.controlContainer.appendChild(this.mapStyleContainer);
          return this.controlContainer;
        }
        onRemove() {
          if (
            !this.controlContainer ||
            !this.controlContainer.parentNode ||
            !this.map ||
            !this.styleButton
          ) {
            return;
          }
          this.styleButton.removeEventListener("click", this.onDocumentClick);
          this.controlContainer.parentNode.removeChild(this.controlContainer);
          document.removeEventListener("click", this.onDocumentClick);
          this.map = undefined;
        }
        onDocumentClick(event) {
          if (
            this.controlContainer &&
            !this.controlContainer.contains(event.target) &&
            this.mapStyleContainer &&
            this.styleButton
          ) {
            this.mapStyleContainer.style.display = "none";
            this.styleButton.style.display = "block";
          }
        }
      }
      if (this.changeStyle) {
        this.mapbox.addControl(new ChangeStyleControl());
      }
      // 导航控件
      if (this.navigation) {
        this.mapbox.addControl(new mapboxgl.NavigationControl());
      }
      // 定位
      if (this.locate) {
        this.mapbox.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          })
        );
      }
      // 全屏
      if (this.fullscreen) {
        this.mapbox.addControl(
          new mapboxgl.FullscreenControl({
            container: document.querySelector("body"),
          })
        );
      }
      this.mapbox.on("load", () => {
        // 中文
        const labelList = this.mapbox.getStyle().layers.filter((layer) => {
          return /-label/.test(layer.id);
        });
        for (let labelLayer of labelList) {
          this.mapbox.setLayoutProperty(labelLayer.id, "text-field", [
            "coalesce",
            ["get", "name_zh-Hans"],
            ["get", "name"],
          ]);
        }
        // 3D建筑
        if (this.building3D) {
          this.mapbox.addLayer({
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.6,
            },
          });
          // 显示点
          this.flyTo();
        }
      });
      // 单点标记
      this.mapbox.on("click", (e) => {
        if (this.marker) {
          this.marker.remove();
        }
        this.marker = new mapboxgl.Marker({
          offset: [0, -25],
          draggable: this.draggable,
        })
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(this.mapbox);
        if (this.decimal < 0) {
          this.decimal = 0;
        }
        if (this.decimal > 14) {
          this.decimal = 14;
        }
        let lng = e.lngLat.lng.toFixed(this.decimal);
        let lat = e.lngLat.lat.toFixed(this.decimal);
        this.currentValue = lng + ", " + lat;
        this.$emit("on-click", this.currentValue);
      });
    },
    flyTo() {
      if (this.data) {
        try {
          let lngLat = this.data.split(",");
          let lng = lngLat[0].trim();
          let lat = lngLat[1].trim();
          this.currentValue = this.data;
          if (this.marker) {
            this.marker.remove();
          }
          this.marker = new mapboxgl.Marker({
            offset: [0, -25],
            draggable: true,
          })
            .setLngLat([lng, lat])
            .addTo(this.mapbox);
          this.mapbox.flyTo({
            center: [lng, lat],
            essential: true,
          });
        } catch (error) {
          console.log(error)
          this.$Message.error("您输入的坐标不合法");
        }
      } else {
        this.currentValue = "";
        if (this.marker) {
          this.marker.remove();
        }
        this.mapbox.flyTo({
          center: this.center,
          zoom: 9,
          essential: true,
        });
      }
    },
    handleChange(v) {
      this.$emit("input", this.data);
      this.$emit("on-change", this.data);
    },
    setData(value) {
      if (!this.mapbox) {
        this.init();
      }
      if (value != this.data) {
        this.data = value;
        this.$emit("input", this.data);
        this.$emit("on-change", this.data);
      }
    },
    handleFull() {
      this.full = !this.full;
      if (this.full) {
        this.modalHeight = "100%";
      } else {
        this.modalHeight = "500px";
      }
      setTimeout(() => {
        this.mapbox.resize();
      }, 10);
    },
    handleShow() {
      if (!config.mapboxToken) {
        this.$Message.warning("请先配置Mapbox地图的accessToken");
        return;
      }
      this.showModal = true;
    },
    changeModal(v) {
      if (v) {
        setTimeout(() => {
          this.mapbox.resize();
          this.flyTo();
        }, 10);
      }
    },
    handelSubmit() {
      this.data = this.currentValue;
      this.$emit("input", this.data);
      this.$emit("on-change", this.data);
      this.showModal = false;
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    if (this.mapbox != null) {
      this.mapbox.remove();
    }
  },
  watch: {
    value(val) {
      this.setData(val);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less">
.mapboxgl-style-list {
  display: none;
}

.mapboxgl-ctrl-group .mapboxgl-style-list button {
  background: none;
  border: none;
  cursor: pointer;
  display: block;
  font-size: 14px;
  padding: 8px 8px 6px;
  text-align: right;
  width: 100%;
  height: auto;
}

.mapboxgl-style-list button.active {
  font-weight: bold;
}

.mapboxgl-style-list button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.mapboxgl-style-list button + button {
  border-top: 1px solid #ddd;
}

.mapboxgl-style-switcher {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTQuODQ5cHgiIGhlaWdodD0iNTQuODQ5cHgiIHZpZXdCb3g9IjAgMCA1NC44NDkgNTQuODQ5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NC44NDkgNTQuODQ5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PGc+PGc+PHBhdGggZD0iTTU0LjQ5NywzOS42MTRsLTEwLjM2My00LjQ5bC0xNC45MTcsNS45NjhjLTAuNTM3LDAuMjE0LTEuMTY1LDAuMzE5LTEuNzkzLDAuMzE5Yy0wLjYyNywwLTEuMjU0LTAuMTA0LTEuNzktMC4zMThsLTE0LjkyMS01Ljk2OEwwLjM1MSwzOS42MTRjLTAuNDcyLDAuMjAzLTAuNDY3LDAuNTI0LDAuMDEsMC43MTZMMjYuNTYsNTAuODFjMC40NzcsMC4xOTEsMS4yNTEsMC4xOTEsMS43MjksMEw1NC40ODgsNDAuMzNDNTQuOTY0LDQwLjEzOSw1NC45NjksMzkuODE3LDU0LjQ5NywzOS42MTR6Ii8+PHBhdGggZD0iTTU0LjQ5NywyNy41MTJsLTEwLjM2NC00LjQ5MWwtMTQuOTE2LDUuOTY2Yy0wLjUzNiwwLjIxNS0xLjE2NSwwLjMyMS0xLjc5MiwwLjMyMWMtMC42MjgsMC0xLjI1Ni0wLjEwNi0xLjc5My0wLjMyMWwtMTQuOTE4LTUuOTY2TDAuMzUxLDI3LjUxMmMtMC40NzIsMC4yMDMtMC40NjcsMC41MjMsMC4wMSwwLjcxNkwyNi41NiwzOC43MDZjMC40NzcsMC4xOSwxLjI1MSwwLjE5LDEuNzI5LDBsMjYuMTk5LTEwLjQ3OUM1NC45NjQsMjguMDM2LDU0Ljk2OSwyNy43MTYsNTQuNDk3LDI3LjUxMnoiLz48cGF0aCBkPSJNMC4zNjEsMTYuMTI1bDEzLjY2Miw1LjQ2NWwxMi41MzcsNS4wMTVjMC40NzcsMC4xOTEsMS4yNTEsMC4xOTEsMS43MjksMGwxMi41NDEtNS4wMTZsMTMuNjU4LTUuNDYzYzAuNDc3LTAuMTkxLDAuNDgtMC41MTEsMC4wMS0wLjcxNkwyOC4yNzcsNC4wNDhjLTAuNDcxLTAuMjA0LTEuMjM2LTAuMjA0LTEuNzA4LDBMMC4zNTEsMTUuNDFDLTAuMTIxLDE1LjYxNC0wLjExNiwxNS45MzUsMC4zNjEsMTYuMTI1eiIvPjwvZz48L2c+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvc3ZnPg==);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70%;
}
.map-modal {
  .ivu-modal-body {
    padding: 0px;
  }
}
</style>