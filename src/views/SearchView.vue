<script setup>
    import CategorySelect from '../components/CategorySelect.vue';
</script>

<template>
    <div class="p-8 bg-gradient-to-b from-[#121212] via-[#0D0D0D] to-[#070707] min-h-screen">
        <button
            type="button"
            class="text-white text-3xl font-bold hover:underline cursor-pointer mb-4 tracking-tight"
        >
            Browse all
        </button>

        <div class="py-1.5"></div>

        <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/40/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/45/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/76/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/56/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/25/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/103/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/244/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/202/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/101/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/120/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/40/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/45/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/76/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/56/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/25/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/103/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/244/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/202/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/101/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/120/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/40/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/45/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/76/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/56/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/25/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/103/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/244/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/202/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/101/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/120/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/40/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/45/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/76/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/56/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/25/300/300"/>
            <CategorySelect category="Podcasts" image="https://picsum.photos/id/103/300/300"/>
            <CategorySelect category="Audiobooks" image="https://picsum.photos/id/244/300/300"/>
            <CategorySelect category="Made For You" image="https://picsum.photos/id/202/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/101/300/300"/>
            <CategorySelect category="New Release" image="https://picsum.photos/id/120/300/300"/>
        </div>
    </div>
</template>

<style scoped>
.grid {
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
