ya
<template lang="pug">
div.editor-middle-container(id="editor-middle-container" :style="rootStyle" @mousedown.self="onDown")
  ContainerNode(v-for="(node, idx) in nodes" :key="node.id" :id="node.id")

</template>

<script setup lang="ts">
import ContainerNode from './node.vue';
import { inject, computed } from 'vue';
import { useDashboardStore } from '@/store/dashboard';
import { storeToRefs } from 'pinia';
import type { Node } from './../interface';

let getNodes = inject('getNodes');
const nodes: Node[] = typeof getNodes === 'function' ? getNodes() : [];

let getRoot = inject('getRoot');
const root: Node = typeof getRoot === 'function' ? getRoot() : {};

const rootStyle = computed<{ transform: string; width: string; height: string }>(() => {
  return {
    transform: `translate(${root.x}px, ${root.y}px)`,
    width: root.width + 'px',
    height: root.width + 'px'
  };
});

let selectNode = inject('selectNode');
const onSelectNode = function (node: Node): void {
  typeof selectNode === 'function' && selectNode(node.id);
};

const onDown = function (): void {
  onSelectNode(root);
};

const { currentNode } = storeToRefs(useDashboardStore());
// const { saveCurrentNode } = useDashboardStore();
</script>

<style lang="scss" scoped>
.editor-middle-container {
  z-index: 0;
  background-color: #2c2c2c;
  position: absolute;
  top: calc(var(--nav-bar-height) + var(--tool-bar-height));
  left: var(--left-menu-width);
  right: var(--right-menu-width);
  bottom: 0px;
  background-color: var(--color-bg-dark);
}
</style>
