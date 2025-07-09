<script setup>
import { ref, computed } from 'vue'

const step = ref(1)
const today = new Date()
const availableDates = ['2025-07-08', '2025-07-09', '2025-07-10', '2025-07-17', '2025-07-18']

const calendarDates = ref(
  Array.from({ length: 31 }, (_, i) => {
    const day = i + 1
    const fullDate = `2025-07-${String(day).padStart(2, '0')}`
    return {
      day,
      fullDate,
      isAvailable: availableDates.includes(fullDate),
      isSelected: false,
      isToday: fullDate === '2025-07-09'
    }
  })
)

const selectedDate = ref('')
const selectedTime = ref('')

function selectDate(date) {
  if (!date.isAvailable) return
  calendarDates.value.forEach(d => d.isSelected = false)
  date.isSelected = true
  selectedDate.value = date.fullDate
  selectedTime.value = ''
}

const timeslotData = {
  '2025-07-08': [{ time: '14:00' }, { time: '19:00' }],
  '2025-07-09': [{ time: '16:00' }],
  '2025-07-10': [{ time: '18:00' }],
  '2025-07-17': [{ time: '15:00' }, { time: '20:00' }],
  '2025-07-18': [{ time: '17:00' }]
}

const currentDayTimeslots = computed(() => timeslotData[selectedDate.value] || [])

const seats = Array.from({ length: 100 }, (_, i) => {
  let type = 'A'
  if (i < 10) type = 'VIP'
  else if (i < 20) type = 'R'
  else if (i < 60) type = 'S'
  return {
    name: `A${i + 1}`,
    type,
    price: type === 'VIP' ? 88000 : type === 'R' ? 66000 : 44000
  }
})

const selectedSeats = ref([])

function toggleSeat(seat) {
  const idx = selectedSeats.value.findIndex(s => s.name === seat.name)
  if (idx >= 0) selectedSeats.value.splice(idx, 1)
  else selectedSeats.value.push(seat)
}

const deliveryMethod = ref('')

const totalPrice = computed(() =>
  selectedSeats.value.reduce((sum, s) => sum + s.price, 0)
)

function nextStep() {
  if (step.value === 1) {
    if (!selectedDate.value) return alert('예매일을 선택하세요.')
    if (!selectedTime.value) return alert('회차를 선택하세요.')
    step.value++
  } else if (step.value === 2) {
    if (selectedSeats.value.length === 0) return alert('좌석을 선택하세요.')
    step.value++
  } else if (step.value === 3) {
    if (!deliveryMethod.value) return alert('수령 방식을 선택하세요.')
    alert('결제를 진행합니다.')
  }
}

function prevStep() {
  if (step.value > 1) step.value--
}
</script>

<template>
  <!-- 예매하기 버튼 -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookingModal">
    예매하기
  </button>

  <!-- 모달창 -->
  <div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title" id="bookingModalLabel">티켓 예매</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
        </div>

        <div class="modal-body">
          <!-- 단계 표시 -->
          <div class="steps mb-3">
            <div :class="['step', { active: step === 1 }]" @click="step = 1">Step 1<br>날짜 및 회차</div>
            <div :class="['step', { active: step === 2 }]" @click="step = 2">Step 2<br>좌석 선택</div>
            <div :class="['step', { active: step === 3 }]" @click="step = 3">Step 3<br>수령 방법</div>
          </div>

          <!-- Step 1 -->
          <div v-show="step === 1" class="step-content">
            <h4>예매일 선택</h4>
            <div class="calendar-grid">
              <div v-for="date in calendarDates" :key="date.fullDate" :class="[
                'day',
                date.isAvailable ? 'available' : 'disabled',
                date.isSelected ? 'selected' : '',
                date.isToday ? 'today' : ''
              ]" @click="selectDate(date)">
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

          <!-- Step 2 -->
          <div v-show="step === 2" class="step-content">
            <h4>좌석 선택 (총 100석)</h4>
            <!-- 좌석 구분 및 가격 안내 -->
            <div class="seat-legend mb-3 d-flex gap-3">
              <div class="legend-item vip">
                <div class="color-box vip"></div> VIP석 - 88,000원
              </div>
              <div class="legend-item r">
                <div class="color-box r"></div> R석 - 66,000원
              </div>
              <div class="legend-item s">
                <div class="color-box s"></div> S석 - 44,000원
              </div>
              <div class="legend-item a">
                <div class="color-box a"></div> A석 - 44,000원
              </div>
            </div>

            <div class="seat-grid">
              <div v-for="seat in seats" :key="seat.name"
                :class="['seat', seat.type.toLowerCase(), { selected: selectedSeats.includes(seat) }]"
                @click="toggleSeat(seat)">
                {{ seat.name }}
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div v-show="step === 3" class="step-content">
            <h4>수령 방법</h4>
            <label>
              <input type="radio" v-model="deliveryMethod" value="현장 수령" /> 현장 수령
            </label>
            <label class="ms-3">
              <input type="radio" v-model="deliveryMethod" value="QR 코드" /> QR 코드
            </label>
            <p><input type="text" class="form-control" placeholder="이름"></p>
            <p><input type="text" class="form-control" placeholder="긴급 연락처"></p>
            <p><input type="text" class="form-control" placeholder="e-mail"></p>
          </div>

          <!-- 예매 요약 -->
          <div class="summary mt-4 border-top pt-3">
            <h5>예매 요약</h5>
            <p><strong>예매일:</strong> {{ selectedDate || '선택 안 됨' }}</p>
            <p><strong>회차:</strong> {{ selectedTime || '선택 안 됨' }}</p>
            <p><strong>좌석:</strong> {{selectedSeats.map(s => s.name).join(', ') || '선택 안 됨'}}</p>
            <p><strong>수령 방법:</strong> {{ deliveryMethod || '선택 안 됨' }}</p>
            <p><strong>총 금액:</strong> {{ totalPrice.toLocaleString() }} 원</p>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="prevStep" :disabled="step === 1">이전</button>
          <button class="btn btn-primary" @click="nextStep">{{ step === 3 ? '결제하기' : '다음' }}</button>
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
</style>
