<script setup>

</script>

<template>
    <div class="col py-3">
        <h3 class="fw-bolder">매출 통계</h3>

        <!-- 일매출 조회 -->
        <div class="fw-bolder fs-5 align-items-start w-100">일 매출 조회</div>
        <div class="row mb-3 g-3">
            <div class="col-md-3">
                <input type="date" class="form-control">
            </div>
            <div class="col-md-3 d-flex align-items-end">
                <button class="btn bg-secondary-subtle btn-light w-100">일매출 조회</button>
            </div>
        </div>

        <!-- 지정 기간 매출 조회 -->
        <div class="fw-bolder fs-5 align-items-start w-100">지정 기간 매출 조회</div>
        <div class="row mb-4 g-3">
            <div class="col-md-3">
                <label class="form-label">시작일</label>
                <input type="date" class="form-control">
            </div>
            <div class="col-md-3">
                <label class="form-label">종료일</label>
                <input type="date" class="form-control">
            </div>
            <div class="col-md-3 d-flex align-items-end">
                <button class="btn bg-secondary-subtle btn-light w-100">지정 기간 매출 조회</button>
            </div>
        </div>

        <!-- 매출 요약 카드 -->
        <div class="row mb-4">
            <div class="col-md-4">
                <div class="card bg-primary-subtle">
                    <div class="card-body">
                        <h5 class="card-title">전체 매출</h5>
                        <p class="card-text fs-4">₩ 12,500,000</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card  bg-success-subtle">
                    <div class="card-body">
                        <h5 class="card-title">일 매출</h5>
                        <p class="card-text fs-4">₩ 1,250,000</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card bg-secondary-subtle">
                    <div class="card-body">
                        <h5 class="card-title">지정 기간 매출</h5>
                        <p class="card-text fs-4">₩ 5,800,000</p>
                    </div>
                </div>
            </div>
        </div>
        <hr>

        <div class="d-flex flex-column align-items-center justify-content-between gap-2">
            <div class="fs-4 fw-bolder">상품별 매출 현황</div>

            <!-- 공연 선택 드롭다운 -->
            <div class="align-items-start w-100 fw-bolder fs-5"> 상품 선택</div>
            <select class="form-select form-select-lg">
                <option value="1" selected>지킬 앤 하이드</option>
                <option value="2">캣</option>
                <option value="3">맘마미아</option>
            </select>

            <!-- 일매출 조회 -->
            <div class="fw-bolder fs-5 align-items-start w-100">일 매출 조회</div>

            <div class="row mb-3 g-3 w-100">
                <div class="col-md-3">
                    <input type="date" class="form-control">
                </div>
                <div class="col-md-3 d-flex align-items-end">
                    <button class="btn bg-secondary-subtle btn-light w-100">일매출 조회</button>
                </div>
            </div>

            <!-- 주간 매출 조회 -->
            <div class="fw-bolder fs-5 align-items-start w-100">지정 기간 매출 조회</div>

            <div class="row mb-4 g-3 w-100">
                <div class="col-md-3">
                    <label class="form-label">시작일</label>
                    <input type="date" class="form-control">
                </div>
                <div class="col-md-3">
                    <label class="form-label">종료일</label>
                    <input type="date" class="form-control">
                </div>
                <div class="col-md-3 d-flex align-items-end">
                    <button class="btn bg-secondary-subtle btn-light w-100">지정 기간 매출 조회</button>
                </div>
            </div>

            <!-- 매출 요약 카드 -->
            <div class="row w-100">
                <div class="col-md-4">
                    <div class="card bg-primary-subtle">
                        <div class="card-body">
                            <h5 class="card-title">전체 매출</h5>
                            <p class="card-text fs-4">₩ 12,500,000</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card bg-success-subtle">
                        <div class="card-body">
                            <h5 class="card-title">일 매출</h5>
                            <p class="card-text fs-4">₩ 1,250,000</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card bg-secondary-subtle">
                        <div class="card-body">
                            <h5 class="card-title">지정 기간 매출</h5>
                            <p class="card-text fs-4">₩ 5,800,000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>