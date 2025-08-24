<script setup>
import { ref, onMounted } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import axios from 'axios'
import { RouterLink } from 'vue-router'
import genreAPI from '@/api/genre'

// DTO와 맵핑
const form = ref({
    name: '',
    price: null,
    genre: '',
    rating: '',
    venueName: '',
    venueAddress: '',
    startDate: '',
    endDate: '',
    runningTime: null,
    sessionDate: '',
    sessionTime: null,
    description: '',
})

// 배열 생성
const rounds = ref([])

// 파일 업로드를 위한 ref
const posterFile = ref(null)
const detailFiles = ref(null)

const genres = ref([])
const getGenre = async () => {
    const response = await genreAPI.getGenres()
    if (response.success) {
        genres.value = response.results.genres
    } else {
        console.error('장르 목록 가져오기 실패:', response.error)
    }
}

onMounted(getGenre)

const filmRatings = ref([
    "전체연령가", "12세 관람가", "15세 관람가", "19세 이상 관람가"
])

const editorContainer = ref(null)
let quill

const toolbarOptions = [
    ['image', 'bold', 'italic', 'link', 'strike', 'underline', 'header']
];

// 
onMounted(() => {
    quill = new Quill(editorContainer.value, {
        theme: 'snow',
        placeholder: '상품 설명을 입력하세요',
        modules: {
            toolbar: toolbarOptions
        }
    })
})
// 포스터 이미지 파일 선택 시, posterFile 변수에 첫번째 파일 저장
const handlePosterFileChange = (event) => {
    posterFile.value = event.target.files[0]
}

// 상세 이미지 선택 시, 모든 파일 detailFiles 변수에 저장
const handleDetailFilesChange = (event) => {
    detailFiles.value = event.target.files
}

// 회차 추가
const addRound = () => {
    rounds.value.push({
        date: '',
        time: ''
    })
}

// 특정 회차 삭제
const removeRound = (index) => {
    rounds.value.splice(index, 1)
}

// 등록하기 버튼 실행, quill 텍스트 description에 저장
const submitForm = async () => {
    form.value.description = quill.root.innerText;

    // 회차 데이터 중 첫 번째 회차를 DTO에 매핑
    if (rounds.value.length > 0) {
        form.value.sessionDate = rounds.value[0].date
        form.value.sessionTime = parseInt(rounds.value[0].time.substring(0, 2)) // 시간만 정수로 추출
    }

    // formData 객체 생성
    const formData = new FormData();

    // ProductRegister DTO에 해당하는 JSON 데이터를 Blob으로 만들어 추가
    const productData = JSON.stringify(form.value);
    // formData.append('product', new Blob([productData], { type: 'application/json' }));
    formData.append('product', new Blob([productData], { type: 'application/json' }));

    // 파일들 추가
    if (posterFile.value) {
        formData.append('files', posterFile.value);
    }

    if (detailFiles.value && detailFiles.value.length > 0) {
        for (let i = 0; i < detailFiles.value.length; i++) {
            formData.append('files', detailFiles.value[i]);
        }
    }

    try {
        const response = await axios.post('http://localhost:8080/product/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('서버 응답:', response.data);
        alert('상품 등록이 완료되었습니다.');
    } catch (error) {
        console.error('등록 실패:', error.response ? error.response.data : error.message);
        alert('상품 등록에 실패했습니다.');
    }
}
</script>

<template>
    <div class="d-flex flex-column col py-3">

        <form @submit.prevent="submitForm">
            <div class="row mb-3">
                <label for="name" class="col-sm-2 col-form-label">상품이름</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
            </div>
            <div class="row mb-3">
                <label for="category" class="col-sm-2 col-form-label">장르</label>
                <div class="col-sm-10">
                    <select class="form-select" id="category" v-model="form.genre">
                        <option value="" disabled selected>장르를 선택하세요.</option>
                        <option v-for="genre in genres" :key="genre" :value="genre.code">
                            {{ genre.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <label for="rating" class="col-sm-2 col-form-label">관람등급</label>
                <div class="col-sm-10">
                    <select class="form-select" id="rating" v-model="form.rating" required>
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
                    <input type="text" class="form-control mb-3" id="venue" placeholder="공연장명"
                        v-model="form.venueName" />
                    <input type="text" class="form-control" placeholder="공연장 주소" v-model="form.venueAddress" />
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">공연 일시</label>
                <div class="col-sm-10 d-flex gap-2 align-items-center">
                    <span class="text-nowrap">시작일</span>
                    <input type="date" class="form-control" v-model="form.startDate" />
                    <span class="text-nowrap">종료일</span>
                    <input type="date" class="form-control" v-model="form.endDate" />
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">공연 시간</label>
                <div class="col-sm-10 d-flex gap-2 align-items-center">
                    <span class="text-nowrap">러닝타임(분)</span>
                    <input type="number" class="form-control" v-model="form.runningTime" />
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-form-label col-sm-2">포스터 이미지</label>
                <div class="col-sm-10">
                    <input type="file" class="form-control" @change="handlePosterFileChange" required />
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
                    <div v-for="(round, index) in rounds" :key="index" class="d-flex align-items-center gap-2">
                        <input type="date" class="form-control" v-model="round.date" required />
                        <input type="time" class="form-control" v-model="round.time" required />
                        <button type="button" class="btn-close" aria-label="Close" @click="removeRound(index)"></button>
                    </div>
                    <button type="button" class="btn btn-primary" @click="addRound">
                        추가
                    </button>
                </div>
            </div>

            <div class="row mb-5 ">
                <label class=" col-form-label col-sm-2">설명</label>
                <div class="col-sm-10">
                    <div ref="editorContainer" class="quill-editor"></div>
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-form-label col-sm-2">상세설명을 위한 이미지</label>
                <div class="col-sm-10">
                    <input type="file" class="form-control" multiple @change="handleDetailFilesChange" />
                </div>
            </div>

            <div class="row ">
                <button type="submit" class="btn btn-primary">등록하기</button>
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