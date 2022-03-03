<script lang="ts" setup>
import TreeItem from './tree-item.vue';
import { ref, reactive, defineProps, withDefaults, defineEmits, onUnmounted } from 'vue';
import type { TreeItemData, TreeItemMenu } from './interface';

interface Props {
  data?: TreeItemData[];
  itemMenus?: TreeItemMenu[];
  itemIcon?: string;
}
const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  itemMenus: () => [],
  itemIcon: ''
});

const emit = defineEmits(['select', 'command']);

const currentNav = ref<TreeItemData>();
const onNavSelect = function (item: TreeItemData): void {
  currentNav.value = item;
  emit('select', item);
};
onNavSelect(props.data[0]);

const contentMenuStyle: { left?: string; top?: string } = reactive({});
const contentMenuShow = ref<boolean>(false);
const onContentMenuShow = function (val?: boolean, el?: HTMLElement): void {
  contentMenuShow.value = !!val;
  const rect: DOMRect | undefined = el && el.getBoundingClientRect();
  if (val && rect) {
    contentMenuStyle.left = rect.left + 'px';
    contentMenuStyle.top = rect.bottom + 'px';
  }
};
onContentMenuShow(false);

const onTreeClick = function (): void {
  onContentMenuShow(false);
};
document.addEventListener('click', onTreeClick);
onUnmounted(() => {
  document.removeEventListener('click', onTreeClick);
});

const onCommand = function (event: { path: HTMLElement[] }, cmd: TreeItemMenu): void {
  if (cmd?.children?.length) {
    onContentMenuShow(true, event.path[1]);
    return;
  }
  onContentMenuShow(false);
  emit('command', cmd);
};
</script>

<template lang="pug">
div(class='c-nav-tree')
  TreeItem(
    @select="onNavSelect"
    @command="onCommand"
    :data="data"
    :itemIcon="itemIcon"
    :itemMenus="itemMenus"
    :currentNav="currentNav")
  transition(name='fade')
    div#content-menu(:style="contentMenuStyle" v-show="contentMenuShow")
      div.content-menu-item
        Icon(
          class="menu-item-icon"
          src="icon-bianji")
        span(class="menu-item-label") 重命名
</template>

<style scoped lang="scss">
.c-nav-tree {
  width: 100%;
  height: 100%;

  .fade-enter-active,
  .fade-leave-active {
    transition: ease-out;
    transition-duration: 0.2s;
    transition-property: opacity, transform;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  #content-menu {
    position: fixed;
    left: 0;
    width: 166px;
    padding: 4px;
    background: var(--color-gray-700);
    border: 1px solid var(--color-tran-6);
    border-radius: var(--border-radius-6);

    .content-menu-item {
      display: flex;
      align-items: center;
      height: 24px;
      padding: 0 4px;
      line-height: 24px;
      border-radius: var(--border-radius-4);
      transition: background 0.15s;

      &:hover {
        background: var(--color-tran-12);
      }

      .menu-item-icon {
        color: var(--color-tran-85);
      }

      .menu-item-label {
        display: inline-block;
        height: 100%;
        font-size: 12px;
        color: var(--color-tran-85);
      }
    }
  }
}
</style>
