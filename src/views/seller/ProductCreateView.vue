<script setup>
import { ref, onMounted, reactive } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import genreAPI from '@/api/genre'
import productAPI from '@/api/product'

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
    openDate: '',
    description: '',
    roundOption: {
        startDate: '',
        endDate: '',
        selectedDays: [],
        sameTimes: [],
        manualRounds: []
    },
    seatMap: []
})

// 파일 업로드를 위한 ref
const posterFile = ref(null)
const detailFiles = ref(null)

// 장르 목록 가져오기
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

// 특정 기간 일괄 등록을 위한 변수
const roundOption = reactive({
    startDate: undefined,
    endDate: undefined,
    selectedDays: [],
    sameTimes: [],
    manualRounds: []
})

// 일괄 등록 요일별 회차 시간 삭제
const removeAutoRoundTimesForDay = (day, index) => {
    day.times.splice(index, 1)
}

// 일괄 등록 요일별 회차 시간 추가
const addAutoRoundTimesForDay = (day) => {
    day.times.push(null)
}

// 일괄 등록 모든 요일 동일 회차 시간 추가
const addAutoRoundTimes = () => {
    roundOption.sameTimes.push(null)
}

// 일괄 등록 모든 요일 동일 회차 시간 삭제
const removeAutoRoundTimes = (index) => {
    roundOption.sameTimes.splice(index, 1)
}

// 직접 회차 날짜, 시간 추가
const addManualRound = () => {
    roundOption.manualRounds.push({
        date: '',
        time: ''
    })
}

// 직접 회차 날짜, 시간 삭제
const removeManualRound = (index) => {
    roundOption.manualRounds.splice(index, 1)
}

const daysOfWeek = ref([
    {
        id: 1,
        code: "every",
        name: "매일",
        times: []
    },
    {
        id: 2,
        code: "MONDAY",
        name: "월요일",
        times: []
    },
    {
        id: 3,
        code: "TUESDAY",
        name: "화요일",
        times: []
    },
    {
        id: 4,
        code: "WEDNESDAY",
        name: "수요일",
        times: []
    },
    {
        id: 5,
        code: "THURSDAY",
        name: "목요일",
        times: []
    },
    {
        id: 6,
        code: "FRIDAY",
        name: "금요일",
        times: []
    },
    {
        id: 7,
        code: "SATURDAY",
        name: "토요일",
        times: []
    },
    {
        id: 8,
        code: "SUNDAY",
        name: "일요일",
        times: []
    }
])

// 요일을 선택하기 위해 사용되는 코드들 start
const isEvery = ref(false)
const disableIsEveryDay = (dayCode) => {

    if (dayCode === 'every') {
        return false
    }

    if (roundOption.selectedDays.length == 7) {
        isEvery.value = true
    }

    return isEvery.value;
}

const isDaySelected = () => {
    return isEvery.value;
}

const checkDaySelected = (day) => {

    // 매일 선택 해제
    if (isEvery.value) {
        roundOption.selectedDays = []
        isEvery.value = false
        return
    }

    // 매일 선택 시 처리
    if (day.code === 'every') {
        roundOption.selectedDays = daysOfWeek.value
            .filter(day => day.code !== "every")
        isEvery.value = true
        return
    }

    // 그외 요일 선택시 체크, 해제
    if (roundOption.selectedDays.map(d => d.code).includes(day.code)) {
        roundOption.selectedDays = roundOption.selectedDays.filter(d => d.code !== day.code);
    } else {
        roundOption.selectedDays.push(day);
    }

    roundOption.selectedDays.sort((a, b) => a.id - b.id);
}

const isSameTime = ref(false)
const sameTimes = () => {
    isSameTime.value = !isSameTime.value;
}
// 요일을 선택하기 위해 사용되는 코드들 end

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

const addRoundOptionToForm = () => {
    return {
        startDate: roundOption.startDate,
        endDate: roundOption.endDate,
        selectedDays: roundOption.selectedDays.map(day => { return { code: day.code, times: day.times } }),
        sameTimes: roundOption.sameTimes,
        manualRounds: roundOption.manualRounds
    };
}

// 오픈 예정일 설정
const openDate = reactive({
    date: '',
    time: '',
    toForm: () => {
        form.value.openDate = openDate.date + 'T' + openDate.time;
    }
})

// 등록하기 버튼 실행, quill 텍스트 description에 저장
const submitForm = async () => {
    form.value.description = quill.root.innerText;

    // roundDTO를 form.value에 추가
    form.value.roundOption = addRoundOptionToForm();

    // 오픈 예정일 형식 변환 후 추가
    openDate.toForm();

    // 좌석 등급 선택 Map Form에 추가
    seatMap.toForm();

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

    const response = await productAPI.addProduct(formData);
    if (response.success) {
        alert('상품 등록이 완료되었습니다.');
    } else {
        console.error('등록 실패:', response);
        alert('상품 등록에 실패했습니다.', response.message);
    }
}

const seatMap = reactive({
    seats: [],
    createSeatMap: (row, col) => {

        if (row > 26) {
            alert('좌석 행은 최대 26행까지 생성할 수 있습니다.');
            return;
        }

        // 좌석 맵 생성 로직
        seatMap.seats = Array.from(Array(row), () => new Array(col).fill(null));
        seatMap.seats.forEach((r, rowIndex) => {
            r.forEach((c, colIndex) => {
                seatMap.seats[rowIndex][colIndex] = {
                    name: `${String.fromCharCode(65 + rowIndex)}-${colIndex + 1}`,
                    grade: null
                }
            })
        })
    },
    insertGrade: (seat) => {
        if (!seatGrade.getSelectedGradeCode()) {
            alert('등급을 선택하세요.')
        }

        if (seat.grade === seatGrade.getSelectedGradeCode()) {
            seat.grade = null
            return;
        }

        seat.grade = seatGrade.getSelectedGradeCode();
    },
    getSeatGrade: (seat) => {
        return seat.grade ? seat.grade.toLowerCase() : null
    },
    toForm: () => {
        form.value.seatMap = seatMap.seats
    }
})

const seatGrade = reactive({
    grades: [
        { code: 'VIP', name: 'VIP석', price: null },
        { code: 'R', name: 'R석', price: null },
        { code: 'S', name: 'S석', price: null },
        { code: 'A', name: 'A석', price: null }
    ],
    selectedGrade: null,
    selectGrade: (grade) => {
        seatGrade.selectedGrade = grade;
    },
    getSelectedGradeCode: () => {
        return seatGrade.selectedGrade ? seatGrade.selectedGrade.code : null;
    },
    getGradeCode: (grade) => {
        return grade.code.toLowerCase();
    }
})

onMounted(() => {
    seatMap.createSeatMap(10, 10);
})
</script>

<template>
    <div class="d-flex flex-column col py-3">

        <form @submit.prevent="submitForm">
            <!-- 상품 이름 start -->
            <div class="row mb-3">
                <label for="name" class="col-sm-2 col-form-label">상품이름</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" v-model="form.name">
                </div>
            </div>
            <!-- 상품 이름 end -->

            <!-- 장르 start -->
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
            <!-- 장르 end -->

            <!-- 관람 등급 start -->
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
            <!-- 관람 등급 end -->

            <!-- 공연장 start -->
            <div class="row mb-3">
                <label for="venue" class="col-sm-2 col-form-label">공연장</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control mb-3" id="venue" placeholder="공연장명"
                        v-model="form.venueName" />
                    <input type="text" class="form-control" placeholder="공연장 주소" v-model="form.venueAddress" />
                </div>
            </div>
            <!-- 공연장 end -->

            <!-- 좌석 별 등급 지정 start -->
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">좌석 별 등급 지정</label>
                <div class="col-sm-10">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-dark btn-lg shadow w-100" data-bs-toggle="modal"
                        data-bs-target="#settingSeatModal">
                        좌석 등급 지정하기
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="settingSeatModal" data-bs-backdrop="static" data-bs-keyboard="false"
                        tabindex="-1" aria-labelledby="settingSeatModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                            <div class="modal-content text-center">
                                <!-- 좌석 등급 start -->
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="settingSeatModalLabel">좌석 등급 지정하기</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <!-- 좌석 등급 end -->

                                <!-- 좌석 MAP start -->
                                <div class="modal-body">
                                    <div class="d-flex flex-column justify-content-center align-items-center gap-3">
                                        <div>
                                            등급을 선택하세요.
                                        </div>
                                        <div class="d-flex gap-2 ">
                                            <div class="form-check" v-for="(grade, index) in seatGrade.grades">
                                                <input class="form-check-input"
                                                    :class="[seatGrade.getGradeCode(grade), 'color-box', 'border']"
                                                    type="radio" name="seatGrade" :id="`grade-${grade.code}`"
                                                    @click="seatGrade.selectGrade(grade)" />
                                                <label class="form-check-label" :class="grade.code"
                                                    :for="`grade-${grade.code}`">
                                                    {{ grade.name }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="seat-map">
                                            <div class="seat-row" v-for="(row, rowIndex) in seatMap.seats"
                                                :key="rowIndex">
                                                <div v-for="(seat, colIndex) in row" :key="colIndex" class="seat"
                                                    :class="seatMap.getSeatGrade(seat)"
                                                    @click="seatMap.insertGrade(seat)">
                                                    {{ seat.name }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 좌석 MAP end -->

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-dark w-100 btn-lg shadow"
                                        data-bs-dismiss="modal">확인</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 좌석 별 등급 지정 end -->

            <!-- 공연 일시 start -->
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">공연 일시</label>
                <div class="col-sm-10 d-flex gap-2 align-items-center">
                    <span class="text-nowrap">시작일</span>
                    <input type="date" class="form-control" v-model="form.startDate" />
                    <span class="text-nowrap">종료일</span>
                    <input type="date" class="form-control" v-model="form.endDate" />
                </div>
            </div>
            <!-- 공연 일시 end -->

            <!-- 공연 시간 start -->
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label">공연 시간</label>
                <div class="col-sm-10 d-flex gap-2 align-items-center">
                    <span class="text-nowrap">러닝타임(분)</span>
                    <input type="number" class="form-control" v-model="form.runningTime" />
                </div>
            </div>
            <!-- 공연 시간 end -->

            <!-- 포스터 이미지 start -->
            <div class="row mb-3">
                <label class="col-form-label col-sm-2">포스터 이미지</label>
                <div class="col-sm-10">
                    <input type="file" class="form-control" @change="handlePosterFileChange" required />
                </div>
            </div>
            <!-- 포스터 이미지 end -->

            <!-- 가격 start -->
            <div class="row mb-3">
                <label for="price" class="col-form-label col-sm-2">가격</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" id="price" v-model="form.price" />
                </div>
            </div>
            <!-- 가격 end -->

            <!-- 오픈 예정일 start -->
            <div class="row mb-3">
                <label for="price" class="col-form-label col-sm-2">티켓 오픈 예정일</label>
                <div class="col-sm-10 d-flex gap-2">
                    <input type="date" class="form-control" v-model="openDate.date" />
                    <input type="time" class="form-control" v-model="openDate.time" />
                </div>
            </div>
            <!-- 오픈 예정일 end -->

            <!-- 회차 등록 start -->
            <div class="row mb-3">
                <label for="round" class="col-form-label col-sm-2">회차</label>
                <div class="col-sm-10 d-flex flex-column gap-2">
                    <div class=" d-flex flex-column gap-3">
                        <div>
                            <p class="fs-2 fw-bold mb-1">
                                특정 기간 동안 회차 일괄 생성
                            </p>
                            <div class="text-muted">
                                시작일, 종료일, 시간을 입력하면 해당 기간 동안의 회차가 자동으로 생성됩니다.<br>
                                자동 생성된 회차는 수동으로 수정할 수 있습니다.
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2 text-nowrap">
                            시작일: <input type="date" class="form-control" v-model="roundOption.startDate" />
                            종료일: <input type="date" class="form-control" v-model="roundOption.endDate" />
                        </div>

                        <div class="d-flex flex-column accordion gap-2">
                            <div class="fs-4 fw-bold">
                                요일 설정(기본 값은 매일 회차가 생성됩니다.)
                            </div>
                            <div class="d-flex flex-column gap-3 mb-2">
                                <div class="fs-6 fw-semibold">요일 선택으로 다양한 형태의 회차를 생성할 수 있습니다.</div>

                                <ul class=" list-group list-group-flush list-group-numbered">
                                    <li class="list-group-item">매일 회차를 생성하고 싶다면 매일 체크박스를 체크하세요.</li>
                                    <li class="list-group-item">매주 주말에만 공연이 진행된다면, 토요일과 일요일을 선택하세요.</li>
                                    <li class="list-group-item">월요일 선택시 전체 기간 동안 월요일에만 공연이 진행됩니다.</li>
                                    <li class="list-group-item">매일 회차를 생성하되, 특정 요일을 제외하고 싶다면 공연을 진행하는 요일을 선택하세요.
                                        월요일과 수요일을 제외하고 싶다면 그 외의 모든 요일을 체크하시면 됩니다.</li>
                                </ul>
                                <div>
                                    <div class="form-check form-check-inline" v-for="day in daysOfWeek" :key="day.code">
                                        <input type="checkbox" class="form-check-input" :id="'exclude-' + day.code"
                                            :value="day" @click="checkDaySelected(day)"
                                            :disabled="disableIsEveryDay(day.code)"
                                            :checked="isDaySelected(day.code)" />
                                        <label class="form-check-label" :for="'exclude-' + day.code">
                                            {{ day.name }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 일괄 회차 등록 start -->
                        <div class="d-flex flex-column gap-4 text-nowrap">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="fs-4 fw-bold">요일 별 회차 시간 설정</div>


                            </div>
                            <div class="fs-6 fw-semibold">선택한 요일별로 회차 시간을 설정할 수 있습니다.</div>

                            <ul class=" list-group list-group-flush list-group-numbered">
                                <li class="list-group-item">요일 별로 회차 시간을 입력하세요.</li>
                                <li class="list-group-item"><strong>모든 요일 회차 시간 동일</strong>을 체크하시면 선택한 모든 요일을 동일한 회차
                                    시간으로 설정 할 수 있습니다.
                                </li>
                            </ul>
                            <div>
                                <div class="form-check form-check-inline">
                                    <input type="checkbox" class="form-check-input" id="same-times"
                                        @click="sameTimes" />
                                    <label class="form-check-label" for="same-times">
                                        모든 요일 회차 시간 동일
                                    </label>
                                </div>
                            </div>

                            <!-- 선택한 요일 동일한 회차 시간 등록 start -->
                            <div v-if="isSameTime" class="d-flex flex-column gap-2">
                                <button type="button" class="btn btn-success btn shadow" @click="addAutoRoundTimes()">
                                    추가
                                </button>
                                <div class="d-flex flex-column align-items-center gap-2"
                                    v-for="(time, index) in roundOption.sameTimes" :key="index">

                                    <div class="d-flex align-items-center gap-2 w-100">
                                        <input type="time" class="form-control"
                                            v-model="roundOption.sameTimes[index]" />
                                        <button type="button" class="btn-close" aria-label="Close"
                                            @click="removeAutoRoundTimes(index)"></button>
                                    </div>
                                </div>
                            </div>
                            <!-- 선택한 요일 동일한 회차 시간 등록 end   -->

                            <!-- 요일별 회차 시간 개별 등록 start -->
                            <div class="d-flex gap-2 flex-column" v-for="day in roundOption.selectedDays"
                                :key="day.code" v-else>
                                <div class="fs-6 fw-semibold d-flex justify-content-between align-items-center">
                                    <div>
                                        {{ day.name }}
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm shadow"
                                        @click="addAutoRoundTimesForDay(day)">
                                        추가
                                    </button>
                                </div>
                                <div class="d-flex flex-column align-items-center gap-2"
                                    v-for="(time, index) in day.times" :key="index">

                                    <div class="d-flex align-items-center gap-2 w-100">
                                        <input type="time" class="form-control" v-model="day.times[index]" />
                                        <button type="button" class="btn-close" aria-label="Close"
                                            @click="removeAutoRoundTimesForDay(day, index)"></button>
                                    </div>
                                </div>
                            </div>
                            <!-- 요일별 회차 시간 개별 등록 end -->
                        </div>

                    </div>
                    <!-- 일괄 회차 등록 end -->
                    <hr>

                    <!-- 직접 회차 등록 start -->
                    <div class="d-flex flex-column gap-2">
                        <div class="fw-bold fs-2 d-flex justify-content-between align-items-center">
                            직접 회차 등록
                        </div>
                        <p class="fw-bold">특정 요일에 특정 시간을 설정하여 회차를 추가 할 수 있습니다.</p>

                        <div v-for="(round, index) in roundOption.manualRounds" :key="index"
                            class="d-flex align-items-center gap-2">
                            <input type="date" class="form-control" v-model="round.date" required />
                            <input type="time" class="form-control" v-model="round.time" required />
                            <button type="button" class="btn-close" aria-label="Close"
                                @click="removeManualRound(index)"></button>
                        </div>
                        <button type="button" class="btn btn-success btn-lg shadow " @click="addManualRound">
                            회차 등록
                        </button>
                    </div>
                    <!-- 직접 회차 등록 end -->
                </div>
            </div>

            <!-- 공연 설명 start -->
            <div class="row mb-5 ">
                <label class=" col-form-label col-sm-2">설명</label>
                <div class="col-sm-10">
                    <div ref="editorContainer" class="quill-editor"></div>
                </div>
            </div>
            <!-- 공연 설명 end -->

            <div class="row">
                <label class="col-form-label col-sm-2"></label>
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-light border-dark btn-lg w-100 shadow">등록하기</button>
                </div>
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

.seat-map {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.seat-row {
    display: flex;
    gap: 4px;
}

.seat {
    width: 50px;
    height: 50px;
    padding: 6px;
    background: #fff;
    border: solid 1px #555;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;
}

.seat.vip {
    background-color: gold;
    color: black;
}

.seat.r {
    background-color: lightblue;
    color: black;
}

.seat.s {
    background-color: lightgreen;
    color: black;
}

.seat.a {
    background-color: #ddd;
    color: #555;
}

.color-box {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1px solid #aaa;
}

.color-box.vip {
    background-color: gold;
}

.color-box.r {
    background-color: lightblue;
}

.color-box.s {
    background-color: lightgreen;
}

.color-box.a {
    background-color: #ddd;
}
</style>