<script setup>
import { useRoute } from 'vue-router';
import contentsAPI from '@/api/contents';
import productAPI from '@/api/product'
import { ref, watch, onMounted } from 'vue';
import SortOptionSelector from '@/components/selector/SortOptionSelector.vue';
import Observer from '@/components/Observer.vue';

const route = useRoute();
const sort = ref('');
const products = ref([])
const isMounted = ref(false)

const pageInfo = ref({
    currentPage: null,
    totalPage: null
});

const incCurrentPage = () => {
    pageInfo.value.currentPage = pageInfo.value.currentPage + 1;
    return pageInfo.value.currentPage
}

const upcomingPerformances = ref([])

const getContents = async (req) => {
    const response = await contentsAPI.getContentsByGenre(req)
    if (response.success) {
        products.value = response.results.products

        pageInfo.value.currentPage = response.results.currentPage
        pageInfo.value.totalPage = response.results.totalPage

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
    isMounted.value = true
})

const loadMore = async () => {
    if (pageInfo.value.currentPage >= pageInfo.value.totalPage) return;

    const req = {
        genre: route.params.code,
        sort: sort.value,
        page: incCurrentPage()
    }

    const response = await productAPI.getProducts(req)
    if (response.success) {
        products.value.push(...response.results.products);
        pageInfo.value.currentPage = response.results.currentPage;
    }
}

const handleSortChange = async (val) => {
    sort.value = val;

    if (isMounted.value) {
        const req = {
            genre: route.params.code,
            sort: val,
            page: 1
        };

        const response = await productAPI.getProducts(req);

        if (response.success) {
            products.value = response.results.products

            pageInfo.value.currentPage = response.results.currentPage
            pageInfo.value.totalPage = response.results.totalPage

        } else {
            products.value = [];
        }
    }
};

const upcommingMessage = () => {
    alert("죄송합니다. 아직 기능을 준비중입니다.")
}

</script>

<template>
    <div class="d-flex flex-column gap-5 container-lg">
        <!-- 카드 -->

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
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="card-title fw-bold mb-0">{{ product.name }}</h5>


                                </div>
                                <h6 class="card-subtitle fw-bold text-primary">
                                    {{ product.openDate }}
                                </h6>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <RouterLink :to="`/contents/genre/${route.params.code}`"
                class="text-decoration-none text-dark text-center border-2 border rounded-3 p-3 fw-semibold"
                @click="upcommingMessage">
                <span>오픈 예정 공연 전체보기</span>
            </RouterLink>
        </section>

        <!-- 둘러보기 -->
        <section class="d-flex flex-column gap-2 ">
            <h3 class="fs-2 align-self-center fw-semibold">공연 둘러보기</h3>
            <div class="text-muted small">
            </div>
            <div v-if="products.length === 0" class="text-center h1">
                <p class="text-body-secondary">해당하는 공연이 없습니다.</p>
            </div>
            <div class="sticky-top bg-white py-2" style="top: 70px;">
                <!-- 정렬 옵션 선택 -->
                <SortOptionSelector @changeSort="handleSortChange" />
            </div>
            <div class="row row-cols-5">
                <!-- ⭐ 수정 4: 고유한 key 추가로 Vue의 렌더링 최적화 방지 -->
                <div class="col mb-4" v-for="(product, index) in products" :key="`${product.idx}-${sort}`">
                    <RouterLink :to="`/products/${product.idx}`" class="text-decoration-none text-dark">
                        <div class="card h-100 border-0">
                            <img :src="product.posterUrl" class="card-img-top rounded-3"
                                style="width: 100%; height: 300px;">
                            <div class="card-body d-flex flex-column justify-content-between gap-1 px-1">

                                <!-- 이름 + 배지 한 줄 -->
                                <div class="d-flex align-items-center gap-2">
                                    <h5 class="card-title fw-bold mb-0">{{ product.name }}</h5>

                                    <span v-if="sort === 'REVIEW_COUNT' && product.reviewCount !== null"
                                        class="badge bg-secondary">
                                        리뷰 {{ product.reviewCount }}개
                                    </span>
                                    <span v-else-if="sort === 'REVIEW_RATING' && product.reviewRating !== null"
                                        class="badge bg-warning text-dark">
                                        ⭐ {{ product.reviewRating.toFixed(1) }}
                                    </span>
                                </div>

                                <!-- 장소, 일정 -->
                                <h6 class="card-subtitle">{{ product.venueName }}</h6>
                                <p class="card-text text-body-tertiary">
                                    {{ product.startDate }} ~ {{ product.endDate }}
                                </p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
                <Observer @show="loadMore" />
            </div>
        </section>
    </div>
</template>

<style scoped></style>