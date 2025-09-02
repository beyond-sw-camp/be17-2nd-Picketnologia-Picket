e
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import axios from 'axios'
import Stomp from 'stompjs'
import PortOne from '@portone/browser-sdk/v2'
import * as bootstrap from 'bootstrap'
import Calendar from '@/components/Calendar.vue';

import productAPI from '@/api/product'
import paymentAPI from '@/api/payment'

const router = useRouter()
const route = useRoute()
const eventIdx = route.params.id // URL에서 상품 ID 가져오기

const openModal = ref(false); // 예매 모달창 오픈 여부
const closeModal = () => {
  console.log("모달창 종료")
  openModal.value = false
}

const productDetail = ref(null)
const availableDatesResponse = ref([])
const calendarDates = ref([])
const selectedDate = ref('')
const selectedTime = ref('')
const seatGrades = ref([])
const selectedSeats = ref([])
const disabledSeats = ref([])
const deliveryMethod = ref('')
const step = ref(1)
const seats = ref([])
const isLoading = ref(true)
const loadError = ref(null)

// 사용자 정보
const userStore = useUserStore()
const myNickname = userStore.nickname

const socket = ref(null)
const connectWebSocket = () => {
  const ws = new WebSocket('ws://localhost:8080/websocket')
  const client = Stomp.over(ws)
  socket.value = client
  client.connect(
    {},
    (frame) => {
      client.subscribe(
        `/product/${eventIdx}/${selectedDate.value}/${selectedTime.value}`,
        (msg) => {
          const received = JSON.parse(msg.body)
          const { seatName, sender, action } = received

          if (sender !== myNickname) {
            if (action === 'select') {
              if (!disabledSeats.value.includes(seatName)) {
                disabledSeats.value.push(seatName)
                console.log('다른 유저 선택으로 블락된 좌석:', seatName)
              }
            } else if (action === 'deselect') {
              // 수정: 좌석 해제 처리
              const index = disabledSeats.value.indexOf(seatName)
              if (index !== -1) disabledSeats.value.splice(index, 1)
              console.log('다른 유저 해제로 블락 해제된 좌석:', seatName)
            }
          }
        },
      )
    },
    (err) => {
      console.error('웹소켓 연결 실패:', err)
    },
  )
}

const api = {
  getProductDetail: async (id) => {
    const response = await productAPI.getProductDetail({ productId: id })
    return response.results
  },
  getAvailableDates: async (id) => {
    const response = await productAPI.getAvailableDates({ id })
    return response.results
  },
  getSeatDates: async (id) => {
    const response = await productAPI.getSeatDates({ productId: id })
    return response.results
  }

}

// === 컴포넌트 마운트 시 데이터 로드 ===
// onMounted(async () => {
//   try {
//     isLoading.value = true // 로딩 상태 시작
//     // 1. 좌석 등급 및 좌석 맵 정보 불러오기
//     const seatInfoResponse = await api.getSeatDates(eventIdx)
//     console.log('API 응답에서 가져온 seatInfoResponse:', seatInfoResponse) // 디버깅용

//     // seatInfoResponse.seatGrades와 seatInfoResponse.seatMap
//     if (seatInfoResponse && seatInfoResponse.seatGrades && seatInfoResponse.seatMap) {
//       // 2. 좌석 등급 정보 할당
//       seatGrades.value = seatInfoResponse.seatGrades

//       // 3. 좌석 맵 데이터 할당 (2차원 배열을 1차원 배열로 변환)
//       const allSeats = seatInfoResponse.seatMap.flat()
//       seats.value = allSeats
//       console.log('좌석 맵 데이터 불러오기 성공:', seats.value)
//     } else {
//       console.error('좌석 등급 또는 좌석 맵 정보를 불러오는 데 실패했습니다.')
//       loadError.value = '좌석 정보를 불러올 수 없습니다. 다시 시도해 주세요.'
//     }
//   } catch (error) {
//     console.error('초기 데이터 로드 실패:', error)
//     loadError.value = '서버 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
//   } finally {
//     isLoading.value = false // 로딩 상태 종료
//   }
// })

const loadSeatInfo = async () => {
  try {
    isLoading.value = true
    const seatInfoResponse = await api.getSeatDates(eventIdx)
    if (seatInfoResponse && seatInfoResponse.seatGrades && seatInfoResponse.seatMap) {
      seatGrades.value = seatInfoResponse.seatGrades
      seats.value = seatInfoResponse.seatMap.flat()
    } else {
      loadError.value = '좌석 정보를 불러올 수 없습니다.'
    }
  } catch (error) {
    console.error('초기 데이터 로드 실패:', error)
    loadError.value = '서버 통신 중 오류가 발생했습니다.'
  } finally {
    isLoading.value = false
  }
}

async function openBookingModal() {
  try {
    productDetail.value = await api.getProductDetail(eventIdx)
    const datesData = await api.getAvailableDates(eventIdx)

    if (datesData && datesData.length > 0) {
      availableDatesResponse.value = datesData

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
          day,
          fullDate,
          isAvailable: !!dateInfo,
          isSelected: false,
          isToday: fullDate === today,
        }
      })
    } else {
      availableDatesResponse.value = []
      calendarDates.value = []
    }

    const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'))
    bookingModal.show()
  } catch (error) {
    console.error('모달 열기 중 오류:', error)
  }
}

const currentDayTimeslots = computed(() => {
  const selected = availableDatesResponse.value.find((d) => d.date === selectedDate.value)
  return selected ? selected.roundTimes.map((rt) => ({ time: rt.times.slice(0, 5) })) : []
})

const totalPrice = computed(() =>
  selectedSeats.value.reduce((sum, s) => sum + s.priceInfo.price, 0),
)

function selectDate(date) {
  if (!date.isAvailable) return
  calendarDates.value.forEach((d) => (d.isSelected = false))
  date.isSelected = true
  selectedDate.value = date.fullDate
  selectedTime.value = ''
}

function toggleSeat(seat) {
  if (disabledSeats.value.includes(seat.name)) return
  const idx = selectedSeats.value.findIndex((s) => s.name === seat.name)
  if (idx >= 0) {
    selectedSeats.value.splice(idx, 1)
    // 좌석 해제 메시지 전송
    socket.value.send(
      `/order/event/${eventIdx}/${selectedDate.value}/${selectedTime.value}`,
      {},
      JSON.stringify({
        seatName: seat.name,
        sender: myNickname,
        action: 'deselect', // 해제 action
      }),
    )
  } else {
    selectedSeats.value.push(seat)
    //좌석 선택 메시지 전송에 action 추가
    socket.value.send(
      `/order/event/${eventIdx}/${selectedDate.value}/${selectedTime.value}`,
      {},
      JSON.stringify({
        seatName: seat.name,
        sender: myNickname,
        action: 'select', // 선택 action
      }),
    )
  }
}

async function nextStep() {
  if (step.value === 1) {
    // if (!selectedDate.value) return alert('예매일을 선택하세요.')
    // if (!selectedTime.value) return alert('회차를 선택하세요.')
    step.value++
    connectWebSocket()
  } else if (step.value === 2) {
    loadSeatInfo()
    // if (selectedSeats.value.length === 0) return alert('좌석을 선택하세요.')
    step.value++
  } else if (step.value === 3) {
    // if (!deliveryMethod.value) return alert('수령 방식을 선택하세요.')
    await onSubmit()
  }
}

function prevStep() {
  if (step.value > 1) step.value--
}

const randomId = () => {
  return [...crypto.getRandomValues(new Uint32Array(2))]
    .map((word) => word.toString(16).padStart(8, '0'))
    .join('')
}

const onSubmit = async () => {

  const validteResponse = await paymentAPI.validateSeats(
    {
      roundTimeIdx: 1,
      seatIdxes: [10]
    }
  );

  const successValidateSeats = validteResponse.success;
  if (successValidateSeats) {
    const paymentIdx = validteResponse.results.paymentIdx;
    const totalAmount = totalPrice.value
    const productIdxList = selectedSeats.value.map((s) => s.name)
    const paymentId = randomId()
    const paymentResponse = await PortOne.requestPayment({
      storeId: 'store-1ced0aba-9a78-47c4-a424-d03a4685fdd7',
      channelKey: 'channel-key-31b66752-13a4-429f-8a6f-ec087910a6d9',
      paymentId: paymentIdx,
      orderName: productDetail.value.name,
      totalAmount: 100000,
      currency: 'KRW',
      payMethod: 'CARD',
      customData: {
        productIdx: 1,
        roundTimeIdx: 1,
        seatIdxes: [
          10
        ]
      },
    })

    if (!paymentResponse.code) {
      router.push('/payment/results')
    } else {
      console.log(paymentResponse.code)
    }

  } else {
    console.log("결제 오류")
    alert(validteResponse.message)
    return
  }
}

const emitRoundTime = (roundTimes) => {
  availableDatesResponse.value = roundTimes
}
</script>

<template>
  <!-- <button @click="openBookingModal" type="button" class="btn btn-primary btn-lg shadow" data-bs-target="#staticBackdrop"
    data-bs-toggle="modal">
    예매하기
  </button> -->

  <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-hidden="true" aria-labelledby="staticBackdropLabel"
    data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">티켓 예매</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div class="steps mb-3">
            <div :class="['step', { active: step === 1 }]">Step 1<br />날짜 및 회차</div>
            <div :class="['step', { active: step === 2 }]">Step 2<br />좌석 선택</div>
            <div :class="['step', { active: step === 3 }]">Step 3<br />수령 방법</div>
          </div>

          <!-- 예매일 선택 start -->
          <div v-if="step === 1" class="step-content d-flex gap-2">
            <div class=" w-50">
              <h4>예매일 선택</h4>
              <Calendar :product-id="route.params.id" :start-date="productDetail?.startDate"
                :end-date="productDetail?.endDate" @round-times="emitRoundTime" />
            </div>
            <div class="w-50 d-flex flex-column justify-content-between">
              <div class=" w-100">
                <h4 class=" mt-3">회차 선택</h4>
                <select v-model="selectedTime" class="form-select w-100">
                  <option disabled value="">회차를 선택하세요</option>
                  <option v-for="slot in currentDayTimeslots" :key="slot.time" :value="slot.time">
                    {{ slot.time }}
                  </option>
                </select>
              </div>
              <div class="d-flex flex-column gap-2">
                <button class="btn btn-dark btn-lg" @click="nextStep">
                  {{ step === 3 ? '결제하기' : '다음' }}
                </button>
              </div>

            </div>
          </div>
          <!-- 예매일 선택 end -->

          <!-- 좌석 선택 start -->
          <div v-if="step === 2" class="step-content d-flex gap-3">
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
            <div v-else class="w-100">
              <h4>좌석 선택 (총 {{ seats.length }}석)</h4>
              <div class="seat-legend mb-3 d-flex gap-3">
                <div v-for="grade in seatGrades" :key="grade.grade" class="legend-item"
                  :class="grade.grade.toLowerCase()">
                  <div class="color-box" :class="grade.grade.toLowerCase()"></div>
                  {{ grade.grade }}석 - {{ grade.priceInfo.priceFormat }}
                </div>
              </div>
              <div class="seat-grid ">
                <div v-for="seat in seats" :key="seat.name" :class="[
                  'seat',
                  seat.grade.toLowerCase(),
                  {
                    selected: selectedSeats.some((s) => s.name === seat.name),
                    disabled: disabledSeats.includes(seat.name),
                  },
                ]" @click="toggleSeat(seat)">
                  {{ seat.name }}
                </div>
              </div>
            </div>
            <div class="d-flex flex-column gap-2 w-75 justify-content-between">
              <div class="summary d-flex flex-column gap-2 justify-content-between">
                <h5>예매 요약</h5>
                <p><strong>예매일:</strong> {{ selectedDate || '선택 안 됨' }}</p>
                <p><strong>회차:</strong> {{ selectedTime || '선택 안 됨' }}</p>
                <p>
                  <strong>좌석:</strong>
                  {{selectedSeats.map((s) => s.name).join(', ') || '선택 안 됨'}}
                </p>
                <p><strong>수령 방법:</strong> {{ deliveryMethod || '선택 안 됨' }}</p>
                <p><strong>총 금액:</strong> {{ totalPrice.toLocaleString() }} 원</p>
              </div>
              <div class="d-flex gap-2 flex-column w-100">
                <button class="btn btn-dark btn-lg" @click="nextStep">
                  {{ step === 3 ? '결제하기' : '다음' }}
                </button>
                <button class="btn btn-light border btn-lg" @click="prevStep">
                  이전
                </button>
              </div>
            </div>
          </div>
          <!-- 좌석 선택 start -->

          <!-- 티켓 수령 방법 start -->
          <div v-if="step === 3" class="step-content d-flex gap-2">
            <div class="w-100">
              <h4>수령 방법</h4>
              <label><input type="radio" v-model="deliveryMethod" value="현장 수령" /> 현장 수령</label>
              <label class="ms-3"><input type="radio" v-model="deliveryMethod" value="QR 코드" /> QR 코드</label>
              <p><input type="text" class="form-control" placeholder="이름" /></p>
              <p><input type="text" class="form-control" placeholder="긴급 연락처" /></p>
              <p><input type="text" class="form-control" placeholder="e-mail" /></p>
            </div>

            <div class="d-flex flex-column gap-2 w-75 justify-content-between">
              <div class="summary d-flex flex-column gap-2 justify-content-between">
                <h5>예매 요약</h5>
                <p><strong>예매일:</strong> {{ selectedDate || '선택 안 됨' }}</p>
                <p><strong>회차:</strong> {{ selectedTime || '선택 안 됨' }}</p>
                <p>
                  <strong>좌석:</strong>
                  {{selectedSeats.map((s) => s.name).join(', ') || '선택 안 됨'}}
                </p>
                <p><strong>수령 방법:</strong> {{ deliveryMethod || '선택 안 됨' }}</p>
                <p><strong>총 금액:</strong> {{ totalPrice.toLocaleString() }} 원</p>
              </div>
              <div class="d-flex gap-2 flex-column w-100">
                <button class="btn btn-dark btn-lg" @click="nextStep">
                  결제하기
                </button>
                <button class="btn btn-light border btn-lg" @click="prevStep">
                  이전
                </button>
              </div>
            </div>
          </div>
          <!-- 티켓 수령 방법 start -->

          <!-- <div class="modal-footer">
            <button class="btn btn-secondary" @click="prevStep" :disabled="step === 1">이전</button>
            <button class="btn btn-primary" @click="nextStep">
              {{ step === 3 ? '결제하기' : '다음' }}
            </button>
          </div> -->
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
