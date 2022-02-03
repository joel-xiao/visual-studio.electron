<template>
    <div>
        肖文龙
        {{color}}
        <div class="div">
            {{color}}
            {{userList}}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue'

interface Props {
  userList: UserInfo[];
}

withDefaults(defineProps<Props>(), {
  userList: () => [],
});
const color = ref('red');
// export default defineComponent({
//     setup () {
//         const color = ref('red');
//         return {
//             color
//         }
//     }
// })
</script>

<style scoped>
    .div {
        color:v-bind(color);
    }
</style>