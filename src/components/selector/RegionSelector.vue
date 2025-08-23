<script setup>
import regionAPI from '@/api/region'
import { ref, onMounted } from 'vue'

const regions = ref([])
const fetchData = ref({
    selectedLocal: null
})

const fetchRegions = async () => {
    const response = await regionAPI.getRegions()
    if (response.success) {
        regions.value = response.results.regions
        fetchData.value.selectedLocal = regions.value[0].code
    } else {
        console.error('지역 목록 가져오기 실패:', response.error)
    }
}

onMounted(fetchRegions)

</script>

<template>
    <select class="form-select w-auto" v-model="fetchData.selectedLocal">
        <option v-for="region in regions" :key="region.code" :value="region.code">
            {{ region.name }}
        </option>
    </select>
</template>

<style scoped></style>