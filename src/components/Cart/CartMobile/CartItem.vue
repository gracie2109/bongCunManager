<template>
    <div class="border border-red-600 h-[150px] w-full" v-if="data">
        <Swipe class="w-full" :isOpen="isSwipeOpen" :click="click" @update-open="handleSwipeOpenChange"
            @swipe-hidden-click="handleSwipeHiddenClick">
            <template v-slot:content>
                <div class="w-screen">
                    <p>{{ data.id }}</p>
                </div>
            </template>
            <template #swipe_hidden>
                <div class="flex-shrink-0 w-32 h-full bg-red-500 flex items-center justify-center text-white">
                    <span>Xóa</span>
                </div>
            </template>
        </Swipe>
    </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import Swipe from '@/components/Swipe.vue';

const props = defineProps<{
    data: any;
}>();

const isSwipeOpen = ref(false); 

const click = ref(false)

// Trạng thái đóng/mở section xóa
watchEffect(() => {
    console.log('isSwipeOpen', isSwipeOpen.value);

})
const handleSwipeOpenChange = (isOpen: boolean) => {
    isSwipeOpen.value = isOpen; // Cập nhật trạng thái đóng/mở
};
const handleSwipeHiddenClick = () => {
    click.value = true
    console.log('Swipe hidden clicked!', isSwipeOpen.value);
    // isSwipeOpen.value = true; // Đảm bảo section xóa vẫn mở
    // Thêm logic xử lý tùy chỉnh ở đây (ví dụ: hiển thị dialog xác nhận xóa)
};
</script>