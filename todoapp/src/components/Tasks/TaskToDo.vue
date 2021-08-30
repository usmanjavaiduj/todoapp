<template>
    <div>
        <q-banner v-if="!settings.show_tasks_in_one_list" inline-actions class="text-white bg-orange-4 text-center">
        Todo
        </q-banner>
        <q-list
        v-if="Object.keys(tasks_to_do).length" 
        bordered 
        padding 
        separator>
            <task
            v-for="(task, key) in tasks_to_do" 
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
    props: ["tasks_to_do"],
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