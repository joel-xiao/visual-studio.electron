<template lang="pug">
div#editor
  MiddleContainer
  NavPanel
  ToolbarPanel
  LeftPanel
  RightPanel
</template>

<script setup lang="ts">
import NavPanel from './panels/nav-panel.vue';
import ToolbarPanel from './panels/toolbar-panel.vue';
import LeftPanel from './panels/left-panel.vue';
import RightPanel from './panels/right-panel.vue';
import MiddleContainer from './container/index.vue';

import {
  ref,
  reactive,
  readonly,
  provide,
  inject,
  defineEmits,
  defineExpose,
  defineProps,
  withDefaults
} from 'vue';
import type { EditorData, Node, NodeDelta } from './interface';
import { useDashboardStore } from '@/store/dashboard';
const { saveCurrentNode } = useDashboardStore();

// interface Props {
//   data?: EditorData | null;
// }

// const props = withDefaults(defineProps<Props>(), {
//   data: () => ({})
// });

let data = reactive<EditorData>({
  folder: '',
  id: '',
  type: '',
  name: '',
  nodes: [
    {
      id: 'root',
      name: '根容器',
      width: 1920,
      height: 1080,
      x: 0,
      y: 0,
      select: true,
      lock: false
    },
    {
      id: 'qweywdawshw',
      name: '图片',
      width: 500,
      height: 400,
      x: 0,
      y: 0,
      select: false,
      lock: false
    },
    {
      id: '34324',
      name: 'a',
      width: 500,
      height: 400,
      x: 100,
      y: 100,
      select: false,
      lock: false
    }
  ]
});

const init = function (editorData: EditorData): void {
  data = editorData;
};
defineExpose({ init });

const getRoot = function (): Node | undefined {
  const node: Node | undefined = data.nodes.find((node) => node.id === 'root');
  return node ? readonly(node) : undefined;
};
provide('getRoot', getRoot);
saveCurrentNode(getRoot());

const getNodes = function (): Node[] {
  return data.nodes.filter((node) => node.id !== 'root').map((node) => readonly(node));
};
provide('getNodes', getNodes);

const getNode = function (id: string): Node | undefined {
  const node: Node | undefined = data.nodes.find((node) => node.id === id);
  return node ? readonly(node) : undefined;
};
provide('getNode', getNode);

const onUpdateNode = function (id: string, delta: NodeDelta): void {
  const node = data.nodes.find((node) => node.id === id);
  if (node && delta) {
    Object.keys(delta).forEach((key: string): void => {
      // @ts-ignore
      node[key] = delta[key];
    });
  }
};
provide('updateNode', onUpdateNode);

const onSelectNode = function (id: string): void {
  data.nodes.forEach((node) => {
    if (id === node.id) {
      node.select = true;
    } else {
      node.select = false;
    }
  });
};
provide('selectNode', onSelectNode);
</script>

<style lang="scss" scoped>
#editor {
  --nav-bar-height: 42px;
  --tool-bar-height: 42px;
  --tab-bar-height: 42px;
  --left-menu-width: 241px;
  --right-menu-width: 252px;
  --theme-color-canvas: var(--color-realgray-900);
  --editor-panel-bg-color: var(--color-main);
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
