<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
import authApi from '@/api/auth';
import Header from '@/components/auth/header.vue';

const passwordState = ref({
    password: '',
    passwordConfirm: ''
});

// 패스워드 재설정 요청
const confirmPasswordReset = async () => {

    if (passwordState.value.password.length < 8) {
        alert('비밀번호는 8자리 이상이어야 합니다.');
        return;
    }

    if (passwordState.value.password !== passwordState.value.passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    const req = {
        token: route.query.token,
        password: passwordState.value.password.trim(),
    }

    const response = await authApi.resetPassword(req);

    if (response.success) {
        alert('비밀번호 재설정이 완료되었습니다.');
        router.push('/login');
    } else {
        alert('비밀번호 재설정에 실패했습니다.');
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
                            <form @submit.prevent="confirmPasswordReset" class="d-flex flex-column gap-3">
                                <Header view="passwordReset" />
                                <div class="form-floating">
                                    <input type="password" class="form-control" id="password" placeholder="새 비밀번호"
                                        v-model="passwordState.password">
                                    <label for="password">새 비밀번호</label>
                                </div>
                                <div class="form-floating">
                                    <input type="password" class="form-control" id="passwordConfirm"
                                        placeholder="새 비밀번호 확인" v-model="passwordState.passwordConfirm">
                                    <label for="passwordConfirm"> 비밀번호 확인 </label>
                                </div>
                                <div class="form-text text-danger d-none">
                                    비밀번호가 일치하지 않습니다.
                                </div>

                                <div class="d-grid gap-2">
                                    <button type="button" class="btn btn-lg btn-primary" @click="confirmPasswordReset">
                                        확인
                                    </button>
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