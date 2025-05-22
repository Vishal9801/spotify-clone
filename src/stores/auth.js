import { defineStore } from 'pinia';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    listenerInitialized: false
  }),
  
  getters: {
    currentUser: (state) => state.user,
  },
  
  actions: {
    async registerUser(email, password, name) {
      this.loading = true;
      this.error = null;
      
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        this.user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: name
        };
        this.isAuthenticated = true;
        return this.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async loginUser(email, password) {
      this.loading = true;
      this.error = null;
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName
        };
        this.isAuthenticated = true;
        return this.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async loginWithGoogle() {
      this.loading = true;
      this.error = null;
      
      try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        this.user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL
        };
        this.isAuthenticated = true;
        return this.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async loginWithFacebook() {
      this.loading = true;
      this.error = null;
      
      try {
        const provider = new FacebookAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        this.user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL
        };
        this.isAuthenticated = true;
        return this.user;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async logoutUser() {
      this.loading = true;
      this.error = null;
      
      try {
        await signOut(auth);
        this.user = null;
        this.isAuthenticated = false;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    initializeAuthListener() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          };
          this.isAuthenticated = true;
        } else {
          this.user = null;
          this.isAuthenticated = false;
        }
      });
      this.listenerInitialized = true;
    },
    
    clearError() {
      this.error = null;
    }
  },
  
  persist: true
}); 