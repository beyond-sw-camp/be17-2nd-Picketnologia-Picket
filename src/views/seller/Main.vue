<script setup>
import { ref } from 'vue';
import NavBar from '@/components/seller/NavBar.vue';
import Header from '@/components/Header.vue';

const tab = ref('');
const handleNavChange = (newTab) => {
    tab.value = newTab;
};
</script>

<template>
    <div class="container-fluid">
        <Header :is-genre="false" :only-logo="true" :is-seller-view="true" :seller-tap-name="tab" />

        <div class="row">
            <NavBar @tabChange="handleNavChange" />
            <div style="margin-left: 200px; width: calc(100% - 200px);">
                <RouterView />
            </div>

        </div>
    </div>
</template>

<style scoped></style>