<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { RouterLink, RouterView, useRouter } from 'vue-router'
  import MenuItem from './components/MenuItem.vue';
  import MusicPlayer from './components/MusicPlayer.vue'
  import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
  import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
  import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
  import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';

  import { useSongStore } from './stores/song'
  import { useAuthStore } from './stores/auth'
  import { storeToRefs } from 'pinia';
  
  const useSong = useSongStore()
  const authStore = useAuthStore()
  const router = useRouter()
  
  const { isPlaying, currentTrack } = storeToRefs(useSong)
  const { user, isAuthenticated } = storeToRefs(authStore)

  onMounted(() => { 
    isPlaying.value = false 
  })

  let openMenu = ref(false)
  
  const displayName = computed(() => {
    return user.value?.displayName || 'User'
  })
  
  const handleLogout = async () => {
    try {
      await authStore.logoutUser();
      openMenu.value = false;
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
</script>

<template>
    <div v-if="isAuthenticated">
        <div 
          id="TopNav"
          class="
            w-[calc(100%-240px)] 
            h-[60px] 
            fixed 
            right-0 
            z-20 
            bg-[#101010] 
            bg-opacity-80 
            flex 
            items-center 
            justify-between
          "
        >
            <div class="flex items-center ml-6">
                <button type="button" class="rounded-full bg-black p-[1px] cursor-pointer">
                    <ChevronLeft fillColor="#FFFFFF" :size="30" />
                </button>
                <button type="button" class="rounded-full bg-black p-[1px] hover:bg-[#] ml-4 cursor-pointer">
                    <ChevronRight fillColor="#FFFFFF" :size="30" />
                </button>
            </div>

            <button @click="openMenu = !openMenu" :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
                class="bg-black hover:bg-[#282828] rounded-full p-0.5 mr-8 mt-0.5 cursor-pointer">
                <div class="flex items-center">
                    <div class="w-[27px] h-[27px] rounded-full bg-[#282828] flex items-center justify-center text-white font-bold">
                      {{ displayName.charAt(0).toUpperCase() }}
                    </div>
                    <div class="text-white text-[14px] ml-1.5 font-semibold">{{ displayName }}</div>
                    <ChevronDown v-if="!openMenu" @click="openMenu = true" fillColor="#FFFFFF" :size="25" />
                    <ChevronUp v-else @click="openMenu = false" fillColor="#FFFFFF" :size="25" />
                </div>
            </button>

            <span v-if="openMenu"
                class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer">
                <ul class="text-gray-200 font-semibold text-[14px]">
                    <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600">Profile</li>
                    <li @click="handleLogout" class="px-3 py-2.5 hover:bg-[#3E3D3D]">Log out</li>
                </ul>
            </span>
        </div>


        <div id="SideNav" class="h-[100%] p-6 w-[240px] fixed z-50 bg-black">
            <RouterLink to="/">
              <div class="nidhi-logo">
                <div class="nidhi-text">Youtify</div>
                <div class="nidhi-subtitle">Music</div>
              </div>
            </RouterLink>
            <div class="my-8"></div>
            <ul>
                <RouterLink to="/">
                    <MenuItem class="ml-[1px]" :iconSize="23" name="Home" iconString="home" pageUrl="/" />
                </RouterLink>
                <RouterLink to="/search">
                    <MenuItem class="ml-[1px]" :iconSize="24" name="Search" iconString="search" pageUrl="/search" />
                </RouterLink>
                <RouterLink to="/library">
                    <MenuItem class="ml-[2px]" :iconSize="23" name="Your Library" iconString="library" pageUrl="/library" />
                </RouterLink>
                <div class="py-3.5"></div>
                <MenuItem :iconSize="24" name="Create Playlist" iconString="playlist" pageUrl="/playlist" />
                <MenuItem class="-ml-[1px]" :iconSize="27" name="Liked Songs" iconString="liked" pageUrl="/liked" />
            </ul>
            <div class="border-b border-b-gray-700"></div>
            <ul>
                <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">My Playlist #1</li>
                <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">My Playlist #2</li>
                <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">My Playlist #3</li>
                <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">My Playlist #4</li>
            </ul>
        </div>
    </div>

    <div
        v-if="isAuthenticated"
        class="
            fixed
            right-0
            top-0
            w-[calc(100%-240px)]
            overflow-auto
            h-full
            bg-gradient-to-b
            from-[#1C1C1C]
            to-black
        "
    >
        <div class="mt-[70px]"></div>
        <RouterView />
        <div class="mb-[100px]"></div>
    </div>
    
    <RouterView v-if="!isAuthenticated" />

    <MusicPlayer v-if="currentTrack && isAuthenticated"/>
</template>

<style scoped>
.nidhi-logo {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
}

.nidhi-text {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #1BD760;
  text-shadow: 0 0 10px rgba(27, 215, 96, 0.5);
  font-family: Arial, sans-serif;
  background: linear-gradient(to right, #1ed760, #1DB954);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nidhi-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 8px;
  margin-top: -2px;
  margin-left: 2px;
  text-transform: uppercase;
}
</style>



