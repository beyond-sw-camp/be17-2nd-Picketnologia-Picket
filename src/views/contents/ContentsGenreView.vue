<script setup>
import { useRoute } from 'vue-router';
import contentsAPI from '@/api/contents';
import productAPI from '@/api/product'
import { ref, watch, onMounted } from 'vue';
import RegionSelector from '@/components/selector/RegionSelector.vue';
import SortOptionSelector from '@/components/selector/SortOptionSelector.vue';
import Observer from '@/components/Observer.vue';

const route = useRoute();
const sort = ref('');
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

const pageInfo = ref({
    currentPage: null,
    totalPage: null
});

const incCurrentPage = () => {
    pageInfo.value.currentPage = pageInfo.value.currentPage + 1;
    return pageInfo.value.currentPage
}

const upcomingPerformances = ref([
    {
        idx: 1,
        name: '지킬 앤 하이드',
        posterUrl: '',
        openDate: '2025.6.15',
    }
])

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
        sort: sort.value,  // 라우트 변경시에도 정렬 옵션 유지
    }

    await getContents(req)
})

onMounted(async () => {
    const req = {
        genre: route.params.code,
        sort: sort.value,  // 마운트시에도 정렬 옵션 포함
    }

    await getContents(req)
})

const loadMore = async () => {
    if (pageInfo.value.currentPage >= pageInfo.value.totalPage) return;

    const req = {
        genre: route.params.code,
        sort: sort.value,   // ✅ 정렬 기준 유지
        page: incCurrentPage()
    }

    const response = await productAPI.getProducts(req)
    if (response.success) {
        products.value.push(...response.results.products);
        pageInfo.value.currentPage = response.results.currentPage;
    }
}

// 🔥 핵심 수정: 정렬 처리 함수 개선
const handleSortChange = async (val) => {
    console.log('정렬 변경:', val); // 디버깅용
    sort.value = val;

    const req = {
        genre: route.params.code,
        sort: val,
        page: 1
    };

    console.log('정렬 요청:', req); // 디버깅용

    // ⭐ 올바른 API 사용: searchAndSort
    const response = await productAPI.searchAndSort(req);

    console.log('정렬 응답:', response); // 디버깅용
    console.log('응답 전체 구조:', JSON.stringify(response, null, 2)); // 구조 확인

    // 🔍 상세 디버깅 - 어디에 products가 있는지 찾기
    console.log('response.results:', response.results);
    console.log('response.products:', response.products);
    console.log('response.data:', response.data);
    console.log('응답의 모든 키들:', Object.keys(response));
    if (response.results) {
        console.log('results의 모든 키들:', Object.keys(response.results));
    }

    if (response.success) {
        // ⭐ 핵심 수정: response.results가 바로 상품 배열임!
        const productsData = response.results;

        if (Array.isArray(productsData)) {
            products.value = [...productsData];
            console.log('정렬 성공 - 상품 수:', products.value.length);

            // 정렬 후에는 페이지 정보 초기화 (searchAndSort API에는 페이지 정보가 없음)
            pageInfo.value = {
                currentPage: 1,
                totalPage: 1
            };
        } else {
            console.error('results가 배열이 아닙니다:', productsData);
            products.value = [];
        }

        console.log('정렬 후 products 배열:', products.value);
    } else {
        console.error('정렬 요청 실패:', response);
        console.log('기존 상품 수 유지:', products.value.length);
    }
};

// nextTick 임포트 제거 (더 이상 사용하지 않음)
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
                class="text-decoration-none text-dark text-center border-2 border rounded-3 p-3 fw-semibold">
                <span>오픈 예정 공연 전체보기</span>
            </RouterLink>
        </section>

        <!-- 둘러보기 -->
        <section class="d-flex flex-column gap-2 ">
            <h3 class="fs-2 align-self-center fw-semibold">공연 둘러보기</h3>
            <!-- 🔥 디버깅용: 현재 정렬 상태와 상품 수 표시 -->
            <div class="text-muted small">
            </div>
            <div v-if="products.length === 0" class="text-center h1">
                <p class="text-body-secondary">해당하는 공연이 없습니다.</p>
            </div>
            <div class="d-flex gap-2 sticky-top bg-white p-2" style="top: 70px;">
                <!-- 지역 선택 -->
                <RegionSelector />

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

                                    <span v-if="sort === 'review' && product.reviewCount !== null"
                                        class="badge bg-secondary">
                                        리뷰 {{ product.reviewCount }}개
                                    </span>
                                    <span v-else-if="sort === 'rating' && product.reviewRating !== null"
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