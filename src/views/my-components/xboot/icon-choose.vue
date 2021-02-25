<template>
  <div>
    <div style="display: flex">
      <Input
        v-model="currentValue"
        @on-change="handleChange"
        :placeholder="placeholder"
        :size="size"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :icon="currentValue"
      />
      <Button
        @click="iconModalVisible = true"
        :size="size"
        :type="type"
        :shape="shape"
        :ghost="ghost"
        :disabled="disabled"
        :icon="icon"
        style="margin-left: 10px"
        >选择图标</Button
      >
    </div>

    <Modal
      title="选择图标"
      v-model="iconModalVisible"
      :width="950"
      :styles="{ top: '30px' }"
      footer-hide
      :z-index="1060"
    >
      <div style="min-height: 350px">
        <div class="icon-search">
          <input
            type="text"
            v-model="key"
            :placeholder="tip"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
          />
        </div>
        <Tabs
          v-model="showType"
          @on-click="changeType"
          type="card"
          v-if="showCustom || showInput"
        >
          <TabPane label="Ionicons官方图标" name="ionic"></TabPane>
          <TabPane
            label="iconfont扩展图标"
            name="iconfont"
            v-if="showCustom"
          ></TabPane>
          <TabPane
            label="自定义图片链接"
            name="input"
            v-if="showInput"
          ></TabPane>
        </Tabs>
        <div class="icon-block icon-bar" v-if="showType != 'input'">
          <div
            class="icon-wrap"
            v-for="(item, i) in iconData"
            :key="i"
            @click="hanleChoose(item)"
          >
            <div class="icons-item">
              <Icon
                v-if="item.indexOf('iconfont') > -1"
                :custom="item"
                size="32"
              />
              <Icon v-else :type="item" size="32" />
              <p>{{ item }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="icon-input-content">
            <Menu
              active-name="1"
              @on-select="menu = $event"
              style="width: 250px"
            >
              <MenuItem name="1">
                <Icon type="md-link" />
                输入图标图片链接
              </MenuItem>
              <MenuItem name="2">
                <Icon type="md-cloud-upload" />
                上传图标图片
              </MenuItem>
            </Menu>
            <div v-if="menu == '1'" style="width: 100%; display: flex">
              <Form
                ref="form"
                :model="form"
                label-position="left"
                :label-width="120"
                :rules="ruleValidate"
                class="icon-input-form"
              >
                <FormItem label="图标图片链接" prop="url">
                  <Input
                    v-model="form.url"
                    type="textarea"
                    :rows="5"
                    maxlength="250"
                    show-word-limit
                    placeholder="请输入图片链接..."
                  />
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="submit">确认提交</Button>
                </FormItem>
              </Form>
              <Avatar
                v-if="!form.url"
                shape="square"
                icon="md-images"
                size="110"
              />
              <Avatar v-else shape="square" :src="form.url" size="110" />
            </div>
            <div v-else style="width: 100%">
              <Form
                ref="form"
                :model="form"
                label-position="left"
                :label-width="120"
                :rules="ruleValidate2"
                class="icon-input-form"
              >
                <FormItem label="上传图标图片" prop="url">
                  <uploadPicThumb
                    v-model="form.url"
                    width="100px"
                    height="100px"
                  />
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="submit">确认提交</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { icons, iconfont } from "@/libs/icon";
import uploadPicThumb from "@/views/my-components/xboot/upload-pic-thumb";
export default {
  components: {
    uploadPicThumb,
  },
  name: "iconChoose",
  props: {
    value: {
      type: String,
      default: "",
    },
    size: String,
    type: String,
    shape: String,
    ghost: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "输入图标名或选择图标",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    maxlength: Number,
    icon: {
      type: String,
      default: "md-ionic",
    },
    showCustom: {
      type: Boolean,
      default: false,
    },
    showInput: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menu: "1",
      showType: "ionic",
      iconModalVisible: false,
      currentValue: this.value,
      iconData: [],
      key: "",
      tip: "输入英文关键词搜索，比如 success",
      form: {
        url: ""
      },
      ruleValidate: {
        url: [
          {
            required: true,
            message: "请输入合法的URL链接",
            type: "url",
            trigger: "change",
          },
        ],
      },
      ruleValidate2: {
        url: [
          {
            required: true,
            message: "请上传图片",
            type: "url",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    init() {
      this.changeType("ionic");
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.currentValue = this.form.url;
          this.$emit("input", this.currentValue);
          this.$emit("on-change", this.currentValue);
          this.iconModalVisible = false;
        }
      });
    },
    changeType(name) {
      if (this.key) {
        this.handleInput();
      } else {
        let re = [],
          data = [];
        if (name == "ionic") {
          data = icons;
        } else {
          data = iconfont;
        }
        data.forEach((e) => {
          e.icons.forEach((item) => {
            re.push(item);
          });
        });
        this.iconData = re;
      }
    },
    handleInput() {
      if (this.key) {
        // 搜索
        let re = [],
          data = [];
        if (this.showType == "ionic") {
          data = icons;
        } else {
          data = iconfont;
        }
        data.forEach((e) => {
          e.tags.forEach((item) => {
            if (item.indexOf(this.key) >= 0) {
              e.icons.forEach((r) => {
                re.push(r);
              });
            }
          });
        });
        this.iconData = re;
      } else {
        this.init();
      }
    },
    handleFocus() {
      if (!this.key) {
        this.tip = "";
      }
    },
    handleBlur() {
      if (!this.key) {
        this.tip = "输入英文关键词搜索，比如 success";
      }
    },
    handleChange(v) {
      this.$emit("input", this.currentValue);
      this.$emit("on-change", this.currentValue);
    },
    setCurrentValue(value) {
      if (value === this.currentValue) {
        return;
      }
      this.currentValue = value;
    },
    hanleChoose(v) {
      this.currentValue = v;
      this.$emit("input", this.currentValue);
      this.$emit("on-change", this.currentValue);
      this.iconModalVisible = false;
    },
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less">
.icon-search {
  position: relative;
  margin: 20px 0 30px 0;
  text-align: center;
  input {
    width: 500px;
    box-sizing: border-box;
    border: 0;
    border-radius: 4px;
    background: #f5f5f5;
    text-align: center;
    font-size: 14px;
    outline: none;
    margin: 0 auto;
    padding: 8px 0;
  }
}
.icon-block {
  display: flex;
  flex-wrap: wrap;
  max-height: 500px;
  overflow: auto;
}
.icon-bar {
  overflow: auto;
  overflow-x: hidden;
}
.icon-bar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.icon-bar::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #c3c3c3;
}

.icon-bar::-webkit-scrollbar-track {
  background: #fff;
}
.icon-wrap {
  :hover {
    color: #1890ff;
    transition: color 0.3s;
  }
}
.icons-item {
  margin: 6px 6px 6px 0;
  width: 145px;
  text-align: center;
  list-style: none;
  cursor: pointer;
  height: 100px;
  color: #5c6b77;
  transition: all 0.2s ease;
  position: relative;
  padding-top: 10px;
  p {
    padding-top: 15px;
    margin: 5px;
    font-size: 14px;
  }
}
.icon-input-content {
  display: flex;
  justify-content: space-around;
  .icon-input-form {
    width: 590px;
    padding: 0 16px;
  }
}
</style>

