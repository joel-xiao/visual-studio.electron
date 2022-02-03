<template lang="pug">
div(class='c-page')
  slot
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.c-page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 4px;
}
</style>
