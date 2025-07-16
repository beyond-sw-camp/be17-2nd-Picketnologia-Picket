<script setup>

</script>

<template>
    <div class="col py-3">

        <div class="d-flex flex-column justify-content-between h-100 gap-2">

            <h1 class="fw-bolder fs-4">예매 내역</h1>

            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-end gap-2">
                    <label class="form-label fw-bold">공연 선택</label>
                    <select class="form-select w-auto">
                        <option selected>지킬 앤 하이드</option>
                        <option>캣</option>
                        <option>맘마미아</option>
                    </select>
                </div>

                <!-- 검색 & 정렬 -->
                <div class="d-flex gap-2">
                    <select class="form-select w-auto">
                        <option selected>최근 예매순</option>
                        <option>오래된 예매순</option>
                    </select>

                    <input type="text" class="form-control w-auto" placeholder="이름 검색">
                    <button class="btn btn-primary">검색</button>
                </div>
            </div>


            <div class="card w-100 text-center">
                <div class=" card-body">
                    <h5 class="card-title">현재 예매율</h5>
                    <p class="card-text fw-bolder fs-2">50%</p>
                </div>
            </div>

            <!-- 예매 테이블 -->
            <div class="flex-fill">
                <table class="table table-hover text-center align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>예매번호</th>
                            <th>이름</th>
                            <th>예매일</th>
                            <th>수량</th>
                            <th>공연명</th>
                            <th>공연기간</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>홍길동</td>
                            <td>2025/4/30</td>
                            <td>2</td>
                            <td>지킬 앤 하이드</td>
                            <td>2025/4/30~7/30</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>김철수</td>
                            <td>2025/5/1</td>
                            <td>4</td>
                            <td>캣</td>
                            <td>2025/4/30~7/30</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>이영희</td>
                            <td>2025/5/2</td>
                            <td>3</td>
                            <td>맘마미아</td>
                            <td>2025/4/30~7/30</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <ul class="pagination align-self-center">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>

        </div>
    </div>
</template>

<style scoped></style>