export const actions = {
  async nuxtServerInit({
    commit
  }, {
    req,
    app
  }) {
    debugger
    const {
      data
    } = await app.$axios.get("/menu/list")
    commit('setHeadMenuList', data.headMenu);
    if (data.headMenu !== null && data.headMenu.length > 0) {
      let tem = [];
      data.headMenu.forEach(item => {
        tem.push(item.url);
      });
      commit('setHeadMenuUrlList', data.tem);
    }
    commit('setSideMenuList', data.leftMenu);
    if (data.leftMenu !== null && data.leftMenu.length > 0) {
      let tem = [];
      data.leftMenu.forEach(item => {
        tem.push(item.url);
      });
      commit('setSideMenuUrlList', tem);
    }
  }
}
