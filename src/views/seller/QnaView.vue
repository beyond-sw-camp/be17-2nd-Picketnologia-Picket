<script setup>

</script>

<template>
    <div class="col py-3">

        <div class="d-flex flex-column justify-content-between h-100 gap-2">
            <h1 class="fw-bolder fs-4">상품 문의</h1>

            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-end gap-3">
                    <label class="form-label fw-bold">공연 선택</label>
                    <select class="form-select w-auto">
                        <option selected>지킬 앤 하이드</option>
                        <option>캣</option>
                        <option>맘마미아</option>
                    </select>
                </div>
                <div class="d-flex gap-2 align-items-center">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="radioAnswer" id="radioAnswer1">
                        <label class="form-check-label" for="radioAnswer1">
                            답변 대기 중
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="radioAnswer" id="radioAnswer2" checked>
                        <label class="form-check-label" for="radioAnswer2">
                            답변 완료
                        </label>
                    </div>
                    <select class="form-select w-auto align-self-end">
                        <option value="date_latest">최신순</option>
                        <option value="date_old">오래된순</option>
                        <option value="amount_low">추천순</option>
                    </select>
                </div>

            </div>

            <div class="w-100 d-flex flex-column gap-2 flex-fill">

                <!-- 문의 목록 (아코디언) -->
                <div class="accordion w-100 content-overflow" id="itemListAccordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item1" aria-controls="item1">
                                <div class="d-flex gap-2 align-items-end">
                                    <div class="fw-bolder fs-5">문의드립니다.</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item1" class="accordion-collapse collapse" data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                </div>
                                <div>
                                    해당 공연의 관람 연령은 어떻게 되나요?
                                </div>
                                <div class="d-flex flex-column gap-2">
                                    <textarea class="form-control" rows="3"></textarea>
                                    <button class="btn btn-primary">답변하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item2" aria-controls="item2">
                                <div class="d-flex gap-2 align-items-end">
                                    <div class="fw-bolder fs-5">문의드립니다.</div>
                                    <smal class="text-muted">2023.03.15</smal>
                                </div>
                            </button>
                        </h2>
                        <div id="item2" class="accordion-collapse collapse" data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                </div>
                                <div>
                                    해당 공연의 관람 연령은 어떻게 되나요?
                                </div>
                                <div class="card bg-body-tertiary">
                                    <div class="card-body">
                                        <div class="card-title fw-bolder fs-5 d-flex justify-content-between">
                                            <span>판매자</span>
                                            <span class="text-muted">2023.03.16</span>
                                        </div>
                                        <p class="card-text">해당 공연의 관람 연령은 12세 이상입니다. 그 이하의 관람객은 보호자 동반 시에만 입장이
                                            가능합니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item3" aria-controls="item3">
                                <div class="d-flex gap-2 align-items-end">
                                    <div class="fw-bolder fs-5">문의드립니다.</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item3" class="accordion-collapse collapse" data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                </div>
                                <div>
                                    해당 공연의 관람 연령은 어떻게 되나요?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item4" aria-controls="item4">
                                <div class="d-flex gap-2 align-items-end">
                                    <div class="fw-bolder fs-5">문의드립니다.</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item4" class="accordion-collapse collapse " data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                </div>
                                <div>
                                    해당 공연의 관람 연령은 어떻게 되나요?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item5" aria-controls="item5">
                                <div class="d-flex gap-2 align-items-end">
                                    <div class="fw-bolder fs-5">문의드립니다.</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item5" class="accordion-collapse collapse" data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                </div>
                                <div>
                                    해당 공연의 관람 연령은 어떻게 되나요?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item6" aria-controls="item6">
                                <div class="d-flex gap-2 align-items-end">
                                    <div class="fw-bolder fs-5">문의드립니다.</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item6" class="accordion-collapse collapse" data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                </div>
                                <div>
                                    해당 공연의 관람 연령은 어떻게 되나요?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item7" aria-controls="item7">
                                <div class="d-flex gap-2 align-items-end">
                                    <div class="fw-bolder fs-5">문의드립니다.</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item7" class="accordion-collapse collapse" data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                </div>
                                <div>
                                    해당 공연의 관람 연령은 어떻게 되나요?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item8" aria-controls="item8">
                                <div class="d-flex gap-2 align-items-end">
                                    <div class="fw-bolder fs-5">문의드립니다.</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item8" class="accordion-collapse collapse" data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                </div>
                                <div>
                                    해당 공연의 관람 연령은 어떻게 되나요?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item9" aria-controls="item9">
                                <div class="d-flex gap-2 align-items-end">
                                    <div class="fw-bolder fs-5">문의드립니다.</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item9" class="accordion-collapse collapse" data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                </div>
                                <div>
                                    해당 공연의 관람 연령은 어떻게 되나요?
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#item10" aria-controls="item10">
                                <div class="d-flex gap-2 align-items-end">
                                    <div class="fw-bolder fs-5">문의드립니다.</div>
                                    <small class="text-muted">2023.03.15</small>
                                </div>
                            </button>
                        </h2>
                        <div id="item10" class="accordion-collapse collapse" data-bs-parent="#itemListAccordion">
                            <div class="accordion-body flex-column d-flex gap-2">
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder fs-5">홍길동</span>
                                </div>
                                <div>
                                    해당 공연의 관람 연령은 어떻게 되나요?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

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