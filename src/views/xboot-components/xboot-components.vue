<template>
  <div>
    <Card>
      <Layout>
        <Sider
          hide-trigger
          style="background: #fff; max-width: 220px; flex: 0 0 220px"
        >
          <div class="side-content" :style="{ maxHeight: maxHeight }">
            <Menu
              :active-name="currName"
              theme="light"
              width="auto"
              :open-names="['1', '2', '3', '4']"
              @on-select="currName = $event"
            >
              <MenuItem name="0"
                ><Icon type="md-ribbon" /><Badge dot :offset="[5, -3]"
                  >更新日志</Badge
                ></MenuItem
              >
              <Submenu name="1">
                <template slot="title">
                  <Icon type="md-ionic" />XBoot通用组件
                </template>
                <MenuItem name="1-0">全局Loading加载动画</MenuItem>
                <MenuItem name="1-1">倒计时按钮</MenuItem>
                <MenuItem name="1-2"
                  ><Badge dot :offset="[5, -3]">图标选择输入框</Badge></MenuItem
                >
                <MenuItem name="1-14"
                  ><Badge dot :offset="[5, -3]">扩展图标XIcon</Badge></MenuItem
                >
                <MenuItem name="1-11">数据字典组件</MenuItem>
                <MenuItem name="1-12">
                  <Badge dot :offset="[5, -3]">自定义列表选择</Badge>
                </MenuItem>
                <MenuItem name="1-3">部门级联选择</MenuItem>
                <MenuItem name="1-4">部门树选择</MenuItem>
                <MenuItem name="1-5"
                  ><Badge dot :offset="[5, -3]">用户抽屉选择</Badge></MenuItem
                >
                <MenuItem name="1-13">
                  <Badge dot :offset="[5, -3]">用户搜索+抽屉选择</Badge>
                </MenuItem>
                <MenuItem name="1-6"
                  ><Badge dot :offset="[5, -3]">图片上传输入框</Badge></MenuItem
                >
                <MenuItem name="1-7">
                  <Badge dot :offset="[5, -3]">图片上传缩略图</Badge>
                </MenuItem>
                <MenuItem name="1-10">
                  <Badge dot :offset="[5, -3]">文件上传/下载</Badge>
                </MenuItem>
                <MenuItem name="1-8">身份验证全屏弹框</MenuItem>
                <MenuItem name="1-9">密码强度提示输入框</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-create" />
                  <Badge dot :offset="[5, -3]">编辑器(付费)</Badge>
                </template>
                <MenuItem name="3-1">wangEditor 富文本</MenuItem>
                <MenuItem name="3-3">Monaco 代码编辑器</MenuItem>
                <MenuItem name="3-2"
                  ><Badge :offset="[0, -15]" text="废弃" type="normal"
                    >Quill</Badge
                  ></MenuItem
                >
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  <Icon type="md-globe" />
                  <Badge dot :offset="[5, -3]">地图组件</Badge>
                </template>
                <MenuItem name="4-1">地图选点</MenuItem>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="md-git-compare" />工作流组件(付费)
                </template>
                <MenuItem name="2-1">工作流程选择发起</MenuItem>
                <MenuItem name="2-2">通过流程key直接发起</MenuItem>
                <MenuItem name="2-3">取消撤回申请</MenuItem>
              </Submenu>
            </Menu>
          </div>
        </Sider>
        <Content
          :style="{
            padding: '0 0 0 24px',
            minHeight: '280px',
            background: '#fff',
          }"
        >
          <div class="component-content" :style="{ maxHeight: maxHeight }">
            <div v-if="currName == '0'">
              <update />
            </div>
            <div v-if="currName == '1-0'">
              <loading />
            </div>
            <div v-if="currName == '1-1'">
              <countDownButton />
            </div>
            <div v-if="currName == '1-2'">
              <iconChoose />
            </div>
            <div v-if="currName == '1-14'">
              <XIconComponent />
            </div>
            <div v-if="currName == '1-11'">
              <dict />
            </div>
            <div v-if="currName == '1-12'">
              <customList />
            </div>
            <div v-if="currName == '1-3'">
              <departmentChoose />
            </div>
            <div v-if="currName == '1-4'">
              <departmentTreeChoose />
            </div>
            <div v-if="currName == '1-5'">
              <userChoose />
            </div>
            <div v-if="currName == '1-13'">
              <userSelect />
            </div>
            <div v-if="currName == '1-6'">
              <uploadPicInput />
            </div>
            <div v-if="currName == '1-7'">
              <uploadPicThumb />
            </div>
            <div v-if="currName == '1-10'">
              <fileUpload />
            </div>
            <div v-if="currName == '1-8'">
              <checkPassword />
            </div>
            <div v-if="currName == '1-9'">
              <setPassword />
            </div>

            <div v-if="currName == '3-1'">
              <editor />
            </div>
            <div v-if="currName == '3-3'">
              <monaco />
            </div>
            <div v-if="currName == '3-2'">
              <quill />
            </div>

            <div v-if="currName == '4-1'">
              <Map />
            </div>

            <div v-if="currName == '2-1'">
              <processChoose />
            </div>
            <div v-if="currName == '2-2'">
              <processStart />
            </div>
            <div v-if="currName == '2-3'">
              <processCancel />
            </div>
          </div>
        </Content>
      </Layout>
    </Card>
  </div>
</template>

<script>
import update from "./update";
import loading from "./components/loading";
import countDownButton from "./components/countDownButton";
import iconChoose from "./components/iconChoose";
import XIconComponent from "./components/XIconComponent";
import dict from "./components/dict";
import customList from "./components/customList";
import departmentChoose from "./components/departmentChoose";
import departmentTreeChoose from "./components/departmentTreeChoose";
import userChoose from "./components/userChoose";
import userSelect from "./components/userSelect";
import uploadPicInput from "./components/uploadPicInput";
import uploadPicThumb from "./components/uploadPicThumb";
import fileUpload from "./components/fileUpload";
import checkPassword from "./components/checkPassword";
import setPassword from "./components/setPassword";

import editor from "./components/editor";
import monaco from "./components/monaco";
import quill from "./components/quill";

import Map from "./components/map";

import processChoose from "./components/processChoose";
import processStart from "./components/processStart";
import processCancel from "./components/processCancel";

export default {
  name: "xboot-components",
  components: {
    update,
    loading,
    countDownButton,
    iconChoose,
    XIconComponent,
    dict,
    departmentChoose,
    userChoose,
    departmentTreeChoose,
    uploadPicInput,
    uploadPicThumb,
    fileUpload,
    checkPassword,
    setPassword,
    customList,
    userSelect,
    editor,
    monaco,
    quill,
    Map,
    processChoose,
    processStart,
    processCancel,
  },
  data() {
    return {
      maxHeight: 510,
      currName: "0",
    };
  },
  methods: {
    init() {
      let q = this.$route.query;
      if (q.menu) {
        this.currName = q.menu;
      }
    },
  },
  mounted() {
    this.init();
    this.maxHeight = Number(document.documentElement.clientHeight - 160) + "px";
  },
};
</script>

<style lang="less">
.side-content,
.component-content {
  overflow: auto;
}
.side-content::-webkit-scrollbar {
  display: none;
}
.component-article {
  font-size: 16px;
  font-weight: 400;
  margin: 12px 0;
}
.component-blue {
  color: #40a9ff !important;
}
code {
  display: inline-block;
  background: #f7f7f7;
  margin: 0 3px;
  padding: 1px 5px;
  border-radius: 3px;
  color: #666;
  border: 1px solid #eee;
}
</style>