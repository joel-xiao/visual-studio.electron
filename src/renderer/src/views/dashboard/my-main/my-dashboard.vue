<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { TreeItemMenu, TreeItemData } from '@c/nav-tree/interface';

const projectList: TreeItemData[] = reactive([
    { name: '全部应用', id: 'all', sum: 0, handle: false },
    { name: '未分组', id: 'no-group', sum: 0, handle: false },
    {
        name: 'xiao', id: '123', sum: 0, children: [ { name: '全部应用', id: '1all', sum: 0 },
            { name: '未分组', id: '1no-group', sum: 0 },
            { name: '其他', id: '1123', sum: 0 }, ]
    },
]);
const currentItem = ref<TreeItemData>(projectList[0]);
const onProjectSelect = function (item: TreeItemData): void {
    currentItem.value = item;
};


const treeItemMenus = reactive<TreeItemMenu[]>([
    { name: '更多', id: 'more', icon: 'icon-dian', disabled: true, children: [ { name: '更多', id: 'more', icon: 'icon-dian', disabled: true } ] },
    { name: '添加组', id: 'add', icon: 'icon-jiahao', disabled: true },
]);
// const onAddGroup = function (): void {

// };


interface newProjectData {
    name: string;
    icon: string;
    id: string;
}
const newProjectList: newProjectData[] = reactive([
    { name: 'PC端创建', id: 'web', icon: 'new-project-web.png' },
    { name: '移动端创建', id: 'mobile', icon: 'new-project-mobile.png' },
]);

</script>

<template lang="pug">
div#dashboard-my-project
    div(class='project-manage left')
        NavTree(
            :data="projectList"
            itemIcon="icon-wenjianjia"
            :itemMenus="treeItemMenus")
        //- div(class="manage-title")
        //-     span 我的分组
        //-     span(class='add-group pointer') +
        //- div(class="manage-main")
        //-     div(class="main-project pointer"
        //-     @click="onProjectSelect(item)"
        //-     v-for="(item, idx) in projectList"
        //-     :class="{[item.id]: !!item.id, active: currentItem.id === item.id}"
        //-     :key="item.id")
        //-         span(class="project-name") {{item.name}}
        //-         span(class="project-num") {{item.sum}}

    //- div(class="project-screen-list right")
    //-     div(class="new-projects-title")
    //-         |选择下面的方式进行创建
    //-     div.new-projects
    //-         div.new-project(
    //-             v-for="(item, idx) in newProjectList"
    //-             :key="item.id")
    //-             img(:src="require('@/assets/img/dashboard/my-main/' + item.icon)")
    //-             span.ellipsis.project-type {{item.name}}
    //-     div.project-header
    //-         div.project-title
    //-             h2.ellipsis {{currentItem.name}}
    //-             span.color-BCC9D4
    //-                 span.color-2483FF {{currentItem.sum}}
    //-                 |个
    Loading

</template>

<style lang="scss" scoped>
#dashboard-my-project {
    position: relative;
    height: 100%;
    width: 100%;

    .project-manage {
        width: 264px;
        height: 100%;
        border-right: 1px solid var(--border-black);
        padding: 8px;

        .manage-title {
            font-size: 14px;
            padding: 0 30px 0 24px;
            height: 56px;
            border-bottom: 1px solid #27343e;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fff;

            .add-group {
            }
        }

        .manage-main {
            .main-project {
                font-size: 14px;
                padding: 0 30px 0 50px;
                height: 36px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #b9c2cc;
                transition: all 0.2s;
                &:hover {
                    color: var(--dashboard-main-color);
                }

                &.active {
                    background: url("~@/assets/img/dashboard/my-main/my-project-check.png");
                    background-repeat: round;
                    background-size: contain;
                    color: #fff;
                }

                &:not(.all, .no-group),
                &.no-group .project-num {
                    font-size: 12px;
                }
            }
        }
    }

    .project-screen-list {
        padding: 0 50px 0 20px;
        height: 100%;
        width: calc(100% - 240px);
        .new-projects-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--dashboard-main-color);
            padding: 0;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .new-projects {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-right: -32px;

            .new-project {
                width: 258px;
                height: 78px;
                margin: 16px 32px 16px 0;
                vertical-align: middle;
                border: 1px solid #39414d;
                background: #22272e;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                position: relative;
                cursor: pointer;
                color: #fff;
                &:hover {
                    border-color: var(--dashboard-main-color);
                    &::after {
                        content: "";
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        background: rgba(36, 131, 255, 0.08);
                    }
                }

                img {
                    height: 100%;
                }

                .project-type {
                    padding-left: 8px;
                    flex: 1;
                    font-size: 14px;
                }
            }
        }

        .project-header {
            position: sticky;
            top: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #434b55;
            padding-bottom: 5px;
            padding-top: 10px;
            height: 56px;
            background: #171b22;
            z-index: 1;

            .project-title {
                display: flex;
                align-items: center;
                padding: 5px 0;

                h2 {
                    max-width: 200px;
                    font-size: 14px;
                    padding: 0 10px;
                    color: var(--dashboard-main-color);
                    border-left: 2px solid var(--dashboard-main-color);
                }

                span.color-2483FF {
                    padding: 0 2px;
                    color: var(--dashboard-main-color);
                }

                span.color-BCC9D4 {
                    font-size: 14px;
                    letter-spacing: 1px;
                    color: #bcc9d4;
                }
            }
        }
    }
}
</style>
