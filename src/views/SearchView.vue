<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import searchApi from '@/api/search';
import { useSearchStore } from '@/stores/useSearchStore';

const route = useRoute();
const searchStore = useSearchStore();
const products = ref([]);
const searchQuery = ref(route.query.q || '');

const performSearch = async (query) => {
  if (!query) {
    products.value = [];
    return;
  }
  try {
    const data = await searchApi.naemSearch(query);
    if (data) {
      products.value = data;

      searchStore.setSearchResults(data, query);
    } else {
      products.value = [];
    }
  } catch (error) {
    console.error('Search error:', error);
    products.value = [];
  }
};

onMounted(() => {
  performSearch(searchQuery.value);
});

watch(
  () => route.query.q,
  (newQuery) => {
    searchQuery.value = newQuery;
    performSearch(newQuery);
  }
);
</script>

<template>
  <section class="d-flex flex-column gap-2 container-lg mt-4">
    <h3 v-if="searchQuery" class="fs-2 align-self-center fw-semibold">
      '{{ searchQuery }}'에 대한 검색 결과
    </h3>
    <h3 v-else class="fs-2 align-self-center fw-semibold">
      검색어를 입력해주세요.
    </h3>
    <div v-if="products.length > 0" class="row row-cols-5">
      <div class="col mb-4" v-for="product in products" :key="product.idx">
        <RouterLink :to="`/products/${product.idx}`" class="text-decoration-none text-dark">
          <div class="card h-100">
            <img :src="product.posterUrl" class="card-img-top" style="width: 100%; height: 400px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">{{ product.title }}</h5>
              <h6 class="card-subtitle mb-2">{{ product.venueName }}</h6>
              <span class="card-text text-dark">{{ product.price }}</span>
              <p class="card-text text-body-secondary">{{ product.startDate }} ~ {{ product.endDate }}</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
    <div v-else-if="searchQuery" class="text-center mt-5">
      <p>검색 결과가 없습니다.</p>
    </div>
  </section>
</template>

<style scoped></style>
