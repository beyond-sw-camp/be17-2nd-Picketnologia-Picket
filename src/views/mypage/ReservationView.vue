<script setup>
import { useUserStore } from '@/stores/useUserStore';
import review from '@/api/review';

const userStore = useUserStore();
const ad = review.userIdxList

</script>

<template>
    <main class="col-md-9">
        <h4 class="mb-4">예매 내역 확인</h4>

        <div class="mb-3 d-flex align-items-center gap-2">
            <span>조회기간:</span>
            <input type="date" v-model="startDate" class="form-control form-control-sm" style="max-width: 150px;" />
            <span>~</span>
            <input type="date" v-model="endDate" class="form-control form-control-sm" style="max-width: 150px;" />
            <button class="btn btn-outline-primary btn-sm" @click=ad>조회</button>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered text-center">
                <thead class="table-light">
                    <tr>
                        <th>예매일</th>
                        <th>예매번호</th>
                        <th>공연명</th>
                        <th>관람일시</th>
                        <th>좌석정보</th>
                        <th>예매수량</th>
                        <th>예매확인</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in bookings" :key="index">
                        <td><small>{{ item.date }}</small></td>
                        <td><small>{{ item.number }}</small></td>
                        <td><small v-html="item.title"></small></td>
                        <td><small>{{ item.time }}</small></td>
                        <td><small>{{ item.seat }}</small></td>
                        <td><small>{{ item.quantity }}</small></td>
                        <td><button class="btn btn-outline-dark btn-sm">예매확인</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="alert alert-light mt-3 small">
            <strong>※ 유의사항</strong><br />
            - 취소 시 예매수수료는 예매일 당일 밤 12시 이전까지 환불됩니다.<br />
            - 패키지 구성 상품별로 회차와 좌석지정을 해야 공연 관람이 가능합니다.
        </div>
    </main>
</template>

<style scoped></style>