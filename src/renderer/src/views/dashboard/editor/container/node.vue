<template lang="pug">
DragResize(ref="resize" :data="dargDataset" @resizing="onResizing" @mousedown="onDown")
  div.node {{ node.name}}

</template>

<script setup lang="ts">
import DragResize from './components/drag-resize.vue';
import {
  ref,
  reactive,
  inject,
  markRaw,
  readonly,
  defineEmits,
  defineProps,
  withDefaults,
  watch
} from 'vue';
import { storeToRefs } from 'pinia';
import type { Node, NodeDelta } from './../interface';
import type { DargDataset } from './components/drag-resize';
interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: ''
});

let getNode = inject('getNode');
const node: Node = typeof getNode === 'function' ? getNode(props.id) : {};

const dargDataset = readonly(
  reactive<DargDataset>(
    markRaw({
      x: node.x || 0,
      y: node.y || 0,
      x2: node.x + node.width,
      y2: node.y + node.height
    })
  )
);
const resize = ref<null | InstanceType<typeof DragResize>>(null);

watch(
  () => node.select,
  (val: boolean | undefined): void => {
    resize?.value?.setActive(val);
  }
);

const updateNode = inject('updateNode');
const onUpdateNode = function (node: Node, delta: NodeDelta): void {
  typeof updateNode === 'function' && updateNode(node.id, delta);
};

let selectNode = inject('selectNode');
const onSelectNode = function (node: Node): void {
  typeof selectNode === 'function' && selectNode(node.id);
};

const onDown = function (): void {
  onSelectNode(node);
};

const onResizing = function (dargDataset: DargDataset): void {
  onUpdateNode(node, {
    x: dargDataset.x,
    y: dargDataset.y,
    width: dargDataset.x2 - dargDataset.x,
    height: dargDataset.y2 - dargDataset.y
  });
};

console.log(node);
</script>

<style lang="scss" scoped>
.node {
}
</style>
