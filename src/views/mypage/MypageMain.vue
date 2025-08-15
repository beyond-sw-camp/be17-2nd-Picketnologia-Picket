<script setup>
import MypageSidebar from '@/components/mypage/MypageSidebar.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isProfile = () => {
    return route.path === '/mypage/profile';
}
</script>

<template>
    <Header :is-genre="false" />
    <div class="container my-5">
        <div class="row">
            <MypageSidebar v-if="!isProfile()" />
            <RouterView />
        </div>
    </div>
    <Footer />

</template>

<style scoped></style>