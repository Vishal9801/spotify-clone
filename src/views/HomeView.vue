<script setup>
    import HomeCard from '../components/HomeCard.vue';
    import artist from '../artist.json';
</script>

<template>
    <div class="p-8 bg-gradient-to-b from-[#121212] via-[#0D0D0D] to-[#070707] min-h-screen">
        <div class="section-container">
            <button
                type="button"
                class="text-white text-3xl font-bold hover:underline cursor-pointer mb-2 tracking-tight"
            >
                Latest from {{ artist.name }}
            </button>

            <div class="py-1.5"></div>

            <div class="flex items-center gap-5 overflow-x-auto pb-4 section-content">
                <HomeCard image="https://picsum.photos/id/30/300/300" :title="artist.tracks[2].name" :subTitle="artist.name" />
                <HomeCard image="https://picsum.photos/id/45/300/300" :title="artist.tracks[4].name" :subTitle="artist.name" />
                <HomeCard class="md:block hidden" image="https://picsum.photos/id/65/300/300" :title="artist.tracks[6].name" :subTitle="artist.name" />
                <HomeCard class="lg:block hidden" image="https://picsum.photos/id/67/300/300" :title="artist.tracks[9].name" :subTitle="artist.name" />
                <HomeCard class="xl:block hidden" image="https://picsum.photos/id/100/300/300" :title="artist.tracks[10].name" :subTitle="artist.name" />
            </div>
        </div>

        <div class="section-container mt-8">
            <button
                type="button"
                class="text-white text-3xl font-bold hover:underline cursor-pointer mb-2 tracking-tight"
            >
            Popular tracks
            </button>

            <div class="py-1.5"></div>

            <div class="flex items-center gap-5 overflow-x-auto pb-4 section-content">
                <HomeCard image="https://picsum.photos/id/120/300/300" :title="artist.tracks[0].name" :subTitle="artist.name" />
                <HomeCard image="https://picsum.photos/id/110/300/300" :title="artist.tracks[1].name" :subTitle="artist.name" />
                <HomeCard class="md:block hidden" image="https://picsum.photos/id/221/300/300" :title="artist.tracks[3].name" :subTitle="artist.name" />
                <HomeCard class="lg:block hidden" image="https://picsum.photos/id/232/300/300" :title="artist.tracks[5].name" :subTitle="artist.name" />
                <HomeCard class="xl:block hidden" image="https://picsum.photos/id/187/300/300" :title="artist.tracks[7].name" :subTitle="artist.name" />
            </div>
        </div>

        <div class="section-container mt-8">
            <button
                type="button"
                class="text-white text-3xl font-bold hover:underline cursor-pointer mb-2 tracking-tight"
            >
            You might also like
            </button>

            <div class="py-1.5"></div>

            <div class="flex items-center gap-5 overflow-x-auto pb-4 section-content">
                <HomeCard image="/images/albumCovers/DiariesOfAHero.png" :title="artist.tracks[8].name" :subTitle="artist.name" />
                <HomeCard image="https://picsum.photos/id/243/300/300" :title="artist.tracks[11].name" :subTitle="artist.name" />
                <HomeCard class="md:block hidden" image="https://picsum.photos/id/123/300/300" :title="artist.tracks[0].name" :subTitle="artist.name + ' - Single'" />
                <HomeCard class="lg:block hidden" image="https://picsum.photos/id/121/300/300" :title="artist.tracks[2].name" :subTitle="artist.name + ' - Remix'" />
                <HomeCard class="xl:block hidden" image="https://picsum.photos/id/99/300/300" :title="artist.tracks[4].name" :subTitle="artist.name + ' - Acoustic'" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.section-container {
    animation: fadeIn 0.5s ease;
}

.section-content {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.section-content::-webkit-scrollbar {
    height: 8px;
}

.section-content::-webkit-scrollbar-track {
    background: transparent;
}

.section-content::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
