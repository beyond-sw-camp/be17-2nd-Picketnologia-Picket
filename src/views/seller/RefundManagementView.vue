<script setup>

</script>

<template>
    <div class="col py-3 text-nowrap">
        <div class="d-flex flex-column gap-2 justify-content-between h-100">

            <div class="d-flex flex-column gap-2">

                <h1 class="fw-bolder fs-4">환불/취소</h1>

                <!-- 검색 / 정렬 -->
                <div class="d-flex align-items-center justify-content-between gap-2">

                    <div class="d-flex align-items-center gap-2">
                        <div class="flex-fill">
                            <input type="text" class="form-control" placeholder="회원 이메일 검색">
                        </div>
                        <div>
                            <button class="btn btn-primary ">검색</button>
                        </div>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                        <select class="form-select">
                            <option selected>정렬 기준</option>
                            <option value="date_latest">최신순</option>
                            <option value="date_old">오래된순</option>
                            <option value="amount_low">결제금액 낮은순</option>
                            <option value="amount_high">결제금액 높은순</option>
                            <option value="status">처리상태</option>
                        </select>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="radioAnswer" id="radioAnswer1">
                            <label class="form-check-label" for="radioAnswer1">
                                승인 대기
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="radioAnswer" id="radioAnswer2" checked>
                            <label class="form-check-label" for="radioAnswer2">
                                승인 완료
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="radioAnswer" id="radioAnswer3">
                            <label class="form-check-label" for="radioAnswer3">
                                승인 거절
                            </label>
                        </div>
                    </div>
                </div>

                <!-- 환불 요청 리스트 -->
                <div class="card">
                    <div class="card-header bg-light">
                        <h5 class="mb-0">환불 요청 리스트</h5>
                    </div>
                    <div class="card-body p-0">
                        <table class="table table-hover mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>환불 요청일</th>
                                    <th>상품명</th>
                                    <th>회원 이메일</th>
                                    <th>결제금액</th>
                                    <th>처리상태</th>
                                    <th>상세</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2025-07-07</td>
                                    <td>티켓 A</td>
                                    <td>user1@email.com</td>
                                    <td>₩ 50,000</td>
                                    <td><span class="badge bg-warning text-dark">승인대기</span></td>
                                    <td><button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                                            data-bs-target="#refundDetailModal">보기</button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2025-07-06</td>
                                    <td>티켓 B</td>
                                    <td>user2@email.com</td>
                                    <td>₩ 80,000</td>
                                    <td><span class="badge bg-success">승인완료</span></td>
                                    <td><button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                                            data-bs-target="#refundDetailModal">보기</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- 환불 요청 리스트 끝 -->

            <!-- 페이지네이션 -->
            <ul class="pagination align-self-center">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        </div>
    </div>

    <!-- 상세보기 모달 -->
    <div class="modal fade" id="refundDetailModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">환불 상세 내역</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p><strong>환불 요청일:</strong> 2025-07-07</p>
                    <p><strong>상품명:</strong> 티켓 A</p>
                    <p><strong>좌석번호:</strong> A-12</p>
                    <p><strong>회원명:</strong> 홍길동</p>
                    <p><strong>결제금액:</strong> ₩ 50,000</p>
                    <p><strong>환불사유:</strong> 개인사정으로 인한 취소</p>
                    <p><strong>처리상태:</strong> <span class="badge bg-warning text-dark">승인대기</span></p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success">승인</button>
                    <button class="btn btn-danger">거절</button>
                    <button class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>