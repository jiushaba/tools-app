/**
 * 开发日志模块
 */

import Http from '@nuxtjs/axios'

/**
 * 友情链接列表
 */
export const codeLogkList = {
  request: (parm) => {
    Http.get('/codeLog/list', parm)
  }
}