<script setup lang="ts">
const title = 'Welcome Home'
</script>

<template>
    <div class="home">
        <h1>{{ title }}</h1>
        <p>This is the home page</p>
    </div>
</template>

<style lang="scss">
.home {
    @include flex-center;
    flex-direction: column;
    padding: 2rem;

}
</style>