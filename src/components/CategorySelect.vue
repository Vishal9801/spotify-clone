<template>
    <RouterLink to="library">
        <div
            v-if="randColor.color"
            :style="`background: linear-gradient(135deg, ${randColor.color} 0%, ${darkerColor} 100%);`"
            class="
                contrast-[1.8] 
                brightness-[0.9] 
                rounded-xl 
                aspect-square 
                relative 
                overflow-hidden
                shadow-lg
                hover:shadow-xl
                transition-all
                duration-300
                hover:scale-[1.02]
                cursor-pointer
            "
        >
            <div class="text-white pt-3 pl-4 font-bold text-[23px] drop-shadow-md">{{ category }}</div>
            <img
                class="
                    absolute 
                    contrast-[0.6]
                    -right-3.5 
                    bottom-0 
                    max-w-[100px] 
                    rotate-[20deg]
                    transition-transform
                    duration-700
                    hover:rotate-[25deg]
                    filter
                    drop-shadow-lg
                "
                :src="image || ''"
            >
        </div>
    </RouterLink>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue'
import { RouterLink } from 'vue-router';
import uniqolor from 'uniqolor';

let randColor = ref('')
randColor.value = uniqolor.random()

// Create a darker variant of the random color for gradient
const darkerColor = computed(() => {
    // Simple function to darken a hex color
    const color = randColor.value.color;
    const amount = 40; // Darkening amount (0-255)
    
    // Convert hex to RGB
    let r = parseInt(color.substring(1,3), 16);
    let g = parseInt(color.substring(3,5), 16);
    let b = parseInt(color.substring(5,7), 16);
    
    // Darken each component
    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);
    
    // Convert back to hex
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
});

const props = defineProps({ category: String, image: String })
const { category } = toRefs(props)
</script>

