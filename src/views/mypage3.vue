<template>
    <div class="container my-5">
      <div class="row">
        <!-- Sidebar -->
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
                <router-link to="/mypage1" class="list-group-item list-group-item-action">예매 내역</router-link>
              <router-link to="/mypage2" class="list-group-item list-group-item-action ">환불 내역</router-link>
              <router-link to="/mypage3" class="list-group-item list-group-item-action active">리뷰 및 후기</router-link>
              </div>
            </div>
          </div>
  
          <div class="card mt-4">
            <div class="card-body text-center">
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
  
        <!-- Main Content -->
        <main class="col-md-9">
          <h4 class="mb-4">리뷰 및 후기 내역 확인</h4>
  
          <!-- Date Filter -->
          <div class="mb-3 d-flex align-items-center gap-2">
            <span>조회기간:</span>
            <input type="date" class="form-control form-control-sm" style="max-width: 150px;" />
            <span>~</span>
            <input type="date" class="form-control form-control-sm" style="max-width: 150px;" />
            <button class="btn btn-outline-primary btn-sm">조회</button>
          </div>
  
          <!-- Review Table -->
          <div class="table-responsive">
            <strong class="--bs-body-color p-2 mb-3 d-inline-block">* 리뷰 내역</strong>
            <table class="table table-bordered text-center">
              <thead class="table-light">
                <tr>
                  <th>작성일시</th>
                  <th>공연명</th>
                  <th>관람일</th>
                  <th>리뷰 제목</th>
                  <th>리뷰 내용</th>
                  <th>별점</th>
                  <th>공개 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(review, index) in reviews" :key="index">
                  <td><small>{{ review.date }}</small></td>
                  <td><small>{{ review.show }}</small></td>
                  <td><small>{{ review.viewDate }}</small></td>
                  <td><small>{{ review.title }}</small></td>
                  <td><small>{{ review.content }}</small></td>
                  <td>
                    <i v-for="i in 5" :key="i" :class="['fa', i <= review.stars ? 'fa-star text-warning' : 'fa-star-o text-secondary']"></i>
                  </td>
                  <td><small>{{ review.public }}</small></td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- QnA Table -->
          <div style="margin-top: 50px;"></div>
          <div class="table-responsive">
            <strong class="--bs-body-color p-2 mb-3 d-inline-block">* QnA 내역</strong>
            <table class="table table-bordered text-center">
              <thead class="table-light">
                <tr>
                  <th>작성일시</th>
                  <th>공연명</th>
                  <th>문의 제목</th>
                  <th>문의 내용</th>
                  <th>공개 여부</th>
                  <th>답변 여부</th>
                  <th>답변 보기</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(qna, index) in qnas" :key="index">
                  <td><small>{{ qna.date }}</small></td>
                  <td><small>{{ qna.show }}</small></td>
                  <td><small>{{ qna.title }}</small></td>
                  <td><small>{{ qna.content }}</small></td>
                  <td><small>{{ qna.public }}</small></td>
                  <td><small>{{ qna.answered }}</small></td>
                  <td><button class="btn btn-outline-dark btn-sm">답변 확인</button></td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div class="alert alert-light mt-3 small">
            <strong>※ 유의사항</strong><br />
            - 취소 시 예매수수료는 예매일 당일 밤 12시 이전까지 환불됩니다. 그 이후에는 환불되지 않습니다.<br />
            - 패키지 구성 상품별로 회차와 좌석지정을 해야 공연 관람이 가능합니다.
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  const reviews = [
    { date: '2025-07-08', show: '지킬 앤 하이드', viewDate: '2025-07-08', title: '리뷰남깁니다.', content: '리뷰1', stars: 4, public: '공개' },
    { date: '2025-07-08', show: '지킬 앤 하이드', viewDate: '2025-07-08', title: '리뷰남깁니다.', content: '리뷰2', stars: 4, public: '공개' },
    { date: '2025-07-08', show: '지킬 앤 하이드', viewDate: '2025-07-08', title: '리뷰남깁니다.', content: '리뷰3', stars: 3, public: '공개' },
  ];
  
  const qnas = [
    { date: '2025-07-08', show: '캣', title: '문의 납깁니다.', content: '문의1', public: '공개', answered: '답변 완료' },
    { date: '2025-07-08', show: '지킬 앤 하이드', title: '문의 납깁니다.', content: '문의2', public: '공개', answered: '답변 완료' },
    { date: '2025-07-08', show: '캣', title: '문의 납깁니다.', content: '문의3', public: '공개', answered: '답변 완료' },
  ];
  </script>
  
  <style scoped>

  </style>
  