import { LocalStorage } from "quasar"

const state = {
    settings: {
        show_12_hr_time_format: false,
        show_tasks_in_one_list: false
    }
}

const mutations = {
    set_show_12_hr_time_format(state, value){
        state.settings.show_12_hr_time_format = value
    },
    set_show_tasks_in_one_list({commit}, value){
        state.settings.show_tasks_in_one_list = value
    },
    set_settings(state, settings){
        Object.assign(state.settings, settings)
    }
}

const actions = {
    set_show_12_hr_time_format({commit, dispatch}, value){
        commit("set_show_12_hr_time_format", value),
        dispatch("save_settings")
    },
    set_show_tasks_in_one_list({commit, dispatch}, value){
        commit("set_show_tasks_in_one_list", value)
        dispatch("save_settings")
    },
    save_settings({state}){
        LocalStorage.set('settings', state.settings)
    },
    get_settings({commit}){
        let settings = LocalStorage.getItem("settings")
        if(settings){
            commit("set_settings", settings)
        }
    }
}

const getters = {
    settings: (state) => {
        return state.settings
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}