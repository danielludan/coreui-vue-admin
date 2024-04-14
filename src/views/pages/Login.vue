<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="handleSubmit" name="loginForm">
                  <h1>登录</h1>
                  <p class="text-body-secondary">请用您的账户登录</p>
                  <p v-if="error" class="error-message">{{ error }}</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="用户名"
                      autocomplete="username"
                      v-model="form.username"
                      :invalid="formError.username != ''" 
                      :feedbackInvalid="formError.username != '' ? formError.username : null"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="密码"
                      autocomplete="current-password"
                      v-model="form.password"
                      :invalid="formError.password != ''" 
                      :feedbackInvalid="formError.password != '' ? formError.password : null"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" type=submit :disabled="isSubmitting"> 登录 </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        忘记密码?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>注册</h2>
                  <p>
                    注册之前请先阅读用户需知，请在注册过程中提供必要的用户信息。
                  </p>
                  <CButton color="light" variant="outline" class="mt-3">
                    现在注册!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>

import { ref, reactive } from 'vue';
import API from '@/services/api';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import router from '@/router'

// Create a reactive form object
const form = reactive({
  username: '',
  password: ''
});

const formError = reactive({
  username: '',
  password: ''
});

const rules = {
  username: { required },
  password: { required },
};

const error = ref('')
const isSubmitting = ref(false)

const v$ = useVuelidate(rules, form);

// Define a method to handle login
const handleLogin = async () => {
  isSubmitting.value = true;
  console.log("handleLogin")
  try {
    const response = await API.login(form.username, form.password);
    if (response.detail) {
      error.value = response.detail;
    } else {
      // Handle successful login, e.g., redirect or perform additional actions
      // error.value = "登录成功[access:" + API.getUser().access + "]"
      // 跳转到dashboard主页面
      router.push('/dashboard');
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    // Enable the button after the server responds
    isSubmitting.value = false;
  }
};

const reset = () => {
  formError.username = "";
  formError.password = "";
  error.value = "";
}

const handleSubmit = async () => {
  console.log("handleSubmit");
  reset();
  v$.value.$touch(); // 触发验证
  if (v$.value.username.$error) formError.username = "用户名输入不正确";
  if (v$.value.password.$error) formError.password = "密码输入不正确";
  if (v$.value.username.$error || v$.value.password.$error) return

  // Process form submission
  handleLogin();
};

</script>

<style scoped>

.error-message {
  color: red;
}

</style>