import { LocalStorage } from "quasar"
import { firebaseAuth } from "boot/firebase"

const state = {
    logged_in: false
}

const mutations = {
    set_logged_in(state, value){
        state.logged_in = value
    }
}

const actions = {
    register_user({}, payload){
        firebaseAuth.createUserWithEmailAndPassword(
            payload.email, payload.password
        )
        .then(response => {
            console.log("response: ", response)
        })
        .catch(error => {
            console.log("error.message: ", error.message)
        })
    },
    login_user({}, payload){
        firebaseAuth.signInWithEmailAndPassword(
            payload.email, payload.password
        )
        .then(response => {
            console.log("response: ", response)
        })
        .catch(error => {
            console.log("error.message: ", error.message)
        })
    },
    logout_user(){
        firebaseAuth.signOut()
    },
    handle_auth_state_change({commit, dispatch}){
        firebaseAuth.onAuthStateChanged(user => {
            if(user){
                commit("set_logged_in", true)
                LocalStorage.set("logged_in", true)
                this.$router.push("/").catch(err => {})
                dispatch("tasks/fb_read_data", null, {root: true})
            }
            else{
                commit("set_logged_in", false)
                LocalStorage.set("logged_in", false)
                this.$router.replace("/auth").catch(err => {})
            }
        })
    }
}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}