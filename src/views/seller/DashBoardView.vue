<script setup>

import { ref } from 'vue';

const statisticses = ref([
    {
        title: '오늘 판매 티켓',
        content: '128장'
    },
    {
        title: '오늘 매출',
        content: '1,280,000원'
    },
    {
        title: '이번달 매출',
        content: '24,000,000원'
    },
    {
        title: '진행 중인 공연',
        content: '5개'
    },
    {
        title: '이번달 누적 판매 티켓 수',
        content: '200개'
    },
    {
        title: '이번달 취소 / 환불 수',
        content: '200개'
    }
])

</script>

<template>
    <div class="col py-3">
        <div>
            <h4 class="fw-bolder">통계</h4>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col-md-3" v-for="statistics in statisticses">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ statistics.title }}</h5>
                            <p class="card-text fs-4">{{ statistics.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div>
            <h4 class="fw-bolder text-center">진행 중인 공연</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">공연 이름</th>
                        <th scope="col">기간</th>
                        <th scope="col">장소</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>지킬 앤 하이드</td>
                        <td>2025/4/30 ~ 2025/7/30</td>
                        <td>세종문화회관</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>캣</td>
                        <td>2025/4/30 ~ 2025/7/30</td>
                        <td>세종문화회관</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>맘마미아</td>
                        <td>2025/4/30 ~ 2025/7/30</td>
                        <td>세종문화회관</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>