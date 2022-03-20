<template lang="pug">
div#dashboard-editor
  NavPanel
  ToolbarPanel
  LeftPanel
  RightPanel
  middleContainer
</template>

<script setup lang="ts">
import NavPanel from './panels/nav-panel.vue';
import ToolbarPanel from './panels/toolbar-panel.vue';
import LeftPanel from './panels/left-panel.vue';
import RightPanel from './panels/right-panel.vue';
import middleContainer from './container/index.vue';
</script>

<style lang="scss" scoped>
#dashboard-editor {
  --nav-bar-height: 42px;
  --tool-bar-height: 42px;
  --tab-bar-height: 42px;
  --left-menu-width: 241px;
  --right-menu-width: 252px;
  --theme-color-canvas: var(--color-realgray-900);
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
