<script setup>

</script>

<template>
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
</template>

<style scoped></style>