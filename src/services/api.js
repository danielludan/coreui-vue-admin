import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const API_LOGIN_URL = API_URL + "token"
const API_DICT_URL = API_URL + "dict/"
const API_DICT_CAT_URL = API_URL + "dict/cat"

// 获取当前用户
const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
}

// 获取当前用户的access token
const getUserAccessToken = () => {
  const token = getUser()?getUser().access:"";
  console.log("token:" + token);
  return token;
}

const deleteUser = () => {
  localStorage.removeItem('user');
}

// 定义拦截器
const instance = axios.create({
    baseURL: API_URL,
  });

instance.interceptors.request.use(
    config => {

      config.headers = {
        ...config.headers, // Merge existing headers
        'Authorization': 'Bearer ' + getUserAccessToken(), // Add your custom header
      };

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
            }  else if (status === 400) {
              // 处理资源未找到错误
              return Promise.reject({ message: '请求参数异常' });
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

  // 登录
  login(username, password) {
    return instance.post(API_LOGIN_URL, {
      username,
      password,
    }).then(response => {
      if (response.access) {
        localStorage.setItem('user', JSON.stringify(response));
      }
      return response;
    });
  }

  // 注销
  logout() {
    deleteUser();
  }

  // Get dictionary list
  dict_list(params = {}) {
    return instance.get(API_DICT_URL, {
      params, // Pass query parameters for filtering
    }).then((response) => {
      const { results, count } = response.data; // Extract data from response
      return { results, count }; // Return data and total count
    });
  }

  // Get dictionary details
  dict_detail(id) {
    return instance.get(API_DICT_URL + `${id}/`).then((response) => {
      return response.data; // Return dictionary details
    });
  }

  // Create a new dictionary
  dict_create(data) {
    return instance.post(API_DICT_URL, data).then((response) => {
      return response.data; // Return created dictionary
    });
  }

  // Update an existing dictionary
  dict_update(id, data) {
    return instance.put(API_DICT_URL + `${id}/`, data).then((response) => {
      return response.data; // Return updated dictionary
    });
  }

  // Delete a dictionary
  dict_delete(id) {
    return instance.delete(API_DICT_URL + `${id}/`); // Delete dictionary
  }

}

export default new API();