<template>
    <div :class="{'q-mt-lg' : !settings.show_tasks_in_one_list}">
        <q-banner v-if="!settings.show_tasks_in_one_list" inline-actions class="text-white bg-green-4 text-center">
            Completed
        </q-banner>
        <q-list
        v-if="Object.keys(tasks_completed).length" 
        bordered 
        padding 
        separator>
            <task
            v-for="(task, key) in tasks_completed" 
            :key="key"
            :task="task"
            :id="key">
            </task>
        </q-list>
    </div>  
</template>

<script>
import { mapGetters } from "vuex"
export default {
    props: ["tasks_completed"],
    components: {
        "task": require("components/Tasks/Task.vue").default,
    },
    computed: {
        ...mapGetters("settings", ["settings"])
    }
}
</script>

<style>

</style>