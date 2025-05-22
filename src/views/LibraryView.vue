<script setup>
import SongRow from '../components/SongRow.vue'
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
import Heart from 'vue-material-design-icons/Heart.vue';
import ClockTimeThreeOutline from 'vue-material-design-icons/ClockTimeThreeOutline.vue';
import artist from '../artist.json'

import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia';
const useSong = useSongStore()
const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong)

const playFunc = () => {
    if (currentTrack.value) {
        useSong.playOrPauseThisSong(currentArtist.value, currentTrack.value)
        return
    } 
    useSong.playFromFirst()
}
</script>

<template>
    <div class="p-8 overflow-x-hidden bg-gradient-to-b from-[#121212] to-[#070707]">
        <button
            type="button"
            class="text-white text-2xl font-bold hover:underline cursor-pointer"
        >
            {{ artist.name }}
        </button>

        <div class="py-1.5"></div>
        <div class="flex items-center w-full relative h-full bg-[#181818] bg-opacity-40 p-6 rounded-xl backdrop-blur-sm">
            <img width="140" :src="artist.albumCover" class="rounded-md shadow-xl" />

            <div class="w-full ml-5">

                <div
                    style="font-size: 33px;"
                    class="text-white absolute w-full hover:underline cursor-pointer top-0 font-bold drop-shadow-md"
                >
                    {{ artist.name }}
                </div>

                <div class="text-gray-300 text-[13px] flex">
                    <div class="flex">Album</div>
                    <div class="ml-2 flex">
                        <div class="circle mt-2 mr-2" />
                        <span class="-ml-0.5">{{ artist.releaseYear }}</span>
                    </div>
                    <div class="ml-2 flex">
                        <div class="circle mt-2 mr-2" />
                        <span class="-ml-0.5">{{ artist.tracks.length }} songs</span>
                    </div>
                </div>

                <div class="absolute flex gap-4 items-center justify-start bottom-0 mb-1.5">
                    <button class="p-1.5 rounded-full bg-[#1BD760] hover:bg-[#1ED760] hover:scale-105 transition-all duration-200 shadow-lg" @click="playFunc()">
                        <Play v-if="!isPlaying" fillColor="#000000" :size="25"/>
                        <Pause v-else fillColor="#000000" :size="25"/>
                    </button>
                    <button type="button" class="hover:scale-105 transition-all duration-200">
                        <Heart fillColor="#1BD760" :size="30"/>
                    </button>
                    <button type="button" class="hover:scale-105 transition-all duration-200">
                        <DotsHorizontal fillColor="#FFFFFF" :size="25"/>
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-8"></div>
        <div class="flex items-center justify-between px-5 pt-2 bg-[#121212] bg-opacity-60 rounded-t-md">
            <div class="flex items-center justify-between text-gray-400">
                <div class="mr-7 font-semibold">#</div>
                <div class="text-sm font-medium">Title</div>
            </div>
            <div><ClockTimeThreeOutline fillColor="#FFFFFF" :size="18"/></div>
        </div>
        <div class="border-b border-b-[#2A2A2A] mt-2"></div>
        <div class="mb-4"></div>
        <div class="bg-[#121212] bg-opacity-30 rounded-b-md p-1">
            <ul class="w-full" v-for="track, index in artist.tracks" :key="track">
                <SongRow :artist="artist" :track="track" :index="++index"/>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .circle {
        width: 4px;
        height: 4px;
        background-color: rgb(189, 189, 189);
        border-radius: 100%;
    }
</style>
