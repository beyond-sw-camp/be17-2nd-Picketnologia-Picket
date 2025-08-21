<script setup>
import { useLoadingStore } from '@/stores/useLoadingStore';
const loadingStore = useLoadingStore();

</script>

<template>
    <div class="d-flex align-items-center justify-content-center vw-100 vh-100 position-fixed top-0 start-0 z-3 bg-opacity-25 bg-dark"
        v-if="loadingStore.isLoading">
        <div class="spinner-border" role="status">
        </div>
    </div>
</template>

<style scoped></style>