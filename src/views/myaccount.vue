<template>
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
      <span v-if="!isNicknameEditing">{{ userNickname }}</span>
      <input v-else type="text" v-model="newNickname" class="input-field" />
      <button v-if="!isNicknameEditing" @click="startNicknameEdit" class="change-button">변경</button>
      <div v-else class="nickname-edit-controls">
        <button @click="checkNicknameDuplication" class="action-button2">중복 확인</button>
        <button @click="updateNickname" class="action-button2">변경 완료</button>
        <button @click="cancelNicknameEdit" class="action-button2 cancel-button">취소</button>
        <p v-if="nicknameMessage" class="message">{{ nicknameMessage }}</p>
      </div>
    </div>
    <div class="info-item">
      <span>휴대폰 번호</span>
      <span>{{ userPhoneNumber }}</span>
      <button @click="openPhoneChangeModal" class="change-button">변경</button>
    </div>
  </div>

  <div v-if="isPasswordChangeModalOpen" class="modal-overlay">
    <div class="modal-content">
      <h3>비밀번호 변경</h3>
      <div class="modal-body">
        <div v-if="passwordChangeStep === 1">
          <input type="email" v-model="emailForPasswordChange" placeholder="이메일 주소" class="input-field" disabled/>
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

// --- 사용자 정보 (실제 데이터 연동 시 교체 필요) ---
const userEmail = ref('test01@test.com'); //
const userNickname = ref('설설'); //
const userPhoneNumber = ref('010-8704-6669'); //

// --- 비밀번호 변경 관련 상태 ---
const isPasswordChangeModalOpen = ref(false);
const passwordChangeStep = ref(1); // 1: 이메일 입력, 2: 코드 입력, 3: 새 비밀번호 설정
const emailForPasswordChange = ref(userEmail.value); // 초기값은 현재 사용자 이메일
const passwordCodeSentMessage = ref('');
const passwordVerificationCode = ref('');
const passwordVerificationMessage = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const passwordUpdateMessage = ref('');

// 비밀번호 변경 모달 열기
const openPasswordChangeModal = () => {
  isPasswordChangeModalOpen.value = true;
  passwordChangeStep.value = 1;
  emailForPasswordChange.value = userEmail.value; // 항상 최신 이메일로 설정
  passwordCodeSentMessage.value = '';
  passwordVerificationCode.value = '';
  passwordVerificationMessage.value = '';
  newPassword.value = '';
  confirmNewPassword.value = '';
  passwordUpdateMessage.value = '';
};

// 비밀번호 변경 모달 닫기
const closePasswordChangeModal = () => {
  isPasswordChangeModalOpen.value = false;
};

// 인증 코드 발송 (API 연동 없이 프론트엔드에서만 동작)
const sendPasswordChangeCode = () => {
  if (!emailForPasswordChange.value) {
    passwordCodeSentMessage.value = '이메일 주소를 입력해주세요.';
    return;
  }
  // 실제 API 호출 대신 즉시 다음 단계로 이동
  passwordCodeSentMessage.value = `${emailForPasswordChange.value}로 인증 코드가 전송되었습니다.`;
  passwordChangeStep.value = 2;
  passwordVerificationCode.value = ''; // 코드 입력 필드 초기화
  passwordVerificationMessage.value = ''; // 메시지 초기화
};

// 인증 코드 확인 (API 연동 없이 프론트엔드에서만 동작)
const verifyPasswordChangeCode = () => {
  if (!passwordVerificationCode.value) {
    passwordVerificationMessage.value = '인증 코드를 입력해주세요.';
    return;
  }
  // 어떤 코드를 입력해도 성공으로 간주
  passwordVerificationMessage.value = '인증 완료.';
  passwordChangeStep.value = 3;
};

// 비밀번호 업데이트 (API 연동 없이 프론트엔드에서만 동작)
const updatePassword = () => {
  if (newPassword.value !== confirmNewPassword.value) {
    passwordUpdateMessage.value = '비밀번호가 일치하지 않습니다.';
    return;
  }
  if (!newPassword.value) {
    passwordUpdateMessage.value = '새 비밀번호를 입력해주세요.';
    return;
  }
  // 실제 API 호출 대신 성공 메시지 표시 후 모달 닫기
  passwordUpdateMessage.value = '비밀번호가 성공적으로 변경되었습니다.';
  // userEmail.value = emailForPasswordChange.value; // 이메일은 변경되는 것이 아니므로 필요 없음
  closePasswordChangeModal();
};

// --- 닉네임 변경 관련 상태 ---
const isNicknameEditing = ref(false);
const newNickname = ref('');
const nicknameMessage = ref('');

const startNicknameEdit = () => {
  isNicknameEditing.value = true;
  newNickname.value = userNickname.value;
  nicknameMessage.value = '';
};

const cancelNicknameEdit = () => {
  isNicknameEditing.value = false;
  nicknameMessage.value = '';
};

const checkNicknameDuplication = () => {
  if (!newNickname.value) {
    nicknameMessage.value = '닉네임을 입력해주세요.';
    return;
  }
  // 어떤 닉네임이든 '새로운_닉네임'이 아니면 사용 가능하다고 가정
  if (newNickname.value === 'existing_nickname') { // 예시로 'existing_nickname'은 중복이라고 가정
    nicknameMessage.value = '이미 사용 중인 닉네임입니다.';
  } else {
    nicknameMessage.value = '사용 가능한 닉네임입니다.';
  }
};

const updateNickname = () => {
  if (!newNickname.value) {
    nicknameMessage.value = '닉네임을 입력해주세요.';
    return;
  }
  // 중복 확인 메시지가 "사용 가능한 닉네임입니다."가 아니면 경고
  if (nicknameMessage.value !== '사용 가능한 닉네임입니다.' && newNickname.value !== userNickname.value) {
      nicknameMessage.value = '닉네임 중복 확인을 해주세요.';
      return;
  }

  userNickname.value = newNickname.value;
  nicknameMessage.value = '닉네임이 성공적으로 변경되었습니다.';
  isNicknameEditing.value = false;
};

// --- 휴대폰 번호 변경 관련 상태 ---
const isPhoneChangeModalOpen = ref(false);
const phoneChangeStep = ref(1); // 1: 새 휴대폰 번호 입력, 2: 코드 입력
const newPhoneNumber = ref('');
const phoneCodeSentMessage = ref('');
const phoneVerificationCode = ref('');
const phoneVerificationMessage = ref('');

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
  // 어떤 번호를 입력해도 성공으로 간주
  phoneCodeSentMessage.value = `${newPhoneNumber.value}로 인증 코드가 전송되었습니다.`;
  phoneChangeStep.value = 2;
  phoneVerificationCode.value = ''; // 코드 입력 필드 초기화
  phoneVerificationMessage.value = ''; // 메시지 초기화
};

const verifyPhoneCode = () => {
  if (!phoneVerificationCode.value) {
    phoneVerificationMessage.value = '인증 코드를 입력해주세요.';
    return;
  }
  // 어떤 코드를 입력해도 성공으로 간주
  phoneVerificationMessage.value = '인증 완료.';
  // 인증이 완료되면 휴대폰 번호 변경 버튼이 나타나도록 유도
};

const updatePhoneNumber = () => {
  if (phoneVerificationMessage.value === '인증 완료.') {
    userPhoneNumber.value = newPhoneNumber.value;
    phoneVerificationMessage.value = '휴대폰 번호가 성공적으로 변경되었습니다.';
    closePhoneChangeModal();
  } else {
    phoneVerificationMessage.value = '휴대폰 번호 인증을 먼저 완료해주세요.';
  }
};
</script>

<style scoped>
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

.nickname-edit-controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex: 2; /* 닉네임 텍스트 영역과 동일하게 공간 차지 */
  justify-content: flex-end; /* 버튼들을 오른쪽으로 정렬 */
}


/* 모달 스타일 */
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
  width: calc(100% - 22px); /* padding 고려 */
  margin-bottom: 10px;
  margin-right: 0; /* 모달 내에서는 오른쪽 마진 제거 */
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

.action-button2 {
  background-color: #007bff; /* 파란색 */
  color: white;
  border: none;
  padding: 8px 12px; /* 작게 조정 */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px; /* 글자 크기 조정 */
  white-space: nowrap; /* 버튼 내용이 줄바꿈되지 않도록 */
}

.action-button2:hover {
  background-color: #0056b3;
}

.action-button2.cancel-button {
  background-color: #6c757d;
  padding: 4px 6px; /* 회색 */
}

.action-button2.cancel-button:hover {
  background-color: #5a6268;
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
  color: #dc3545; /* 에러 메시지 색상 */
  font-size: 14px;
}

.message.success {
  color: #28a745; /* 성공 메시지 색상 */
}
</style>