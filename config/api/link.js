/**
 * 友情链接模块
 */

import Http from '@nuxtjs/axios'

/**
 * 友情链接列表
 */
export const friendLinkList = {
  request: (success) => {
    Http.get('/friendlink/list', {},success,{})
  }
}