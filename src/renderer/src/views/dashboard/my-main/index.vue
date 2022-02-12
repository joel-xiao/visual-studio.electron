<script setup lang="ts">
    import MyDashboard from "./my-dashboard.vue";
    import {ref, reactive } from "vue";

    interface navData {
        label:string;
        id:string;
    }
    const navList:navData[] = reactive([
            { label: "可视化", id: 'dashboard' },
            { label: "网页", id: 'web' },
            { label: "数据", id: 'data' },
            // { label: "我的资产", id: 'com' },
            // { label: "教程",id: 'case' },
        ]);

    const currentNav = ref<navData>(navList[0]);
    const onNavSelect = function (nav:navData):void {
        currentNav.value = nav;
    }
</script>

<template lang="pug">
.dashboard-header
  .nav-content
    span.nav-content-span(@click="onNavSelect(item)" :class="{ active: currentNav.id === item.id }" :key="item.id" v-for="(item, idx) in navList")
      | {{item.label}}
.dashboard-content
  MyDashboard(v-show="currentNav.id === 'dashboard'")
</template>

<style lang="scss" scoped>
#dashboard {
    position: relative;
    height: 100%;
    width: 100%;
    .dashboard-header {
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 42px;
        border-bottom: 1px solid var(--border-black);
        .nav-content {
            background-color: var(--color-bg-dark);
            border-radius: var(--border-radius-8);
            overflow: hidden;
            float: left;
            height: 32px;
            padding: 3px;
            display: flex;
            .nav-content-span {
                padding: 0 20px;
                display: flex;
                align-items: center;
                cursor: pointer;
                color: var(--color-tran-50);
                transition: all 0.2s;
                border-radius: var(--border-radius-6);

                &:hover {
                    color: var(--color-tran-85);
                }
                &.active {
                    background: var(--color-tran-12);
                    color: var(--color-tran-85);
                }
            }
        }
    }
    
    .dashboard-content {
        width: 100%;
        height: 100%;
    }
}
</style>