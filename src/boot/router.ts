import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ( { app, router, store} ) => {
  router.beforeEach((to, from, next) => {
    if(!store.getters["vuexModule/getUser"] && to.path != '/' && to.path != '/signup'){
      next('/');
      return;
    }
    next();
  })
})
