<script setup>
import { ref, onMounted } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { RouterLink } from 'vue-router'

const form = ref({
    name: '',
    price: '',
    category: '',
    filmRating: '',
    description: '',
    rounds: []
})

const roundCount = ref(0)
const addRound = () => {
    form.value.rounds.push({

    })
}

const removeRound = (index) => {
    form.value.rounds.splice(index, 1)
}

const categories = ref([
    "콘서트", "뮤지컬", "전시"
])

const filmRatings = ref([
    "전체연령가", "12세 관람가", "15세 관람가", "19세 이상 관람가"
])

const editorContainer = ref(null)
let quill
const toolbarOptions = [
    ['image', 'bold', 'italic', 'link', 'strike', 'underline', 'header']
];
onMounted(() => {
    quill = new Quill(editorContainer.value, {
        theme: 'snow',
        placeholder: '상품 설명을 입력하세요...',
        modules: {
            toolbar: toolbarOptions
        }
    })
})

const submitForm = () => {
    form.value.description = quill.root.innerHTML
    console.log('폼 데이터:', form.value)
    // 여기에 axios 등으로 서버 전송 로직 추가 가능
}
</script>
<template>
    <div class=" d-flex flex-column col py-3">

        <h2 class="mb-4">상품 등록</h2>

        <form @submit.prevent="submitForm">
            <div class="row mb-3">
                <label for="inputEmail3" class="col-sm-2 col-form-label">상품이름</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail3">
                </div>
            </div>
            <div class="row mb-3">
                <label for="inputPassword3" class="col-sm-2 col-form-label">카테고리</label>
                <div class="col-sm-10">
                    <select class="form-select" id="category" v-model="form.category">
                        <option value="" disabled selected>장르를 선택하세요.</option>
                        <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <label for="film-rating" class="col-sm-2 col-form-label">관람등급</label>
                <div class="col-sm-10">
                    <select class="form-select" id="film-rating" v-model="form.filmRating" required>
                        <option value="" disabled selected>관람등급을 선택하세요.</option>
                        <option v-for="filmRating in filmRatings" :key="filmRating" :value="filmRating">
                            {{ filmRating }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <label for="venue" class="col-sm-2 col-form-label">공연장</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control mb-3" id="venue" placeholder="공연장명" />
                    <input type="text" class="form-control" placeholder="공연장 주소" />
                </div>
            </div>
            <div class="row mb-3">
                <label for="date" class="col-sm-2 col-form-label">공연 일시</label>
                <div class="col-sm-10 d-flex gap-2 align-items-center">
                    <span class="text-nowrap">시작일</span>
                    <input type="date" class="form-control" id="start-date" />
                    <span class="text-nowrap">종료일</span>
                    <input type="date" class="form-control" />

                </div>
            </div>
            <div class="row mb-3">
                <label for="date" class="col-sm-2 col-form-label">공연 시간</label>
                <div class="col-sm-10 d-flex gap-2 align-items-center">
                    <span class="text-nowrap">러닝타임(인터미션 포함)</span>
                    <input type="text" class="form-control" id="start-date" />
                    <span>분</span>
                    <span class="text-nowrap">인터미션</span>
                    <input type="text" class="form-control" />
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-form-label col-sm-2">포스터 이미지</label>
                <div class="col-sm-10">
                    <input type="file" class="form-control" id="poster" required />
                </div>
            </div>

            <div class="row mb-3">
                <label for="price" class="col-form-label col-sm-2">가격</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="price" v-model="form.price" />
                </div>
            </div>

            <div class="row mb-3">
                <label for="round" class="col-form-label col-sm-2">회차</label>
                <div class="col-sm-10 d-flex flex-column gap-2">
                    <div v-for="round, index in form.rounds" class="d-flex align-items-center gap-2">
                        <input type="date" class="form-control" id="round" v-model="form.rounds[index]" required />
                        <input type="time" class="form-control" id="round" v-model="form.rounds[index]" required />
                        <button type="button" class="btn-close" aria-label="Close" @click="removeRound(index)"></button>
                    </div>
                    <!-- 추가 버튼 -->
                    <button type="button" class="btn btn-primary" @click="addRound">
                        추가
                    </button>
                </div>
            </div>

            <!-- 상세 설명 입력 -->
            <div class="row mb-5 ">
                <label class=" col-form-label col-sm-2">설명</label>
                <div class="col-sm-10">
                    <div ref="editorContainer" class="quill-editor"></div>
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-form-label col-sm-2">상세설명을 위한 이미지</label>
                <div class="col-sm-10">
                    <input type="file" class="form-control" id="poster" required />
                </div>
            </div>

            <div class="row ">
                <button type="submit" class="btn btn-primary">등록하기</button>
                <!-- <RouterLink><button type="button" class="btn btn-secondary">취소</button></RouterLink> -->
            </div>


        </form>
    </div>
</template>



<style scoped>
.quill-editor {
    min-height: 400px;
    max-height: 400px;
    overflow-y: auto;
}
</style>
