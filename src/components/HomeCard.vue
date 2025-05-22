<script setup>
import { toRefs } from 'vue'
import { RouterLink } from 'vue-router';

const props = defineProps({
    image: String,
    title: String,
    subTitle: String
})
const { image, title, subTitle } = toRefs(props)
</script>

<template>
    <RouterLink to="library">
        <div class="bg-[#181818] p-4 rounded-lg m-2 hover:bg-[#252525] cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 group">
            <div class="relative overflow-hidden rounded-md">
                <img class="rounded-md w-full transition-all duration-500 group-hover:scale-105" :src="image" alt="">
                <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="bg-[#1BD760] rounded-full p-2 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="text-white pt-4 font-bold text-[17px] truncate">{{ title }}</div>
            <div class="text-gray-400 pt-1 pb-3 text-[14px] truncate">{{ subTitle }}</div>
        </div>
    </RouterLink>
</template>

<style scoped>
.group:hover {
    background: linear-gradient(135deg, #252525 0%, #202020 100%);
}
</style>
