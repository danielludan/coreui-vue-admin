<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>登录</h1>
                  <p class="text-body-secondary">请用您的账户登录</p>
                  <p v-if="error" class="error-message">{{ error }}</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="username"
                      placeholder="用户名"
                      autocomplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      placeholder="密码"
                      autocomplete="current-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" @click="handleLogin"> 登录 </CButton>
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

<script>
import { ref, reactive   } from 'vue';
import API from '@/services/api';

export default {
  setup() {
    // Create reactive refs for data properties
    const username = ref('');
    const password = ref('');
    const error = ref('');

    // Define a method to handle login
    const handleLogin = async () => {
      try {
        const response = await API.login(username.value, password.value);
        if (response.detail) {
          error.value = response.detail;
        } else {
          // Handle successful login, e.g., redirect or perform additional actions
          // Example: this.$router.push('/dashboard');
          error.value = "登录成功[access:" + API.getUser().access + "]"
        }
      } catch (err) {
        error.value = err.message;
      }
    };

    // Return the exposed properties and methods
    return {
      username,
      password,
      error,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>