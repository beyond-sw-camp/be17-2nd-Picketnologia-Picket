<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>
    <div class="d-flex flex-column gap-5">
        <Header />
        <RouterView />
        <Footer />
    </div>
</template>

<style scoped></style>