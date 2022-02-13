<template lang="pug">
n-loading-bar-provider
  router-view
  //- HelloWorld(msg="qwq")
</template>

<script setup lang="ts">
// import HelloWorld from '@c/HelloWorld.vue';
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
  min-width: 1024px;
  overflow: hidden;
}
body > #app {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
