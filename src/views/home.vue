<script setup>
import { reactive, ref, watch, onMounted } from 'vue';

import api from '@/api/product'

const regionOptions = ref([
    { value: '1', label: '지역 전체' },
    { value: '2', label: '강원' },
    { value: '3', label: '경기' },
    { value: '4', label: '경상' },
    { value: '5', label: '광주' },
    { value: '6', label: '대구' },
    { value: '7', label: '대전' },
    { value: '8', label: '부산' },
    { value: '9', label: '서울' },
    { value: '10', label: '울산' },
    { value: '11', label: '인천' },
    { value: '12', label: '전라' },
    { value: '13', label: '제주' },
    { value: '14', label: '충청' }
])

const sortedOtpions = ref([
    { value: '1', label: '최신순' },
    { value: '2', label: '오래된순' },
    { value: '3', label: '일간 랭킹순' },
    { value: '3', label: '주간 랭킹순' },
])

const fetchData = reactive({
    selectedSorted: sortedOtpions.value[0].value,
    selectedLocal: regionOptions.value[0].value
})

const products = ref([
    {
        id: 1,
        name: '지킬 앤 하이드',
        local: '충무아트센터',
        discount: '70%',
        price: '4,500원',
        date: '2025.6.15 ~ 7.30'
    },
    {
        id: 1,
        name: '지킬 앤 하이드',
        local: '충무아트센터',
        discount: '70%',
        price: '4,500원',
        date: '2025.6.15 ~ 7.30'
    },
    {
        id: 1,
        name: '지킬 앤 하이드',
        local: '충무아트센터',
        discount: '70%',
        price: '4,500원',
        date: '2025.6.15 ~ 7.30'
    },
    {
        id: 1,
        name: '지킬 앤 하이드',
        local: '충무아트센터',
        discount: '70%',
        price: '4,500원',
        date: '2025.6.15 ~ 7.30'
    },
    {
        id: 1,
        name: '지킬 앤 하이드',
        local: '충무아트센터',
        discount: '70%',
        price: '4,500원',
        date: '2025.6.15 ~ 7.30'
    },
    {
        id: 1,
        name: '지킬 앤 하이드',
        local: '충무아트센터',
        discount: '70%',
        price: '4,500원',
        date: '2025.6.15 ~ 7.30'
    },
    {
        id: 1,
        name: '지킬 앤 하이드',
        local: '충무아트센터',
        discount: '70%',
        price: '4,500원',
        date: '2025.6.15 ~ 7.30'
    },
    {
        id: 1,
        name: '지킬 앤 하이드',
        local: '충무아트센터',
        discount: '70%',
        price: '4,500원',
        date: '2025.6.15 ~ 7.30'
    },
    {
        id: 1,
        name: '지킬 앤 하이드',
        local: '충무아트센터',
        discount: '70%',
        price: '4,500원',
        date: '2025.6.15 ~ 7.30'
    },
    {
        id: 1,
        name: '지킬 앤 하이드',
        local: '충무아트센터',
        discount: '70%',
        price: '4,500원',
        date: '2025.6.15 ~ 7.30'
    }
])

watch(
    () => fetchData.selectedSorted,
    async (newValue) => {
        if (!newValue) return

        const params = {
            sorted: fetchData.selectedSorted
        }

        // const response = await api.getProucts(params);

    }
)

watch(
    () => fetchData.selectedLocal,
    async (newValue) => {
        if (!newValue) return

        const params = {
            region: fetchData.selectedLocal
        }

        // const response = await fetchData(selectedSorted)
    }
)

onMounted(async () => {
    const response = await api.getProducts()
    products.value = response.products
})

</script>

<template>
    <!-- carousel start -->
    <div id="carouselExampleAutoplaying" class="carousel slide container-lg" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="https://picsum.photos/450/600" class="d-block w-100" style="height: 600px;">
            </div>
            <div class="carousel-item">
                <img src="https://picsum.photos/450/601" class="d-block w-100" style="height: 600px;">
            </div>
            <div class="carousel-item">
                <img src="https://picsum.photos/450/602" class="d-block w-100" style="height: 600px;">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    <!-- Carousel end -->

    <!-- product list start -->
    <section class="d-flex flex-column gap-2 container-lg">
        <h3 class="fs-2 align-self-center fw-semibold">공연 둘러보기</h3>
        <div class="d-flex gap-2">
            <select class="form-select w-auto" v-model="fetchData.selectedLocal">
                <option v-for="option in regionOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
            <select class="form-select w-auto" v-model="fetchData.selectedSorted">
                <option v-for="option in sortedOtpions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>
        <div class="row row-cols-5">
            <div class=" col mb-4" v-for="product, index in products">
                <RouterLink :to="`/products/${product.id}`" class="text-decoration-none text-dark">
                    <div class="card">
                        <img :src="'https://picsum.photos/450/60' + index" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <h6 class="card-subtitle mb-2">{{ product.location }}</h6>
                            <p class="card-text text-danger">{{ product.discount }} <span class="card-text text-dark">{{
                                product.price }}</span></p>
                            <p class="card-text text-body-secondary">{{ product.date }}</p>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </section>
    <!-- product list end -->
</template>

<style scoped></style>