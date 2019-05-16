/**
 * 数据查询模块
 */


/**
 * 历史上的今天
 */
export const dataQueryToday = {
  request: () => {
    this.$axios.get('/dataQuery/today', {})
  }
}
/**
 * 手机归属地查询
 */
export const dataQueryMobile = {
  request: (mobile) => {
    Http.get('/dataQuery/mobile', {
      mobile: mobile
    })
  }
}

/**
 * 域名归属地查询
 */
export const dataQueryWord = {
  request: (word, success) => {
    Http.get('/dataQuery/word', {
      word: word
    }, success, {})
  }
}
/**
 * ip归属地查询
 */
// export const dataQueryIp = {
//   request: (ip, success) => {
//     return Http.get('/dataQuery/ip', {
//       ip: ip
//     })
//   }
// }
