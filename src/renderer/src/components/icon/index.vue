<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

  interface Props {
    src?: string;
  }

withDefaults(defineProps<Props>(), {
    src: '',
});
</script>

<template lang="pug">
span(class='c-icon-font')
  i(class='icon-font' :class='src')
</template>

<style scoped lang="scss">
  .c-icon-font {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    overflow: hidden;
    margin: 2px;

    .icon-font {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
