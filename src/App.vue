// src/App.vue
<script setup lang="ts">
import { ref, watch } from 'vue'; 
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

// Reactive state for dark mode
const isDarkMode = ref(store.getters.isDarkMode);

// Apply initial theme based on stored or system preference
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    isDarkMode.value = storedTheme === 'dark';
} else {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    isDarkMode.value = prefersDarkScheme;
}

// Apply dark mode class on body
document.body.classList.toggle('dark-mode', isDarkMode.value);

// Watch for changes to isDarkMode
watch(isDarkMode, (newValue) => {
    toggleTheme(newValue);
});

// Generate navigation links
const navLinks = router.getRoutes()
    .filter(route => route.path !== '/')
    .map(route => ({
        path: route.path,
        name: route.name?.toString().replace(/([A-Z])/g, ' $1').trim()
    }));

// Toggle theme function
const toggleTheme = (newTheme: boolean) => {
    // Call the toggleTheme action instead
    store.dispatch('toggleTheme');
    
    // Update the body class based on the new theme
    document.body.classList.toggle('dark-mode', newTheme);

    // Save the theme choice to localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
};
</script>


<template>
    <nav>
        <router-link to="/">Home</router-link>
        <template v-for="(link, index) in navLinks" :key="link.path">
            | <router-link :to="link.path">{{ link.name }}</router-link>
        </template>
    </nav>
    <label class="switch">
        <input type="checkbox" v-model="isDarkMode" @change="toggleTheme(isDarkMode)" />
        <span class="slider"></span>
    </label>

    <router-view />

</template>

<style lang="scss">
nav {
    @include flex-center;
    padding: 1rem;

    a {
        color: var(--text-color);
        text-decoration: none;
        margin: 0 0.5rem;

        &.router-link-active {
            color: var(--primary-color);
        }
    }
}

/* Slider Styles */
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
        background-color: #2196F3;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }
}
</style>
