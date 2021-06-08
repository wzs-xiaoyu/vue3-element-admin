import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App);
import ExtendComponents from "./components";
import { get, post } from "./common/js/service";
import waterMark from "./common/js/waterMark";
import ParticlesJs from "particles.js";
// 按需引入 echarts 5.x
import echarts from "./common/js/echartsUI";
// UI 框架
import {
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElIcon,
  ElButton,
  ElInput,
  ElSelect,
  ElOption,
  ElSwitch,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElPagination,
  ElDialog,
  ElTooltip,
  ElCard,
  ElRow,
  ElCol,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElTimeline,
  ElTimelineItem,
  ElDrawer,
  ElBreadcrumb,
  ElBreadcrumbItem,
} from "element-plus";
[
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElIcon,
  ElButton,
  ElInput,
  ElSelect,
  ElOption,
  ElSwitch,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElPagination,
  ElDialog,
  ElTooltip,
  ElCard,
  ElRow,
  ElCol,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElTimeline,
  ElTimelineItem,
  ElDrawer,
  ElBreadcrumb,
  ElBreadcrumbItem,
].forEach((comp) => app.use(comp));
import "./common/style/theme/index.css";
import "nprogress/nprogress.css";
app.use(ExtendComponents);
app.use(waterMark);
app.use(ParticlesJs);
app.config.globalProperties.$get = get;
app.config.globalProperties.$post = post;
app.config.globalProperties.$echarts = echarts;
app.use(store).use(router).mount("#app");
