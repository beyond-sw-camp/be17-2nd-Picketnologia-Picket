<script setup>
import { onMounted, ref } from 'vue'
import LoginNavBar from '@/components/LoginNavBar.vue'
import { RouterLink, useRoute } from 'vue-router'

import genreApi from '@/api/genre'
import Logo from '@/components/Logo.vue'

const route = useRoute()

const genres = ref([
  {
    name: '뮤지컬',
    code: 'musical'
  },
  {
    name: '콘서트',
    code: 'concert'
  },
  {
    name: '전시/행사',
    code: 'exhibition'
  },
  {
    name: '아동/가족',
    code: 'family'
  },
  {
    name: '연극',
    code: 'play'
  }
])

const setActiveTab = (genre) => {
  return genre.code === route.params.code
}

const props = defineProps({
  isGenre: {
    type: Boolean,
    default: true
  }
})

onMounted(async () => {
  const response = await genreApi.getGenres()
  if (response.success) {
    genres.value = response.data
  }
})


</script>

<template>
  <!-- header start -->
  <div class="d-flex flex-column sticky-top bg-body border-bottom" style="height: 70px;">
    <nav class="navbar">
      <div class="d-flex gap-2 justify-content-between w-100 container-lg  ">
        <div class="d-flex">
          <div class="navbar-brand">
            <Logo />
          </div>
          <div class="position-relative align-self-end" style="max-width: 400px; width: 100%;">
            <input type="text" class="form-control pe-5" placeholder="공연을 검색하세요.">
            <img src="@/assets/icons/search.png" alt="search icon"
              class="position-absolute top-50 end-0 translate-middle-y me-3 text-muted">
            </img>
          </div>
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
