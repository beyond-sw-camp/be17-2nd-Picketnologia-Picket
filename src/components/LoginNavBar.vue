<script setup>
import { useUserStore } from '@/stores/useUserStore';
import { ref } from 'vue';

const userStore = useUserStore();

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

</script>

<template>
    <RouterLink class="link-underline-light link-dark" to="/login" v-if="!userStore.isLogin">로그인</RouterLink>
    <div class="dropdown" v-else>
        <button class="btn dropdown-toggle border-0 btn-lg fw-bold" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            {{ userStore.nickname }}
        </button>
        <ul class="dropdown-menu">
            <li>
                <RouterLink class="link-underline-light link-dark dropdown-item" to="/mypage">마이페이지</RouterLink>
            </li>
            <li>
                <RouterLink class="link-underline-light link-dark dropdown-item" to="/seller">판매자 관리 페이지</RouterLink>
            </li>
            <li>
                <button class="link-underline-light link-dark dropdown-item" @click="userStore.logout()">로그아웃</button>
            </li>
        </ul>
    </div>

</template>

<style scoped></style>