<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <el-submenu v-if="isNotEmpty(item.children)" :index="item.path || item.name">
        <template #title>
          <div :class="[isCollapse ? 'horizontal' : 'vertical']">
            <i v-if="isIcon && item.icon" :class="item.icon"></i>
            <img :src="item.icon" v-else />
            <span :class="[isCollapse ? 'notitle' : '']">{{ item.name }}</span>
          </div>
        </template>
        <menus-tree :list="item.children" :isCollapse="isCollapse" :isIcon="isIcon" />
      </el-submenu>
      <el-menu-item v-if="!isNotEmpty(item.children) && isIcon" :index="item.path || item.name">
        <i :class="item.icon" v-if="item.icon"></i>
        <template #title
          ><span :class="[isCollapse ? 'notitle' : '']">{{ item.name }}</span></template
        >
      </el-menu-item>
      <el-menu-item v-if="!isNotEmpty(item.children) && !isIcon" :index="item.path || item.name">
        <div :class="[isCollapse ? 'horizontal' : 'vertical']">
          <img :class="item.icon" v-if="item.icon" :src="item.icon" :alt="item.name" />
          <span :class="[isCollapse ? 'notitle' : '']">{{ item.name }}</span>
        </div>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "menusTree",
  props: {
    list: Array,
    isCollapse: Boolean,
    isIcon: Boolean,
  },
  methods: {
    isNotEmpty(children) {
      return children && children.length > 0;
    },
  },
};
</script>
