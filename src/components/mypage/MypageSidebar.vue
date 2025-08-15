<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ref } from 'vue';
const route = useRoute();

const navs = ref([
    {
        name: '예매 내역',
        to: '/mypage/reserve'
    },
    {
        name: '환불 내역',
        to: '/mypage/refund'
    },
    {
        name: '리뷰 및 후기',
        to: '/mypage/review'
    }
])

const isActive = (to) => {
    if (route.path == to)
        return true

    return false
}

</script>

<template>
    <aside class="col-md-3 mb-4">
        <div class="card">
            <div class="card-header">
                <strong>MY티켓 | MY PAGE</strong>
            </div>
            <div class="card-body">
                <p class="mb-1"><strong>강설님은 일반회원입니다.</strong></p>
                <ul class="list-unstyled small mb-3">
                    <li>포인트: 0원</li>
                    <li>상품권: 0원</li>
                    <li>예치금: 0원</li>
                </ul>
                <RouterLink to="/mypage/profile" class="btn btn-outline-secondary btn-sm w-100 mb-3">회원정보 수정
                </RouterLink>

                <div class="list-group">
                    <router-link v-for="nav in navs" :to="nav.to" class="list-group-item list-group-item-action"
                        :class="{ 'active': isActive(nav.to) }">
                        {{ nav.name }}
                    </router-link>
                </div>
            </div>
        </div>

        <div class="card mt-4 text-center">
            <div class="card-body">
                <i class="fa fa-phone fa-2x mb-2"></i>
                <h5>고객센터</h5>
                <p class="mb-1 fs-5 fw-bold">1544-6399</p>
                <small>
                    평일 09:00 ~ 18:00<br />
                    토요일 09:00 ~ 17:00<br />
                    일요일/공휴일 휴무
                </small>
            </div>
        </div>
    </aside>
</template>

<style scoped></style>