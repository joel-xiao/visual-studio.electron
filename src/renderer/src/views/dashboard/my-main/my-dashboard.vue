<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { TreeItemMenu, TreeItemData } from '@c/nav-tree/interface';

const projectList: TreeItemData[] = reactive([
  { name: '全部应用', id: 'all', sum: 0, handle: false },
  { name: '未分组', id: 'no-group', sum: 0, handle: false },
  {
    name: 'xiao',
    id: '123',
    sum: 0,
    children: [
      { name: '全部应用', id: '1all', sum: 0 },
      { name: '未分组', id: '1no-group', sum: 0 },
      { name: '其他', id: '1123', sum: 0 }
    ]
  }
]);
const currentItem = ref<TreeItemData>(projectList[0]);
const onProjectSelect = function (item: TreeItemData): void {
  currentItem.value = item;
};

const treeItemMenus = reactive<TreeItemMenu[]>([
  {
    name: '更多',
    id: 'more',
    icon: 'icon-dian',
    disabled: true,
    children: [{ name: '更多', id: 'more', icon: 'icon-dian', disabled: true }]
  },
  { name: '添加组', id: 'add', icon: 'icon-jiahao', disabled: true }
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
  { name: '移动端创建', id: 'mobile', icon: 'new-project-mobile.png' }
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
  width: 100%;
  height: 100%;

  .project-manage {
    width: 264px;
    height: 100%;
    padding: 8px;
    border-right: 1px solid var(--border-black);

    .manage-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding: 0 30px 0 24px;
      font-size: 14px;
      color: #fff;
      border-bottom: 1px solid #27343e;

      .add-group {
      }
    }

    .manage-main {
      .main-project {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 36px;
        padding: 0 30px 0 50px;
        font-size: 14px;
        color: #b9c2cc;
        transition: all 0.2s;

        &:hover {
          color: var(--dashboard-main-color);
        }

        &.active {
          color: #fff;
          background: url('~@/assets/img/dashboard/my-main/my-project-check.png');
          background-repeat: round;
          background-size: contain;
        }

        &:not(.all, .no-group),
        &.no-group .project-num {
          font-size: 12px;
        }
      }
    }
  }

  .project-screen-list {
    width: calc(100% - 240px);
    height: 100%;
    padding: 0 50px 0 20px;

    .new-projects-title {
      padding: 0;
      overflow: hidden;
      font-size: 14px;
      font-weight: 700;
      color: var(--dashboard-main-color);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .new-projects {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-right: -32px;

      .new-project {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 258px;
        height: 78px;
        margin: 16px 32px 16px 0;
        color: #fff;
        vertical-align: middle;
        cursor: pointer;
        background: #22272e;
        border: 1px solid #39414d;

        &:hover {
          border-color: var(--dashboard-main-color);

          &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            content: '';
            background: rgb(36 131 255 / 8%);
          }
        }

        img {
          height: 100%;
        }

        .project-type {
          flex: 1;
          padding-left: 8px;
          font-size: 14px;
        }
      }
    }

    .project-header {
      position: sticky;
      top: 70px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding-top: 10px;
      padding-bottom: 5px;
      background: #171b22;
      border-bottom: 1px solid #434b55;

      .project-title {
        display: flex;
        align-items: center;
        padding: 5px 0;

        h2 {
          max-width: 200px;
          padding: 0 10px;
          font-size: 14px;
          color: var(--dashboard-main-color);
          border-left: 2px solid var(--dashboard-main-color);
        }

        span.color-2483FF {
          padding: 0 2px;
          color: var(--dashboard-main-color);
        }

        span.color-BCC9D4 {
          font-size: 14px;
          color: #bcc9d4;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>
