<script setup>
import { computed, ref } from 'vue';

const props = defineProps(['view'])

const headerData = ref(
    {
        login: {
            title: "PICKET에 오신것을 환영합니다.",
            subtitle: "picket은 가장 빠른 티켓팅 플랫폼입니다."
        },
        email: {
            title: "계정 찾기",
            subtitle: "회원 가입시 입력하신 전화번호와 이름을 입력하시면,<br>해당 아이디를 찾아드립니다."
        },
        password: {
            title: "비밀번호 찾기",
            subtitle: "가입하신 이메일 주소를 입력하시고 인증을 완료 하시면, <br>비밀번호 재설정이 가능합니다."
        },
        signup: {
            title: "회원가입",
            subtitle: ""
        }
    }
)

const selectedHeader = computed(() => headerData.value[props.view])
</script>

<template>
    <div class="text-center mb-4">
        <RouterLink to="/">
            <img src="@/assets/image/logo.png" alt="picket 로고" class="w-50 mb-4">
        </RouterLink>
        <h1 class="h2 fw-bold text-dark mb-3">{{ selectedHeader.title }}</h1>
        <p class="display-12 fw-bold text-uppercase" v-html="selectedHeader.subtitle">
        </p>
    </div>
</template>

<style scoped></style>