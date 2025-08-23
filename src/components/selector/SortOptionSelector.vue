<script setup>
import sortOptionAPI from '@/api/sortoption'
import { onMounted, ref } from 'vue';

const sortOptions = ref([]);
const fetchData = ref({
    selectedSorted: null
});

const getSortOptions = async () => {
    const response = await sortOptionAPI.getSortOptions();
    if (response.success) {
        sortOptions.value = response.results.sortOptions;
        fetchData.value.selectedSorted = sortOptions.value[0].code;
    }
}

onMounted(() => {
    getSortOptions();
})

</script>

<template>
    <select class="form-select w-auto" v-model="fetchData.selectedSorted">
        <option v-for="option in sortOptions" :key="option.code" :value="option.code">
            {{ option.name }}
        </option>
    </select>
</template>

<style scoped></style>