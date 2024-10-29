<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// Router and store setup
const router = useRouter();
const store = useStore();

// Reactive state for dark mode
const isDarkMode = ref(store.getters.isDarkMode);

// Initialize theme on mount
const initializeTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    isDarkMode.value = storedTheme === 'dark';
  } else {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDarkMode.value = prefersDarkScheme;
  }
  // Apply initial theme
  document.body.classList.toggle('dark-mode', isDarkMode.value);
};

// Call initialize on mount
initializeTheme();

// Generate navigation links
const navLinks = computed(() => {
  return router.getRoutes()
    .filter(route => {
      return route.path !== '/:pathMatch(.*)' &&
             route.path !== '/:pathMatch(.*)*' &&
             route.path !== '/' &&
             !route.path.includes(':')
    })
    .map(route => ({
      path: route.path,
      name: route.name?.toString() ?? route.path.slice(1)
    }));
});

// Toggle theme function
const toggleTheme = (newTheme: boolean) => {
  store.dispatch('toggleTheme');
  document.body.classList.toggle('dark-mode', newTheme);
  localStorage.setItem('theme', newTheme ? 'dark' : 'light');
};

// Watch for changes to isDarkMode
watch(isDarkMode, (newValue) => {
  toggleTheme(newValue);
});
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link 
        v-for="link in navLinks" 
        :key="link.path" 
        :to="link.path"
      >
        {{ link.name }}
      </router-link>
    </nav>
    <label class="switch" title="Toggle dark mode">
      <input 
        type="checkbox" 
        v-model="isDarkMode" 
        @change="toggleTheme(isDarkMode)"
      />
      <span class="slider" />
    </label>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
// Variables
:root {
  --text-color: #333;
  --primary-color: #2196F3;
  --background-color: #fff;
}

// Dark mode variables
.dark-mode {
  --text-color: #fff;
  --primary-color: #64B5F6;
  --background-color: #333;
}

// Layout
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

// Navigation styles
nav {
  display: flex;
  align-items: center;
  gap: 1rem;

  a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s ease;

    &.router-link-active {
      color: var(--primary-color);
    }

    &:hover {
      color: var(--primary-color);
    }
  }
}

// Theme switch styles
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + .slider {
    background-color: var(--primary-color);
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
}

// Global styles
body {
  margin: 0;
  background-color: var(--background-color);
  color: var(--text-color);
//   transition: background-color 0.3s ease, color 0.3s ease;
}

main {
  padding: 1rem;
}
</style>