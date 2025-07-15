<script setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();
import api from '@/api/member';

const state = reactive({
    email: '',
    verificationCode: '',
    isSendCode: false,
    isVerified: false,
    password: '',
    passwordConfirm: ''
});

const confirmPasswordReset = async () => {
    const req = {
        password: state.password.trim(),
        passwordConfirm: state.passwordConfirm.trim(),
    }

    if (!emailInput || !verificationCode || !password || !passwordConfirm) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    if (req.password !== req.passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    // const response = await api.confirmPasswordReset(req);

    // if (response.success) {
    //     alert('비밀번호 재설정이 완료되었습니다.');
    // } else {
    //     alert('비밀번호 재설정에 실패했습니다.');
    // }

    alert('비밀번호 재설정이 완료되었습니다.');
    router.push('/login');

};

// 이메일 인증 코드 전송 함수
const sendCode = async () => {
    const req = {
        email: state.email.trim()
    }

    if (!req.email) {
        alert('이메일 주소를 입력해주세요.');
        return;
    }

    alert('인증 코드가 전송되었습니다.');
    state.isSendCode = true;

    // 여기에 API 호출 로직을 추가하여 인증 코드 전송 기능을 구현합니다.
    // const response = await api.sendCode(req);

    // if (response.success) {
    // if (true) {
    //     alert('인증 코드가 전송되었습니다.');
    // } else {
    //     alert('인증 코드 전송에 실패했습니다.');
    // }
};

// 인증 코드 검증 요청
const requestVerificationCode = async () => {
    const req = {
        email: state.email.trim(),
        verificationCode: state.verificationCode.trim()
    }

    if (!req.email) {
        alert('이메일 주소를 입력해주세요.');
        return;
    }

    if (!req.verificationCode || req.verificationCode.length !== 6) {
        alert('인증 코드를 입력해주세요.');
        return;
    }

    // 여기에 API 호출 로직을 추가하여 인증 코드 요청 기능을 구현합니다.
    alert('인증 코드 확인이 완료되었습니다.');
    state.isVerified = true;

    // const response = await api.verificationCode(req);
    // if (response.success) {
    //     alert('인증 코드가 확인되었습니다.');
    // } else {
    //     alert('인증 코드가 일치하지 않습니다.');
    //     state.isVerified = false;
    // }

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

                                <div class="text-center mb-4">
                                    <RouterLink to="/">
                                        <img src="../assets/image/logo.png" alt="picket 로고" class="w-50 mb-4">
                                    </RouterLink>
                                    <h1 class="h2 fw-bold text-dark mb-3">비밀번호 찾기</h1>
                                    <p class="text-secondary small">
                                        가입하신 이메일 주소를 입력하시고 인증을 완료 하시면,<br>비밀번호 재설정이 가능합니다.
                                    </p>
                                </div>

                                <div class="input-group mb-3">
                                    <input type="email" class="form-control form-control-lg" id="emailInput"
                                        placeholder="이메일 주소" required v-model="state.email">
                                    <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                                        @click="sendCode">발송</button>
                                </div>


                                <div class="collapse input-group mt-3" :class="{ 'show': state.isSendCode }">
                                    <input type="text" class="form-control form-control-lg" id="verificationCode"
                                        placeholder="인증번호 6자리" maxlength="6" v-model="state.verificationCode">
                                    <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                                        @click="requestVerificationCode">인증</button>
                                </div>


                                <div class="mt-4" v-if="state.isVerified">
                                    <hr>
                                    <div class="text-center my-4">
                                        <h1 class="h4 fw-bold text-dark">비밀번호 재설정</h1>
                                        <p class="text-secondary small">새로운 비밀번호를 입력해주세요.</p>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="password" placeholder="새 비밀번호"
                                            required v-model="state.password">
                                        <label for="password">새 비밀번호</label>
                                    </div>
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="passwordConfirm"
                                            placeholder="새 비밀번호 확인" required v-model="state.passwordConfirm">
                                        <label for="passwordConfirm">새 비밀번호 확인</label>
                                    </div>
                                    <div class="form-text text-danger d-none">
                                        비밀번호가 일치하지 않습니다.
                                    </div>
                                </div>

                                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                    <RouterLink to="/" class="btn btn-secondary">취소</RouterLink>
                                    <button type="button" class="btn btn-primary"
                                        @click="confirmPasswordReset">확인</button>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>