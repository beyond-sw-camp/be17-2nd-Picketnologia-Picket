<script setup>
import { ref } from 'vue'

const startDate = ref('')
const endDate = ref('')

const bookings = ref([
  {
    date: '2025-07-08',
    number: 'Y1234567890',
    title: '뮤지컬 <강철의 심장>',
    time: '2025-08-01 19:00',
    seat: 'R석 A열 12번',
    quantity: '2매'
  },
  {
    date: '2025-07-08',
    number: 'Y1234567890',
    title: '뮤지컬 <캣>',
    time: '2025-08-01 19:00',
    seat: 'R석 A열 12번',
    quantity: '2매'
  },
  {
    date: '2025-07-08',
    number: 'Y1234567890',
    title: '콘서트 <제임스 블레이크 내한공연>',
    time: '2025-08-01 19:00',
    seat: 'R석 A열 12번',
    quantity: '2매'
  },
  {
    date: '2025-07-08',
    number: 'Y1234567890',
    title: '뮤지컬 <지킬 앤 하이드>',
    time: '2025-08-01 19:00',
    seat: 'R석 A열 12번',
    quantity: '2매'
  }
])

const filterBookings = () => {
  // 추후 날짜 필터링 로직 구현 가능
  console.log(`조회: ${startDate.value} ~ ${endDate.value}`)
}
</script>

<template>
  <div class="container my-5">
    <div class="row">
      <!-- 사이드바 -->
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
            <a href="#" class="btn btn-outline-secondary btn-sm w-100 mb-3">회원정보 수정</a>

            <div class="list-group">
              <router-link to="/mypage1" class="list-group-item list-group-item-action active">예매 내역</router-link>
              <router-link to="/mypage2" class="list-group-item list-group-item-action ">환불 내역</router-link>
              <router-link to="/mypage3" class="list-group-item list-group-item-action">리뷰 및 후기</router-link>
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

      <!-- 예매 내역 -->
      <main class="col-md-9">
        <h4 class="mb-4">예매 내역 확인</h4>

        <div class="mb-3 d-flex align-items-center gap-2">
          <span>조회기간:</span>
          <input type="date" v-model="startDate" class="form-control form-control-sm" style="max-width: 150px;" />
          <span>~</span>
          <input type="date" v-model="endDate" class="form-control form-control-sm" style="max-width: 150px;" />
          <button class="btn btn-outline-primary btn-sm" @click="filterBookings">조회</button>
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
    </div>
  </div>
</template>

<style scoped>
/* 필요 시 스타일 확장 가능 */
</style>
