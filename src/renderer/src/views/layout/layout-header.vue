<template lang="pug">
div#layout-header()
    div.logo
        img(src='@/assets/img/logo/logo.svg')
    div.center
    div.right
        User
</template>

<script setup lang="ts">
import User from './components/user.vue';
</script>

<style lang="scss" scoped>
#layout-header {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & >.logo {
        height: 100%;
        position: relative;
        max-width: 262px;
        img {
            position: absolute;
            left: 0px;
            top: -8px;
            height: 150%;
        }
    }

    & > .right {
        height: 100%;
    }
}
</style>
