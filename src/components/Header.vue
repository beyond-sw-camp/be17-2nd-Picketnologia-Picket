<script setup>
import { onMounted, ref } from 'vue'
import LoginNavBar from '@/components/LoginNavBar.vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { reactive } from 'vue'
import genreApi from '@/api/genre'
import Logo from '@/components/Logo.vue'
import { useSearchStore } from '@/stores/useSearchStore'
import search from '@/api/search'

const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()
const genres = ref([])

const searchForm = reactive({
  name: ''
});

const searchName = (name) => {
  if (!name || !name.trim()) {
    alert('검색어를 입력해주세요.');
    return;
  }
  router.push({ name: 'search', query: { q: name } });
}


const setActiveTab = (genre) => {
  return genre.code === route.params.code
}

const props = defineProps({
  isGenre: {
    type: Boolean,
    default: true
  },
  onlyLogo: {
    type: Boolean,
    default: false
  },
  isSellerView: {
    type: Boolean,
    default: false
  },
  sellerTapName: {
    type: String,
    default: ''
  }
})

onMounted(async () => {
  const response = await genreApi.getGenres()
  if (response.success) {
    genres.value = response.results.genres
  }
})


</script>

<template>
  <!-- header start -->
  <div class="d-flex flex-column sticky-top bg-body border-bottom" style="height: 70px;">
    <nav class="navbar">
      <div class="d-flex gap-2 justify-content-between w-100" :class="props.onlyLogo ? '' : 'container-lg'">
        <div class="d-flex">
          <div class="navbar-brand">
            <Logo />
          </div>
          <div class="position-relative align-self-end" style="max-width: 400px; width: 100%;" v-show="!props.onlyLogo">
            <input type="text" class="form-control pe-5" @keyup.enter="searchName(searchForm.name)"
              placeholder=" 공연을검색하세요." v-model="searchForm.name">
            <img src="@/assets/icons/search.png" alt="search icon"
              class="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
              @click="searchName(searchForm.name)">
            </img>
          </div>
        </div>
        <div v-if="props.isSellerView" class="align-self-end fs-4 fw-bold">
          {{ props.sellerTapName }}
        </div>
        <LoginNavBar class=" fs-6" />
      </div>
    </nav>
  </div>
  <!-- header end -->

  <!-- tab start -->
  <ul class="nav fs-6 fw-medium border p-2 bg-light justify-content-center " v-if="props.isGenre">
    <li class="nav-item" v-for="genre in genres" :key="genre.code">
      <RouterLink class="nav-link " :class="[setActiveTab(genre) ? 'text-primary fw-bold' : 'text-black']"
        :to="`/contents/genre/${genre.code}`">
        {{ genre.name }}
      </RouterLink>
    </li>
  </ul>
  <!-- tab end -->
</template>

<style scoped></style>
