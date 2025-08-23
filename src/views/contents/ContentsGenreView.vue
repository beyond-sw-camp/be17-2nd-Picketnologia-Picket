<script setup>
import { useRoute } from 'vue-router';
import contentsApi from '@/api/contents';
import { ref, reactive, watch, onMounted } from 'vue';
import RegionSeletor from '@/components/RegionSeletor.vue';

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

const upcomingPerformances = ref([
    {
        idx: 1,
        name: '지킬 앤 하이드',
        posterUrl: '',
        openDate: '2025.6.15',
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

const getContents = async (req) => {
    const response = await contentsApi.getContentsByGenre(req)
    if (response.success) {
        products.value = response.results.products
        upcomingPerformances.value = response.results.upcomingPerformances
    } else {
        products.value = []
    }
}

watch(() => route.params.code, async (newValue) => {
    const req = {
        genre: newValue,
    }

    await getContents(req)
})

onMounted(async () => {
    const req = {
        genre: route.params.code,
    }

    await getContents(req)
})
</script>

<template>
    <div class="d-flex flex-column gap-5 container-lg">
        <!-- 카드 -->

        <!-- 할인 -->
        <section class="d-flex flex-column gap-2">
            <h3 class="fs-2 align-self-center fw-semibold">지금 할인중!</h3>
            <div class="text-center fs-2">
                <p class="text-body-secondary">준비 중 입니다...</p>
            </div>
        </section>

        <!-- 오픈 예정 -->
        <section class="d-flex flex-column gap-2 ">
            <h3 class="fs-2 align-self-center fw-semibold">오픈 예정</h3>
            <div class="row row-cols-5">
                <div class=" col mb-4" v-for="product, index in upcomingPerformances" :key="index">
                    <RouterLink :to="`/products/${product.idx}`" class="text-decoration-none text-dark">
                        <div class="card h-100 border-0">
                            <img :src="product.posterUrl" class="card-img-top rounded-3"
                                style="width: 100%; height: 300px;">
                            <div class="card-body d-flex flex-column gap-1 px-1">
                                <h5 class="card-title fw-bold">{{ product.name }}</h5>
                                <h6 class="card-subtitle fw-bold text-primary">
                                    {{ product.openDate }}
                                </h6>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <RouterLink :to="`/contents/genre/${route.params.code}`"
                class="text-decoration-none text-dark text-center border-2 border rounded-3 p-3 fw-semibold">
                <span>오픈 예정 공연 전체보기</span>
            </RouterLink>
        </section>

        <!-- 둘러보기 -->
        <section class="d-flex flex-column gap-2 ">
            <h3 class="fs-2 align-self-center fw-semibold">공연 둘러보기</h3>
            <div v-if="products.length === 0" class="text-center h1">
                <p class="text-body-secondary">해당하는 공연이 없습니다.</p>
            </div>
            <div class="d-flex gap-2 sticky-top bg-white p-2" style="top: 70px;">
                <!-- 지역 선택 -->
                <RegionSeletor />
                <select class="form-select w-auto" v-model="fetchData.selectedSorted">
                    <option v-for="option in sortedOtpions" :key="option.value" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </div>
            <div class="row row-cols-5">
                <div class=" col mb-4" v-for="product, index in products">
                    <RouterLink :to="`/products/${product.idx}`" class="text-decoration-none text-dark">
                        <div class="card h-100 border-0">
                            <img :src="product.posterUrl" class="card-img-top rounded-3"
                                style="width: 100%; height: 300px;">
                            <div class="card-body d-flex flex-column justify-content-between gap-1 px-1">
                                <h5 class="card-title fw-bold">{{ product.name }}</h5>
                                <h6 class="card-subtitle">{{ product.venueName }}</h6>
                                <p class="card-text text-body-tertiary">{{ product.startDate }} ~ {{ product.endDate }}
                                </p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </section>
    </div>




</template>

<style scoped></style>