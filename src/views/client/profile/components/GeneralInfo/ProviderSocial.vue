<template>
    <div class="grid grid-cols-4 gap-6 p-6">
        <div v-for="social in socialIcons" :key="social.key"
            :class="providers.includes(social.key) ? 'grayscale-0' : 'grayscale'"
            class="flex flex-col items-center transition-all duration-300">
            <img :src="social.src" :alt="social.key" class="w-14 h-14 object-contain" />
            <span class="text-sm mt-2">{{ social.name }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

// Danh sách icon với key và đường dẫn ảnh SVG ổn định
const socialIcons = ref([
    { key: "google", name: "Google", src: "https://cdn-icons-png.flaticon.com/512/300/300221.png" },
    { key: "facebook", name: "Facebook", src: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png" },
    { key: "apple", name: "Apple", src: "https://cdn-icons-png.flaticon.com/512/831/831276.png" },
    { key: "github", name: "GitHub", src: "https://cdn-icons-png.flaticon.com/512/733/733609.png" },
    { key: "gitlab", name: "GitLab", src: "https://cdn-icons-png.flaticon.com/512/5968/5968853.png" },
    { key: "twitter", name: "Twitter", src: "https://cdn-icons-png.flaticon.com/512/733/733579.png" },
    { key: "discord", name: "Discord", src: "https://cdn-icons-png.flaticon.com/512/3670/3670157.png" },
    { key: "twitch", name: "Twitch", src: "https://cdn-icons-png.flaticon.com/512/733/733641.png" },
    { key: "hubspot", name: "HubSpot", src: "https://cdn-icons-png.flaticon.com/512/5968/5968829.png" }
]);

// Danh sách provider đang active1
const providers = ref([]);
</script>

<style scoped>
.grayscale {
    filter: grayscale(100%);
}
</style>