<script setup>
import { onMounted, reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import api from '@/api/member';

import Header from '@/components/auth/header.vue';

const router = useRouter();

const states = reactive({
    nickname: '',
    name: '',
    birth: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    gender: '',
    userType: '',
    term: false,
});

const sellerFields = reactive({
    representativeName: '',
    businessNumber: '',
    businessAddress: '',
});

const toggleStates = reactive({
    isSendCode: false,
    isVerified: false,
});

const code = ref('');

const userType = ref([
    {
        name: "NORMAL",
        description: "일반 사용자"
    },
    {
        name: "SELLER",
        description: "판매자"
    }
])

const gender = ref([
    {
        name: "MALE",
        description: "남성"
    },
    {
        name: "FEMALE",
        description: "여성"
    }
])

/**
 * 이메일 인증 코드 전송 요청
 */
const sendVerificationCode = async () => {
    const req = {
        email: states.email.trim(),
    }

    if (!req.email) {
        alert('이메일 주소를 입력해주세요.');
        return;
    }

    const response = await api.requestSendVerifyCode(req);
    if (response.success) {
        alert('인증 코드가 전송되었습니다. 이메일을 확인해주세요.');
        toggleStates.isSendCode = true;
    } else {
        alert('인증 코드 전송에 실패했습니다.');
    }
};

/**
 * 이메일 인증 코드 검증 요청
 */
const requestVerificateCode = async () => {

    const req = {
        email: states.email.trim(),
        code: code.value.trim(),
    }

    if (!req.email) {
        alert('이메일 주소를 입력해주세요.');
        return;
    }

    if (!code.value || code.value.length !== 6) {
        alert('인증 코드를 입력해주세요.');
        return;
    }

    const response = await api.verifyEmailCode(req);
    if (response.success) {
        toggleStates.isVerified = true;
        alert('인증이 완료되었습니다.');
    } else {
        alert('인증 코드가 잘못되었습니다. 다시 시도해주세요.');
    }
};

/**
 * 회원 가입 요청
 */
const requestSignup = async () => {
    console.log(states.password)
    console.log(states.confirmPassword)

    if (!states.password || !states.confirmPassword) {
        alert('비밀번호를 입력하세요');
        return;
    }

    if (states.password !== states.confirmPassword) {
        console.log(states.password)
        console.log(states.confirmPassword)
        return;
    }

    if (!states.term) {
        alert('서비스 이용약관에 동의해주세요.');
        return;
    }

    if (!toggleStates.isVerified) {
        alert('이메일 인증을 완료해주세요.');
        return;
    }

    if (states.userType === 'seller' && (!sellerFields.representativeName || !sellerFields.businessNumber || !sellerFields.businessAddress)) {
        alert('판매자 정보를 모두 입력해주세요.');
        return;
    }

    const req = {
        nickname: states.nickname.trim(),
        name: states.name.trim(),
        birth: states.birth.trim(),
        email: states.email.trim(),
        password: states.password.trim(),
        phoneNumber: states.phoneNumber.trim(),
        gender: states.gender.trim(),
        userType: states.userType,
        term: states.term,
        representativeName: sellerFields.representativeName.trim(),
        businessNumber: sellerFields.businessNumber.trim(),
        businessAddress: sellerFields.businessAddress.trim(),
    };

    const response = await api.requestSignup(req);
    if (response.success) {
        alert('회원가입이 완료되었습니다.');
        router.push('/login');
    } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
}

/**
 * 회원 가입 뷰가 onMounted될 때 사용자 유형과 성별 정보를 가져온다.
 */
onMounted(async () => {
    const response = await api.getSignupViewInfo();
    if (response.success) {
        userType.value = response.results.userTypes;
        gender.value = response.results.genders;

        // 회원 유형, 성별 초기화
        states.userType = userType.value[0].name;
        states.gender = gender.value[0].name;
    } else {
        console.error('회원가입 뷰 정보 가져오기 실패:', response.error);
    }
});
</script>

<template>
    <div class="bg-body-tertiary">
        <div class="container">
            <div class="row justify-content-center p-5">
                <div class="col-12 col-md-10 col-lg-8 col-xl-6">
                    <main class="bg-body p-4 p-md-5 rounded-3 shadow">

                        <form id="signupForm" @submit.prevent="requestSignup">
                            <Header view="signup" />
                            <div class="mb-4">
                                <label class="form-label fw-bold">회원 유형</label>
                                <div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="userType" id="regularMember"
                                            :value="userType[0].name" checked v-model="states.userType">
                                        <label class="form-check-label" for="regularMember">{{ userType[0].description
                                        }}</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="userType" id="sellerMember"
                                            :value="userType[1].name" v-model="states.userType">
                                        <label class="form-check-label" for="sellerMember">
                                            {{ userType[1].description }}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" value=true id="termsAgree" required
                                    v-model="states.term">
                                <label class="form-check-label" for="termsAgree">
                                    (필수) 서비스 이용약관에 동의합니다.
                                </label>
                            </div>
                            <hr class="mb-4">

                            <div class="row g-3">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="nickname" placeholder="닉네임" required
                                            v-model="states.nickname">
                                        <label for="nickname">닉네임</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="name" placeholder="이름" required
                                            v-model="states.name">
                                        <label for="name">이름</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="birthdate" placeholder="생년월일 8자리"
                                            required v-model="states.birth">
                                        <label for="birthdate">생년월일 (예: 19990101)</label>
                                    </div>
                                </div>
                                <div class="col-md-6 d-flex align-items-center">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="genderMale"
                                            :value="gender[0].name" checked v-model="states.gender">
                                        <label class="form-check-label" for="genderMale">
                                            {{ gender[0].description }}
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender" id="genderFemale"
                                            :value="gender[1].name" v-model="states.gender">
                                        <label class="form-check-label" for="genderFemale">
                                            {{ gender[1].description }}
                                        </label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="tel" class="form-control" id="phoneNumber" placeholder="전화번호"
                                            required v-model="states.phoneNumber">
                                        <label for="phoneNumber">전화번호</label>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <label for="email" class="form-label">이메일</label>
                                    <div class="input-group">
                                        <div class="form-floating">
                                            <input type="email" class="form-control" id="email" placeholder="이메일"
                                                required v-model="states.email">
                                            <label for="email">이메일</label>
                                        </div>
                                        <button class="btn btn-outline-secondary" type="button"
                                            id="email-verification-btn" @click="sendVerificationCode">전송</button>
                                    </div>
                                </div>

                                <div class="col-12" v-if="toggleStates.isSendCode">
                                    <div class="input-group">
                                        <div class=" form-floating">
                                            <input type="text" class="form-control" id="email-verification-code"
                                                placeholder="인증번호 6자리" maxlength="6" v-model="code">
                                            <label for="email-verification-code">인증번호 6자리</label>
                                        </div>
                                        <button class="btn btn-outline-secondary" type="button"
                                            id="email-verification-btn" @click="requestVerificateCode">인증</button>
                                    </div>

                                </div>

                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="password" placeholder="비밀번호"
                                            required v-model="states.password">
                                        <label for="password">비밀번호</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="passwordConfirm"
                                            placeholder="비밀번호 확인" required v-model="states.confirmPassword">
                                        <label for="passwordConfirm">비밀번호 확인</label>
                                    </div>
                                </div>
                            </div>

                            <div id="seller-fields" class="mt-4" v-if="states.userType === userType[1].name">
                                <hr>
                                <h5 class="my-4 fw-bold">판매자 정보</h5>
                                <div class="row g-3">
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="representativeName"
                                                placeholder="대표자 성명" v-model="sellerFields.representativeName">
                                            <label for="representativeName">대표자 성명</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="businessNumber"
                                                placeholder="사업자 등록번호" v-model="sellerFields.businessNumber">
                                            <label for="businessNumber">사업자 등록번호</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="businessAddress"
                                                placeholder="사업장 주소" v-model="sellerFields.businessAddress">
                                            <label for="businessAddress">사업장 주소</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-grid mt-4 gap-2">
                                <button class="btn btn-primary btn-lg" type="submit">회원가입</button>
                                <RouterLink to="/login" class="btn btn-outline-secondary btn-lg">취소</RouterLink>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>