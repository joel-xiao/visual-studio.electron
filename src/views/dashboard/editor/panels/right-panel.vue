<template lang="pug">
div.editor-right-panel
  .panel-tab_bar
    PanelTabBar
  PanelSchema(:propsData="currentNode.props" :propsTypes="propsTypes" @update="onUpdateNodeProps")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PanelTabBar from './components/panel-tab-bar/index.vue';
import PanelSchema from './components/panel-schema/index.vue';
import { useNodeContext } from './../hooks/node-context';
import { useComponentContext } from './../hooks/component-context';

const { getComponentPropsTypes } = useComponentContext();
const { getSelectedNodes, getCurrentNode, updateNodeProps } = useNodeContext();

const selectedNodes = getSelectedNodes();
const currentNode = getCurrentNode();
const propsTypes = computed(() => {
  return getComponentPropsTypes(currentNode.value.schema);
});

const onUpdateNodeProps = (key: string, value: number | string | boolean) => {
  updateNodeProps(currentNode.value.id, { key: `${key}`, value });
};
</script>

<style lang="scss">
#editor {
  .editor-right-panel {
    position: absolute;
    right: 0px;
    top: var(--db-editor-nav-bar-height);
    bottom: 0px;
    width: var(--db-editor-right-menu-width);
    border-left: 1px solid var(--db-editor-color-canvas);
    background-color: var(--db-editor-color-panel-bg);
    .panel-tab_bar {
      border-bottom: 1px solid var(--db-editor-color-canvas);
      padding: 0 6px 0 12px;
      height: var(--db-editor-tab-bar-height);
    }
  }
}
</style>
