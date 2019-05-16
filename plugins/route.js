export default ({
  app
}) => {
  app.router.beforeEach((to, from,next) => {
    next()
  //  window.sessionStorage.setItem('setMenuHeadActiveName',to.path);
  })
}
