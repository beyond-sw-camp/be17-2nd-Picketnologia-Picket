<script setup>
import { ref } from 'vue'
import LoginNavBar from '@/components/LoginNavBar.vue'
import { RouterLink } from 'vue-router'

const tabs = ['뮤지컬', '콘서트', '전시/행사', '아동/가족', '연극']
const activeTab = ref('뮤지컬')

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const props = defineProps({
  isGenre: {
    type: Boolean,
    default: true
  }
})

</script>

<template>
  <!-- header start -->
  <div class="d-flex flex-column sticky-top bg-body border-bottom">
    <nav class="navbar">
      <div class="d-flex gap-2 justify-content-between w-100 container-lg  ">
        <div class="d-flex">
          <RouterLink to="/" class="navbar-brand fs-4"><strong class="text-primary">Pick</strong>et</RouterLink>
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
    <li class="nav-item" v-for="tab in tabs" :key="tab">
      <RouterLink class="nav-link text-black" :class="{ 'fw-bold': setActiveTab(tab) }"
        @click.prevent="setActiveTab(tab)">
        {{ tab }}</RouterLink>
    </li>
  </ul>
  <!-- tab end -->
</template>

<style scoped>
.nav-link.active {
  font-weight: bold;
  border-bottom: 2px solid black;
}
</style>
