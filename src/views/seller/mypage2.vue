<script setup>
// 필요시 script logic 추가 가능
import Header from '@/components/Header.vue';
</script>

<template>
  <Header></Header>
  <div class="container my-5">
    <div class="row">
      <!-- 왼쪽 사이드바 -->
      <aside class="col-md-3 mb-4">
        <div class="card">
          <div class="card-header --bs-body-color">
            <strong>MY티켓 | MY PAGE</strong>
          </div>
          <div class="card-body">
            <p class="mb-1"><strong>강설님은 일반회원입니다.</strong></p>
            <ul class="list-unstyled small mb-3">
              <li>포인트: 0원</li>
              <li>상품권: 0원</li>
              <li>예치금: 0원</li>
            </ul>
            <a href="/myaccount" class="btn btn-outline-secondary btn-sm w-100 mb-3">회원정보 수정</a>
            <div class="list-group">
              <router-link to="/mypage1" class="list-group-item list-group-item-action">예매 내역</router-link>
              <router-link to="/mypage2" class="list-group-item list-group-item-action active">환불 내역</router-link>
              <router-link to="/mypage3" class="list-group-item list-group-item-action">리뷰 및 후기</router-link>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-body text-center">
            <i class="fa fa-phone fa-2x mb-2"></i>
            <h5>고객센터</h5>
            <p class="mb-1 fs-5 fw-bold">1544-6399</p>
            <small>
              평일 09:00 ~ 18:00<br>
              토요일 09:00 ~ 17:00<br>
              일요일/공휴일 휴무
            </small>
          </div>
        </div>
      </aside>

      <!-- 오른쪽 콘텐츠 영역 -->
      <main class="col-md-9">
        <h4 class="mb-4">환불 내역 확인</h4>

        <div class="mb-3 d-flex align-items-center gap-2">
          <span>조회기간:</span>
          <input type="date" class="form-control form-control-sm" style="max-width: 150px;" />
          <span>~</span>
          <input type="date" class="form-control form-control-sm" style="max-width: 150px;" />
          <button class="btn btn-outline-primary btn-sm">조회</button>
        </div>

        <div class="table-responsive">
          <table class="table table-bordered text-center">
            <thead class="table-light">
              <tr>
                <th>환불 요청일</th>
                <th>예매번호</th>
                <th>공연명</th>
                <th>환불금액</th>
                <th>환불 계좌</th>
                <th>환불 상태</th>
                <th>환불 사유</th>
                <th>처리일자</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><small>2025-07-08</small></td>
                <td><small>Y1234567890</small></td>
                <td><small>뮤지컬 <br>&lt;강철의 심장&gt;</small></td>
                <td><small>59,000원</small></td>
                <td><small>농협 <br>356-1279-2486-83</small></td>
                <td><small>환불 완료</small></td>
                <td><small>고객 요청</small></td>
                <td><small>2025-07-08</small></td>
              </tr>
              <tr>
                <td><small>2025-07-08</small></td>
                <td><small>Y1234567890</small></td>
                <td><small>뮤지컬 <br>&lt;캣&gt;</small></td>
                <td><small>59,000원</small></td>
                <td><small>농협 <br>356-1279-2486-83</small></td>
                <td><small>환불 대기</small></td>
                <td><small>고객 요청</small></td>
                <td><small>2025-07-08</small></td>
              </tr>
              <tr>
                <td><small>2025-07-08</small></td>
                <td><small>Y1234567890</small></td>
                <td><small>뮤지컬 <br>&lt;지킬 앤 하이드&gt;</small></td>
                <td><small>59,000원</small></td>
                <td><small>농협 <br>356-1279-2486-83</small></td>
                <td><small>환불 완료</small></td>
                <td><small>고객 요청</small></td>
                <td><small>2025-07-08</small></td>
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
/* 기존 CSS 유지, 필요시 추가 */
</style>
