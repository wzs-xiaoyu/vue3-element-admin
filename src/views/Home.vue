<template>
  <div style="position: relative">
    <el-container v-if="activeMode === 'asideMenu'">
      <el-header height="8vh" v-if="!isSingle">
        <main-header></main-header>
      </el-header>
      <el-container>
        <el-aside width="auto" v-if="!isSingle">
          <aside-menu :isMenuCollapse="isCollapse" :isMenuIcon="isIcon" @select="handleselect"></aside-menu>
        </el-aside>
        <el-container>
          <el-main>
            <nav-tab ref="navTab" v-if="!isSingle"></nav-tab>
            <div class="aside-view">
              <!-- <keep-alive>
                <router-view />
              </keep-alive> -->
              <router-view v-slot="{ Component }">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </router-view>
            </div>
          </el-main>
          <el-footer height="">
            <pagFooter></pagFooter>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <el-container v-else-if="activeMode === 'atopMenu'">
      <el-header height="" :class="[fixedHead ? 'atophead' : 'atophead1']" v-if="!isSingle">
        <main-header>
          <template v-slot:menu>
            <atopMenu :isMenuCollapse="isCollapse" :isMenuIcon="isIcon" @select="handleselect"></atopMenu>
          </template>
        </main-header>
      </el-header>
      <el-main :class="[fixedHead ? 'atopmain' : '']">
        <breadCrumb v-show="showBreadCrumb"></breadCrumb>
        <div :class="[showBreadCrumb ? 'atop-view' : 'atop-view1']">
          <!-- <keep-alive>
            <router-view />
          </keep-alive> -->
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </el-main>
      <el-footer height="">
        <pagFooter></pagFooter>
      </el-footer>
    </el-container>
    <el-container v-else> ssss3 </el-container>
    <sysSetting></sysSetting>
  </div>
</template>
<script>
import { parseUrl } from "@common/js/utils";
import { mapState } from "./storeSysSetting.js";
export default {
  name: "Home",
  data() {
    return {
      isSingle: false,
      isCollapse: false,
      isIcon: true,
      showBreadCrumb: false,
    };
  },
  watch: {
    $route(to) {
      const { name, path, meta } = to;
      if (name === "index" && path === "/index") {
        this.showBreadCrumb = false;
      } else {
        this.showBreadCrumb = true;
      }
    },
  },
  created() {
    const urlPreams = parseUrl(window.location.href);
    if (urlPreams.singelPage === "true") {
      this.isSingle = true;
    }
    this.showBreadCrumb = this.$route.name === "index" ? false : true;
  },
  computed: {
    ...mapState({ navmode: "navmode", fixedHead: "fixedHead" }),
    activeMode() {
      return this.navmode;
    },
  },
  methods: {
    handleselect(key) {
      if (this.activeMode === "asideMenu") {
        this.$refs.navTab.addTab(key);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.el-container {
  background: #f4f4f4;
}
.el-header {
  padding: 0;
  border-bottom: 1px solid #fefefe;
  em {
    line-height: 50px;
  }
}
.el-main {
  color: #333;
  padding: 0;
  overflow-x: hidden;
}
.aside-view {
  height: calc(92vh - 16px - 30px - 98px);
  margin: 16px;
  margin-bottom: 0px;
  display: flex;
}
.atophead {
  height: 64px;
  z-index: 9;
  position: fixed;
  top: 0;
  width: 100%;
}
.atophead1 {
  height: 64px;
}
.atopmain {
  margin-top: 64px;
}
.atop-view {
  margin: 22px auto 0px auto;
  min-height: calc(94vh - 22px - 82px - 98px - 64px);
  width: 74.6vw;
  display: flex;
}
.atop-view1 {
  margin: 22px auto 0px auto;
  min-height: calc(94vh - 22px - 98px - 64px);
  width: 74.6vw;
  display: flex;
}
</style>
