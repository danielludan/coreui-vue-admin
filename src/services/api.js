import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

// 定义拦截器
const instance = axios.create({
    baseURL: API_URL,
  });

instance.interceptors.request.use(
    config => {
        // 可以在这里添加请求头或其他配置
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        // 在这里处理正常响应
        return response.data;
    },
    error => {
        // 在这里处理错误响应
        if (error.response) {
            // 根据状态码处理不同的错误
            const status = error.response.status;
            if (status === 401) {
                // 处理未授权错误
                return Promise.reject({ message: '用户未授权' });
            } else if (status === 404) {
                // 处理资源未找到错误
                return Promise.reject({ message: '资源找不到' });
            } else {
                // 处理其他HTTP错误
                return Promise.reject({ message: '未知响应异常' });
            }
        } else if (error.request) {
            // 处理请求发起但没有收到响应的情况
            return Promise.reject({ message: '网络异常' });
        } else {
            // 处理其他错误
            return Promise.reject({ message: '未知请求异常' });
        }
    });

class API {
  login(username, password) {
    return instance.post(API_URL + 'token', {
      username,
      password,
    }).then(response => {
      if (response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new API();