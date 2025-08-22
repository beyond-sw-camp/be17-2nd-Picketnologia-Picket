<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    logoSize: {
        type: String,
        default: 'fs-4'
    }
})
</script>

<template>
    <RouterLink to="/" class="link-dark link-underline-opacity-0" :class="props.logoSize"><strong
            class="text-primary">Pick</strong>et
    </RouterLink>
</template>

<style scoped></style>