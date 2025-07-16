<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const navs = ref([
    {
        name: '대시보드',
        to: '/seller'
    },
    {
        name: '진행 중인 공연',
        to: '/seller/products/on-sale'
    },
    {
        name: '종료된 공연',
        to: '/seller/products/sold-out'
    },
    {
        name: '예매 조회',
        to: '/seller/reservation'
    },
    {
        name: '환불/취소',
        to: '/seller/refund'
    },
    {
        name: '리뷰',
        to: '/seller/review'
    },
    {
        name: '문의',
        to: '/seller/qna'
    },
    {
        name: '매출 통계',
        to: '/seller/sale-statistics'
    }
])

const isActive = (to) => {
    if (route.path == to)
        return true

    return false
}

</script>

<template>
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 bg-light">
        <div class="d-flex flex-column align-items-center px-3 pt-2 min-vh-100">
            <h5 class="mb-3">판매자 메뉴</h5>
            <ul class="nav nav-pills flex-column mb-auto w-100 gap-3">
                <li class="nav-item" v-for="nav in navs">
                    <RouterLink :to="nav.to" class="nav-link" :class="[isActive(nav.to) ? 'active' : 'link-dark']">{{
                        nav.name }}</RouterLink>
                </li>
            </ul>
            <button class="btn fw-bolder fs-5 link-danger mb-3">로그 아웃</button>

        </div>
    </div>
</template>

<style scoped></style>