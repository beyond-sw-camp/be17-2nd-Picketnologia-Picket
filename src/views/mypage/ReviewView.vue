<script setup>
import review from '@/api/review';
import { ref } from 'vue';
import qna from '@/api/qna/index'

const reviews = ref([]);
const startDate = ref('');
const endDate = ref('');
const qnas = ref([]);

const myPageReviewAndQna = async () => {
    const dateInfo = {
        startDate: startDate.value,
        endDate: endDate.value
    }
    try {
        const response = await review.userIdxList(dateInfo);

        reviews.value = response.results.map(review => ({
            ...review,
            isExpanded: false

        }));

        const qnaResponse = await qna.userIdxQnaList(dateInfo)
        qnas.value = qnaResponse.results.map(qna => ({
            ...qna,
            isExpanded: false

        }));

        if (reviews.value.length == 0) {
            alert('해당기간에 작성한 리뷰가 없습니다.');
        }
    } catch (error) {
        console.error('리뷰를 불러오는 데 실패했습니다.', error);
    }
}

const showAlert = (answers) => {
    if (answers && answers.length > 0) {
        const answerContent = answers.map(answer => answer.contents).join('\n\n');
        alert(answerContent);
    } else {
        alert('아직 답변이 없습니다.');
    }
};

</script>

<template>
    <main class="col-md-9">
        <h4 class="mb-4">리뷰 및 후기 내역 확인</h4>

        <!-- Date Filter -->
        <div class="mb-3 d-flex align-items-center gap-2">
            <span>조회기간:</span>
            <input type="date" class="form-control form-control-sm" style="max-width: 150px;" v-model="startDate" />
            <span>~</span>
            <input type="date" class="form-control form-control-sm" style="max-width: 150px;" v-model="endDate" />
            <button class="btn btn-outline-primary btn-sm" @click="myPageReviewAndQna">조회</button>
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
                        <th>리뷰 내용</th>
                        <th>별점</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(review, index) in reviews" :key="index">
                        <td><small>{{ review.createdAt }}</small></td>
                        <td><small>{{ review.prodcutName }}</small></td>
                        <td><small>{{ review.createdAt }}</small></td>
                        <td>
                            <small v-if="!review.isExpanded">
                                {{ review.comment.substring(0, 10) }}{{ review.comment.length > 10 ? '...' : '' }}
                            </small>
                            <small v-else>
                                {{ review.comment }}
                            </small>


                            <div v-if="review.comment.length > 10">
                                <a href="#" @click.prevent="review.isExpanded = !review.isExpanded"
                                    class="text-decoration-none">
                                    <small>{{ review.isExpanded ? '접기' : '더보기' }}</small>
                                </a>
                            </div>
                        </td>

                        <td><small>{{ review.rating }}</small></td>


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
                        <td><small>{{ qna.createdAt }}</small></td>
                        <td><small>{{ qna.prodcutName }}</small></td>
                        <td><small>{{ qna.title }}</small></td>
                        <td><small>{{ qna.contents }}</small></td>
                        <td><small>{{ qna.isPrivate }}</small></td>
                        <td> <small v-if="qna.answers && qna.answers.length > 0">답변 완료</small>
                            <small v-else>미답변</small>
                        </td>
                        <td><button class="btn btn-outline-dark btn-sm" @click="showAlert(qna.answers)">답변 확인</button>
                        </td>
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
</template>

<style scoped></style>