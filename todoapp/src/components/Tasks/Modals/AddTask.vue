<template>
    <q-card>
        <modal-header>Add Task</modal-header>

        <q-form @submit="submit_form">
            <q-card-section class="q-pt-none">
                <modal-task-name :name.sync="task_to_submit.name"></modal-task-name>
                <modal-due-date :due_date.sync="task_to_submit.due_date"></modal-due-date>                
                <modal-due-time :due_time.sync="task_to_submit.due_time"></modal-due-time>           
            </q-card-section>
            
            <modal-button></modal-button>
            
        </q-form> 
    </q-card>      
</template>

<script>
import { mapActions } from "vuex"
export default {
    components: { 
        "modal-header": require("components/Tasks/Shared/ModalHeader.vue").default,
        "modal-task-name": require("components/Tasks/Shared/ModalTaskName.vue").default,
        "modal-due-date": require("components/Tasks/Shared/ModalDueDate.vue").default,
        "modal-due-time": require("components/Tasks/Shared/ModalDueTime.vue").default,
        "modal-button": require("components/Tasks/Shared/ModalButton.vue").default,
    },
    data () {
        return {
            task_to_submit: {
                name: "",
                completed: false,
                due_date: "",
                due_time: ""
            }
        }
    },
    methods: {
        ...mapActions("tasks", ["add_task"]),
        submit_form() {
            this.add_task(this.task_to_submit)
            this.$emit("close")
        }
    }
}
</script>

<style>

</style>