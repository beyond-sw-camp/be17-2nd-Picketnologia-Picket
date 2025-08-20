<script setup>
import { useRoute } from 'vue-router';
import contentsApi from '@/api/contents';
import { ref, reactive, watch, onMounted } from 'vue';

const route = useRoute();

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
        idx: 1,
        name: '지킬 앤 하이드',
        venueName: '충무아트센터',
        price: '4,500원',
        startDate: '2025.6.15 ~ 7.30',
        endDate: "2025.7.30",
        posterUrl: '',
        price: 4500,
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

watch(() => route.params.code, async (newValue) => {
    const req = {
        genre: newValue,
    }
    const response = await contentsApi.getContentsByGenre(req)
    if (response.success) {
        products.value = response.results.products
    } else {
        products.value = []
    }
})

onMounted(async () => {
    const req = {
        genre: route.params.code,
    }
    const response = await contentsApi.getContentsByGenre(req)
    if (response.success) {
        products.value = response.results.products
    } else {
        products.value = []
    }
})
</script>

<template>
    <div class="container-lg d-flex flex-column gap-3 text-center">
        <div>
        </div>
        <div>
            <h1>지금 할인 중</h1>
        </div>
        <div>
            <h1>오픈 예정</h1>
        </div>

    </div>

    <!-- 카드 -->

    <!-- 지금 할인 중 -->

    <!-- 오픈 예정 -->

    <!-- 둘러보기 -->
    <section class="d-flex flex-column gap-2 container-lg">
        <h3 class="fs-2 align-self-center fw-semibold">공연 둘러보기</h3>
        <div v-if="products.length === 0" class="text-center h1">
            <p class="text-body-secondary">해당하는 공연이 없습니다.</p>
        </div>
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
                <RouterLink :to="`/products/${product.idx}`" class="text-decoration-none text-dark">
                    <div class="card h-100">
                        <!-- <img :src="'https://picsum.photos/450/60' + index" class="card-img-top"> -->
                        <img :src="product.posterUrl" class="card-img-top" style="width: 100%; height: 400px;">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <h5 class="card-title">{{ product.title }}</h5>
                            <h6 class="card-subtitle mb-2">{{ product.venueName }}</h6>
                            <span class="card-text text-dark">
                                {{ product.price }}
                            </span>
                            <p class="card-text text-body-secondary">{{ product.startDate }} ~ {{ product.endDate }}</p>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </section>

</template>

<style scoped></style>