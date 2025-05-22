<script setup>
import { ref, toRefs, onMounted } from 'vue'
import Heart from 'vue-material-design-icons/Heart.vue';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';

import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia';
const useSong = useSongStore()
const { isPlaying, currentTrack } = storeToRefs(useSong)

let isHover = ref(false)
let isTrackTime = ref(null)

const props = defineProps({
    track: Object,
    artist: Object,
    index: Number,
})

const { track, artist, index } = toRefs(props)

onMounted(() => {
    const audio = new Audio(track.value.path);
    audio.addEventListener('loadedmetadata', function() {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        isTrackTime.value = minutes+':'+seconds.toString().padStart(2, '0')
    });
})
</script>

<template>
    <li
        class="flex items-center justify-between rounded-md hover:bg-[#2A2929] transition-all duration-200"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        :class="{'bg-[#2A2929] bg-opacity-40': currentTrack && currentTrack.name === track.name}"
    >
        <div class="flex items-center w-full py-2">
            <div v-if="isHover" class="w-[40px] ml-[14px] mr-[6px] cursor-pointer transition-all duration-200 hover:scale-110">
                <div class="bg-[#1BD760] rounded-full p-1.5 flex items-center justify-center" v-if="!isPlaying || (isPlaying && currentTrack.name !== track.name)">
                    <Play
                        v-if="!isPlaying"
                        fillColor="#000000"
                        :size="20"
                        @click="useSong.playOrPauseThisSong(artist, track)"
                    />
                    <Play
                        v-else-if="isPlaying && currentTrack.name !== track.name"
                        fillColor="#000000"
                        :size="20"
                        @click="useSong.loadSong(artist, track)"
                    />
                </div>

                <div class="bg-white rounded-full p-1.5 flex items-center justify-center" v-else>
                    <Pause fillColor="#000000" :size="20" @click="useSong.playOrPauseSong()"/>
                </div>
            </div>
            <div v-else class="text-white font-semibold w-[40px] ml-5">
                <span :class="{'text-[#1BD760] font-bold': currentTrack && currentTrack.name === track.name}">
                    {{ index }}
                </span>
            </div>
            <div>
                <div
                    :class="{'text-[#1BD760] font-bold': currentTrack && currentTrack.name === track.name}"
                    class="text-white font-bold"
                >
                    {{ track.name }}
                </div>
                <div class="text-sm font-medium text-gray-400">{{ artist.name }}</div>
            </div>
        </div>
        <div class="flex items-center">
            <button type="button" v-if="isHover" class="transition-all duration-200 hover:scale-110">
                <Heart fillColor="#1BD760" :size="22"/>
            </button>
            <div
                v-if="isTrackTime"
                class="text-xs mx-5 text-gray-400 font-medium"
            >
                {{ isTrackTime }}
            </div>
        </div>
    </li>
</template>

<style scoped>
li {
    border-radius: 4px;
    margin-bottom: 2px;
}

li:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>
