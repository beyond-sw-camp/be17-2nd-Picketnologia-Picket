<script setup>

</script>

<template>
    <div class="col py-3">

        <div class="d-flex flex-column gap-2 h-100">
            <div class="d-flex justify-content-between align-items-center">
                <h1 class="fs-4 fw-bolder">종료된 공연</h1>

                <div class="d-flex align-self-end gap-2 ">
                    <select class="form-select w-auto">
                        <option selected>시작일순</option>
                        <option>종료일순</option>
                    </select>

                    <input type="text" class="form-control" />
                    <button class="text-nowrap btn btn-primary">검색</button>
                </div>
            </div>

            <div class="flex-fill">
                <!-- 공연 목록 테이블 -->
                <table class="table table-hover text-center align-middle">
                    <thead class="table-light">
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
                            <td>2025/04/30 ~ 2025/07/30</td>
                            <td>세종문화회관</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>캣</td>
                            <td>2025/04/30 ~ 2025/07/30</td>
                            <td>세종문화회관</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>맘마미아</td>
                            <td>2025/04/30 ~ 2025/07/30</td>
                            <td>세종문화회관</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>오페라의 유령</td>
                            <td>2025/05/01 ~ 2025/08/01</td>
                            <td>국립극장</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>노트르담 드 파리</td>
                            <td>2025/05/10 ~ 2025/08/10</td>
                            <td>예술의전당</td>
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