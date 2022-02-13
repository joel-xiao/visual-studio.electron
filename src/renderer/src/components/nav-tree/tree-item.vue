<script lang="ts" setup>
import { ref, reactive, defineEmits, defineProps, withDefaults } from 'vue';
import type { TreeItemData, TreeItemMenu } from './interface';

interface Props {
  recursion?: number;
  data?: TreeItemData[];
  itemIcon?: string;
  itemMenus: TreeItemMenu[];
  currentNav?: TreeItemData | null;
}

const props = withDefaults(defineProps<Props>(), {
  recursion: 0,
  data: () => [],
  itemIcon: '',
  itemMenus: () => [],
  currentNav: null
});

const emit = defineEmits(['select', 'command']);

const onSelect = function (item: TreeItemData): void {
  emit('select', item);
};

const treeItemStyle: { paddingLeft?: string } = reactive({});
treeItemStyle.paddingLeft = 24 + props.recursion * 16 + 'px';

const AFold = ref<boolean>(false);
const onArrow = function (item: TreeItemData): void {
  item.AFold = !item.AFold;
  AFold.value = item.AFold;
};

const onCommand = function (event: any, cmd: TreeItemMenu): void {
  emit('command', event.path[1], cmd);
};
</script>
<template lang="pug">
.tree-item(v-for="item in data" :key="item.id")
  .tree-item-nav(@click="onSelect(item)" :class="{ active: currentNav?.id === item.id }" :style="treeItemStyle")
    .tree-item-left
      Icon.arrow(src="icon-xiangyoujiantou size-12" :class="{ active: AFold }" v-if="item?.children?.length" @click.stop="onArrow(item)")
      span.dot(v-else)
      Icon.name-icon(v-if="item.icon || itemIcon" :src="item.icon || itemIcon")
      span.name-icon-margin(v-else)
      span.tree-item-labe {{ item.name }}
    .tree-item-handle(v-if="item.handle !== false")
      Icon(v-for="item in itemMenus" :key="item.id" :class="item.id" @click.stop="onCommand($event, item)" :src="item.icon")
  .tree-item-swapper(v-if="!!item?.children?.length" v-show="AFold")
    TreeItem(:recursion="recursion + 1" @select="onSelect" @command="onCommand" :data="item.children" :itemIcon="itemIcon" :itemMenus="itemMenus" :currentNav="currentNav")
</template>

<style scoped lang="scss">
.tree-item {
  .tree-item-nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    padding-right: 4px;
    padding-left: 4px;
    margin: 4px 0;
    overflow: hidden;
    color: var(--color-tran-85);
    cursor: pointer;
    border-radius: var(--border-radius-6);

    .tree-item-left {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .arrow {
        position: absolute;
        left: -20px;
        cursor: pointer;
        transition: transform 0.2s;
        transform: scale(0.9);

        &.active {
          transform: rotate(90deg);
        }
      }

      .dot {
        position: absolute;
        left: -12px;
        width: 8px;
        height: 8px;
        background: var(--color-tran-12);
        border-radius: 2px;
      }

      .name-icon {
        color: var(--color-tran-50);
      }

      .name-icon-margin {
        margin: 0 2px;
      }
    }

    .tree-item-handle {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 4px;
      opacity: 0;
      transition: opacity 0.15s;

      .c-icon-font {
        color: var(--color-tran-50);
        cursor: pointer;
        transition: all 0.15s;

        &:hover {
          color: var(--color-tran-85);
          background: var(--color-tran-12);
        }
      }
    }

    &:hover {
      background: var(--color-tran-6);

      .tree-item-left {
        .name-icon {
          color: var(--color-tran-85);
        }
      }

      .tree-item-handle {
        opacity: 1;
      }
    }

    &.active {
      background: var(--color-tran-12);

      .tree-item-left {
        .name-icon {
          color: var(--color-tran-85);
        }
      }
    }
  }
}
</style>
