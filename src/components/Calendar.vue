<script setup>
import { useDate } from '@/utils/useDate'
import { ref, watch, watchEffect } from 'vue'
import productAPI from '@/api/product/index'

const props = defineProps({
  productId: Number,
  startDate: String,
  endDate: String,
  isOpenReservationModal: Boolean,
  isBack: Boolean
})

const emit = defineEmits(['roundDateId'])

const dayOfWeeks = ref(["일", "월", "화", "수", "목", "금", "토"])
const { getYearAndMonth, getDateOfCurDate } = useDate()
const curDate = ref(new Date())
const yearAndMonth = ref("")
const dateOfMonths = ref([])

const rounds = ref([]);
const getRoundDates = () => rounds.value.map(r => r.date)

const openCalander = async () => {

  const response = await productAPI.getRoundDates({
    productId: props.productId
  })

  if (response.success) {
    rounds.value = response.results.dates
    // findSelectRoundDates(curDate)
  }

  const leastDate = rounds.value[0].date
  const split = leastDate.split('-');

  curDate.value = new Date(split[0], split[1] - 1, split[2])
  yearAndMonth.value = getYearAndMonth(curDate.value)
  getDatesOfMonth(curDate.value)
  findRoundDate()
}

watch(() => props.isOpenReservationModal, (newValue) => {
  if (newValue) {
    openCalander()
  }
})

watchEffect(() => {
  if (props.isBack) {
    openCalander()
  }
})

const onClickPrevMonth = () => {

  // 이전 달의 1일 Date 객체
  const toDate = new Date(curDate.value.getFullYear(), curDate.value.getMonth() - 1, 1)

  // 이동하려는 Date 월이 공연 시작 월보다 작으면 return
  if (toDate.getMonth() < new Date(props.startDate).getMonth() + 1) {
    return;
  }

  curDate.value = toDate
  yearAndMonth.value = getYearAndMonth(curDate.value)
  getDatesOfMonth(curDate.value)
}

const onClickNextMonth = () => {

  const toDate = new Date(curDate.value.getFullYear(), curDate.value.getMonth() + 1, 1)
  if (toDate.getMonth() > new Date(props.endDate).getMonth()) {
    return
  }

  curDate.value = toDate
  yearAndMonth.value = getYearAndMonth(curDate.value)
  getDatesOfMonth(curDate.value)
}

// 해당 월의 일들을 구한다.(1 ~ 31, 30)
const getDatesOfMonth = (targetDate) => {

  dateOfMonths.value = []

  // 이전 달 말일
  const prevMonthLast = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0)
  for (let i = prevMonthLast.getDay(); i >= 0; i--) {
    dateOfMonths.value.push({ value: prevMonthLast.getDate() - i, type: 'prev' })
  }

  // 이번 달
  const thisMonthLast = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0)
  for (let i = 1; i <= thisMonthLast.getDate(); i++) {
    dateOfMonths.value.push({ value: i, type: 'cur' })
  }

  // 다음 달 시작
  const nextDays = 6 - thisMonthLast.getDay()
  for (let i = 1; i <= nextDays; i++) {
    dateOfMonths.value.push({ value: i, type: 'next' })
  }
}

const isPrevOrNextDate = (date) => date.type !== 'cur'

const isSunday = (date, index) => !isPrevOrNextDate(date) && index % 7 === 0

const isSelectedDate = (date) => {
  return date.value === curDate.value.getDate() &&
    date.type === 'cur'
}

const selectDate = (date) => {
  console.log(date)

  let year = curDate.value.getFullYear()
  let month = curDate.value.getMonth()

  if (date.type === 'prev') {
    month -= 1
    curDate.value = new Date(year, month, date.value)
    yearAndMonth.value = getYearAndMonth(curDate.value)
    getDatesOfMonth(curDate.value)
  } else if (date.type === 'next') {
    month += 1
    curDate.value = new Date(year, month, date.value)
    yearAndMonth.value = getYearAndMonth(curDate.value)
    getDatesOfMonth(curDate.value)
  } else {
    // 이번 달 날짜 클릭
    curDate.value = new Date(year, month, date.value)
  }

  findRoundDate(curDate)

}

const findSelectRoundDates = (selectedDated) => {
  const findDate = rounds.value.filter(round => new Date(round.date) === selectedDated.value)

  emit('roundTimes', findDate)
}

const isActiveDate = (date) => {
  let year = curDate.value.getFullYear()
  let month = curDate.value.getMonth() + 1

  if (date.type == "prev") {
    // 작년이면
    if (curDate.value.getMonth() == 1) {
      year = curDate.value.getFullYear() - 1;
      month = 12
    }

    // 달은 0부터 시작, 2월이면 1이 나옴 이전은 1빼줘야하니까 그대로 사용
    month = curDate.value.getMonth();
  }

  if (date.type == 'next') {
    // 내년이면
    if (curDate.value.getMonth() == 12) {
      year = curDate.value.getFullYear()
    }

    month = curDate.value.getMonth() + 2;
  }

  const cDate = [
    year,
    String(month).padStart(2, '0'),
    String(date.value).padStart(2, '0')
  ].join('-')

  return getRoundDates().includes(cDate);
}

const findRoundDate = () => {
  const findRound = rounds.value.find((round) => {
    const roundDate = getDateOfCurDate(round.date)

    return roundDate.getTime() === curDate.value.getTime()
  })
  emit('roundDateId', findRound.idx)
}
</script>

<template>
  <main class="bg-light border border-primary shadow p-2 d-flex flex-column gap-2 text-nowrap">
    <header class="d-flex justify-content-between align-items-center gap-2">
      <button @click="onClickPrevMonth" class="btn p-2">이전</button>
      <div class="text-center fw-bold">{{ yearAndMonth }}</div>
      <button @click="onClickNextMonth" class="btn p-2">다음</button>
    </header>

    <div class="d-flex flex-column text-center small mx-1">
      <div class="d-flex justify-content-between gap-3 border-bottom border-2 pb-2 border-primary">
        <div v-for="dayOfWeek in dayOfWeeks" :key="dayOfWeek" class="flex-fill fw-semibold">
          {{ dayOfWeek }}
        </div>
      </div>

      <div class="row" v-for="weekIndex in Math.ceil(dateOfMonths.length / 7)" :key="weekIndex">
        <button v-for="dayIndex in 7" :key="dayIndex"
          class="btn btn-light col text-center p-1 date-mouse-hover m-2 gap-2 fw-bold" :class="{
            'text-body-tertiary': isPrevOrNextDate(dateOfMonths[(weekIndex - 1) * 7 + (dayIndex - 1)]) || !isActiveDate(dateOfMonths[(weekIndex - 1) * 7 + (dayIndex - 1)]),
            'text-danger fw-bold': isSunday(dateOfMonths[(weekIndex - 1) * 7 + (dayIndex - 1)], (weekIndex - 1) * 7 + (dayIndex - 1)),
            'bg-dark text-white rounded-5 ': isSelectedDate(dateOfMonths[(weekIndex - 1) * 7 + (dayIndex - 1)])
          }" @click="selectDate(dateOfMonths[(weekIndex - 1) * 7 + (dayIndex - 1)])"
          :disabled="!isActiveDate(dateOfMonths[(weekIndex - 1) * 7 + (dayIndex - 1)])">
          {{ dateOfMonths[(weekIndex - 1) * 7 + (dayIndex - 1)]?.value || '' }}
        </button>
      </div>
    </div>
  </main>
</template>

<style>
.date-mouse-hover {
  cursor: pointer;
}
</style>
