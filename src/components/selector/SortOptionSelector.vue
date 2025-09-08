<script setup>
import sortOptionAPI from '@/api/sortoption'
import { onMounted, ref, watch } from 'vue';

const emit = defineEmits(['changeSort']);

const sortOptions = ref([]);
const fetchData = ref({
    selectedSorted: null
});

const getSortOptions = async () => {
    const response = await sortOptionAPI.getSortOptions();
    if (response.success) {
        sortOptions.value = response.results.sortOptions;
        fetchData.value.selectedSorted = sortOptions.value[0].code;

        // 최초 로딩 시에도 알려주기
        // emit('changeSort', fetchData.value.selectedSorted);
    }
};

onMounted(async () => {
    await getSortOptions();
});

// 선택값 바뀔 때마다 부모로 emit
watch(() => fetchData.value.selectedSorted, (newValue) => {
    emit('changeSort', newValue);
});

</script>

<template>
    <select class="form-select w-auto" v-model="fetchData.selectedSorted">
        <option v-for="option in sortOptions" :key="option.code" :value="option.code">
            {{ option.name }}
        </option>
    </select>
</template>