//Axios.defaults.baseURL = "http://www.zdlog.com/api"

// Axios.interceptors.response.use((response) => {
//   // if (response.data && response.data.code === 401) { // 401, token失效
//   //  

//   //   window.location.href='/login'
//   // }
//   if (response.data && response.data.code !== 0) {}
//   console.log("请求成功", response)
//   return response.data;
// }, error => {
//   // this.$notify.error({
//   //   title: '错误',
//   //   message: '这是一条错误的提示消息'
//   // });
//   console.log("请求失败",error)
//   return Promise.reject(error)
// })
import { Message } from 'element-ui';
export default function ({
  $axios,
  redirect
}) {
 // $axios.defaults.baseURL = "https://www.zdlog.com/api/"
  $axios.defaults.baseURL = "http://192.168.0.174:8992/api/"
  $axios.defaults.headers.post['Content-Type'] = 'application/json'
  $axios.defaults.timeout = 160000
  $axios.onResponse(response => {
    if (response.data.code !== 0) {
      Message({
        showClose: true,
        message: response.data.msg,
        type: 'error'
      });
    } else {
      return response.data
    }
  })
  $axios.onRequest(config => {
    //  console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
