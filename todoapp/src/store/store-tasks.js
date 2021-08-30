import Vue from "vue"
import { uid } from "quasar"
import { firebaseDb, firebaseAuth } from "boot/firebase"
const state = {
    tasks: {
        // 'ID1': {
        //     name: "Do grocery",
        //     completed: false,
        //     due_date: "2021/06/06",
        //     due_time: "18:30"
        // },
        // 'ID2': {
        //     name: "Do workout",
        //     completed: false,
        //     due_date: "2021/06/06",
        //     due_time: "19:30"
        // },
        // 'ID3': {
        //     name: "Fix AC",
        //     completed: false,
        //     due_date: "2021/06/06",
        //     due_time: "20:30"
        // }
    },
    search: ""
}

const mutations = {
    update_task(state, payload){
        Object.assign(state.tasks[payload.id], payload.updates)
    },
    delete_task(state, id){
        Vue.delete(state.tasks, id)
    },
    add_task(state, payload){
        Vue.set(state.tasks, payload.id, payload.task)
    },
    set_search(state, value){
        state.search = value
    }
}

const actions = {
    update_task({dispatch}, payload){
        //commit("update_task", payload)
        dispatch("fb_update_task", payload)
    },
    delete_task({dispatch}, id){
        //commit("delete_task", id)
        dispatch("fb_delete_task", id)
    },
    add_task({dispatch}, task){
        let task_id = uid()
        let payload = {
            id: task_id,
            task: task
        }
        //commit("add_task", payload)
        dispatch("fb_add_task", payload)
    },
    set_search({commit}, value){
        commit("set_search", value)
    },
    fb_read_data({commit}){
        let uid = firebaseAuth.currentUser.uid
        let user_tasks = firebaseDb.ref("tasks/" + uid)

        user_tasks.on("child_added", snapshot => {
            let task = snapshot.val()
            let payload = {
                id: snapshot.key,
                task: task
            }
            commit("add_task", payload)
        })

        user_tasks.on("child_changed", snapshot => {
            let task = snapshot.val()
            let payload = {
                id: snapshot.key,
                updates: task
            }
            commit("update_task", payload)
        })

        user_tasks.on("child_removed", snapshot => {
            let id = snapshot.key
            commit("delete_task", id)
        })
    },
    fb_add_task({}, payload){
        let uid = firebaseAuth.currentUser.uid
        let task_ref = firebaseDb.ref("tasks/" + uid + "/" + payload.id)
        task_ref.set(payload.task)
    },
    fb_update_task({}, payload){
        let uid = firebaseAuth.currentUser.uid
        let task_ref = firebaseDb.ref("tasks/" + uid + "/" + payload.id)
        task_ref.update(payload.updates)
    },
    fb_delete_task({}, id){
        let uid = firebaseAuth.currentUser.uid
        let task_ref = firebaseDb.ref("tasks/" + uid + "/" + id)
        task_ref.remove()
    }
}

const getters = {
    tasks_filtered: (state) => {
        let tasks = {}
        if (state.search){
            Object.keys(state.tasks).forEach(function(key){
                let task = state.tasks[key]
                if(task.name.toLowerCase().includes(state.search.toLowerCase())){
                    tasks[key] = task
                }
            })
            return tasks
        }
        return state.tasks
    },
    tasks_to_do: (state, getters) => {
        let tasks_filtered = getters.tasks_filtered
        let tasks = {}
        Object.keys(tasks_filtered).forEach(function(key){
            let task = tasks_filtered[key]
            if(!task.completed){
                tasks[key] = task
            }
        })
        return tasks
    },
    tasks_completed: (state, getters) => {
        let tasks_filtered = getters.tasks_filtered
        let tasks = {}
        Object.keys(tasks_filtered).forEach(function(key){
            let task = tasks_filtered[key]
            if(task.completed){
                tasks[key] = task
            }
        })
        return tasks
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}