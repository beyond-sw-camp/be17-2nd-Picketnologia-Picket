<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<template>
    <div class="d-flex flex-column">
        <Header />
        <div :class="{ 'my-4': route.name != 'home' }">
            <RouterView />
        </div>
        <Footer />
    </div>
</template>

<style scoped></style>