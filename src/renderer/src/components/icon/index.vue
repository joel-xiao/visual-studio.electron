<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';

interface Props {
  src?: string;
}

withDefaults(defineProps<Props>(), {
  src: ''
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
  margin: 2px;
  overflow: hidden;
  border-radius: 4px;

  .icon-font {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
}
</style>
