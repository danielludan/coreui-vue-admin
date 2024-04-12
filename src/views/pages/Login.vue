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
                      <CButton color="primary" class="px-4" @click="login"> 登录 </CButton>
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
import API from '@/services/api';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    login() {
      API.login(this.username, this.password)
        .then((data) => {
          if (data.detail) {
            this.error = data.detail
          }
          // Handle successful login, e.g., redirect or perform additional actions
          // Example: this.$router.push('/dashboard');
        })
        .catch(error => {
          this.error = error.message;
        });
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>