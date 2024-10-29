// src/App.vue
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navLinks = router.getRoutes()
  .filter(route => route.path !== '/')
  .map(route => ({
    path: route.path,
    name: route.name?.toString().replace(/([A-Z])/g, ' $1').trim()
  }))
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <template v-for="(link, index) in navLinks" :key="link.path">
      | <router-link :to="link.path">{{ link.name }}</router-link>
    </template>
  </nav>
  <router-view />
</template>

<style lang="scss">
nav {
  @include flex-center;
  padding: 1rem;
  
  a {
    color: $primary-color;
    text-decoration: none;
    margin: 0 0.5rem;
    
    &.router-link-active {
      color: $secondary-color;
    }
  }
}
</style>