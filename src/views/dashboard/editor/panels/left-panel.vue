ya
<template lang="pug">
div.editor-left-panel
  div.panel-tab_bar
    PanelTabBar(:data="tabBars" v-model="selectTab" @select="onSelect")
  PanelLayer(
    v-if="tabBars[0].show"
    v-show="selectTab === tabBars[0]"
    :data="layerData"
    :itemMenus="layerMenus"
    @select="onLayerSelect"
    @command="onLayerCommand"
    temIcon="icon-wenjianjia"
    )
  div.panel-component(
    v-if="tabBars[1].show"
    v-show="selectTab === tabBars[1]"
    )
    div.panel-component-tab_bar
      PanelTabBar(:data="componentTabBars" v-model="componentTab")
    PanelComponent( :drag="true" :data="componentData" @drag-start="onDragStart" @drag-stop="onDragStop")

</template>

<script setup lang="ts">
import PanelTabBar from './components/panel-tab-bar/index.vue';
import type { Tab } from './components/panel-tab-bar/interface';
import PanelLayer from './components/panel-layer/index.vue';
import type { LayerItemMenu, LayerItemData } from './components/panel-layer/interface';
import PanelComponent from './components/panel-component/index.vue';
import type { ComponentData } from './components/panel-component/interface';
import { ref, reactive } from 'vue';
import { useDrag } from './../hooks/drag-context';
import { useComponentContext } from './../hooks/component-context';
import { useNodeContext } from './../hooks/node-context';

// interface Props {
//   layerData: TreeNode[];
// }
// const props = withDefaults(defineProps<Props>(), {
//   layerData: () => []
// });

const tabBars = reactive<Tab[]>([
  { name: '图层', id: 'layer', show: false },
  { name: '组件', id: 'component', show: false },
  { name: '资源库', id: 'repository', show: false }
]);

const selectTab = ref<Tab>(tabBars[0]);
selectTab.value.show = true;

const onSelect = function (tab: Tab) {
  tab.show = true;
};

const { getNodeTree, onSelectNode } = useNodeContext();
const layerData = getNodeTree();

const layerMenus = reactive<LayerItemMenu[]>([
  {
    name: '更多',
    id: 'more',
    icon: 'icon-dian',
    disabled: true
  },
  { name: '添加组', id: 'add', icon: 'icon-jiahao', disabled: true }
]);

const onLayerSelect = function (item: LayerItemData) {
  onSelectNode(item?.data?.id as string);
};

const onLayerCommand = function (cmd: LayerItemMenu, item: LayerItemData) {
  console.log(cmd, item);
};

const componentTabBars = reactive<Tab[]>([{ name: '组件库', id: 'component' }]);
const componentTab = ref<Tab>(componentTabBars[0]);

const { onDragStart, onDragStop } = useDrag();

const { getUiLibrary } = useComponentContext();
const componentData = reactive<ComponentData[]>(getUiLibrary());
</script>

<style lang="scss">
#editor {
  .editor-left-panel {
    position: absolute;
    left: 0px;
    top: var(--db-editor-nav-bar-height);
    bottom: 0px;
    width: var(--db-editor-left-menu-width);
    border-right: 1px solid var(--db-editor-color-canvas);
    background-color: var(--db-editor-color-panel-bg);
    .panel-tab_bar {
      border-bottom: 1px solid var(--db-editor-color-canvas);
      padding: 0 12px 0 6px;
      height: var(--db-editor-tab-bar-height);
    }
    .panel-component {
      .panel-component-tab_bar {
        border-bottom: 1px solid var(--db-editor-color-canvas);
        padding: 0 12px 0 6px;
        height: var(--db-editor-tab-bar-height);
        .tab_bar-title {
        }
      }
    }
  }
}
</style>
