<script setup>
import reservation from '@/api/reservation';
import { ref } from 'vue';

const reservations = ref([]);
const startDate = ref('');
const endDate = ref('');

const myPageReservation = async () => {
    const dateInfo = {
        startDate: startDate.value,
        endDate: endDate.value
    }
    try {
        const response = await reservation.reservationIdxList(dateInfo);

        reservations.value = response.results.map(reservation => ({
            ...reservation,
            isExpanded: false

        }));


        if (reservations.value.length == 0) {
            alert('해당기간에 예매한적이  없습니다.');
        }
    } catch (error) {
        console.error('예매조회를 불러오는 데 실패했습니다.', error);
    }
}
</script>

<template>
    <main class="col-md-9">
        <h4 class="mb-4">예매 내역 확인</h4>

        <div class="mb-3 d-flex align-items-center gap-2">
            <span>조회기간:</span>
            <input type="date" v-model="startDate" class="form-control form-control-sm" style="max-width: 150px;" />
            <span>~</span>
            <input type="date" v-model="endDate" class="form-control form-control-sm" style="max-width: 150px;" />
            <button class="btn btn-outline-primary btn-sm" @click="myPageReservation">조회</button>
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
                    <tr v-for="(reservation, index) in reservations" :key="index">
                        <td><small>{{ reservation.paidAt }}</small></td>
                        <td><small>{{ reservation.paymentIdx }}</small></td>
                        <td><small>{{ reservation.productName }}</small></td>
                        <td><small>{{ reservation.paidAt }}</small></td>
                        <td><small>{{ reservation.paidAt }}</small></td>
                        <td><small>{{ reservation.paidAt }}</small></td>
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