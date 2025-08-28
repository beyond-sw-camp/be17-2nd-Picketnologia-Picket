<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import Stomp from 'stompjs'
import PortOne from '@portone/browser-sdk/v2'
import * as bootstrap from 'bootstrap'

import productAPI from '@/api/product'

const route = useRoute()
const eventIdx = route.params.id // URL에서 상품 ID 가져오기

const productDetail = ref(null) // 상품 상세 정보
const availableDatesResponse = ref([]) // 백엔드에서 받아온 회차 날짜 리스트
const calendarDates = ref([]) // 달력에 표시될 날짜 배열
const selectedDate = ref('') // 사용자가 선택한 날짜
const selectedTime = ref('') // 사용자가 선택한 회차 시간
const seatGrades = ref([]) // 좌석 등급 배열
const selectedSeats = ref([]) // 사용자가 선택한 좌석 배열
const disabledSeats = ref([]) // 이미 예매된 좌석 (소켓 통신으로 업데이트)
const deliveryMethod = ref('') // 수령 방법
const step = ref(1) // 예매 절차 단계 (1, 2, 3)
const seats = ref([]) // 좌석 데이터 (전체)

const isLoading = ref(true) // 데이터 로딩 상태
const loadError = ref(null) // 데이터 로딩 오류 메시지

// === 웹소켓 연결 ===
const socket = ref(null)
const connectWebSocket = () => {
  const ws = new WebSocket('ws://localhost:8080/websocket')
  const client = Stomp.over(ws)
  socket.value = client
  client.connect(
    {},
    (frame) => {
      // 채널 구독(by.상품id)
      client.subscribe(`/product/${eventIdx}`, (msg) => {
        const receivedSeat = msg.body
        // 이미 선택된 좌석이면 음영 처리
        if (!disabledSeats.value.includes(receivedSeat)) {
          disabledSeats.value.push(receivedSeat)
        }
        console.log('음영 처리 좌석 추가됨:', receivedSeat)
      })
    },
    (err) => {
      console.error('웹소켓 연결 실패:', err)
    },
  )
}

// === API 호출 ===
const api = {
  getProductDetail: async (id) => {
    const req = {
      productId: id,
    }
    const response = await productAPI.getProductDetail(req)
    return response.results
  },

  getAvailableDates: async (id) => {
    const req = {
      id: id,
    }
    const response = await productAPI.getAvailableDates(req)
    console.log(response)

    return response.results
  },

  getSeatDates: async (id) => {
    const req = {
      productId: id,
    }
    const response = await productAPI.getSeatDates(req)
    return response.results
  },
}

// === 컴포넌트 마운트 시 데이터 로드 ===
onMounted(async () => {
  try {
    isLoading.value = true // 로딩 상태 시작
    // 1. 좌석 등급 및 좌석 맵 정보 불러오기
    const seatInfoResponse = await api.getSeatDates(eventIdx)
    console.log('API 응답에서 가져온 seatInfoResponse:', seatInfoResponse) // 디버깅용

    // seatInfoResponse.seatGrades와 seatInfoResponse.seatMap
    if (seatInfoResponse && seatInfoResponse.seatGrades && seatInfoResponse.seatMap) {
      // 2. 좌석 등급 정보 할당
      seatGrades.value = seatInfoResponse.seatGrades

      // 3. 좌석 맵 데이터 할당 (2차원 배열을 1차원 배열로 변환)
      const allSeats = seatInfoResponse.seatMap.flat()
      seats.value = allSeats
      console.log('좌석 맵 데이터 불러오기 성공:', seats.value)
    } else {
      console.error('좌석 등급 또는 좌석 맵 정보를 불러오는 데 실패했습니다.')
      loadError.value = '좌석 정보를 불러올 수 없습니다. 다시 시도해 주세요.'
    }
  } catch (error) {
    console.error('초기 데이터 로드 실패:', error)
    loadError.value = '서버 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
  } finally {
    isLoading.value = false // 로딩 상태 종료
  }
})

// 모달 열기 및 데이터 로드
async function openBookingModal() {
  try {
    // 1. 웹소켓 연결
    connectWebSocket()

    // 2. 상품 상세정보 로드
    productDetail.value = await api.getProductDetail(eventIdx)

    // 3. 일정 및 회차 정보 로드
    const datesData = await api.getAvailableDates(eventIdx)

    // datesData가 유효한지 확인 후 할당
    if (datesData && datesData.length > 0) {
      availableDatesResponse.value = datesData

      // 4. 달력 구성
      const firstAvailableDate = availableDatesResponse.value[0].date
      const [year, month] = firstAvailableDate.split('-').map(Number)
      const daysInMonth = new Date(year, month, 0).getDate()
      const baseDate = `${year}-${String(month).padStart(2, '0')}`
      const today = new Date().toISOString().slice(0, 10)

      calendarDates.value = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1
        const fullDate = `${baseDate}-${String(day).padStart(2, '0')}`
        const dateInfo = availableDatesResponse.value.find((d) => d.date === fullDate)

        return {
          day: day,
          fullDate: fullDate,
          isAvailable: !!dateInfo, // 회차 정보가 있으면 예매 가능
          isSelected: false,
          isToday: fullDate === today,
        }
      })
    } else {
      // 데이터가 없거나 유효하지 않을 때의 처리
      console.log('백엔드에서 유효한 회차 정보를 받지 못했습니다. 달력을 생성하지 않습니다.')
      availableDatesResponse.value = []
      calendarDates.value = []
    }

    // 부트스트랩 모달 열기
    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'))
    bookingModal.show()
  } catch (error) {
    console.error('모달 열기 및 데이터 로드 중 오류 발생:', error)
    // 사용자에게 오류 메시지 표시
    console.log('예매 정보를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
  }
}

// 선택된 날짜의 회차 목록
const currentDayTimeslots = computed(() => {
  const selected = availableDatesResponse.value.find((d) => d.date === selectedDate.value)
  return selected ? selected.roundTimes.map((rt) => ({ time: rt.times.slice(0, 5) })) : []
})

// 선택된 좌석의 총 가격
const totalPrice = computed(() =>
  selectedSeats.value.reduce((sum, s) => sum + s.priceInfo.price, 0),
)

// 날짜 선택
function selectDate(date) {
  if (!date.isAvailable) return // 예매 불가능한 날짜는 선택 안 됨
  calendarDates.value.forEach((d) => (d.isSelected = false))
  date.isSelected = true
  selectedDate.value = date.fullDate
  selectedTime.value = '' // 날짜 변경 시 회차 초기화
}

// 좌석 선택/해제
function toggleSeat(seat) {
  // disabledSeats는 좌석 이름(name)을 포함하므로 name으로 비교
  if (disabledSeats.value.includes(seat.name)) return
  const idx = selectedSeats.value.findIndex((s) => s.name === seat.name)
  if (idx >= 0) {
    selectedSeats.value.splice(idx, 1)
  } else {
    selectedSeats.value.push(seat)
    // 선택된 좌석 정보를 웹소켓으로 전송
    socket.value.send(`/order/event/${eventIdx}`, {}, seat.name)
  }
}

// 다음 단계로 이동
async function nextStep() {
  if (step.value === 1) {
    if (!selectedDate.value) return alert('예매일을 선택하세요.')
    if (!selectedTime.value) return alert('회차를 선택하세요.')
    step.value++
  } else if (step.value === 2) {
    if (selectedSeats.value.length === 0) return alert('좌석을 선택하세요.')
    step.value++
  } else if (step.value === 3) {
    if (!deliveryMethod.value) return alert('수령 방식을 선택하세요.')
    if (confirm('결제를 진행하시겠습니까?')) await onSubmit()
  }
}

// 이전 단계로 이동
function prevStep() {
  if (step.value > 1) step.value--
}

// 결제 ID 생성
const randomId = () => {
  return [...crypto.getRandomValues(new Uint32Array(2))]
    .map((word) => word.toString(16).padStart(8, '0'))
    .join('')
}

// 결제 요청
const onSubmit = async () => {
  const totalAmount = totalPrice.value
  const productIdxList = selectedSeats.value.map((s) => s.name)
  const paymentId = randomId()
  await PortOne.requestPayment({
    storeId: 'store-730b9cdb-6eb8-4cd6-a943-35e3f3d92470',
    channelKey: 'channel-key-226fbd3b-f977-4f84-a706-f711ac1e7bfd',
    paymentId: paymentId,
    orderName: productDetail.value.name,
    totalAmount: totalAmount,
    currency: 'KRW',
    payMethod: 'CARD',
    customData: { productIdxList },
  })
}
</script>

<template>
  <button @click="openBookingModal" type="button" class="btn btn-primary btn-lg shadow">
    예매하기
  </button>

  <div class="modal fade" id="bookingModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">티켓 예매</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="steps mb-3">
            <div :class="['step', { active: step === 1 }]">Step 1<br />날짜 및 회차</div>
            <div :class="['step', { active: step === 2 }]">Step 2<br />좌석 선택</div>
            <div :class="['step', { active: step === 3 }]">Step 3<br />수령 방법</div>
          </div>

          <div v-show="step === 1" class="step-content">
            <h4>예매일 선택</h4>
            <div class="calendar-grid">
              <div
                v-for="date in calendarDates"
                :key="date.fullDate"
                :class="[
                  'day',
                  date.isAvailable ? 'available' : 'disabled',
                  date.isSelected ? 'selected' : '',
                  date.isToday ? 'today' : '',
                ]"
                @click="selectDate(date)"
              >
                {{ date.day }}
              </div>
            </div>

            <h4 class="mt-3">회차 선택</h4>
            <select v-model="selectedTime" class="form-select w-25">
              <option disabled value="">회차를 선택하세요</option>
              <option v-for="slot in currentDayTimeslots" :key="slot.time" :value="slot.time">
                {{ slot.time }}
              </option>
            </select>
          </div>

          <div v-show="step === 2" class="step-content">
            <!-- 좌석 로딩 중 메시지 -->
            <div v-if="isLoading" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-2">좌석 정보를 불러오는 중...</p>
            </div>
            <!-- 좌석 로드 오류 메시지 -->
            <div v-else-if="loadError" class="alert alert-danger">
              {{ loadError }}
            </div>
            <!-- 좌석 목록이 비어 있을 때 메시지 -->
            <div v-else-if="seats.length === 0" class="alert alert-info">
              <p>좌석 정보가 없습니다.</p>
            </div>
            <div v-else>
              <h4>좌석 선택 (총 {{ seats.length }}석)</h4>
              <div class="seat-legend mb-3 d-flex gap-3">
                <div
                  v-for="grade in seatGrades"
                  :key="grade.grade"
                  class="legend-item"
                  :class="grade.grade.toLowerCase()"
                >
                  <div class="color-box" :class="grade.grade.toLowerCase()"></div>
                  {{ grade.grade }}석 - {{ grade.priceInfo.priceFormat }}
                </div>
              </div>
              <div class="seat-grid">
                <div
                  v-for="seat in seats"
                  :key="seat.name"
                  :class="[
                    'seat',
                    seat.grade.toLowerCase(),
                    {
                      selected: selectedSeats.some((s) => s.name === seat.name),
                      disabled: disabledSeats.includes(seat.name),
                    },
                  ]"
                  @click="toggleSeat(seat)"
                >
                  {{ seat.name }}
                </div>
              </div>
            </div>
          </div>

          <div v-show="step === 3" class="step-content">
            <h4>수령 방법</h4>
            <label
              ><input type="radio" v-model="deliveryMethod" value="현장 수령" /> 현장 수령</label
            >
            <label class="ms-3"
              ><input type="radio" v-model="deliveryMethod" value="QR 코드" /> QR 코드</label
            >
            <p><input type="text" class="form-control" placeholder="이름" /></p>
            <p><input type="text" class="form-control" placeholder="긴급 연락처" /></p>
            <p><input type="text" class="form-control" placeholder="e-mail" /></p>
          </div>

          <div class="summary mt-4 border-top pt-3">
            <h5>예매 요약</h5>
            <p><strong>예매일:</strong> {{ selectedDate || '선택 안 됨' }}</p>
            <p><strong>회차:</strong> {{ selectedTime || '선택 안 됨' }}</p>
            <p>
              <strong>좌석:</strong>
              {{ selectedSeats.map((s) => s.name).join(', ') || '선택 안 됨' }}
            </p>
            <p><strong>수령 방법:</strong> {{ deliveryMethod || '선택 안 됨' }}</p>
            <p><strong>총 금액:</strong> {{ totalPrice.toLocaleString() }} 원</p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="prevStep" :disabled="step === 1">이전</button>
            <button class="btn btn-primary" @click="nextStep">
              {{ step === 3 ? '결제하기' : '다음' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.steps {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.step {
  cursor: pointer;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 10px;
  background-color: #e9ecef;
  user-select: none;
  text-align: center;
  font-weight: 500;
  transition: background-color 0.3s;
}

.step.active {
  background-color: #dc3545;
  color: white;
  font-weight: bold;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  max-width: 400px;
  user-select: none;
}

.day {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
}

.day.available {
  background-color: white;
  color: black;
}

.day.disabled {
  background-color: #eee;
  color: #aaa;
  cursor: default;
  text-decoration: line-through;
}

.day.selected {
  background-color: #dc3545;
  color: white;
  font-weight: bold;
}

.day.today {
  border: 2px solid #007bff;
}

.seat-legend {
  font-weight: 600;
  font-size: 0.9rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
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
  color: #555;
}

.seat-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 6px;
  max-width: 600px;
  user-select: none;
}

.seat {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  font-size: 0.9rem;
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

.seat.selected {
  outline: 3px solid #dc3545;
}

.summary p {
  margin: 0.2rem 0;
}

.seat.disabled {
  background-color: #666;
  color: #666;
  pointer-events: none;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
