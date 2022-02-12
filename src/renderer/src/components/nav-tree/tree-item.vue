<script lang="ts" setup>
  import TreeItem from './tree-item.vue';
  import { ref, reactive, defineEmits, defineProps, withDefaults } from 'vue'
  // import { TreeItemData, TreeItemMenu } from './interface';
  interface TreeItemData {
    name?: string;
    icon?: string;
    id: string;
    sum?: number;
    children?: TreeItemData[];
    AFold?: Boolean;
    handle?: Boolean;
  }

  interface TreeItemMenu {
      name:string;
      icon: String;
      id:string;
      children?: TreeItemMenu[];
      disabled?: Boolean;
  }

  interface Props {
    recursion?:number;
    data?: TreeItemData[];
    itemIcon?: string;
    itemMenus: TreeItemMenu[];
    currentNav?: TreeItemData | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    recursion: 0,
    data: () => [],
    itemIcon:'',
    itemMenus: () => [],
    currentNav: null,
  })
  
  const emit = defineEmits(['select', 'command']);


  const onSelect = function (item:TreeItemData):void {
    emit('select', item);
  }

  const treeItemStyle:{ paddingLeft?: string } = reactive({});
  treeItemStyle.paddingLeft = 24 + (props.recursion * 16) + 'px';


  const AFold = ref<Boolean>(false);
  const onArrow = function(item:TreeItemData):void {
    item.AFold = !item.AFold;
    AFold.value = item.AFold;
  }


  const onCommand = function(event:Event, cmd:TreeItemMenu):void {
    emit('command',event , cmd);
  }

</script>
<template lang="pug">
.tree-item(v-for="item in data" :key="item.id")
  .tree-item-nav(@click="onSelect(item)" :class="{active: currentNav?.id === item.id}" :style="treeItemStyle")
    .tree-item-left
      Icon.arrow(src="icon-xiangyoujiantou size-12" :class="{active: AFold}" v-if="item?.children?.length" @click.stop="onArrow(item)")
      span.dot(v-else)
      Icon.name-icon(v-if="item.icon || itemIcon" :src="item.icon || itemIcon")
      span.name-icon-margin(v-else)
      span.tree-item-labe {{item.name}}
    .tree-item-handle(v-if="item.handle !== false")
      Icon(v-for="item in itemMenus" :key="item.id" :class="item.id" @click.stop="onCommand($event,item)" :src="item.icon")
  .tree-item-swapper(v-if="!!item?.children?.length" v-show="AFold")
    TreeItem(:recursion="recursion + 1" @select="onSelect" @command="onCommand" :data="item.children" :itemIcon="itemIcon" :itemMenus="itemMenus" :currentNav="currentNav")
</template>

<style scoped lang="scss">
  .tree-item {
    .tree-item-nav {
      position: relative;
      margin: 4px 0px;
      height: 32px;
      border-radius: var(--border-radius-6);
      overflow: hidden;
      color: var(--color-tran-85);
      padding-left: 4px;
      padding-right: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      .tree-item-left {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        
        .arrow {
          cursor: pointer;
          transform: scale(0.9);
          position: absolute;
          left: -20px;
          transition: transform .2s;
          &.active  {
            transform: rotate(90deg);
          }
        }

        .dot {
          position: absolute;
          left: -12px;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: var(--color-tran-12);
        }
      
        .name-icon{
          color: var(--color-tran-50);
        }

        .name-icon-margin {
          margin: 0 2px;
        }
      }
      
      .tree-item-handle {
        position: absolute;
        right: 0;
        padding: 0 4px;
        height: 100%;
        display:flex;
        align-items: center;
        opacity: 0;
        transition: opacity .15s;

        .c-icon-font {
          color: var(--color-tran-50);
          transition: all .15s;
          cursor: pointer;
          &:hover {
            color: var(--color-tran-85);
            background: var(--color-tran-12);
          }
        }
      }

      &:hover {
        background: var(--color-tran-6);

        .tree-item-left {
          .name-icon {
            color: var(--color-tran-85);
          }
        }

        .tree-item-handle {
          opacity: 1;
        }
      }

      &.active {
        background: var(--color-tran-12);

        .tree-item-left {
          .name-icon {
            color: var(--color-tran-85);
          }
        }
      }
    }
  }
</style>
