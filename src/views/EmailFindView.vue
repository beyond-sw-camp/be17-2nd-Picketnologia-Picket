<script setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import api from '@/api/member';
const router = useRouter();

const findEmailForm = reactive({
    phoneNumber: '',
    userName: ''
});

const findEmail = async () => {
    const req = {
        phoneNumber: findEmailForm.phoneNumber,
        userName: findEmailForm.userName
    }

    if (!req.phoneNumber || !req.userName) {
        alert('전화번호와 이름을 입력해주세요.');
        return;
    }

    // const response = await api.memberFindEmail(req);
    // 여기에 API 호출 로직을 추가하여 이메일 찾기 기능을 구현합니다.
    console.log(`전화번호: ${req.phoneNumber}, 이름: ${req.userName}`);
    alert('당신의 이메일은 test01@test.com 입니다.'); // 임시 알림
         router.push('/login');
};

</script>

<template>
    <div class="bg-body-tertiary">
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <main class="bg-body p-4 p-md-5 rounded-4 shadow">
                            <form @submit.prevent="findEmail">
                                <div class="text-center mb-4">
                                    <RouterLink to="/">
                                        <img src="../assets/image/logo.png" alt="picket 로고" class="w-50 mb-4">
                                    </RouterLink>
                                    <h1 class="h2 fw-bold text-dark mb-3">계정찾기</h1>
                                    <p class="display-12 fw-bold text-uppercase">
                                        회원 가입시 입력하신 전화번호와 이름을 입력하시면,<br>해당 아이디를 찾아드립니다.
                                    </p>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="tel" class="form-control" id="phoneNumber" placeholder="전화번호" required
                                        v-model="findEmailForm.phoneNumber">
                                    <label for="phoneNumber">전화번호</label>
                                </div>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="userName" placeholder="이름" required
                                        v-model="findEmailForm.userName">
                                    <label for="userName">이름</label>
                                </div>

                                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                    <RouterLink to="/" class="btn btn-secondary">취소</RouterLink>
                                    <button type="submit" class="btn btn-primary">계정 찾기</button>
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