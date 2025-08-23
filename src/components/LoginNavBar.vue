<script setup>
import { useUserStore } from '@/stores/useUserStore';
import { ref } from 'vue';
import api from '@/api/member';

const userStore = useUserStore();

const isDropdownOpen = ref(false);

// const toggleDropdown = () => {
//     isDropdownOpen.value = !isDropdownOpen.value;
// };

const logout = async () => {
    const response = await api.logout();

    if (response.success) {
        userStore.logout();
    }
};

</script>

<template>

    <RouterLink class="link-underline-light link-dark d-flex" to="/login" v-if="!userStore.isLogin">
        <spann>
            로그인
        </spann>
        <img src="@/assets/icons/login.png" alt="login icon"></img>
    </RouterLink>
    <div class="dropdown" v-else>
        <button class="btn dropdown-toggle border-0 btn-lg fw-bold" type="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            {{ userStore.nickname }}
        </button>
        <ul class="dropdown-menu">
            <li>
                <RouterLink class="link-underline-light link-dark dropdown-item d-flex gap-1" to="/mypage">
                    <img src="@/assets/icons/account.png" alt="mypage icon"></img>
                    <span>마이페이지</span>
                </RouterLink>
            </li>
            <li v-if="userStore.isSeller">
                <RouterLink class="link-underline-light link-dark dropdown-item d-flex gap-1" to="/seller">
                    <img src="@/assets/icons/store.png" alt="seller icon"></img>
                    <span>판매자 관리 페이지</span>
                </RouterLink>
            </li>
            <li>
                <button class="link-underline-light link-dark dropdown-item d-flex gap-1" @click="logout">
                    <img src="@/assets/icons/logout.png" alt="logout icon"></img>
                    <span>
                        로그아웃
                    </span>
                </button>
            </li>
        </ul>
    </div>

</template>

<style scoped></style>