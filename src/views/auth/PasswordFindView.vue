<script setup>
import { ref } from 'vue';

import authApi from '@/api/auth';
import Header from '@/components/auth/header.vue';
import { RouterLink } from 'vue-router';

const toggleStates = ref({
    isSendCode: false,
});

const email = ref('');

// 비밀번호 재설정 링크 요청 함수
const sendLink = async () => {
    const req = {
        email: email.value.trim()
    }

    if (!req.email) {
        alert('이메일 주소를 입력해주세요.');
        return;
    }

    const response = await authApi.sendPasswordResetLink(req);

    if (response.success) {
        toggleStates.value.isSendCode = true;
    } else {
        alert('인증 코드 전송에 실패했습니다.');
    }
};

</script>

<template>
    <div class="bg-body-tertiary">

        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <main class="bg-body p-4 p-md-5 rounded-4 shadow">
                            <form @submit.prevent="confirmPasswordReset">

                                <Header :view="toggleStates.isSendCode ? 'passwordResetLink' : 'passwordFind'" />

                                <div class="input-group mb-3" v-if="!toggleStates.isSendCode">
                                    <input type="email" class="form-control form-control-lg" id="emailInput"
                                        placeholder="이메일 주소" v-model="email">
                                    <button class="btn btn-outline-secondary" type="button" @click="sendLink">
                                        전송
                                    </button>
                                </div>

                                <button class="fw-light fs-6 text-nowrap btn text-center link-offset-1-hover"
                                    v-if="toggleStates.isSendCode" @click="sendLink">
                                    링크가 전송되지 않았거나, 링크를 잃어버리셨나요?
                                </button>
                                <RouterLink class="btn btn-lg btn-light border w-100 shadow-sm" to="/login">
                                    취소
                                </RouterLink>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>