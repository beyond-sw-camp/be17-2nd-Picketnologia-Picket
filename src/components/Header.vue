<script setup>
import { ref } from 'vue'

const tabs = ['뮤지컬', '콘서트', '전시/행사', '아동/가족', '연극']
const activeTab = ref('뮤지컬')

const setActiveTab = (tab) => {
  activeTab.value = tab
}
</script>

<template>
  <!-- header start -->
  <div class="d-flex flex-column sticky-top">
    <nav class="navbar bg-body p-2 container-lg">
      <div class="d-flex gap-2 justify-content-between w-100">
        <div class="d-flex w-50">
          <RouterLink to="/" class="navbar-brand">Picket</RouterLink>
          <form class="d-flex w-100" role="search">
            <input class="form-control me-2 border border-secondary" type="search" placeholder="공연을 검색하세요."
              aria-label="Search" />
            <button class="btn btn-light text-nowrap border border-secondary" type="submit">검색</button>
          </form>
        </div>
        <div class="d-flex gap-2 align-items-center">
          <RouterLink class="link-underline-light link-dark" to="/login">로그인</RouterLink>
          <RouterLink class="link-underline-light link-dark" to="/mypage1">마이페이지</RouterLink>
          <RouterLink class="link-underline-light link-dark" to="/seller">판매자 관리 페이지</RouterLink>
        </div>
      </div>
    </nav>

    <!-- tab start -->
    <ul class="nav nav-underline justify-content-center fs-4 border-bottom border-top bg-body-tertiary">
      <li class="nav-item" v-for="tab in tabs" :key="tab">
        <a
          class="nav-link text-black"
          :class="{ active: activeTab === tab }"
          href="#"
          @click.prevent="setActiveTab(tab)"
        >
          {{ tab }}
        </a>
      </li>
    </ul>
    <!-- tab end -->
  </div>
  <!-- header end -->
</template>

<style scoped>
.nav-link.active {
  font-weight: bold;
  border-bottom: 2px solid black;
}
</style>
