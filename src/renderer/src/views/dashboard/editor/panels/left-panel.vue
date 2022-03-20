ya
<template lang="pug">
div.editor-left-panel
  div.panel-tab_bar
    PanelTabBar(:data="tabBars" v-model="selectTab")
  PanelLayer(
    v-if="tabBars[0].show"
    v-show="selectTab === tabBars[0]"
    :data="layerData"
    :itemMenus="layerMenus"
    @command="onLayerCommand"
    temIcon="icon-wenjianjia"
    )
  div.panel-component(
    v-if="tabBars[1].show"
    v-show="selectTab === tabBars[1]"
    )
    div.panel-component-tab_bar
      PanelTabBar(:data="componentTabBars" v-model="componentTab")
    PanelComponent

</template>

<script setup lang="ts">
import PanelTabBar from './components/panel-tab_bar.vue';
import type { Tab } from './components/panel-tab_bar';
import PanelLayer from './components/panel-layer/index.vue';
import type { LayerItemData, LayerItemMenu } from './components/panel-layer/interface';
import PanelComponent from './components/panel-component/index.vue';
import { ref, reactive } from 'vue';

const tabBars = reactive<Tab[]>([
  { name: '图层', id: 'layer', show: false },
  { name: '组件', id: 'component', show: false },
  { name: '资源库', id: 'repository', show: false }
]);

const selectTab = ref<Tab>(tabBars[1]);
selectTab.value.show = true;

const layerData: LayerItemData[] = reactive([
  { name: '全部应用', id: 'all', sum: 0, handle: false },
  { name: '未分组', id: 'no-group', sum: 0, handle: false },
  {
    name: 'xiao',
    id: '123',
    sum: 0,
    children: [
      { name: '全部应用', id: '1all', sum: 0 },
      { name: '未分组', id: '1no-group', sum: 0 },
      { name: '其他', id: '1123', sum: 0 }
    ]
  }
]);

const layerMenus = reactive<LayerItemMenu[]>([
  {
    name: '更多',
    id: 'more',
    icon: 'icon-dian',
    disabled: true
  },
  { name: '添加组', id: 'add', icon: 'icon-jiahao', disabled: true }
]);

const onLayerCommand = function (cmd: LayerItemMenu, item: LayerItemData) {
  console.log(cmd, item);
};

const componentTabBars = reactive<Tab[]>([{ name: '组件库', id: 'component' }]);
const componentTab = ref<Tab>(componentTabBars[0]);
</script>

<style lang="scss" scoped>
.editor-left-panel {
  position: absolute;
  left: 0px;
  top: var(--nav-bar-height);
  bottom: 0px;
  width: var(--left-menu-width);
  border-right: 1px solid var(--theme-color-canvas);
  .panel-tab_bar {
    border-bottom: 1px solid var(--theme-color-canvas);
    padding: 0 12px 0 6px;
    height: var(--tab-bar-height);
  }
  .panel-component {
    .panel-component-tab_bar {
      border-bottom: 1px solid var(--theme-color-canvas);
      padding: 0 12px 0 6px;
      height: var(--tab-bar-height);
      .tab_bar-title {
      }
    }
  }
}
</style>
