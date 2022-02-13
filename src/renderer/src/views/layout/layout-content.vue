<template lang="pug">
div#layout-content()
    router-view
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLoadingBar } from 'naive-ui';

const loadingBar = useLoadingBar();
onMounted(() => {
  loadingBar.start();
  setTimeout(() => {
    loadingBar.finish();
  });
});
</script>

<style lang="scss" scoped>
#layout-content {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
