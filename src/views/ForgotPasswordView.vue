<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { RouterLink } from 'vue-router';

const router = useRouter();

const email = ref('');
const errors = ref({});
const isSubmitting = ref(false);
const resetSent = ref(false);

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
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  errors.value = {};
  
  try {
    await sendPasswordResetEmail(auth, email.value);
    resetSent.value = true;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      errors.value.auth = 'No account found with this email';
    } else {
      errors.value.auth = error.message;
    }
  } finally {
    isSubmitting.value = false;
  }
};

const goBackToLogin = () => {
  router.push('/login');
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
        <h2 class="text-3xl font-bold text-white">Reset your password</h2>
        <p class="mt-2 text-sm text-gray-400">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>
      
      <div v-if="resetSent" class="mt-8 space-y-6">
        <div class="bg-green-500 bg-opacity-20 p-4 rounded-md mb-4 text-center">
          <p class="text-green-300 text-sm">
            Reset link sent! Please check your email to reset your password.
          </p>
        </div>
        
        <button 
          @click="goBackToLogin"
          class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-black bg-[#1BD760] hover:bg-[#1ED760] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1BD760] transition duration-200"
        >
          Return to login
        </button>
      </div>
      
      <form v-else class="mt-8 space-y-6" @submit.prevent="handleSubmit">
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
          <button 
            type="submit" 
            :disabled="isSubmitting" 
            class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-black bg-[#1BD760] hover:bg-[#1ED760] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1BD760] transition duration-200"
            :class="isSubmitting ? 'opacity-70 cursor-not-allowed' : ''"
          >
            <span v-if="isSubmitting" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Loading spinner -->
              <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isSubmitting ? 'Sending...' : 'Send reset link' }}
          </button>
        </div>
      </form>
      
      <div class="text-center mt-4">
        <RouterLink to="/login" class="text-[#1BD760] hover:underline font-medium">
          Back to login
        </RouterLink>
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