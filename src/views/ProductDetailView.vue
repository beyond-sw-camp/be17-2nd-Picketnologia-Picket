<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api/product'

import BookingPage from '@/components/BookingPage.vue';

const route = useRoute()

const tabs = ref([
    {
        name: '상품 소개'
    },
    {
        name: '판매 정보'
    },
    {
        name: '후기'
    },
    {
        name: 'QnA'
    }
]);

const curTab = ref(tabs.value[0].name);

const switchTab = (tab) => {
    curTab.value = tab.name;
}

const isTab = (tabName) => {
    if (curTab.value == tabName) return true;
    else false;
}

const product = ref({})
onMounted(async () => {
    const productId = route.params.id
    console.log(productId);

    const response = await api.getProductDetail(productId)

    console.log(response)
    product.value = response.dbs.db
})
</script>

<template>
    <div class="d-flex flex-column gap-5">

        <div class="container-lg">
            <div class="d-flex gap-5 justify-content-center">
                <div>
                    <img :src="product.poster" class="img-fluid rounded" style="width: 400px; height: 600px;">
                </div>

                <div class="d-flex flex-column justify-content-between">
                    <h2 class="fw-bold">{{ product.prfnm }}</h2>

                    <ul class="list-unstyled">
                        <li class="mb-4"><strong>장소:</strong>{{ product.fcltynm }}</li>
                        <li class="mb-4"><strong>공연 기간:</strong> {{ product.prfpdfrom }} ~ {{ product.prfpdto }}</li>
                        <li class="mb-4"><strong>관람 연령:</strong> {{ product.prfage }}</li>
                        <li class="mb-4"><strong>가격:</strong> {{ product.pcseguidance }} </li>
                    </ul>

                    <div class="d-grid">
                        <BookingPage class="btn btn-light btn-lg border" />
                    </div>
                </div>
            </div>
        </div>
        <div class="container-lg">
            <ul class="nav nav-underline justify-content-between">
                <li class="nav-item" v-for="tab in tabs">
                    <button class="nav-link link-dark" :class="{ active: curTab == tab.name }"
                        @click="switchTab(tab)">{{ tab.name }}</button>
                </li>
            </ul>
        </div>

        <div class="container-lg" v-if="isTab(tabs[0].name)">
            {{ product.sty }}
            <!-- <div>
                <h3 class="card-title mb-3">뮤지컬 <strong>별빛 속으로</strong></h3>
                <p class="text-muted mb-4">장르: 뮤지컬 | 공연시간: 120분 (인터미션 15분 포함) | 관람등급: 만 12세 이상</p>

                <h5 class="mb-3 border-bottom pb-2">공연 개요</h5>
                <p>
                    '별빛 속으로'는 꿈을 잃어버린 한 소녀가 별빛을 따라 떠나는 환상적인 모험을 그린 뮤지컬입니다.<br>
                    환상적인 무대와 감동적인 음악, 배우들의 열연이 어우러져 관객들에게 희망과 용기를 선사합니다.
                </p>

                <h5 class="mt-4 mb-3 border-bottom pb-2">출연진</h5>
                <ul class="list-group list-group-flush mb-4">
                    <li class="list-group-item px-0">주연: 김하늘, 이민호, 박소담</li>
                    <li class="list-group-item px-0">조연: 정우성, 한지민</li>
                    <li class="list-group-item px-0">연출: 김재영</li>
                </ul>

                <h5 class="mb-3 border-bottom pb-2">줄거리</h5>
                <p>
                    도시에 사는 평범한 소녀 수진은 어느 날 우연히 오래된 별 지도를 발견하게 됩니다.<br>
                    그 별지도를 따라 떠난 여행 속에서 수진은 다양한 인물들과 만나고, 자신이 진정으로 원하는 삶을 찾아가게 됩니다.
                </p>

                <h5 class="mt-4 mb-3 border-bottom pb-2">관람 포인트</h5>
                <ul class="list-unstyled">
                    <li>⭐ 최첨단 영상과 조명이 어우러진 환상적인 무대 연출</li>
                    <li>⭐ 감성을 자극하는 오리지널 사운드트랙과 라이브 공연</li>
                    <li>⭐ 관객과 소통하는 배우들의 생생한 연기</li>
                    <li>⭐ 특별한 깜짝 이벤트와 선물이 공연 중간 제공</li>
                </ul>

                <h5 class="mt-4 mb-3 border-bottom pb-2 text-danger">유의사항</h5>
                <ul class="list-unstyled text-muted small">
                    <li>• 공연 시작 후 입장 시간이 제한됩니다.</li>
                    <li>• 사진 및 영상 촬영은 엄격히 금지되어 있습니다.</li>
                    <li>• 어린이 및 휠체어석 관련 별도 문의 바랍니다.</li>
                    <li>• 티켓 교환 및 환불은 공연 당일 3일 전까지만 가능합니다.</li>
                </ul>
            </div> -->
        </div>

        <div class="container-lg" v-if="isTab(tabs[1].name)">
            <h4 class="mb-4">판매정보</h4>

            <h5 class="mt-4">기획사 정보</h5>
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th class="bg-light" style="width: 180px;">주최/제작</th>
                        <td>(주)미스틱컬처</td>
                    </tr>
                </tbody>
            </table>

            <h5 class="mt-4">상품 관련 정보</h5>
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th class="bg-light" style="width: 180px;">주최/기획</th>
                        <td>주식회사 미스틱컬처</td>
                    </tr>
                    <tr>
                        <th class="bg-light">고객문의</th>
                        <td>02-742-8902</td>
                    </tr>
                    <tr>
                        <th class="bg-light">공연시간</th>
                        <td>100분</td>
                    </tr>
                    <tr>
                        <th class="bg-light">관람등급</th>
                        <td>만 13세 이상</td>
                    </tr>
                    <tr>
                        <th class="bg-light">주연</th>
                        <td>최연우, 이정화, 이서영, 정민, 강정우, 조성윤, 한상훈, 이한솔, 김기택</td>
                    </tr>
                    <tr>
                        <th class="bg-light">공연장소</th>
                        <td>링크아트센터드림 드림2관</td>
                    </tr>
                    <tr>
                        <th class="bg-light">예매수수료</th>
                        <td>장당 2,000원</td>
                    </tr>
                    <tr>
                        <th class="bg-light">배송료</th>
                        <td>현장수령 무료 (배송불가)</td>
                    </tr>
                    <tr>
                        <th class="bg-light">유효기간/이용조건</th>
                        <td>2025.04.22 ~ 2025.07.20 예매한 공연 날짜, 회차에 한해 이용 가능</td>
                    </tr>
                </tbody>
            </table>

            <h5 class="mt-4">취소/환불 규정</h5>
            <div class="border p-3">
                <p>
                    예매취소조건<br />
                    - 취소일자에 따라 취소수수료 부과<br />
                    - 예매일 기준보다 관람일 기준 우선 적용<br />
                    - 예매 당일 밤 12시 이전 취소 시 취소수수료 없음 (취소기한 내 한함)
                </p>


                취소일에 따른 취소수수료 안내
                - 예매 후 7일 이내 : 없음
                - 예매 후 8일 ~ 관람일 10일 전까지 : 장당 4,000원 (티켓금액의 10% 한도)
                - 관람일 9일 전 ~ 7일 전까지 : 티켓금액의 10%
                - 관람일 6일 전 ~ 3일 전까지 : 티켓금액의 20%
                - 관람일 2일 전 ~ 1일 전까지 : 티켓금액의 30%

                취소환불방법
                - My티켓 > 예매/취소내역에서 직접 취소 또는 고객센터(1544-1555) 문의
                - 배송된 티켓은 인터넷 취소 불가, 고객센터로 반송 후 취소 가능
                - 취소수수료는 티켓 도착일 기준 부과, 배송료는 환불 불가
            </div>

            <h5 class="mt-4">배송 및 티켓 안내</h5>
            <div class="border p-3">
                - 모바일티켓은 모바일 디바이스에서만 이용 가능하며, 결제 후 예매내역에서 확인
                - 모바일티켓은 지류티켓으로 변경 불가
                - 공연장 방문 시 본인 확인 가능한 신분증 지참 권장
                - 모바일티켓 관련 상세 내용은 FAQ 참고
            </div>

            <h5 class="mt-4">환불 안내</h5>
            <div class="border p-3" style="white-space: pre-line; font-size: 0.9rem; line-height: 1.5;">
                - 신용카드 결제 : 취소 처리 완료 후 4~5일 내 카드사 환불 확인 (체크카드 포함)
                - 무통장 입금 : 취소 후 5~7일 내 환불 (주말 제외), 환불계좌는 예매자 본인 명의 또는 직계 가족 명의 가능 (증빙서류 필요)
                - 휴대폰 결제 : 취소 즉시 처리, 수수료 제외한 금액 환불
                - 무통장 입금 시 입금자명과 주문자명 일치 필수, 입금 지연 시 예매 자동 취소
                - 입금 확인 후 반드시 예매내역 확인 필요
                - 환불 지연, 분쟁 시 관련 법령 및 고객센터 문의 권장
            </div>

            <h5 class="mt-4">판매자 정보</h5>
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th class="bg-light" style="width: 180px;">상호</th>
                        <td>주식회사 미스틱컬처</td>
                    </tr>
                    <tr>
                        <th class="bg-light">대표자명</th>
                        <td>라현아</td>
                    </tr>
                    <tr>
                        <th class="bg-light">사업자등록번호</th>
                        <td>796-87-02212</td>
                    </tr>
                    <tr>
                        <th class="bg-light">E-mail</th>
                        <td>konkun928@gmail.com</td>
                    </tr>
                    <tr>
                        <th class="bg-light">연락처</th>
                        <td>010-6678-3918</td>
                    </tr>
                    <tr>
                        <th class="bg-light">주소</th>
                        <td>서울특별시 종로구 대학로 42-13(효제동) 7층</td>
                    </tr>
                </tbody>
            </table>

            <h5 class="mt-4">예매 유의사항</h5>
            <div class="border p-3" style="white-space: pre-line; font-size: 0.9rem; line-height: 1.5;">
                - 반복적 예매 및 취소 시 서비스 이용 제한 가능
                - 결제 가능 시간 약 5분 제한, 시간 초과 시 예매 종료
                - 실제 시간과 차이 있을 수 있음, 천재지변·트래픽 등으로 오류 발생 가능
                - 원활한 서비스 이용 위해 주의 요망
            </div>

            <h5 class="mt-4">티켓 수령 안내</h5>
            <div class="border p-3" style="white-space: pre-line; font-size: 0.9rem; line-height: 1.5;">
                - 공연 당일 현장 교부처에서 예약번호 및 본인 확인 후 수령 가능
                - 예매확인/취소 메뉴에서 예매내역 출력 권장
            </div>

        </div>
        <div class="container-lg" v-if="isTab(tabs[2].name)">
            <h4 class="mb-4">관람 후기</h4>

            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">후기 작성하기</h5>
                    <form>
                        <div class="form-group">
                            <label for="reviewWriter">작성자</label>
                            <input type="text" class="form-control" id="reviewWriter" placeholder="이름을 입력하세요">
                        </div>

                        <div class="form-group">
                            <label>평점</label>
                            <div>
                                <label class="mr-2">
                                    <input type="radio" name="rating" value="5"> ★★★★★
                                </label>
                                <label class="mr-2">
                                    <input type="radio" name="rating" value="4"> ★★★★☆
                                </label>
                                <label class="mr-2">
                                    <input type="radio" name="rating" value="3"> ★★★☆☆
                                </label>
                                <label class="mr-2">
                                    <input type="radio" name="rating" value="2"> ★★☆☆☆
                                </label>
                                <label class="mr-2">
                                    <input type="radio" name="rating" value="1"> ★☆☆☆☆
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="reviewContent">내용</label>
                            <textarea class="form-control" id="reviewContent" rows="4"
                                placeholder="후기를 남겨주세요"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">등록하기</button>
                    </form>
                </div>
            </div>

            <div class="alert alert-info" role="alert">
                <strong>유의사항 안내</strong><br>
                - 공연 내용과 무관한 비방, 광고, 욕설 등의 글은 사전 동의 없이 삭제될 수 있습니다.<br>
                - 관람일 기준 실제 관람한 회원만 후기를 작성할 수 있습니다.<br>
                - 작성된 후기는 관리자 검토 후 게시됩니다.
            </div>

            <div class="d-flex justify-content-end mb-3">
                <div class="dropdown">
                    <a class="btn btn-sm btn-outline-secondary dropdown-toggle" href="#" role="button" id="sortDropdown"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        최신순
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="sortDropdown">
                        <a class="dropdown-item" href="#">최신순</a>
                        <a class="dropdown-item" href="#">오래된순</a>
                        <a class="dropdown-item" href="#">별점 높은순</a>
                        <a class="dropdown-item" href="#">별점 낮은순</a>
                    </div>
                </div>
            </div>

            <div class="list-group">

                <div class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <div>
                            <strong>김하늘</strong>
                            <small class="text-muted ml-2">2024.06.25</small>
                        </div>
                        <div>
                            <a href="#" class="text-secondary mr-2">수정</a>
                            <a href="#" class="text-secondary mr-2">삭제</a>
                            <a href="#" class="text-secondary">신고</a>
                        </div>
                    </div>
                    <p class="mb-1">무대 연출과 배우들 연기가 너무 좋아서 감동받았습니다. 추천!</p>
                    <div class="text-warning">
                        ★★★★★
                    </div>
                </div>

                <div class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <div>
                            <strong>박소담</strong>
                            <small class="text-muted ml-2">2024.06.24</small>
                        </div>
                        <div>
                            <a href="#" class="text-secondary mr-2">수정</a>
                            <a href="#" class="text-secondary mr-2">삭제</a>
                            <a href="#" class="text-secondary">신고</a>
                        </div>
                    </div>
                    <p class="mb-1">공연이 길었지만 인터미션 덕분에 괜찮았어요.</p>
                    <div class="text-warning">
                        ★★★★☆
                    </div>
                </div>

            </div>

        </div>
        <div class="container-lg" v-if="isTab(tabs[3].name)">
            <h4 class="mb-4">Q&A</h4>

            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">질문 작성하기</h5>
                    <form>
                        <div class="form-group">
                            <label for="qnaWriter">작성자</label>
                            <input type="text" class="form-control" id="qnaWriter" placeholder="이름을 입력하세요">
                        </div>
                        <div class="form-group">
                            <label for="qnaQuestion">질문 내용</label>
                            <textarea class="form-control" id="qnaQuestion" rows="4"
                                placeholder="궁금한 내용을 작성해 주세요"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">등록하기</button>
                    </form>
                </div>
            </div>

            <div class="mb-4">
                <h5>등록된 질문 (2)</h5>
                <ul class="list-group">
                    <li class="list-group-item">
                        <strong>김문의</strong> <small class="text-muted">2024-06-24</small>
                        <p>공연 당일 주차 가능할까요?</p>
                        <div class="bg-light p-2 mt-2">
                            <strong>답변:</strong> 주차장은 공연장 지하에 마련되어 있으며 선착순 이용 가능합니다.
                        </div>
                    </li>
                    <li class="list-group-item">
                        <strong>이관람</strong> <small class="text-muted">2024-06-23</small>
                        <p>아이와 함께 관람해도 괜찮나요?</p>
                        <div class="bg-light p-2 mt-2">
                            <strong>답변:</strong> 본 공연은 만 7세 이상 관람 가능합니다.
                        </div>
                    </li>
                </ul>
            </div>

            <div class="alert alert-warning" role="alert">
                <h5 class="alert-heading">Q&A 작성 유의사항</h5>
                <ul class="mb-0">
                    <li>공연과 관련 없는 질문, 광고, 욕설, 비방, 개인정보 노출 게시글은 삭제될 수 있습니다.</li>
                    <li>개인적인 문의사항은 고객센터로 연락 부탁드립니다.</li>
                    <li>답변은 평균 1~2일 이내 등록됩니다.</li>
                </ul>
            </div>
        </div>

        <BookingModal />

    </div>
</template>

<style scoped></style>