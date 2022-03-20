<script lang="ts" setup>
import { ref, reactive, defineEmits, defineProps, withDefaults } from 'vue';
import type { ComponentData } from './interface';

interface Props {
  data?: ComponentData;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({})
});

const emit = defineEmits(['arrow']);

const onArrow = function (item: ComponentData) {
  emit('arrow', item);
};
</script>
<template lang="pug">
div.component-box__container( v-for="(item, idx) in data.children" v-show="data.component || data.AFold" v-if="Array.isArray(data.children) && data.children.length > 0" :key="(item.id || '') + idx")
  template(v-if="data.component")
    div.component-item__content
      img(:src="item.icon")

  template(v-else-if="!item.dot")
    div(class="component-box__title transition" @click="onArrow(item)")
      Icon(src="icon-zhankai" class="arrow" :class="{ 'active': item.AFold }")
      div.component-box__title__text {{ item.name }}
  template(v-else)
    div(class="component-box__title dot")
      div.component-box__title__text {{ item.name }}

  template(v-if="!item.component")
    ComponentItem(:data="item" v-if="Array.isArray(item.children) && item.children.length > 0")
  template(v-else)
    div.component-box__list
      ComponentItem(:data="item" v-if="Array.isArray(item.children) && item.children.length > 0")
</template>

<style scoped lang="scss">
.component-box__container {
  .component-box__title {
    padding: 0 6px;
    font-size: 12px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    height: 30px;
    &:hover {
      background: var(--color-tran-6);
    }

    .component-box__title__text {
      margin-right: 9px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .arrow {
      transition: transform 0.1s;
      transform: rotate(-90deg);
      opacity: 0.5;
      margin-right: 6px;

      &.active {
        transform: rotate(0deg);
      }
    }

    &.dot {
      background: none;
      &::before {
        display: inline-block;
        content: ' ';
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background-color: var(--color-tran-30);
        margin: 3px 10px 3px 3px;
      }
    }
  }

  .component-box__list {
    padding: 0 6px;
    margin-top: 6px;
  }

  .component-item__content {
    border-radius: 4px;
    padding: 6px;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
