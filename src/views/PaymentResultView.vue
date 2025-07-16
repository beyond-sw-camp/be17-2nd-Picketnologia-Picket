<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
  <div class="container my-5 p-4 bg-white rounded shadow-sm">
    <div class="text-center pb-3 mb-4 border-bottom">
      <h2 class="text-success fw-bold mb-2">결제가 정상적으로 완료되었습니다.</h2>
      <p class="text-secondary">예매 상세내역은 마이페이지 &gt; MY공연 &gt; 예매확인/취소에서 확인하실 수 있습니다.</p>
    </div>

    <div class="row">
      <!-- 예매정보 -->
      <div class="col-md-7">
        <div class="mb-4">
          <h5 class="section-title-underline pb-1 mb-3">예매정보</h5>
          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-dark">예매 번호</span>
            <span>
              <span>Y1313533398</span>
            </span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-dark">공연명</span>
            <span>연극 &lt;페리 (A Mirror)&gt;</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-dark">공연장</span>
            <span>충무아트센터</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-dark">관람일시</span>
            <span>2025.07.12 (토) [2회] 19시 00분</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-dark">좌석</span>
            <span>R석 1층 X열 007번</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-dark">수령방법</span>
            <span>현장수령</span>
          </div>
        </div>
      </div>

      <!-- 결제정보 -->
      <div class="col-md-5 d-flex flex-column">
        <div class="flex-grow-1 mb-4">
          <h5 class="section-title-underline pb-1 mb-3">결제정보</h5>
          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-dark">티켓금액</span>
            <span>66,000원</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-dark">예매수수료</span>
            <span>1,000원</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-dark">배송료</span>
            <span>0원</span>
          </div>
          <div class="d-flex justify-content-between mb-2 fw-bold text-primary">
            <span>(+)금액</span>
            <span>67,000원</span>
          </div>
          <hr class="my-3">
          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-dark">할인금액</span>
            <span>0원</span>
          </div>
          <div class="d-flex justify-content-between mb-2 fw-bold text-danger">
            <span>(-)금액</span>
            <span>0원</span>
          </div>
          <hr class="my-3">


          <div class="d-flex justify-content-between mb-2">
            <span class="fw-bold text-dark fs-6">결제수단</span>
            <span class="fs-6">무통장입금</span>

            <!-- 무통장 입금 정보 -->
            <div class="d-flex justify-content-between mb-2">
              <span class="fw-bold text-dark fs-6">입금계좌/은행</span>
              <span class="fs-6">69500201221127 / 국민은행</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="fw-bold text-dark fs-6">입금금액/마감</span>
              <span class="fs-6">67,000원 / 2025-07-09 23:59:59</span>
            </div>

            <div class="payment-total-box p-3 rounded text-center mt-3 bg-light">
              <div class="text-secondary fs-6 mb-1">총 결제금액</div>
              <div class="fs-2 fw-bold text-danger">67,000 <small class="fs-5">원</small></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 예매 후 유의사항 -->
      <div class="pt-4 mt-4 border-top">
        <h5 class="section-title-underline pb-1 mb-3">예매 후 유의사항</h5>
        <div class="d-flex justify-content-between mb-2 fs-6">
          <span class="fw-bold text-dark">취소가능일시</span>
          <span class="fw-bold text-danger">2025년 07월 11일 17:00 까지</span>
        </div>
        <div class="d-flex justify-content-between mb-2 fs-6">
          <span class="fw-bold text-dark">환불가능일시</span>
          <span class="fw-bold text-danger">2025년 07월 11일 17:00 까지</span>
        </div>
        <div class="d-flex justify-content-between mb-2 fs-6">
          <span class="fw-bold text-dark">환불수수료</span>
          <span class="fw-bold text-danger">결제금액의 10%</span>
        </div>
        <div class="d-flex justify-content-between mb-2 fs-6">
          <span class="fw-bold text-dark">환불방법</span>
          <span class="fw-bold text-danger">결제수단에 따라 환불</span>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="d-grid gap-2 col-3 mx-auto mt-5">
        <button class="btn btn-primary btn-lg" type="button">예매내역확인</button>
      </div>
    </div>
    </div>
</template>

<style scoped>
/* CSS 클래스에 대한 스타일을 정의하여 재사용성과 유지보수성을 높입니다. */
.section-title-underline {
  border-bottom: 2px solid #333;
}

.shadow-sm {
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
}
</style>
