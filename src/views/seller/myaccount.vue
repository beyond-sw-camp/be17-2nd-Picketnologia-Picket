<!-- 닉네임 중복 확인 메시지 알럿 처리 버전 -->
<template>
  <Header></Header>
  <div class="account-container">
    <h2>계정 정보</h2>
    <div class="info-item">
      <span>회원 유형</span>
      <span>일반 회원</span>
    </div>
    <div class="info-item">
      <span>이메일</span>
      <span>{{ userEmail }}</span>
    </div>
    <div class="info-item">
      <span>비밀번호</span>
      <span>********</span>
      <button @click="openPasswordChangeModal" class="change-button">변경</button>
    </div>
    <div class="info-item">
      <span>이름</span>
      <span>강설</span>
    </div>
    <div class="info-item">
      <span>성별</span>
      <span>남자</span>
    </div>
    <div class="info-item">
      <span>닉네임</span>
      <template v-if="!isNicknameEditing">
        <span>{{ userNickname }}</span>
        <button @click="startNicknameEdit" class="change-button">변경</button>
      </template>
      <template v-else>
        <input type="text" v-model="newNickname" class="input-field" />
        <div class="nickname-edit-controls d-flex align-items-center">
          <button @click="checkNicknameDuplication" class="btn btn-primary btn-sm">중복 확인</button>
          <button @click="updateNickname" class="btn btn-primary btn-sm ms-1">변경 완료</button>
          <button @click="cancelNicknameEdit" class="btn btn-secondary btn-sm ms-1">취소</button>
        </div>
      </template>
    </div>
    <div class="info-item">
      <span>휴대폰 번호</span>
      <span>{{ userPhoneNumber }}</span>
      <button @click="openPhoneChangeModal" class="change-button">변경</button>
    </div>
  </div>

  <!-- 비밀번호 변경 모달 -->
  <div v-if="isPasswordChangeModalOpen" class="modal-overlay">
    <div class="modal-content">
      <h3>비밀번호 변경</h3>
      <div class="modal-body">
        <div v-if="passwordChangeStep === 1">
          <input type="email" v-model="emailForPasswordChange" placeholder="이메일 주소" class="input-field" disabled />
          <button @click="sendPasswordChangeCode" class="action-button">인증 코드 발송</button>
          <p v-if="passwordCodeSentMessage" class="message">{{ passwordCodeSentMessage }}</p>
        </div>
        <div v-if="passwordChangeStep === 2">
          <input type="text" v-model="passwordVerificationCode" placeholder="인증 코드" class="input-field" />
          <button @click="verifyPasswordChangeCode" class="action-button">인증</button>
          <p v-if="passwordVerificationMessage" class="message">{{ passwordVerificationMessage }}</p>
        </div>
        <div v-if="passwordChangeStep === 3">
          <input type="password" v-model="newPassword" placeholder="새 비밀번호" class="input-field" />
          <input type="password" v-model="confirmNewPassword" placeholder="새 비밀번호 확인" class="input-field" />
          <button @click="updatePassword" class="action-button">비밀번호 재설정</button>
          <p v-if="passwordUpdateMessage" class="message">{{ passwordUpdateMessage }}</p>
        </div>
      </div>
      <div class="modal-actions">
        <button @click="closePasswordChangeModal" class="action-button cancel-button">취소</button>
      </div>
    </div>
  </div>

  <!-- 휴대폰 번호 변경 모달 -->
  <div v-if="isPhoneChangeModalOpen" class="modal-overlay">
    <div class="modal-content">
      <h3>휴대폰 번호 변경</h3>
      <div class="modal-body">
        <div v-if="phoneChangeStep === 1">
          <input type="text" v-model="newPhoneNumber" placeholder="새 휴대폰 번호" class="input-field" />
          <button @click="sendPhoneVerificationCode" class="action-button">인증 코드 발송</button>
          <p v-if="phoneCodeSentMessage" class="message">{{ phoneCodeSentMessage }}</p>
        </div>
        <div v-if="phoneChangeStep === 2">
          <input type="text" v-model="phoneVerificationCode" placeholder="인증 코드" class="input-field" />
          <button @click="verifyPhoneCode" class="action-button">인증</button>
          <p v-if="phoneVerificationMessage" class="message">{{ phoneVerificationMessage }}</p>
          <button v-if="phoneVerificationMessage === '인증 완료.'" @click="updatePhoneNumber" class="action-button">휴대폰 번호 재설정</button>
        </div>
      </div>
      <div class="modal-actions">
        <button @click="closePhoneChangeModal" class="action-button cancel-button">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';

// 사용자 정보
const userEmail = ref('test01@test.com');
const userNickname = ref('설설');
const userPhoneNumber = ref('010-8704-6669');

// 상태 변수
const isPasswordChangeModalOpen = ref(false);
const passwordChangeStep = ref(1);
const emailForPasswordChange = ref(userEmail.value);
const passwordCodeSentMessage = ref('');
const passwordVerificationCode = ref('');
const passwordVerificationMessage = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const passwordUpdateMessage = ref('');

const isNicknameEditing = ref(false);
const newNickname = ref('');

const isPhoneChangeModalOpen = ref(false);
const phoneChangeStep = ref(1);
const newPhoneNumber = ref('');
const phoneCodeSentMessage = ref('');
const phoneVerificationCode = ref('');
const phoneVerificationMessage = ref('');

// 비밀번호 모달
const openPasswordChangeModal = () => {
  isPasswordChangeModalOpen.value = true;
  passwordChangeStep.value = 1;
  emailForPasswordChange.value = userEmail.value;
  passwordCodeSentMessage.value = '';
  passwordVerificationCode.value = '';
  passwordVerificationMessage.value = '';
  newPassword.value = '';
  confirmNewPassword.value = '';
  passwordUpdateMessage.value = '';
};
const closePasswordChangeModal = () => {
  isPasswordChangeModalOpen.value = false;
};
const sendPasswordChangeCode = () => {
  if (!emailForPasswordChange.value) {
    passwordCodeSentMessage.value = '이메일 주소를 입력해주세요.';
    return;
  }
  passwordCodeSentMessage.value = `${emailForPasswordChange.value}로 인증 코드가 전송되었습니다.`;
  passwordChangeStep.value = 2;
};
const verifyPasswordChangeCode = () => {
  if (!passwordVerificationCode.value) {
    passwordVerificationMessage.value = '인증 코드를 입력해주세요.';
    return;
  }
  passwordVerificationMessage.value = '인증 완료.';
  passwordChangeStep.value = 3;
};
const updatePassword = () => {
  if (newPassword.value !== confirmNewPassword.value) {
    passwordUpdateMessage.value = '비밀번호가 일치하지 않습니다.';
    return;
  }
  if (!newPassword.value) {
    passwordUpdateMessage.value = '새 비밀번호를 입력해주세요.';
    return;
  }
  passwordUpdateMessage.value = '비밀번호가 성공적으로 변경되었습니다.';
  alert('비밀번호 변경이 완료되었습니다.');
  closePasswordChangeModal();
};

// 닉네임
const startNicknameEdit = () => {
  isNicknameEditing.value = true;
  newNickname.value = userNickname.value;
};
const cancelNicknameEdit = () => {
  isNicknameEditing.value = false;
};

// 변경 요구사항 반영: 알럿 처리
const checkNicknameDuplication = () => {
  if (!newNickname.value) {
    alert('닉네임을 입력해주세요.');
    return;
  }
  // 서버 연동 전 임시 조건
  if (newNickname.value === 'existing_nickname') {
    alert('이미 사용 중인 닉네임입니다.');
  } else {
    alert('사용 가능한 닉네임입니다.');
  }
};
const updateNickname = () => {
  if (!newNickname.value) {
    alert('닉네임을 입력해주세요.');
    return;
  }
  userNickname.value = newNickname.value;
  alert('닉네임 변경이 완료되었습니다.');
  isNicknameEditing.value = false;
};

// 휴대폰 모달
const openPhoneChangeModal = () => {
  isPhoneChangeModalOpen.value = true;
  phoneChangeStep.value = 1;
  newPhoneNumber.value = '';
  phoneCodeSentMessage.value = '';
  phoneVerificationCode.value = '';
  phoneVerificationMessage.value = '';
};
const closePhoneChangeModal = () => {
  isPhoneChangeModalOpen.value = false;
};
const sendPhoneVerificationCode = () => {
  if (!newPhoneNumber.value) {
    phoneCodeSentMessage.value = '새 휴대폰 번호를 입력해주세요.';
    return;
  }
  phoneCodeSentMessage.value = `${newPhoneNumber.value}로 인증 코드가 전송되었습니다.`;
  phoneChangeStep.value = 2;
};
const verifyPhoneCode = () => {
  if (!phoneVerificationCode.value) {
    phoneVerificationMessage.value = '인증 코드를 입력해주세요.';
    return;
  }
  phoneVerificationMessage.value = '인증 완료.';
};
const updatePhoneNumber = () => {
  if (phoneVerificationMessage.value === '인증 완료.') {
    userPhoneNumber.value = newPhoneNumber.value;
    alert('휴대폰 번호 변경이 완료되었습니다.');
    closePhoneChangeModal();
  } else {
    phoneVerificationMessage.value = '휴대폰 번호 인증을 먼저 완료해주세요.';
  }
};
</script>

<style scoped>
/* 동일 스타일 유지 */
.account-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  background-color: #fff;
}
h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
}
.info-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}
.info-item:last-child {
  border-bottom: none;
}
.info-item span:first-child {
  font-weight: bold;
  color: #555;
  flex: 1;
}
.info-item span:nth-child(2) {
  color: #777;
  flex: 2;
  text-align: right;
  padding-right: 15px;
}
.change-button {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #555;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  margin-left: 10px;
}
.change-button:hover {
  background-color: #e0e0e0;
}
.input-field {
  flex: 2;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
}
.modal-content h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 20px;
}
.modal-body > div {
  margin-bottom: 15px;
}
.modal-body .input-field {
  width: calc(100% - 22px);
  margin-bottom: 10px;
  margin-right: 0;
}
.action-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 5px;
}
.action-button:hover {
  background-color: #0056b3;
}
.cancel-button {
  background-color: #6c757d;
}
.cancel-button:hover {
  background-color: #5a6268;
}
.message {
  margin-top: 10px;
  color: #dc3545;
  font-size: 14px;
}
</style>
