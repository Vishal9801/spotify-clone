<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errors = ref({});
const isSubmitting = ref(false);
const isSocialLoading = ref({
  google: false
});

const validateForm = () => {
  errors.value = {};
  let isValid = true;
  
  // Email validation
  if (!email.value) {
    errors.value.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = 'Email is invalid';
    isValid = false;
  }
  
  // Password validation
  if (!password.value) {
    errors.value.password = 'Password is required';
    isValid = false;
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  try {
    await authStore.loginUser(email.value, password.value);
    router.push('/');
  } catch (error) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errors.value.auth = 'Invalid email or password';
    } else {
      errors.value.auth = error.message;
    }
  } finally {
    isSubmitting.value = false;
  }
};

const handleGoogleLogin = async () => {
  errors.value = {};
  isSocialLoading.value.google = true;
  
  try {
    await authStore.loginWithGoogle();
    router.push('/');
  } catch (error) {
    errors.value.auth = error.message;
  } finally {
    isSocialLoading.value.google = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#121212] via-[#0D0D0D] to-[#070707] px-4">
    <div class="max-w-md w-full space-y-8 p-10 bg-[#181818] rounded-xl shadow-xl">
      <div class="text-center">
        <div class="nidhi-logo mx-auto mb-6">
          <div class="nidhi-text">NIDHI</div>
          <div class="nidhi-subtitle">Music</div>
        </div>
        <h2 class="text-3xl font-bold text-white">Log in to continue</h2>
        <p class="mt-2 text-sm text-gray-400">
          Don't have an account? 
          <RouterLink to="/register" class="text-[#1BD760] hover:underline font-medium">
            Sign up here
          </RouterLink>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div v-if="errors.auth" class="bg-red-500 bg-opacity-20 p-3 rounded-md mb-4">
          <p class="text-red-300 text-sm">{{ errors.auth }}</p>
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300">Email address</label>
          <div class="mt-1">
            <input 
              id="email" 
              name="email" 
              type="email" 
              autocomplete="email" 
              v-model="email"
              class="appearance-none block w-full px-3 py-3 border border-gray-700 bg-[#282828] rounded-md placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#1BD760] focus:border-transparent"
              :class="errors.email ? 'border-red-500' : ''"
            />
            <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
          </div>
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
          <div class="mt-1">
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="current-password" 
              v-model="password"
              class="appearance-none block w-full px-3 py-3 border border-gray-700 bg-[#282828] rounded-md placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#1BD760] focus:border-transparent"
              :class="errors.password ? 'border-red-500' : ''"
            />
            <p v-if="errors.password" class="text-red-400 text-xs mt-1">{{ errors.password }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input 
              id="remember-me" 
              name="remember-me" 
              type="checkbox" 
              v-model="rememberMe"
              class="h-4 w-4 text-[#1BD760] focus:ring-[#1BD760] border-gray-600 rounded bg-[#282828]" 
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-400">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <RouterLink to="/forgot-password" class="text-[#1BD760] hover:text-[#1ED760] font-medium">
              Forgot password?
            </RouterLink>
          </div>
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="isSubmitting" 
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-black bg-[#1BD760] hover:bg-[#1ED760] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1BD760] transition duration-200"
            :class="isSubmitting ? 'opacity-70 cursor-not-allowed' : ''"
          >
            <span v-if="isSubmitting" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Loading spinner -->
              <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isSubmitting ? 'Logging in...' : 'Log in' }}
          </button>
        </div>
      </form>
      
      <div class="flex items-center my-4">
        <div class="flex-grow border-t border-gray-700"></div>
        <span class="flex-shrink mx-4 text-gray-400 text-sm">or continue with</span>
        <div class="flex-grow border-t border-gray-700"></div>
      </div>
      
      <div class="flex justify-center">
        <button 
          type="button"
          @click="handleGoogleLogin"
          :disabled="isSocialLoading.google"
          class="flex justify-center items-center py-2.5 px-6 border border-gray-700 rounded-md bg-[#282828] hover:bg-[#333333] text-white text-sm font-medium transition duration-200 w-full max-w-xs"
          :class="isSocialLoading.google ? 'opacity-70 cursor-not-allowed' : ''"
        >
          <span v-if="isSocialLoading.google" class="mr-2">
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          <span v-else class="mr-2">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </span>
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nidhi-logo {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  width: fit-content;
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