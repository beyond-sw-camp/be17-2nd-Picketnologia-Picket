<script setup>
import { reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import api from '@/api/auth';

import Header from '@/components/auth/header.vue';

const router = useRouter();

const findEmailForm = reactive({
    phoneNumber: '',
    name: ''
});

const result = ref({
    email: '',
    success: false
})

const findEmail = async () => {
    const req = {
        phoneNumber: findEmailForm.phoneNumber,
        name: findEmailForm.name
    }

    if (!req.phoneNumber || !req.name) {
        alert('전화번호와 이름을 입력해주세요.');
        return;
    }

    const response = await api.requestFindEmail(req);

    if (response.success) {
        result.value.email = response.results.email;
        result.value.success = true;
    } else {
        alert('계정을 찾을 수 없습니다. 입력한 정보를 확인해주세요.');
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

                            <!-- 아이디 조회 여부로 헤더 구분 -->
                            <Header :view="result.success ? 'emailFindResult' : 'email'" />

                            <!-- 이메일 조회 화면 -->
                            <form @submit.prevent="findEmail" v-if="!result.success">

                                <div class="form-floating mb-3">
                                    <input type="tel" class="form-control" id="phoneNumber" placeholder="전화번호"
                                        v-model="findEmailForm.phoneNumber">
                                    <label for="phoneNumber">전화번호</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="userName" placeholder="이름"
                                        v-model="findEmailForm.name">
                                    <label for="userName">이름</label>
                                </div>

                                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                    <RouterLink to="/login" class="btn btn-secondary">취소</RouterLink>
                                    <button type="submit" class="btn btn-primary">계정 찾기</button>
                                </div>
                            </form>

                            <!-- 이메일 조회 결과  -->
                            <div class="text-center fw-bold fs-3 d-grid" v-else>
                                <p> {{ result.email }} </p>
                                <button class="btn btn-lg btn-primary" @click="router.push('/login')">
                                    로그인 페이지로 이동
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>