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
  width: 100%;
  min-width: 1024px;
  height: 100%;
  overflow: hidden;
}

body > #app {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
