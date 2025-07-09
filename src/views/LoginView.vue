<script setup>
import { reactive } from 'vue';
import api from '@/api/member'

const loginUser = reactive({
    email: '',
    password: ''
});

const login = async () => {
    console.log('로그인 시도:', loginUser.email, loginUser.password);
    const response = await api.memberLogin(loginUser);
    console.log('로그인 응답:', response);
};

</script>

<template>
    <div class="bg-body-tertiary">
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">

                        <main class="bg-body p-4 p-md-5 rounded-4 shadow">
                            <form @submit.prevent="login">
                                <div class="text-center mb-4">
                                    <RouterLink to="/">
                                        <img src="../assets/image/logo.png" alt="picket 로고" class="w-50 mb-4">
                                    </RouterLink>
                                    <h1 class="h4 fw-bold text-dark mb-3">PICKET에 오신것을 환영합니다.</h1>
                                    <p class="display-12 fw-bold text-uppercas">picket은 가장 빠른 티켓팅 플랫폼입니다.</p>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control form-control-lg" id="floatingInput"
                                        placeholder="name@example.com" required v-model="loginUser.email">
                                    <label for="floatingInput">이메일 주소</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control form-control-lg" id="floatingPassword"
                                        placeholder="Password" required v-model="loginUser.password">
                                    <label for="floatingPassword">비밀번호</label>
                                </div>

                                <button class="btn btn-primary w-100 py-2 mt-4" type="button" @click="login">
                                    로그인
                                </button>

                                <div class="text-center mt-4">
                                    <RouterLink to="/email-find" class="text-decoration-none text-secondary small">
                                        아이디 찾기
                                    </RouterLink>
                                    <span class="text-secondary mx-1">|</span>
                                    <RouterLink to="/password-reset" class="text-decoration-none text-secondary small">
                                        비밀번호 찾기
                                    </RouterLink>
                                    <span class="text-secondary mx-1">|</span>
                                    <RouterLink to="/sign-up" class="text-decoration-none text-secondary small">
                                        회원가입
                                    </RouterLink>
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