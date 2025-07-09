<script setup>

</script>

<template>
    <div class="col py-3">
        <div class="d-flex flex-column align-items-center gap-5 justify-content-between h-100">

            <div class="w-100 d-flex flex-column gap-2 flex-fill">
                <h1 class="fw-bolder fs-4">상품 리뷰</h1>

                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-end gap-3">
                        <label class="form-label fw-bold">공연 선택</label>
                        <select class="form-select w-auto">
                            <option selected>지킬 앤 하이드</option>
                            <option>캣</option>
                            <option>맘마미아</option>
                        </select>
                    </div>
                    <select class="form-select w-auto align-self-end">
                        <option value="date_latest">최신순</option>
                        <option value="date_old">오래된순</option>
                        <option value="amount_low">추천순</option>
                    </select>
                </div>

                <div class="accordion w-100" id="itemListAccordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item1" aria-controls="item1">
                                <div class="d-flex gap-2 align-items-center justify-content-between">
                                    <div class="fw-bolder fs-5">최고의 공연!</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item1" class="accordion-collapse collapse" data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                    <button class="btn badge bg-danger">신고</button>
                                </div>

                                잘봤읍니다.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item2" aria-controls="item2">
                                <div class="d-flex gap-2 align-items-center justify-content-between">
                                    <div class="fw-bolder fs-5">최고의 공연!</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item2" class="accordion-collapse collapse" data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                    <button class="btn badge bg-danger">신고</button>
                                </div>

                                잘봤읍니다.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item3" aria-controls="item3">
                                <div class="d-flex gap-2 align-items-center justify-content-between">
                                    <div class="fw-bolder fs-5">최고의 공연!</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item3" class="accordion-collapse collapse " data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                    <button class="btn badge bg-danger">신고</button>
                                </div>

                                잘봤읍니다.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item4" aria-controls="item4">
                                <div class="d-flex gap-2 align-items-center justify-content-between">
                                    <div class="fw-bolder fs-5">최고의 공연!</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item4" class="accordion-collapse collapse " data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                    <button class="btn badge bg-danger">신고</button>
                                </div>

                                잘봤읍니다.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item5" aria-controls="item5">
                                <div class="d-flex gap-2 align-items-center justify-content-between">
                                    <div class="fw-bolder fs-5">최고의 공연!</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item5" class="accordion-collapse collapse " data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                    <button class="btn badge bg-danger">신고</button>
                                </div>

                                잘봤읍니다.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item6" aria-controls="item6">
                                <div class="d-flex gap-2 align-items-center justify-content-between">
                                    <div class="fw-bolder fs-5">최고의 공연!</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item6" class="accordion-collapse collapse " data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                    <button class="btn badge bg-danger">신고</button>
                                </div>

                                잘봤읍니다.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item7" aria-controls="item7">
                                <div class="d-flex gap-2 align-items-center justify-content-between">
                                    <div class="fw-bolder fs-5">최고의 공연!</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item7" class="accordion-collapse collapse " data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                    <button class="btn badge bg-danger">신고</button>
                                </div>

                                잘봤읍니다.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item8" aria-controls="item8">
                                <div class="d-flex gap-2 align-items-center justify-content-between">
                                    <div class="fw-bolder fs-5">최고의 공연!</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item8" class="accordion-collapse collapse " data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                    <button class="btn badge bg-danger">신고</button>
                                </div>

                                잘봤읍니다.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item9" aria-controls="item9">
                                <div class="d-flex gap-2 align-items-center justify-content-between">
                                    <div class="fw-bolder fs-5">최고의 공연!</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item9" class="accordion-collapse collapse " data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                    <button class="btn badge bg-danger">신고</button>
                                </div>

                                잘봤읍니다.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item10" aria-controls="item10">
                                <div class="d-flex gap-2 align-items-center justify-content-between">
                                    <div class="fw-bolder fs-5">최고의 공연!</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item10" class="accordion-collapse collapse " data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                    <button class="btn badge bg-danger">신고</button>
                                </div>

                                잘봤읍니다.
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <ul class="pagination">
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