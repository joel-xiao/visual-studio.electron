<template lang="pug">
div(class='editor-panel-component')
  div.component-header
    div.search
      NInput(placeholder="搜索关键词..." size="small")
        template(#prefix)
          Icon(src='icon-sousuo')
    Icon(button size="small" src="icon-sousuo" class="icon-btn")

  div.component-masters
    div.master-collapse( v-for="(item, idx) in data" :key="(item.id || '') + idx")
      div(class="master-collapse__title" @click="onArrow(item)")
        div.master-collapse__title__text {{ item.name }}
        Icon(src="icon-shouqi2" class="arrow" :class="{ 'active': item.AFold }")
      ComponentItem(:data="item" @arrow="onArrow")



</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { ComponentData } from './interface';
import ComponentItem from './component-item.vue';

const getIcon = (icon: string): string => {
  return `/src/assets/img/dashboard/editor/panel-component/${icon}`;
};
const data = reactive<ComponentData[]>([
  {
    name: '本地',
    id: '1',
    children: [
      {
        name: '全局组件',
        id: 'q',
        children: [
          {
            dot: true,
            component: true,
            name: 'button',
            id: '2',
            children: [
              {
                name: 'button',
                id: '2',
                icon: getIcon('qw.jpg')
              },
              {
                name: 'button',
                id: '2',
                icon: getIcon('qw.jpg')
              }
            ]
          },
          {
            dot: true,
            component: true,
            name: 'button',
            id: '2',
            children: [
              {
                name: 'button',
                id: '2',
                icon: getIcon('qw.jpg')
              },
              {
                name: 'button',
                id: '2',
                icon: getIcon('qw.jpg')
              }
            ]
          }
        ]
      }
    ]
  }
]);

const onArrow = function (item: ComponentData): void {
  item.AFold = !item.AFold;
};
</script>

<style lang="scss" scoped>
.editor-panel-component {
  padding: 0 6px 6px;
  position: relative;
  .component-header {
    padding: 6px 0 12px 6px;
    display: flex;
    align-items: center;
    .search {
      width: 100%;
      padding-right: 6px;
      height: 30px;

      .n-input {
        height: 100%;
        border-radius: var(--border-radius-6);
      }
    }
    .icon-btn {
      flex: none;
    }
  }

  .component-masters {
    .master-collapse {
      .master-collapse__title {
        padding: 0 6px;
        font-size: 12px;
        font-weight: 600;
        height: 30px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:hover {
          background: var(--color-tran-6);
        }

        .master-collapse__title__text {
          margin-right: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .arrow {
          font-weight: none;
          opacity: 0.6;
          transform: scale(0.9);
          transition: transform 0.1s;
          &.active {
            transform: scale(0.9) rotate(90deg);
          }
        }
      }
    }
  }
}
</style>
