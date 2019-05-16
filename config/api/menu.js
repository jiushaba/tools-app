/**
 * 菜单模块
 */

import Http from '@nuxtjs/axios'

/**
 * 头部菜单，侧边栏菜单             废弃
 */
export const menuList = {
  request: (success,fail) => {
    Http.get('/menu/list', {},success,fail)
  }
}