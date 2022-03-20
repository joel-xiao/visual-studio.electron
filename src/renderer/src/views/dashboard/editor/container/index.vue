ya
<template lang="pug">
div.editor-middle-container(id="editor-middle-container")
  |
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.editor-middle-container {
  background-color: #2c2c2c;
  position: absolute;
  top: calc(var(--nav-bar-height) + var(--tool-bar-height));
  left: var(--left-menu-width);
  right: var(--right-menu-width);
  bottom: 0px;
}
</style>
