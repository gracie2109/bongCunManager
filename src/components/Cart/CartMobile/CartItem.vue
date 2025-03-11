<template>
    <div class="border border-red-600 h-[50px] w-full" v-if="data">
        <Swipe class="w-full" :isOpen="isSwipeOpen" @update:isOpen="handleSwipeOpenChange" :key="props.data.id"
            @swipe-hidden-click="handleSwipeHiddenClick">
            <template v-slot:content>
                <div class="w-screen">
                    <p>{{ data.id }}</p>
                </div>
            </template>
            <template v-slot:swipe_hidden>
                <div class="flex-shrink-0 w-32 h-full bg-red-500 flex items-center justify-center text-white">
                    <span>Xóa</span>
                </div>
            </template>
        </Swipe>


    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Swipe from '@/components/Swipe.vue';

const props = defineProps<{
    data: any;
}>();

const isSwipeOpen = ref(false); // Trạng thái đóng/mở section xóa

const handleSwipeOpenChange = (isOpen: boolean) => {
    isSwipeOpen.value = isOpen; // Cập nhật trạng thái đóng/mở
};

const handleSwipeHiddenClick = () => {
    console.log('Swipe hidden clicked!');
    // Thêm logic xử lý tùy chỉnh ở đây (ví dụ: hiển thị dialog xác nhận xóa)
};
</script>