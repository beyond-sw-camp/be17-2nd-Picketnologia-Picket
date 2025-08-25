<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const emit = defineEmits(['tabChange'])

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
        name: '신규 상품 등록',
        to: '/seller/products/creation'
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

const isActive = (nav) => {
    if (route.path == nav.to) {
        console.log("Active tab changed to:", nav.name)
        return true
    }

    return false
}

// 클릭 시 emit 호출
const handleClick = (nav) => {
    emit('tabChange', nav.name)
}

onMounted(() => {
    // 초기 탭 설정
    emit('tabChange', navs.value[0].name)
})
</script>

<template>
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 border-end position-fixed" style=" width: 200px;">
        <div class="d-flex flex-column align-items-center px-3 pt-2 min-vh-100">
            <ul class="nav nav-pills flex-column mb-auto w-100 gap-3">
                <li class="nav-item" v-for="nav in navs">
                    <RouterLink :to="nav.to" class="nav-link" @click="handleClick(nav)"
                        :class="[isActive(nav) ? 'active' : 'link-dark']">
                        {{ nav.name }}
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>