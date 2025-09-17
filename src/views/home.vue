<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import productAPI from '@/api/product'
import genreAPI from '@/api/genre'

const ProductsTop5ByGenre = ref({})

const genres = ref([])
const selectedGenres = ref()
onMounted(async () => {
    const response = await genreAPI.getGenres()
    if (response.success) {
        genres.value = response.results.genres
        selectedGenres.value = genres.value[0]

        getTop5Products(selectedGenres.value.code)
        getTop5UpcommingProducts()
    }
})

const getTop5Products = async (code) => {
    const req = {
        genre: code
    }

    const response = await productAPI.getTop5ProductOrderBySalesCount(req);
    if (response.success) {
        ProductsTop5ByGenre.value = response.results
    }
}

const upcommingProducts = ref([])
const getTop5UpcommingProducts = async () => {
    const response = await productAPI.getTop5UpcommingProducts();
    if (response.success) {
        upcommingProducts.value = response.results
    }
}

/**
 * 장르별 랭킹 클릭 시 이벤트
 * @param genre 클릭한 장르 객체
 */
const onClickRankingOfGenre = (genre) => {
    selectedGenres.value = genre

    // 장르 별 랭킹 공연 10개 요청
    getTop5Products(selectedGenres.value.code)
}

</script>

<template>
    <div class="d-flex flex-column gap-5">
        <!-- carousel start -->
        <div id="homeCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class=" carousel-inner">
                <div class=" carousel-item active">
                    <img src="@/assets/image/slide01.png" class="d-block w-100" style="height: 600px;">
                </div>
                <div class="carousel-item">
                    <img src="@/assets/image/slide02.png" class="d-block w-100" style="height: 600px;">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <!-- Carousel end -->

        <!-- product list start -->
        <section class="d-flex flex-column gap-5 container-lg">
            <h3 class="fs-2 align-self-center fw-semibold">장르별 랭킹</h3>
            <div class="d-flex gap-2 justify-content-center">
                <button class="btn btn-outline-light border-2 border text-black rounded-5 fw-bold"
                    :class="genre.idx === selectedGenres.idx ? 'bg-dark text-white' : ''" v-for="genre in genres"
                    @click="onClickRankingOfGenre(genre)">
                    {{ genre.name }}
                </button>
            </div>

            <div class="row row-cols-5">
                <div class="col mb-4 position-relative " v-for="(product, index) in ProductsTop5ByGenre">
                    <span
                        class="position-absolute translate-middle badge rounded-pill bg-danger d-flex align-items-center justify-content-center z-3"
                        style="width: 45px; height: 45px;">
                        <span class="">{{ index + 1 }}위</span>

                    </span>
                    <RouterLink :to="`/products/${product.idx}`" class="text-decoration-none text-dark">
                        <div class="card h-100 border-0">
                            <img :src="product.posterUrl" class="card-img-top rounded-3"
                                style="width: 100%; height: 300px;">
                            <div class="card-body d-flex flex-column justify-content-between gap-1 px-1">
                                <h5 class="card-title fw-bold mb-0">{{ product.name }}</h5>

                                <h6 class="card-subtitle">{{ product.venueName }}</h6>
                                <p class="card-text text-body-tertiary">
                                    {{ product.startDate }} ~ {{ product.endDate }}
                                </p>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </section>
        <!-- product list end -->

        <!-- 오픈 예정 -->
        <section class="d-flex flex-column gap-2 container-lg">
            <h3 class="fs-2 align-self-center fw-semibold">오픈 예정222222222222</h3>
            <div class="row row-cols-5">
                <div class=" col mb-4" v-for="product, index in upcommingProducts" :key="index">
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
        </section>
    </div>

</template>

<style scoped></style>