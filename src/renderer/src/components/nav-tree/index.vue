<template lang="pug">
div(class='c-nav-tree')
  TreeItem( 
    @select="onNavSelect"
    @command="onCommand"
    :data="data"
    :itemIcon="itemIcon"
    :itemMenus="itemMenus"
    :currentNav="currentNav")
  transition(name='fade')
    div#content-menu(:style="contentMenuStyle" v-show="contentMenuShow")
      div.content-menu-item
        Icon(
          class="menu-item-icon"
          src="icon-bianji")
        span(class="menu-item-label") 重命名
</template>

<script lang="ts" setup>
  import TreeItem from './tree-item.vue';
  import { ref, reactive, defineProps, withDefaults, defineEmits, onUnmounted } from 'vue'
  import { TreeItemData, TreeItemMenu } from './interface'

  interface Props {
    data?: [TreeItemData];
    itemMenus?: [TreeItemMenu];
    itemIcon?: string;
  }
  const props = withDefaults(defineProps<Props>(), {
    data:[],
    itemMenus: [],
    itemIcon: '',
  })
  
  const emit = defineEmits(['select', 'command']);

  const currentNav = ref<TreeItemData>();
  const onNavSelect = function(item:TreeItemData):void {
    currentNav.value = item;
    emit('select', item);
  }
  onNavSelect(props.data[0]);


  const contentMenuStyle:CSSStyleDeclaration = reactive({});
  const contentMenuShow = ref<Boolean>(false);
  const onContentMenuShow = function (val?:Boolean, el?:HTMLElement):void {
    contentMenuShow.value = !!val;
    const rect: ClientRect = el && el.getBoundingClientRect();
    if(val && rect) {
      contentMenuStyle.left = rect.left + 'px';
      contentMenuStyle.top = rect.bottom + 'px';
    }
  }
  onContentMenuShow(false);


  const onTreeClick = function ():void {
    onContentMenuShow(false);
  }
  document.addEventListener('click', onTreeClick);
  onUnmounted(() => {
    document.removeEventListener('click', onTreeClick);
  })

  const onCommand = function( event:Event, cmd:TreeItemMenu):void {
    let el:HTMLElement = event.path[1];
    if(cmd?.children?.length) {
      onContentMenuShow(true, el);
      return;
    }
    onContentMenuShow(false);
    emit('command', cmd);
  }

</script>

<style scoped lang="scss">
.c-nav-tree {
  width: 100%;
  height: 100%;

  .fade-enter-active,
  .fade-leave-active {
    transition: ease-out;
    transition-property: opacity, transform;
    transition-duration: 0.2s;
  }
  .fade-enter-from,
  .fade-leave-to {
    transform:translateY(-10px);
    opacity: 0;
  }
    
  #content-menu {
    position: fixed;
    left: 0;
    width: 166px;
    padding: 4px;
    border-radius: var(--border-radius-6);
    background: var(--color-gray-700);
    border: 1px solid var(--color-tran-6);
    .content-menu-item {
      height:24px;
      line-height: 24px;
      display:flex;
      align-items: center;
      border-radius: var(--border-radius-4);
      padding: 0 4px;
      transition: background .15s;

      &:hover {
        background: var(--color-tran-12);
      }

      .menu-item-icon {
        color: var(--color-tran-85);
      }

      .menu-item-label {
        display: inline-block;
        height: 100%;
        color: var(--color-tran-85);
        font-size: 12px;
      }
    }
  }
}
</style>
