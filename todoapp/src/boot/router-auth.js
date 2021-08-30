import { LocalStorage } from "quasar"
export default async ({router}) => {
  router.beforeEach((to, from, next) => {
    let logged_in = LocalStorage.getItem("logged_in")
    if (!logged_in && to.path !== "/auth"){
      next("/auth")
    }
    else{
      next()
    }
  })
}
